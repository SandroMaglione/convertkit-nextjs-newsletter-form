import { Context, Data, Effect } from "effect";

export class RequestJsonError extends Data.TaggedError("RequestJsonError")<{
  error: unknown;
}> {}

export const Request = Context.Tag<Request>("Request");

export const requestJson = Request.pipe(
  Effect.tryMapPromise({
    try: (request) => request.json(),
    catch: (error) => new RequestJsonError({ error }),
  })
);
