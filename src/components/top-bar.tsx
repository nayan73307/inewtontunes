import { useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function TopBar({ children }: { children?: ReactNode }) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/80 px-6 py-4 backdrop-blur">
      <button
        type="button"
        onClick={() => router.history.back()}
        aria-label="Go back"
        className="flex size-8 items-center justify-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => router.history.forward()}
        aria-label="Go forward"
        className="flex size-8 items-center justify-center rounded-full bg-surface text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronRight className="size-5" />
      </button>
      <div className="flex-1">{children}</div>
      <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
        Demo account
      </span>
    </div>
  );
}
