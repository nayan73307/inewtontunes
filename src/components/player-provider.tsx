import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Track } from "@/lib/track";

type PlayerState = {
  queue: Track[];
  current: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  shuffle: boolean;
  liked: string[];
  likedTracks: Track[];
  playQueue: (tracks: Track[], startIndex?: number) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  seek: (seconds: number) => void;
  setVolume: (value: number) => void;
  toggleShuffle: () => void;
  toggleLike: (track: Track) => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [shuffle, setShuffle] = useState(false);
  const [likedTracks, setLikedTracks] = useState<Track[]>([]);
  const liked = useMemo(() => likedTracks.map((t) => t.id), [likedTracks]);

  const current = queue[index] ?? null;

  useEffect(() => {
    const el = new Audio();
    el.preload = "metadata";
    audioRef.current = el;
    return () => {
      el.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => setProgress(el.currentTime);
    const onMeta = () => setDuration(el.duration || 0);
    const onEnd = () => setIndex((i) => (queue.length ? (i + 1) % queue.length : 0));
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [queue.length]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    if (el.src !== current.src) {
      el.src = current.src;
      setProgress(0);
      setDuration(current.duration);
    }
    void el.play().catch(() => setIsPlaying(false));
  }, [current]);

  const playQueue = useCallback((list: Track[], startIndex = 0) => {
    setQueue(list);
    setIndex(startIndex);
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    if (el.paused) void el.play().catch(() => setIsPlaying(false));
    else el.pause();
  }, [current]);

  const next = useCallback(() => {
    setIndex((i) => {
      if (!queue.length) return 0;
      if (shuffle) return Math.floor(Math.random() * queue.length);
      return (i + 1) % queue.length;
    });
  }, [queue.length, shuffle]);

  const previous = useCallback(() => {
    const el = audioRef.current;
    if (el && el.currentTime > 4) {
      el.currentTime = 0;
      return;
    }
    setIndex((i) => (queue.length ? (i - 1 + queue.length) % queue.length : 0));
  }, [queue.length]);

  const seek = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = seconds;
    setProgress(seconds);
  }, []);

  const toggleLike = useCallback((track: Track) => {
    setLikedTracks((prev) =>
      prev.some((t) => t.id === track.id)
        ? prev.filter((t) => t.id !== track.id)
        : [...prev, track],
    );
  }, []);

  const value = useMemo<PlayerState>(
    () => ({
      queue,
      current,
      isPlaying,
      progress,
      duration,
      volume,
      shuffle,
      liked,
      playQueue,
      toggle,
      next,
      previous,
      seek,
      setVolume: setVolumeState,
      toggleShuffle: () => setShuffle((s) => !s),
      toggleLike,
    }),
    [
      queue,
      current,
      isPlaying,
      progress,
      duration,
      volume,
      shuffle,
      liked,
      playQueue,
      toggle,
      next,
      previous,
      seek,
      toggleLike,
    ],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
