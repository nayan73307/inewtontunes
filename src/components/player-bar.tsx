import {
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { usePlayer } from "@/components/player-provider";
import { formatTime } from "@/lib/music-data";

export function PlayerBar() {
  const {
    current,
    isPlaying,
    progress,
    duration,
    volume,
    shuffle,
    liked,
    toggle,
    next,
    previous,
    seek,
    setVolume,
    toggleShuffle,
    toggleLike,
  } = usePlayer();

  const total = duration || current?.duration || 0;
  const isLiked = current ? liked.includes(current.id) : false;

  return (
    <footer className="flex h-[86px] items-center gap-4 border-t border-border bg-surface px-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {current ? (
          <>
            <img
              src={current.cover}
              alt=""
              width={112}
              height={112}
              className="size-14 rounded-md object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{current.title}</p>
              <p className="truncate text-xs text-muted-foreground">{current.artist}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleLike(current)}
              aria-label={isLiked ? "Remove from liked songs" : "Add to liked songs"}
              className="ml-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Heart className={isLiked ? "size-4 fill-primary text-primary" : "size-4"} />
            </button>
          </>
        ) : (
          <p className="text-xs text-muted-foreground">Pick a song to start listening</p>
        )}
      </div>

      <div className="flex w-full max-w-[540px] flex-col items-center gap-2">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={toggleShuffle}
            aria-label="Shuffle"
            aria-pressed={shuffle}
            className={
              shuffle
                ? "text-primary"
                : "text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            <Shuffle className="size-4" />
          </button>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous track"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <SkipBack className="size-5" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next track"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <SkipForward className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Repeat"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Repeat className="size-4" />
          </button>
        </div>
        <div className="flex w-full items-center gap-2">
          <span className="w-9 text-right text-[11px] tabular-nums text-muted-foreground">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={total || 1}
            step={1}
            value={Math.min(progress, total || 1)}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label="Seek"
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="w-9 text-[11px] tabular-nums text-muted-foreground">
            {formatTime(total)}
          </span>
        </div>
      </div>

      <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
        <Volume2 className="size-4 text-muted-foreground" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          className="h-1 w-28 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        />
      </div>
    </footer>
  );
}
