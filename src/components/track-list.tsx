import { Heart, Play, AudioLines } from "lucide-react";
import { usePlayer } from "@/components/player-provider";
import { formatTime, type Track } from "@/lib/music-data";

export function TrackList({ tracks }: { tracks: Track[] }) {
  const { playQueue, current, isPlaying, liked, toggleLike } = usePlayer();

  return (
    <ol className="mt-2">
      <li className="grid grid-cols-[28px_1fr_auto_60px] items-center gap-4 border-b border-border px-3 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
        <span>#</span>
        <span>Title</span>
        <span className="hidden sm:block">Album</span>
        <span className="text-right">Time</span>
      </li>
      {tracks.map((track, i) => {
        const active = current?.id === track.id;
        return (
          <li key={`${track.id}-${i}`}>
            <button
              type="button"
              onDoubleClick={() => playQueue(tracks, i)}
              onClick={() => playQueue(tracks, i)}
              className="group grid w-full grid-cols-[28px_1fr_auto_60px] items-center gap-4 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted"
            >
              <span className="text-sm text-muted-foreground">
                {active && isPlaying ? (
                  <AudioLines className="size-4 text-primary" />
                ) : (
                  <>
                    <span className="group-hover:hidden">{i + 1}</span>
                    <Play className="hidden size-3.5 fill-current group-hover:block" />
                  </>
                )}
              </span>
              <span className="flex min-w-0 items-center gap-3">
                <img
                  src={track.cover}
                  alt=""
                  loading="lazy"
                  width={80}
                  height={80}
                  className="size-10 rounded object-cover"
                />
                <span className="min-w-0">
                  <span
                    className={
                      active
                        ? "block truncate text-sm font-semibold text-primary"
                        : "block truncate text-sm font-semibold"
                    }
                  >
                    {track.title}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {track.artist}
                  </span>
                </span>
              </span>
              <span className="hidden truncate text-sm text-muted-foreground sm:block">
                {track.album}
              </span>
              <span className="flex items-center justify-end gap-3">
                <Heart
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(track.id);
                  }}
                  className={
                    liked.includes(track.id)
                      ? "size-4 fill-primary text-primary"
                      : "size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  }
                />
                <span className="text-sm tabular-nums text-muted-foreground">
                  {formatTime(track.duration)}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
