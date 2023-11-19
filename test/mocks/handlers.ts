import { HttpResponse, http } from "msw";
import { subscribeResponseMock } from "./mocks";

export const handlers = [
  http.post("http://localhost:3000/converkit", () => {
    return HttpResponse.json(subscribeResponseMock);
  }),
  http.post("http://localhost:3000/subscribe", () => {
    return HttpResponse.json(subscribeResponseMock);
  }),
];
