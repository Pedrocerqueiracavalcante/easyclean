import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { eq } from "drizzle-orm";
import { createAuth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function PATCH(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const session = await createAuth(env.DB).api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Sessão obrigatória" }, { status: 401 });
    }

    const body = (await req.json()) as {
      name?: string;
      phone?: string | null;
    };
    const name = body.name?.trim();
    const phone = body.phone?.trim() || null;

    if (!name) {
      return NextResponse.json({ error: "Nome obrigatório" }, { status: 400 });
    }

    await getDb(env.DB)
      .update(users)
      .set({
        name,
        phone,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar perfil" }, { status: 500 });
  }
}
