import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { PRODUCTS, getProduct } from "@/lib/products";
import { COMPANY, telHref } from "@/lib/company";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug };
  },
  head: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) return { meta: [{ title: "제품을 찾을 수 없습니다 | (주)대진스틸" }, { name: "robots", content: "noindex" }] };
    const title = `${p.name} | 제품소개 | (주)대진스틸`;
    return {
      meta: [
        { title },
        { name: "description", content: `${p.name} — ${p.summary}` },
        { property: "og:title", content: title },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <p className="text-lg font-bold text-navy">요청하신 제품을 찾을 수 없습니다.</p>
      <Button asChild className="mt-6"><Link to="/products">제품 목록으로</Link></Button>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;

  return (
    <>
      <PageHeader eyebrow={p.nameEn} title={p.name} description={p.summary} crumb={`제품소개 · ${p.name}`} />

      <div className="border-b border-border bg-card">
        <nav className="container-site flex gap-1 overflow-x-auto py-2" aria-label="제품 카테고리">
          {PRODUCTS.map((item) => (
            <Link
              key={item.slug}
              to="/products/$slug"
              params={{ slug: item.slug }}
              className="shrink-0 rounded-sm px-3.5 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-navy data-[status=active]:bg-navy data-[status=active]:text-navy-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <section className="py-12 md:py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <img src={p.image} alt={p.name} width={1024} height={768} className="aspect-[4/3] w-full rounded-lg bg-muted object-cover shadow-card" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-navy md:text-3xl">{p.name} 소개</h2>
            <div className="mt-4 space-y-3 leading-relaxed text-foreground/85">
              {p.description.map((d) => <p key={d}>{d}</p>)}
            </div>

            <h3 className="mt-8 text-sm font-bold text-steel">주요 취급 품목</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.items.map((i) => (
                <li key={i} className="rounded-sm border border-navy/15 bg-accent px-3 py-1.5 text-sm font-semibold text-navy">{i}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/inquiry" search={{ product: p.name }}>이 제품 견적 문의 <ArrowRight /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={telHref(COMPANY.tel1)}><Phone /> {COMPANY.tel1}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 md:py-16">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-card p-6 shadow-card md:p-8">
            <h3 className="text-lg font-extrabold text-navy">제품 특징</h3>
            <ul className="mt-4 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-foreground/85">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-card md:p-8">
            <h3 className="text-lg font-extrabold text-navy">주요 용도</h3>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {p.applications.map((a) => (
                <li key={a} className="rounded-md bg-muted px-4 py-3 text-sm font-semibold text-foreground">{a}</li>
              ))}
            </ul>
          </div>
        </div>

        {p.specs && (
          <div className="container-site mt-6">
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <table className="w-full text-sm">
                <caption className="border-b border-border px-5 py-4 text-left text-lg font-extrabold text-navy md:px-8">기본 사양</caption>
                <tbody className="divide-y divide-border">
                  {p.specs.map((s) => (
                    <tr key={s.label}>
                      <th scope="row" className="w-28 bg-muted px-5 py-3.5 text-left font-semibold text-navy md:w-44 md:px-8">{s.label}</th>
                      <td className="px-5 py-3.5 text-foreground/85 md:px-8">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">※ 상세 규격과 재고는 전화 또는 온라인문의로 확인해 주세요.</p>
          </div>
        )}
      </section>
    </>
  );
}
