import * as Http from "@effect/platform/HttpClient";
import {
  Config,
  ConfigSecret,
  Context,
  Data,
  Effect,
  Layer,
  flow,
} from "effect";
import * as AppSchema from "../Schema";
import { ParseResult } from "@effect/schema";

export interface ConvertKitConfig {
  readonly baseUrl: string;
  readonly apiKey: ConfigSecret.ConfigSecret;
  readonly formId: string;
}

export class ConvertKitError extends Data.TaggedError("ConvertKitError")<{
  readonly reason: "Http";
  readonly error: unknown;
}> {}

export interface ConvertKitService {
  /**
   * Add new subscriber with given `email`.
   */
  readonly addSubscriber: (
    email: string
  ) => Effect.Effect<
    never,
    ConvertKitError | ParseResult.ParseError,
    AppSchema.SubscribeResponse
  >;
}

export const ConvertKitService = Context.Tag<ConvertKitService>(
  "@app/ConvertKitService"
);

const make = ({ baseUrl, apiKey, formId }: ConvertKitConfig) => {
  const client = Http.client.fetchOk().pipe(
    Http.client.mapRequest(
      flow(Http.request.prependUrl(baseUrl), Http.request.acceptJson)
    ),
    Http.client.catchAll(
      (error) => new ConvertKitError({ reason: "Http", error })
    )
  );

  return ConvertKitService.of({
    addSubscriber: (email) =>
      Http.request.post(`/forms/${formId}/subscribe`).pipe(
        Http.request.schemaBody(AppSchema.SubscribeRequest)({
          api_key: ConfigSecret.value(apiKey),
          email,
        }),
        Effect.flatMap(client),
        Effect.flatMap(
          Http.response.schemaBodyJson(AppSchema.SubscribeResponse)
        ),
        Effect.catchTags({
          BodyError: (error) => new ConvertKitError({ reason: "Http", error }),
          ResponseError: (error) =>
            new ConvertKitError({ reason: "Http", error }),
        })
      ),
  });
};

export const layer = (config: Config.Config.Wrap<ConvertKitConfig>) =>
  Effect.config(Config.unwrap(config)).pipe(
    Effect.map(make),
    Layer.effect(ConvertKitService)
  );
