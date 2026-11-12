import { queryOptions } from "@tanstack/react-query";
import { getNotice, listNotices } from "./notices.functions";

export const noticesQuery = (limit?: number) =>
  queryOptions({
    queryKey: ["notices", limit ?? "all"],
    queryFn: () => listNotices({ data: limit ? { limit } : {} }),
  });

export const noticeQuery = (id: string) =>
  queryOptions({
    queryKey: ["notice", id],
    queryFn: () => getNotice({ data: { id } }),
  });

export function formatDate(iso: string): string {
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}
