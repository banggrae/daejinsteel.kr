import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("group flex items-center gap-2.5", className)} aria-label="(주)대진스틸 홈">
      <span
        className={cn(
          "grid h-9 w-9 place-items-center rounded-sm font-display text-sm font-black tracking-tight",
          inverted ? "bg-navy-foreground text-navy-deep" : "bg-navy text-navy-foreground",
        )}
        aria-hidden="true"
      >
        DJ
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-lg font-extrabold tracking-tight", inverted ? "text-navy-foreground" : "text-navy")}>
          (주)대진스틸
        </span>
        <span className={cn("mt-1 text-[10px] font-semibold tracking-[0.22em]", inverted ? "text-navy-muted" : "text-steel")}>
          DAEJIN STEEL
        </span>
      </span>
    </Link>
  );
}
