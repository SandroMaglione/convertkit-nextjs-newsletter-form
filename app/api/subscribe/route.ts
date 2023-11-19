import { main } from "@/lib/Core";
import { Effect } from "effect";

export async function POST(request: Request): Promise<Response> {
  return main(request).pipe(Effect.runPromise);
}
