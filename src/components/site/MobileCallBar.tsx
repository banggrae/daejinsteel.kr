import { Link } from "@tanstack/react-router";
import { Phone, FileText } from "lucide-react";
import { COMPANY, telHref } from "@/lib/company";

/** Fixed bottom bar on phones/tablets: one tap places a call or opens the quote form. */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-border bg-card shadow-lift lg:hidden">
      <a
        href={telHref(COMPANY.tel1)}
        className="flex h-16 items-center justify-center gap-2 bg-navy text-base font-bold text-navy-foreground"
      >
        <Phone className="h-5 w-5" /> 전화 상담
      </a>
      <Link
        to="/inquiry"
        className="flex h-16 items-center justify-center gap-2 text-base font-bold text-navy"
      >
        <FileText className="h-5 w-5" /> 견적 문의
      </Link>
    </div>
  );
}
