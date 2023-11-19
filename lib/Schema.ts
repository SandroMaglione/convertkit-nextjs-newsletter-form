import * as Schema from "@effect/schema/Schema";

export const SubscribeResponse = Schema.struct({
  subscription: Schema.struct({
    id: Schema.number,
    subscriber: Schema.struct({ id: Schema.number }),
  }),
});
