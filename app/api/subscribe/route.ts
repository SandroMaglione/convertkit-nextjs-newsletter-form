import { main } from "@/lib/Server";
import { Effect } from "effect";

export async function POST(request: Request): Promise<Response> {
  return main(request).pipe(Effect.runPromise);
}
