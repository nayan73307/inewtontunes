import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { TrackList } from "@/components/track-list";
import { playlists, tracks } from "@/lib/music-data";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search music — Resonate" },
      {
        name: "description",
        content: "Search songs, artists, albums and playlists across the Resonate catalogue.",
      },
      { property: "og:title", content: "Search music — Resonate" },
      {
        property: "og:description",
        content: "Find any song, artist, album or playlist in seconds.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return tracks.filter((t) =>
      [t.title, t.artist, t.album].some((f) => f.toLowerCase().includes(q)),
    );
  }, [q]);

  const matchedPlaylists = useMemo(() => {
    if (!q) return [];
    return playlists.filter((p) => p.name.toLowerCase().includes(q));
  }, [q]);

  return (
    <>
      <TopBar>
        <label className="flex max-w-md items-center gap-2 rounded-full bg-surface px-4 py-2">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            aria-label="Search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
      </TopBar>

      <div className="px-6 pb-10">
        <h1 className="text-2xl font-bold">{q ? "Results" : "Browse all"}</h1>

        {!q && (
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {playlists.map((p) => (
              <Link
                key={p.id}
                to="/playlist/$playlistId"
                params={{ playlistId: p.id }}
                className="hover-lift relative h-32 overflow-hidden rounded-xl p-4"
                style={{ backgroundImage: `linear-gradient(140deg, ${p.accent}, transparent)` }}
              >
                <span className="text-lg font-bold">{p.name}</span>
                <img
                  src={p.cover}
                  alt=""
                  loading="lazy"
                  width={160}
                  height={160}
                  className="absolute -bottom-3 -right-3 size-20 rotate-12 rounded-md object-cover shadow-lg"
                />
              </Link>
            ))}
          </div>
        )}

        {q && (
          <>
            {matchedPlaylists.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {matchedPlaylists.map((p) => (
                  <Link
                    key={p.id}
                    to="/playlist/$playlistId"
                    params={{ playlistId: p.id }}
                    className="rounded-full bg-elevated px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
            {results.length > 0 ? (
              <TrackList tracks={results} />
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">
                No songs match “{query}”. Try another artist or album.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
}
