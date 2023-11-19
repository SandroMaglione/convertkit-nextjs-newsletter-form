import * as AppSchema from "@/lib/Schema";
import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/subscribe", () => {
    const json: AppSchema.SubscribeResponse = {
      subscription: { id: 0, subscriber: { id: 0 } },
    };
    return HttpResponse.json(json);
  }),
];
