import * as Schema from "@effect/schema/Schema";

export const SubscribeRequest = Schema.struct({
  api_key: Schema.string,
  email: Schema.string,
});

export const SubscribeResponse = Schema.struct({
  subscription: Schema.struct({
    id: Schema.number,
    subscriber: Schema.struct({ id: Schema.number }),
  }),
});
export interface SubscribeResponse
  extends Schema.Schema.To<typeof SubscribeResponse> {}
