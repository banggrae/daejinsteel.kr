import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function PageHeader({ eyebrow, title, description, crumb }: { eyebrow: string; title: string; description?: string; crumb?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy-gradient text-navy-foreground">
      <div className="absolute inset-0 strand-texture" aria-hidden="true" />
      <div className="container-site relative py-12 md:py-16">
        <nav className="flex items-center gap-1 text-xs text-navy-muted" aria-label="현재 위치">
          <Link to="/" className="hover:text-navy-foreground">HOME</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-navy-foreground">{crumb ?? title}</span>
        </nav>
        <p className="eyebrow mt-6 text-signal">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-navy-muted md:text-base">{description}</p>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow text-signal">{eyebrow}</p>
      <h2 className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{description}</p>}
    </div>
  );
}
