import * as AppSchema from "@/lib/Schema";
import * as Http from "@effect/platform/HttpClient";
import { Effect } from "effect";

export const main = (email: string) =>
  Effect.gen(function* (_) {
    const req = yield* _(
      Http.request.post("/api/subscribe"),
      Http.request.acceptJson,
      Http.request.schemaBody(AppSchema.RouteRequest)({ email })
    );

    return yield* _(
      req,
      Http.client.fetch(),
      Effect.flatMap(Http.response.schemaBodyJson(AppSchema.SubscribeResponse))
    );
  });
