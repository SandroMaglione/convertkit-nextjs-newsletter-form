import * as Server from "@/lib/Server";
import { Effect, LogLevel, Logger } from "effect";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { layerConfigProviderMock, subscribeResponseMock } from "./mocks/mocks";
import { server } from "./node";
import { Request } from "@/lib/Services/Request";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Server.main", () => {
  it("should return an error when the request is missing an email", async () => {
    const response = await (
      await Server.main.pipe(
        Effect.provideService(
          Request,
          new globalThis.Request("http://localhost:3000/", {
            body: JSON.stringify({}),
            method: "POST",
          })
        ),
        Effect.provide(layerConfigProviderMock),
        Effect.runPromise
      )
    ).json();
    expect(response).toEqual({
      error: [
        {
          _tag: "Missing",
          message: "Missing key or index",
          path: ["email"],
        },
      ],
    });
  });

  it("should return a valid SubscribeResponse when request successful", async () => {
    const response = await (
      await Server.main.pipe(
        Effect.provideService(
          Request,
          new globalThis.Request("http://localhost:3000/", {
            body: JSON.stringify({ email: "" }),
            method: "POST",
          })
        ),
        Effect.provide(layerConfigProviderMock),
        Logger.withMinimumLogLevel(LogLevel.Debug),
        Effect.runPromise
      )
    ).json();
    expect(response).toStrictEqual(subscribeResponseMock);
  });
});
