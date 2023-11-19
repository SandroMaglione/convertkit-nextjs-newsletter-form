import { Context, Effect } from "effect";

export interface ConvertKitService {
  /**
   * Add new subscriber with given `email`.
   */
  readonly addSubscriber: (
    email: string
  ) => Effect.Effect<never, never, string>;
}

export const ConvertKitService = Context.Tag("@app/ConvertKitService");
