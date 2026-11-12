import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { noticeQuery, formatDate } from "@/lib/notices.queries";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const Route = createFileRoute("/notices/$id")({
  loader: async ({ params, context }) => {
    if (!UUID.test(params.id)) throw notFound();
    const notice = await context.queryClient.ensureQueryData(noticeQuery(params.id));
    if (!notice) throw notFound();
    return { title: notice.title, excerpt: notice.content.slice(0, 120).replace(/\s+/g, " ") };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "공지사항 | (주)대진스틸" }, { name: "robots", content: "noindex" }] };
    const title = `${loaderData.title} | 공지사항 | (주)대진스틸`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <p className="text-lg font-bold text-navy">게시글을 찾을 수 없습니다.</p>
      <Button asChild className="mt-6"><Link to="/notices">목록으로</Link></Button>
    </div>
  ),
  component: NoticeDetail,
});

function NoticeDetail() {
  const { id } = Route.useParams();
  const { data: n } = useSuspenseQuery(noticeQuery(id));
  if (!n) return null;
  return (
    <>
      <PageHeader eyebrow="Notice" title="공지사항" crumb="공지사항" />
      <section className="py-12 md:py-16">
        <article className="container-site max-w-4xl">
          <header className="border-t-2 border-navy border-b border-border pb-5 pt-6">
            <h2 className="text-xl font-extrabold text-foreground md:text-2xl">{n.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              (주)대진스틸 · <time dateTime={n.created_at}>{formatDate(n.created_at)}</time>
            </p>
          </header>
          <div className="min-h-48 whitespace-pre-line border-b border-border py-8 leading-loose text-foreground/85">{n.content}</div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" size="lg"><Link to="/notices">목록으로</Link></Button>
          </div>
        </article>
      </section>
    </>
  );
}
