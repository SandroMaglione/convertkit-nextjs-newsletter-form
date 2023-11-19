import * as Server from "@/lib/Server";
import { Effect, LogLevel, Logger } from "effect";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { layerConfigProviderMock, subscribeResponseMock } from "./mocks/mocks";
import { server } from "./node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Server.main", () => {
  it("should return an error when the request is missing an email", async () => {
    const response = await (
      await Server.main(
        new Request("http://localhost:3000/", {
          body: JSON.stringify({}),
          method: "POST",
        })
      ).pipe(Effect.runPromise)
    ).json();
    expect(response).toStrictEqual({ error: "Missing email in request" });
  });

  it("should return a valid SubscribeResponse when request successful", async () => {
    const response = await (
      await Server.main(
        new Request("http://localhost:3000/", {
          body: JSON.stringify({ email: "" }),
          method: "POST",
        })
      )
        .pipe(Effect.provide(layerConfigProviderMock))
        .pipe(Logger.withMinimumLogLevel(LogLevel.Debug))
        .pipe(Effect.runPromise)
    ).json();
    expect(response).toStrictEqual(subscribeResponseMock);
  });
});
