import * as Client from "@/lib/Client";
import { Effect, Exit } from "effect";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { layerConfigProviderMock, subscribeResponseMock } from "./mocks/mocks";
import { server } from "./node";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Client.main", () => {
  it("should return a valid Exit(SubscribeResponse) when request successful", async () => {
    const response = await Client.main("")
      .pipe(Effect.provide(layerConfigProviderMock))
      .pipe(Effect.runPromiseExit);
    expect(response).toStrictEqual(Exit.succeed(subscribeResponseMock));
  });
});
