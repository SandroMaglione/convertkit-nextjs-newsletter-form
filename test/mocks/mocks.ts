import * as AppSchema from "@/lib/Schema";
import { ConfigProvider, Layer } from "effect";

const configProviderMock = ConfigProvider.fromMap(
  new Map([
    ["SUBSCRIBE_API", "http://localhost:3000/subscribe"],
    ["CONVERTKIT_API_URL", "http://localhost:3000"],
    ["CONVERTKIT_API_KEY", ""],
    ["CONVERTKIT_FORM_ID", "123"],
  ])
);

export const layerConfigProviderMock =
  Layer.setConfigProvider(configProviderMock);

export const subscribeResponseMock: AppSchema.SubscribeResponse = {
  subscription: { id: 0, subscriber: { id: 0 } },
};
