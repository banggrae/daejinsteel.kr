import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, Handshake, PackageCheck } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { HANDLED_ITEMS } from "@/lib/products";
import { COMPANY, telHref } from "@/lib/company";
import warehouseImg from "@/assets/about-warehouse.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "회사소개 | (주)대진스틸" },
      { name: "description", content: "(주)대진스틸은 인천 동구에 위치한 와이어로프, 스테인레스로프, 섬유로프, 벨트슬링, 체인 및 부속 전문업체입니다." },
      { property: "og:title", content: "회사소개 | (주)대진스틸" },
      { property: "og:description", content: "와이어로프·섬유로프·벨트슬링·체인 및 부속 전문업체 (주)대진스틸을 소개합니다." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Award, title: "최고의 제품", text: "용도와 사용 하중에 맞는 신뢰할 수 있는 제품을 엄선해 공급합니다." },
  { icon: Handshake, title: "최상의 서비스", text: "고객 현장의 조건을 먼저 듣고, 꼭 맞는 제품과 가공 방법을 제안합니다." },
  { icon: PackageCheck, title: "다양한 재고", text: "로프, 슬링, 체인과 각종 부속까지 한 곳에서 구매하실 수 있습니다." },
];

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Company" title="회사소개" description="와이어로프, 스테인레스로프, 섬유로프, 벨트슬링 전문업체 (주)대진스틸입니다." />

      <section className="py-16 md:py-24">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Greeting" title="최고의 제품과 최상의 서비스로 모시겠습니다" />
            <div className="mt-6 space-y-4 leading-relaxed text-foreground/85">
              <p>
                (주)대진스틸 홈페이지를 찾아주신 고객 여러분께 감사드립니다.
              </p>
              <p>
                저희 대진스틸은 인천에서 와이어로프, 스테인레스로프, 섬유로프, 벨트슬링을 비롯해 샤클, 턴버클, 체인, 안전망, 하역도구 등 산업 현장에 필요한 자재를 전문으로 취급하고 있습니다.
              </p>
              <p>
                단순한 제품 판매를 넘어 로프 절단과 압착·아이 가공 등 고객 현장에 꼭 맞는 맞춤 가공 서비스를 제공하며, 언제나 정직하고 신속한 대응으로 고객의 신뢰에 보답하겠습니다.
              </p>
              <p className="pt-2 font-bold text-navy">(주)대진스틸 임직원 일동</p>
            </div>
          </div>
          <img
            src={warehouseImg}
            alt="와이어로프 릴과 체인, 슬링이 정리된 자재 창고"
            width={1600}
            height={912}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-lift"
          />
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Our Values" title="대진스틸이 약속드립니다" align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-lg bg-card p-7 shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-md bg-navy text-navy-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-5 text-lg font-bold text-navy">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Business Area" title="취급 품목" />
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {HANDLED_ITEMS.map((item, i) => (
              <li key={item} className="flex items-center gap-3 rounded-md border border-border bg-card px-4 py-4">
                <span className="font-mono text-xs font-bold text-signal">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <caption className="sr-only">회사 개요</caption>
              <tbody className="divide-y divide-border">
                {[
                  ["회사명", `${COMPANY.name} (${COMPANY.nameEn})`],
                  ["주요 품목", "와이어로프, 스테인레스로프, 섬유로프, 벨트슬링, 체인 및 각종 부속"],
                  ["주소", COMPANY.address],
                  ["전화", `${COMPANY.tel1} / ${COMPANY.tel2}`],
                  ["팩스", COMPANY.fax],
                  ["이메일", COMPANY.email],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row" className="w-28 bg-muted px-4 py-3.5 text-left font-semibold text-navy md:w-40 md:px-6">{k}</th>
                    <td className="px-4 py-3.5 text-foreground/85 md:px-6">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/products">제품 보기 <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline"><a href={telHref(COMPANY.tel1)}>전화 상담 {COMPANY.tel1}</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
