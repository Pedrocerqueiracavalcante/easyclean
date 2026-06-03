import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    R2: R2Bucket;
  }
}

export function getDb(d1: D1Database) {
  return drizzle(d1, { schema });
}

export * from "./schema";
