import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export type NoticeSummary = { id: string; title: string; is_pinned: boolean; created_at: string };
export type Notice = NoticeSummary & { content: string };

export const listNotices = createServerFn({ method: "GET" })
  .inputValidator((input: { limit?: number | undefined } | undefined) =>
    z.object({ limit: z.number().int().min(1).max(100).optional() }).parse(input ?? {}),
  )
  .handler(async ({ data }): Promise<NoticeSummary[]> => {
    const { data: rows, error } = await publicClient()
      .from("notices")
      .select("id, title, is_pinned, created_at")
      .order("is_pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(data.limit ?? 100);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const getNotice = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }): Promise<Notice | null> => {
    const { data: row, error } = await publicClient()
      .from("notices")
      .select("id, title, content, is_pinned, created_at")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row;
  });
