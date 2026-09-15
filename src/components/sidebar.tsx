import { Link } from "@tanstack/react-router";
import { Home, Search, Library, Plus, AudioLines } from "lucide-react";
import { playlists } from "@/lib/music-data";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/library", label: "Your Library", icon: Library },
] as const;

export function Sidebar() {
  return (
    <aside className="hidden w-[264px] shrink-0 flex-col gap-2 p-2 md:flex">
      <div className="panel p-4">
        <Link to="/" className="flex items-center gap-2">
          <AudioLines className="size-6 text-primary" />
          <span className="font-display text-lg font-bold tracking-tight">Resonate</span>
        </Link>
        <nav className="mt-5 flex flex-col gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="panel flex min-h-0 flex-1 flex-col p-2">
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-sm font-semibold text-muted-foreground">Playlists</span>
          <button
            type="button"
            className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Create playlist"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <div className="scroll-slim min-h-0 flex-1 overflow-y-auto">
          {playlists.map((p) => (
            <Link
              key={p.id}
              to="/playlist/$playlistId"
              params={{ playlistId: p.id }}
              className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted"
              activeProps={{ className: "bg-muted" }}
            >
              <img
                src={p.cover}
                alt=""
                loading="lazy"
                width={96}
                height={96}
                className="size-12 rounded-md object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{p.name}</span>
                <span className="block truncate text-xs text-muted-foreground">
                  Playlist · {p.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
