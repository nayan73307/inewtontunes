import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { usePlayer } from "@/components/player-provider";
import { playlistTracks, type Playlist } from "@/lib/music-data";

export function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const { playQueue } = usePlayer();

  return (
    <div className="group hover-lift relative rounded-xl bg-card p-3 hover:bg-elevated">
      <Link
        to="/playlist/$playlistId"
        params={{ playlistId: playlist.id }}
        className="block"
      >
        <img
          src={playlist.cover}
          alt={`${playlist.name} cover art`}
          loading="lazy"
          width={400}
          height={400}
          className="aspect-square w-full rounded-lg object-cover"
        />
        <h3 className="mt-3 truncate text-sm font-semibold">{playlist.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {playlist.description}
        </p>
      </Link>
      <button
        type="button"
        onClick={() => playQueue(playlistTracks(playlist), 0)}
        aria-label={`Play ${playlist.name}`}
        className="absolute right-5 top-[52%] flex size-11 translate-y-3 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <Play className="size-5 fill-current" />
      </button>
    </div>
  );
}

export function ShortcutTile({ playlist }: { playlist: Playlist }) {
  const { playQueue } = usePlayer();
  return (
    <div className="group flex items-center gap-3 overflow-hidden rounded-md bg-elevated transition-colors hover:bg-muted">
      <Link
        to="/playlist/$playlistId"
        params={{ playlistId: playlist.id }}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <img
          src={playlist.cover}
          alt=""
          loading="lazy"
          width={160}
          height={160}
          className="size-16 object-cover"
        />
        <span className="truncate text-sm font-semibold">{playlist.name}</span>
      </Link>
      <button
        type="button"
        onClick={() => playQueue(playlistTracks(playlist), 0)}
        aria-label={`Play ${playlist.name}`}
        className="mr-3 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Play className="size-4 fill-current" />
      </button>
    </div>
  );
}
