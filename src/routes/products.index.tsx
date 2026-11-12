import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "제품소개 | (주)대진스틸" },
      { name: "description", content: "와이어로프, 로프가공, 체인/부속, 운반하역기, 마닐라/섬유로프, 벨트슬링, 코팅와이어 등 (주)대진스틸 취급 제품 안내." },
      { property: "og:title", content: "제품소개 | (주)대진스틸" },
      { property: "og:description", content: "와이어로프부터 벨트슬링, 체인·부속까지 — 대진스틸 제품 카테고리." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <>
      <PageHeader eyebrow="Products" title="제품소개" description="현장 용도에 맞는 산업용 로프와 슬링, 체인 및 각종 부속을 공급합니다." />
      <section className="py-14 md:py-20">
        <div className="container-site">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={p.image} alt={p.name} width={1024} height={768} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <p className="eyebrow text-steel">{p.nameEn}</p>
                    <h2 className="mt-1 text-xl font-extrabold text-navy">{p.name}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-navy">
                      자세히 보기 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
