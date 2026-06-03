import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/lib/db";
import { addresses } from "@/lib/db/schema";
import { generateId } from "@/lib/utils";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { env } = await getCloudflareContext();
    const db = getDb(env.DB);
    const body = await req.json() as {
      label: string; street: string; number: string; floor?: string;
      postalCode: string; city?: string; country?: string;
      isDefault?: boolean; userId: string;
    };
    const { label, street, number, floor, postalCode, city, country, isDefault, userId } = body;

    if (isDefault && userId) {
      await db
        .update(addresses)
        .set({ isDefault: false })
        .where(eq(addresses.userId, userId));
    }

    const id = generateId();
    await db.insert(addresses).values({
      id, userId, label, street, number, floor, postalCode,
      city: city || "Luxembourg",
      country: country || "Luxembourg",
      isDefault: isDefault ?? false,
    });

    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Erro ao criar endereço" }, { status: 500 });
  }
}
