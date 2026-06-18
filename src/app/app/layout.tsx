import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { resolveSessionRedirect } from "@/lib/navigation-policy";
import { getServerSession } from "@/lib/server-session";
import { AppShell } from "./app-shell";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  const redirectTo = resolveSessionRedirect("/app/home", Boolean(session?.user?.id));

  if (redirectTo) {
    redirect(redirectTo);
  }

  return <AppShell>{children}</AppShell>;
}
