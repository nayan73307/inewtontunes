import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PlaylistCard, ShortcutTile } from "@/components/playlist-card";
import { TrackList } from "@/components/track-list";
import { usePlayer } from "@/components/player-provider";
import { tracksQuery } from "@/lib/music-queries";
import { newReleasesQuery, playlists } from "@/lib/music-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resonate — Your daily mix of playlists and new releases" },
      {
        name: "description",
        content:
          "Play curated playlists, jump back into recent albums and discover new tracks on Resonate.",
      },
      { property: "og:title", content: "Resonate — Music for every hour" },
      {
        property: "og:description",
        content: "Curated playlists, recent albums and fresh tracks, ready to play.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { playQueue } = usePlayer();
  const featured = playlists[0]!;
  const featuredTracks = useQuery(tracksQuery(featured.query));
  const newReleases = useQuery(tracksQuery(newReleasesQuery, 12));

  return (
    <>
      <TopBar />
      <div className="px-6 pb-10">
        <section
          className="relative overflow-hidden rounded-xl p-6 sm:p-10"
          style={{ backgroundImage: `linear-gradient(120deg, ${featured.accent}, transparent)` }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
            <img
              src={featured.cover}
              alt={`${featured.name} cover art`}
              width={480}
              height={480}
              className="size-40 rounded-lg object-cover shadow-2xl sm:size-52"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
                Featured playlist
              </p>
              <h1 className="mt-2 text-4xl font-bold sm:text-6xl">{featured.name}</h1>
              <p className="mt-3 max-w-md text-sm text-foreground/80">
                {featured.description}
              </p>
              <button
                type="button"
                disabled={!featuredTracks.data?.length}
                onClick={() => playQueue(featuredTracks.data ?? [], 0)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60"
              >
                <Play className="size-4 fill-current" />
                {featuredTracks.isLoading ? "Loading" : "Play"}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">Jump back in</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {playlists.slice(0, 6).map((p) => (
              <ShortcutTile key={p.id} playlist={p} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Made for you</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {playlists.map((p) => (
              <PlaylistCard key={p.id} playlist={p} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">New releases</h2>
          {newReleases.isLoading ? (
            <p className="mt-3 text-sm text-muted-foreground">Loading songs…</p>
          ) : (
            <TrackList tracks={newReleases.data ?? []} />
          )}
        </section>
      </div>
    </>
  );
}
