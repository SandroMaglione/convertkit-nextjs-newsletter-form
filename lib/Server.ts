import { ArrayFormatter } from "@effect/schema";
import * as Schema from "@effect/schema/Schema";
import { Effect } from "effect";
import * as AppSchema from "./Schema";
import { MainLive } from "./Services";
import * as ConvertKit from "./Services/ConvertKit";
import { requestJson } from "./Services/Request";

export const main: Effect.Effect<Request, never, Response> = Effect.gen(
  function* (_) {
    const body = yield* _(
      requestJson,
      Effect.flatMap(Schema.parse(AppSchema.RouteRequest))
    );
    const convertKit = yield* _(ConvertKit.ConvertKitService);
    const subscriber = yield* _(convertKit.addSubscriber(body.email));
    return Response.json(subscriber);
  }
).pipe(
  Effect.provide(MainLive),
  Effect.tapError((error) => Effect.logDebug({ error })),
  Effect.catchTags({
    RequestJsonError: () =>
      Effect.succeed(
        Response.json(
          { errors: "Error while decoding request" },
          { status: 400 }
        )
      ),
    ParseError: (error) =>
      Effect.succeed(
        Response.json(
          { error: ArrayFormatter.formatErrors(error.errors) },
          { status: 400 }
        )
      ),
  }),
  Effect.catchAll((_) =>
    Effect.succeed(
      Response.json(
        { error: "Error while performing request" },
        { status: 500 }
      )
    )
  )
);
