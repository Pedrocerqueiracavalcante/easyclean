import { headers } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { createAuth } from "@/lib/auth";

export async function getServerSession() {
  const { env } = await getCloudflareContext({ async: true });
  return createAuth(env.DB).api.getSession({ headers: await headers() });
}
