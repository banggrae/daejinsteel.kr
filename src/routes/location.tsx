import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Printer, Mail, Navigation } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { COMPANY, telHref } from "@/lib/company";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "오시는길 | (주)대진스틸" },
      { name: "description", content: `(주)대진스틸 오시는길 — ${COMPANY.address}. TEL ${COMPANY.tel1}` },
      { property: "og:title", content: "오시는길 | (주)대진스틸" },
      { property: "og:description", content: `${COMPANY.address} · TEL ${COMPANY.tel1}` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LocationPage,
});

function LocationPage() {
  const q = encodeURIComponent(COMPANY.addressShort);
  return (
    <>
      <PageHeader eyebrow="Location" title="오시는길" description="방문 전 전화 주시면 더욱 빠르게 안내해 드립니다." />
      <section className="py-12 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-border bg-muted shadow-card">
            <iframe
              title="(주)대진스틸 위치 지도"
              src={`https://maps.google.com/maps?q=${q}&hl=ko&z=16&output=embed`}
              className="h-[360px] w-full md:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="space-y-5">
            <div className="rounded-lg border border-border bg-card p-6 shadow-card">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-navy" /><div><p className="font-semibold text-navy">주소</p><p className="mt-0.5 text-foreground/85">{COMPANY.address}</p></div></li>
                <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-navy" /><div><p className="font-semibold text-navy">전화</p><p className="mt-0.5"><a href={telHref(COMPANY.tel1)} className="hover:underline">{COMPANY.tel1}</a> / <a href={telHref(COMPANY.tel2)} className="hover:underline">{COMPANY.tel2}</a></p></div></li>
                <li className="flex gap-3"><Printer className="mt-0.5 h-5 w-5 shrink-0 text-navy" /><div><p className="font-semibold text-navy">팩스</p><p className="mt-0.5">{COMPANY.fax}</p></div></li>
                <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-navy" /><div><p className="font-semibold text-navy">이메일</p><p className="mt-0.5"><a href={`mailto:${COMPANY.email}`} className="hover:underline">{COMPANY.email}</a></p></div></li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" size="lg"><a href={`https://map.naver.com/p/search/${q}`} target="_blank" rel="noopener noreferrer"><Navigation /> 네이버 지도</a></Button>
              <Button asChild variant="outline" size="lg"><a href={`https://map.kakao.com/?q=${q}`} target="_blank" rel="noopener noreferrer"><Navigation /> 카카오맵</a></Button>
            </div>
            <Button asChild size="xl" className="w-full"><a href={telHref(COMPANY.tel1)}><Phone /> 전화로 길 안내 받기</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}
