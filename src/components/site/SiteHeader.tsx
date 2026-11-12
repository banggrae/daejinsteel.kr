import { Link } from "@tanstack/react-router";
import { Menu, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { COMPANY, NAV_ITEMS, telHref } from "@/lib/company";
import { Logo } from "./Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="hidden bg-navy-deep text-navy-muted md:block">
        <div className="container-site flex h-9 items-center justify-between text-xs">
          <span>{COMPANY.slogan}</span>
          <div className="flex items-center gap-5">
            <a href={telHref(COMPANY.tel1)} className="flex items-center gap-1.5 hover:text-navy-foreground">
              <Phone className="h-3.5 w-3.5" /> {COMPANY.tel1}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1.5 hover:text-navy-foreground">
              <Mail className="h-3.5 w-3.5" /> {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="주 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative px-4 py-2 text-[15px] font-semibold text-foreground/80 transition-colors hover:text-navy data-[status=active]:text-navy after:absolute after:inset-x-4 after:-bottom-[22px] after:h-[3px] after:scale-x-0 after:bg-navy after:transition-transform data-[status=active]:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild>
            <Link to="/inquiry">견적 문의</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button asChild variant="ghost" size="icon" aria-label={`전화 걸기 ${COMPANY.tel1}`}>
            <a href={telHref(COMPANY.tel1)}>
              <Phone className="!size-5 text-navy" />
            </a>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="메뉴 열기">
                <Menu className="!size-6 text-navy" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[82vw] max-w-sm bg-card p-0">
              <SheetHeader className="border-b border-border p-5 text-left">
                <SheetTitle className="text-navy">전체 메뉴</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-2" aria-label="모바일 메뉴">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    activeOptions={{ exact: item.to === "/" }}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-3.5 text-base font-semibold text-foreground hover:bg-muted data-[status=active]:bg-accent data-[status=active]:text-navy"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mx-5 mt-4 space-y-2 rounded-md bg-muted p-4 text-sm">
                <a href={telHref(COMPANY.tel1)} className="flex items-center gap-2 font-semibold text-navy">
                  <Phone className="h-4 w-4" /> {COMPANY.tel1}
                </a>
                <a href={telHref(COMPANY.tel2)} className="flex items-center gap-2 font-semibold text-navy">
                  <Phone className="h-4 w-4" /> {COMPANY.tel2}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {COMPANY.email}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
