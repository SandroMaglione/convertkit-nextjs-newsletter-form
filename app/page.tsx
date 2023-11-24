"use client";
import * as Client from "@/lib/Client";
import { Effect, Exit } from "effect";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (await Client.main(email).pipe(Effect.runPromiseExit)).pipe(
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
