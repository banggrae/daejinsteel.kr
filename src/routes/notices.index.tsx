import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/site/PageHeader";
import { noticesQuery, formatDate } from "@/lib/notices.queries";

export const Route = createFileRoute("/notices/")({
  head: () => ({
    meta: [
      { title: "공지사항 | (주)대진스틸" },
      { name: "description", content: "(주)대진스틸의 새로운 소식과 공지사항을 확인하세요." },
      { property: "og:title", content: "공지사항 | (주)대진스틸" },
      { property: "og:description", content: "(주)대진스틸 공지사항 게시판" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(noticesQuery()),
  component: NoticesPage,
});

function NoticesPage() {
  const { data: notices } = useSuspenseQuery(noticesQuery());
  const total = notices.length;
  return (
    <>
      <PageHeader eyebrow="Notice" title="공지사항" description="대진스틸의 새로운 소식을 알려드립니다." />
      <section className="py-12 md:py-16">
        <div className="container-site">
          <p className="text-sm text-muted-foreground">전체 <strong className="text-navy">{total}</strong>건</p>
          <div className="mt-3 border-t-2 border-navy">
            <div className="hidden grid-cols-[80px_1fr_120px] border-b border-border bg-muted px-4 py-3 text-center text-sm font-semibold text-navy md:grid">
              <span>번호</span><span>제목</span><span>등록일</span>
            </div>
            <ul className="divide-y divide-border border-b border-border">
              {total === 0 && <li className="py-14 text-center text-muted-foreground">등록된 공지사항이 없습니다.</li>}
              {notices.map((n, i) => (
                <li key={n.id}>
                  <Link to="/notices/$id" params={{ id: n.id }} className="group grid gap-1 px-4 py-4 hover:bg-muted/60 md:grid-cols-[80px_1fr_120px] md:items-center md:gap-0">
                    <span className="hidden text-center text-sm text-muted-foreground md:block">
                      {n.is_pinned ? <span className="rounded-sm bg-navy px-1.5 py-0.5 text-[11px] font-bold text-navy-foreground">공지</span> : total - i}
                    </span>
                    <span className="flex items-center gap-2 font-medium text-foreground group-hover:text-navy">
                      {n.is_pinned && <span className="rounded-sm bg-navy px-1.5 py-0.5 text-[11px] font-bold text-navy-foreground md:hidden">공지</span>}
                      {n.title}
                    </span>
                    <time className="font-mono text-xs text-muted-foreground md:text-center md:text-sm" dateTime={n.created_at}>{formatDate(n.created_at)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
