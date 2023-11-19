import * as AppSchema from "@/lib/Schema";
import * as Http from "@effect/platform/HttpClient";
import { Effect, Exit } from "effect";
import { useState } from "react";

export const request = (email: string) =>
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

export default function Page() {
  const [email, setEmail] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (await request(email).pipe(Effect.runPromiseExit)).pipe(
      Exit.match({
        onFailure: (cause) => {
          console.error(cause);
        },
        onSuccess: (subscriber) => {
          console.log(subscriber);
        },
      })
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Subscribe</button>
    </form>
  );
}
