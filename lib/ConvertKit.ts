import { Context, Effect, Layer } from "effect";

export interface ConvertKitService {
  /**
   * Add new subscriber with given `email`.
   */
  readonly addSubscriber: (
    email: string
  ) => Effect.Effect<never, never, string>;
}

export const ConvertKitService = Context.Tag<ConvertKitService>(
  "@app/ConvertKitService"
);

export const ConvertKitServiceLive = Layer.succeed(
  ConvertKitService,
  ConvertKitService.of({
    addSubscriber: (email) => Effect.succeed(email),
  })
);
