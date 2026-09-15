export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  src: string;
};

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
