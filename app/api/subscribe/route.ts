import { main } from "@/lib/Server";
import { Request } from "@/lib/Services/Request";
import { Effect } from "effect";

export async function POST(request: Request): Promise<Response> {
  return main.pipe(Effect.provideService(Request, request), Effect.runPromise);
}
