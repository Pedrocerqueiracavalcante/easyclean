import { createAuth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { getCloudflareContext } from "@opennextjs/cloudflare";

async function getHandler() {
  const { env } = await getCloudflareContext();
  const auth = createAuth(env.DB);
  return toNextJsHandler(auth);
}

export const GET = async (req: Request) => (await getHandler()).GET(req);
export const POST = async (req: Request) => (await getHandler()).POST(req);
