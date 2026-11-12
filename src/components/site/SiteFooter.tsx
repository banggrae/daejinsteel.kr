import { Link } from "@tanstack/react-router";
import { COMPANY, NAV_ITEMS, telHref } from "@/lib/company";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep pb-24 text-navy-muted lg:pb-0">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.4fr_1fr] md:py-14">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            와이어로프, 스테인레스로프, 섬유로프, 벨트슬링 전문업체. {COMPANY.slogan}.
          </p>
          <dl className="mt-6 grid gap-1.5 text-sm">
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 text-navy-foreground/60">주소</dt>
              <dd>{COMPANY.address}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 text-navy-foreground/60">TEL</dt>
              <dd>
                <a href={telHref(COMPANY.tel1)} className="hover:text-navy-foreground">{COMPANY.tel1}</a>
                {" / "}
                <a href={telHref(COMPANY.tel2)} className="hover:text-navy-foreground">{COMPANY.tel2}</a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 text-navy-foreground/60">FAX</dt>
              <dd>{COMPANY.fax}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-14 shrink-0 text-navy-foreground/60">E-mail</dt>
              <dd>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-navy-foreground">{COMPANY.email}</a>
              </dd>
            </div>
          </dl>
        </div>
        <nav aria-label="하단 메뉴" className="grid grid-cols-2 content-start gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
          {NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-navy-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-navy-foreground/10">
        <div className="container-site py-5 text-xs text-navy-foreground/50">
          © {new Date().getFullYear()} {COMPANY.nameEn} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
