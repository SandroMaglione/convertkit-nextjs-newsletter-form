import * as Http from "@effect/platform/HttpClient";
import * as ParseResult from "@effect/schema/ParseResult";
import { ConfigError, Context, Effect, Layer } from "effect";
import * as AppConfig from "./Config";
import * as AppSchema from "./Schema";

export interface ConvertKitService {
  /**
   * Add new subscriber with given `email`.
   */
  readonly addSubscriber: (
    email: string
  ) => Effect.Effect<
    AppConfig.ConvertKitConfig,
    | ConfigError.ConfigError
    | Http.body.BodyError
    | Http.error.RequestError
    | Http.error.ResponseError
    | ParseResult.ParseError,
    AppSchema.SubscribeResponse
  >;
}

export const ConvertKitService = Context.Tag<ConvertKitService>(
  "@app/ConvertKitService"
);

export const ConvertKitServiceLive = Layer.succeed(
  ConvertKitService,
  ConvertKitService.of({
    addSubscriber: (email) =>
      Effect.gen(function* (_) {
        const convertKitConfig = yield* _(Effect.config(AppConfig.config));

        const req = yield* _(
          Http.request.post(convertKitConfig.url).pipe(
            Http.request.setHeaders(convertKitConfig.headers),
            Http.request.schemaBody(AppSchema.SubscribeRequest)({
              api_key: convertKitConfig.apiKey,
              email,
            })
          )
        );

        return yield* _(
          req,
          Http.client.fetch(),
          Effect.flatMap(
            Http.response.schemaBodyJson(AppSchema.SubscribeResponse)
          )
        );
      }),
  })
);
