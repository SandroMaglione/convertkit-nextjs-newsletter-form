import * as ParseResult from "@effect/schema/ParseResult";
import * as Schema from "@effect/schema/Schema";
import { Data, Effect } from "effect";
import * as ConvertKit from "./ConvertKit";
import * as AppSchema from "./Schema";

class RequestJsonError extends Data.TaggedError("RequestJsonError")<{
  error: unknown;
}> {}

class RequestMissingEmailError extends Data.TaggedError(
  "RequestMissingEmailError"
)<{
  jsonBody: any;
  parseError: ParseResult.ParseError;
}> {}

export const main = (request: Request): Effect.Effect<never, never, Response> =>
  Effect.gen(function* (_) {
    const jsonBody = yield* _(
      Effect.tryPromise({
        try: () => request.json(),
        catch: (error) => new RequestJsonError({ error }),
      })
    );

    const body = yield* _(
      jsonBody,
      Schema.parseEither(AppSchema.RouteRequest),
      Effect.mapError(
        (parseError) =>
          new RequestMissingEmailError({
            parseError,
            jsonBody,
          })
      )
    );

    const convertKit = yield* _(ConvertKit.ConvertKitService);
    const subscriber = yield* _(convertKit.addSubscriber(body.email));
    return Response.json(subscriber);
  })
    .pipe(Effect.provide(ConvertKit.ConvertKitServiceLive))
    .pipe(
      Effect.catchTags({
        RequestMissingEmailError: () =>
          Effect.succeed(
            Response.json(
              { error: "Missing email in request" },
              { status: 400 }
            )
          ),
        RequestJsonError: () =>
          Effect.succeed(
            Response.json(
              { error: "Error while decoding request" },
              { status: 400 }
            )
          ),
      })
    )
    .pipe(
      Effect.catchAll(() =>
        Effect.succeed(
          Response.json(
            { error: "Error while performing request" },
            { status: 500 }
          )
        )
      )
    );
