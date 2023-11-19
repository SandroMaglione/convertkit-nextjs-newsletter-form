import * as Schema from "@effect/schema/Schema";

const schema = Schema.struct({
  subscription: Schema.struct({
    id: Schema.number,
    subscriber: Schema.struct({ id: Schema.number }),
  }),
});
