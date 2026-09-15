import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { TopBar } from "@/components/top-bar";
import { PlaylistCard } from "@/components/playlist-card";
import { TrackList } from "@/components/track-list";
import { usePlayer } from "@/components/player-provider";
import { playlists } from "@/lib/music-data";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Your library — Resonate" },
      {
        name: "description",
        content: "Your saved playlists and liked songs, all in one place on Resonate.",
      },
      { property: "og:title", content: "Your library — Resonate" },
      {
        property: "og:description",
        content: "Saved playlists and liked songs, ready when you are.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const { likedTracks } = usePlayer();

  return (
    <>
      <TopBar />
      <div className="px-6 pb-10">
        <h1 className="text-2xl font-bold">Your Library</h1>

        <section className="mt-6">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <Heart className="size-4 fill-primary text-primary" />
            Liked Songs
          </h2>
          {likedTracks.length ? (
            <TrackList tracks={likedTracks} />
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Tap the heart on any song and it shows up here.
            </p>
          )}
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold">Saved playlists</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {playlists.map((p) => (
              <PlaylistCard key={p.id} playlist={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
