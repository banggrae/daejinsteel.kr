import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Phone, ShieldCheck, Truck, Wrench, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/PageHeader";
import { PRODUCTS, HANDLED_ITEMS } from "@/lib/products";
import { COMPANY, telHref } from "@/lib/company";
import { noticesQuery, formatDate } from "@/lib/notices.queries";
import heroImg from "@/assets/hero-wire-rope.jpg";
import warehouseImg from "@/assets/about-warehouse.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "(주)대진스틸 | 와이어로프·스테인레스로프·섬유로프·벨트슬링 전문업체" },
      { name: "description", content: "인천 (주)대진스틸 — 와이어로프, 스테인레스로프, 섬유로프, 벨트슬링, 체인, 샤클, 턴버클, 안전망, 하역도구 전문. 최고의 제품과 최상의 서비스로 모시겠습니다." },
      { property: "og:title", content: "(주)대진스틸 | 와이어로프·벨트슬링 전문업체" },
      { property: "og:description", content: "와이어로프, 스테인레스로프, 섬유로프, 벨트슬링 전문업체 — 최고의 제품과 최상의 서비스로 모시겠습니다." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(noticesQuery(4)),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <CategoryShortcuts />
      <AboutSummary />
      <NoticesAndContact />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      <img
        src={heroImg}
        alt="항만 창고에 적재된 와이어로프 코일"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" aria-hidden="true" />
      <div className="container-site flex min-h-[520px] flex-col justify-center py-20 md:min-h-[600px]">
        <p className="eyebrow animate-rise text-steel-light">Wire Rope · Stainless Rope · Fiber Rope · Belt Sling</p>
        <h1 className="mt-5 max-w-3xl animate-rise text-[2rem] font-extrabold leading-[1.2] text-navy-foreground [animation-delay:80ms] sm:text-5xl md:text-[3.5rem]">
          와이어로프, 스테인레스로프,
          <br className="hidden sm:block" /> 섬유로프, 벨트슬링 전문업체
        </h1>
        <p className="mt-6 max-w-xl animate-rise text-base text-navy-muted [animation-delay:160ms] md:text-lg">
          {COMPANY.slogan}
        </p>
        <div className="mt-9 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
          <Button asChild variant="hero" size="xl">
            <Link to="/products">
              제품 보기 <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="heroOutline" size="xl">
            <a href={telHref(COMPANY.tel1)}>
              <Phone /> {COMPANY.tel1}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CategoryShortcuts() {
  return (
    <section className="relative z-10 -mt-10 pb-16 md:-mt-14 md:pb-24">
      <div className="container-site">
        <div className="rounded-lg bg-card p-5 shadow-lift md:p-8">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading eyebrow="Products" title="제품 카테고리" />
            <Link to="/products" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-navy hover:underline sm:flex">
              전체 제품 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7 md:gap-4">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-md border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-navy/40 hover:shadow-card"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between px-3 py-3">
                    <span className="text-sm font-bold text-foreground md:text-[15px]">{p.name}</span>
                    <ChevronRight className="h-4 w-4 text-steel transition-transform group-hover:translate-x-0.5 group-hover:text-navy" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AboutSummary() {
  const strengths = [
    { icon: ShieldCheck, title: "검증된 제품", text: "용도와 하중에 맞는 신뢰할 수 있는 제품만 공급합니다." },
    { icon: Wrench, title: "맞춤 가공", text: "로프 절단, 압착, 아이 가공 등 현장 맞춤 제작." },
    { icon: Truck, title: "신속한 대응", text: "다양한 재고 보유로 빠른 견적과 출고." },
  ];
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <img
            src={warehouseImg}
            alt="와이어로프 릴과 체인, 슬링이 정리된 자재 창고"
            width={1600}
            height={912}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-lift"
          />
          <div className="absolute -bottom-5 left-5 rounded-md bg-navy px-5 py-4 text-navy-foreground shadow-lift md:left-8">
            <p className="text-xs text-navy-muted">인천 동구 송현동</p>
            <p className="mt-0.5 text-lg font-extrabold">산업용 로프·부속 전문</p>
          </div>
        </div>
        <div>
          <SectionHeading
            eyebrow="About Us"
            title="현장이 믿고 찾는 산업용 자재 파트너"
            description="(주)대진스틸은 아래 품목을 전문으로 취급하며, 고객 현장에 꼭 맞는 제품과 가공 서비스를 제공합니다."
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {HANDLED_ITEMS.map((item) => (
              <li key={item} className="rounded-sm border border-navy/15 bg-card px-3 py-1.5 text-sm font-semibold text-navy">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {strengths.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-md bg-card p-4 shadow-card">
                <Icon className="h-6 w-6 text-signal" />
                <p className="mt-3 font-bold text-foreground">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-8">
            <Link to="/about">
              회사소개 자세히 보기 <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function NoticesAndContact() {
  const { data: notices } = useSuspenseQuery(noticesQuery(4));
  return (
    <section className="py-16 md:py-24">
      <div className="container-site grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0">
          <div className="flex items-end justify-between">
            <SectionHeading eyebrow="Notice" title="최근 공지사항" />
            <Link to="/notices" className="flex items-center gap-1 text-sm font-semibold text-navy hover:underline">
              더보기 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {notices.length === 0 && <li className="py-8 text-center text-sm text-muted-foreground">등록된 공지사항이 없습니다.</li>}
            {notices.map((n) => (
              <li key={n.id}>
                <Link
                  to="/notices/$id"
                  params={{ id: n.id }}
                  className="group flex items-center justify-between gap-4 py-4 hover:bg-muted/60 sm:px-2"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    {n.is_pinned && <span className="shrink-0 rounded-sm bg-navy px-1.5 py-0.5 text-[11px] font-bold text-navy-foreground">공지</span>}
                    <span className="truncate font-medium text-foreground group-hover:text-navy">{n.title}</span>
                  </span>
                  <time className="shrink-0 font-mono text-xs text-muted-foreground" dateTime={n.created_at}>
                    {formatDate(n.created_at)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <aside className="relative overflow-hidden rounded-lg bg-navy-gradient p-7 text-navy-foreground md:p-8">
          <div className="absolute inset-0 strand-texture" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow text-steel-light">Customer Center</p>
            <p className="mt-2 text-2xl font-extrabold">견적 · 제품 상담</p>
            <a href={telHref(COMPANY.tel1)} className="mt-6 block font-mono text-3xl font-bold tracking-tight hover:underline">
              {COMPANY.tel1}
            </a>
            <a href={telHref(COMPANY.tel2)} className="mt-1 block font-mono text-xl font-semibold text-navy-muted hover:text-navy-foreground">
              {COMPANY.tel2}
            </a>
            <dl className="mt-6 space-y-1 text-sm text-navy-muted">
              <div className="flex gap-2"><dt className="w-12">FAX</dt><dd>{COMPANY.fax}</dd></div>
              <div className="flex gap-2"><dt className="w-12">E-mail</dt><dd><a className="hover:text-navy-foreground" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd></div>
            </dl>
            <Button asChild variant="hero" className="mt-7 w-full">
              <Link to="/inquiry">온라인 견적 문의 <ArrowRight /></Link>
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}
