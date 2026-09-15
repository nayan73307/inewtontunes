import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, Play, Shuffle } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { TrackList } from "@/components/track-list";
import { usePlayer } from "@/components/player-provider";
import { tracksQuery } from "@/lib/music-queries";
import { formatTime, getPlaylist } from "@/lib/music-data";

export const Route = createFileRoute("/playlist/$playlistId")({
  loader: ({ params }) => {
    const playlist = getPlaylist(params.playlistId);
    if (!playlist) throw notFound();
    return { playlist };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Playlist unavailable — Resonate" }, { name: "robots", content: "noindex" }],
      };
    }
    const { playlist } = loaderData;
    return {
      meta: [
        { title: `${playlist.name} — Playlist on Resonate` },
        { name: "description", content: playlist.description },
        { property: "og:title", content: `${playlist.name} — Playlist on Resonate` },
        { property: "og:description", content: playlist.description },
      ],
    };
  },
  component: PlaylistPage,
});

function PlaylistPage() {
  const { playlist } = Route.useLoaderData();
  const { playQueue, toggleShuffle } = usePlayer();
  const { data, isLoading } = useQuery(tracksQuery(playlist.query, 30));
  const list = data ?? [];
  const total = list.reduce((sum, t) => sum + t.duration, 0);

  return (
    <>
      <TopBar />
      <div
        className="px-6 pb-8 pt-2"
        style={{ backgroundImage: `linear-gradient(180deg, ${playlist.accent}, transparent)` }}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
          <img
            src={playlist.cover}
            alt={`${playlist.name} cover art`}
            width={480}
            height={480}
            className="size-44 rounded-lg object-cover shadow-2xl sm:size-56"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/70">
              Playlist
            </p>
            <h1 className="mt-2 text-4xl font-bold sm:text-6xl">{playlist.name}</h1>
            <p className="mt-3 text-sm text-foreground/80">{playlist.description}</p>
            <p className="mt-2 flex items-center gap-2 text-xs text-foreground/70">
              <Clock className="size-3.5" />
              {isLoading ? "Loading songs…" : `${list.length} songs · ${formatTime(total)}`}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10">
        <div className="flex items-center gap-4 py-4">
          <button
            type="button"
            disabled={!list.length}
            onClick={() => playQueue(list, 0)}
            className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60"
            aria-label={`Play ${playlist.name}`}
          >
            <Play className="size-6 fill-current" />
          </button>
          <button
            type="button"
            onClick={toggleShuffle}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle shuffle"
          >
            <Shuffle className="size-6" />
          </button>
        </div>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading songs…</p>
        ) : (
          <TrackList tracks={list} />
        )}
      </div>
    </>
  );
}
