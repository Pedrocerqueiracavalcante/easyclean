import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { addresses } from "@/lib/db/schema";
import { generateId } from "@/lib/utils";
import { desc, eq } from "drizzle-orm";
import { createAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = getDb(env.DB);
    const session = await createAuth(env.DB).api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json([]);
    }

    const result = await db.query.addresses.findMany({
      where: eq(addresses.userId, session.user.id),
      orderBy: desc(addresses.createdAt),
      limit: 20,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Erro ao listar endereços" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const db = getDb(env.DB);
    const session = await createAuth(env.DB).api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Sessão obrigatória" }, { status: 401 });
    }

    const body = await req.json() as {
      label: string; street: string; number: string; floor?: string;
      postalCode: string; city?: string; country?: string;
      isDefault?: boolean; userId?: string;
    };
    const { label, street, number, floor, postalCode, city, country, isDefault } = body;
    const effectiveUserId = session.user.id;

    if (isDefault && effectiveUserId) {
      await db
        .update(addresses)
        .set({ isDefault: false })
        .where(eq(addresses.userId, effectiveUserId));
    }

    const id = generateId();
    await db.insert(addresses).values({
      id, userId: effectiveUserId, label, street, number, floor, postalCode,
      city: city || "Luxembourg",
      country: country || "Luxembourg",
      isDefault: isDefault ?? false,
    });

    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Erro ao criar endereço" }, { status: 500 });
  }
}
