import * as AppSchema from "@/lib/Schema";
import * as Http from "@effect/platform/HttpClient";
import { Config, Effect } from "effect";

export const main = (email: string) =>
  Effect.gen(function* (_) {
    const apiUrl = yield* _(Effect.config(Config.string("SUBSCRIBE_API")));
    const req = yield* _(
      Http.request.post(apiUrl),
      Http.request.acceptJson,
      Http.request.schemaBody(AppSchema.RouteRequest)({ email })
    );

    return yield* _(
      req,
      Http.client.fetch(),
      Effect.flatMap(Http.response.schemaBodyJson(AppSchema.SubscribeResponse))
    );
  });
