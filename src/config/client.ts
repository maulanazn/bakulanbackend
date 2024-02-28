import { Database, PostgresConnector } from "https://deno.land/x/denodb@v1.4.0/mod.ts";
import { load } from "https://deno.land/std@0.217.0/dotenv/mod.ts";

const env: Record<string, string> = await load();
const connection = new PostgresConnector({
    uri: env["DATABASE_URL"]
});
  
export const db = new Database(connection);
