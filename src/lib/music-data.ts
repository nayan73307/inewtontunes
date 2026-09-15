import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";
import cover5 from "@/assets/cover-5.jpg";
import cover6 from "@/assets/cover-6.jpg";

export type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  src: string;
};

export type Playlist = {
  id: string;
  name: string;
  description: string;
  cover: string;
  accent: string;
  trackIds: string[];
};

const audio = (n: number) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${n}.mp3`;

export const tracks: Track[] = [
  {
    id: "t1",
    title: "Neon Undertow",
    artist: "Halcyon Drift",
    album: "Undertow",
    cover: cover1,
    duration: 214,
    src: audio(1),
  },
  {
    id: "t2",
    title: "Golden Hour Confession",
    artist: "Mara Vey",
    album: "Backlight",
    cover: cover2,
    duration: 187,
    src: audio(2),
  },
  {
    id: "t3",
    title: "Cassette Rain",
    artist: "Bedroom Static",
    album: "Night Tapes",
    cover: cover3,
    duration: 243,
    src: audio(3),
  },
  {
    id: "t4",
    title: "Concrete Pulse",
    artist: "KLTR",
    album: "Lime Structures",
    cover: cover4,
    duration: 301,
    src: audio(4),
  },
  {
    id: "t5",
    title: "Sage Morning",
    artist: "Ilse Renner",
    album: "Slow Fog",
    cover: cover5,
    duration: 268,
    src: audio(5),
  },
  {
    id: "t6",
    title: "Chrome Sunset",
    artist: "Vector 84",
    album: "Grid Runner",
    cover: cover6,
    duration: 226,
    src: audio(6),
  },
  {
    id: "t7",
    title: "Low Tide Signal",
    artist: "Halcyon Drift",
    album: "Undertow",
    cover: cover1,
    duration: 198,
    src: audio(7),
  },
  {
    id: "t8",
    title: "Paper Lanterns",
    artist: "Mara Vey",
    album: "Backlight",
    cover: cover2,
    duration: 175,
    src: audio(8),
  },
  {
    id: "t9",
    title: "Velvet Interference",
    artist: "Bedroom Static",
    album: "Night Tapes",
    cover: cover3,
    duration: 232,
    src: audio(9),
  },
  {
    id: "t10",
    title: "Afterglow Machine",
    artist: "Vector 84",
    album: "Grid Runner",
    cover: cover6,
    duration: 254,
    src: audio(10),
  },
];

export const playlists: Playlist[] = [
  {
    id: "midnight-current",
    name: "Midnight Current",
    description: "Deep electronic drift for the small hours.",
    cover: cover1,
    accent: "oklch(0.45 0.15 250)",
    trackIds: ["t1", "t7", "t4", "t10", "t6"],
  },
  {
    id: "backlight",
    name: "Backlight Ballads",
    description: "Voices, warmth and a single spotlight.",
    cover: cover2,
    accent: "oklch(0.5 0.17 40)",
    trackIds: ["t2", "t8", "t5", "t3"],
  },
  {
    id: "night-tapes",
    name: "Night Tapes",
    description: "Lo-fi loops recorded after everyone left.",
    cover: cover3,
    accent: "oklch(0.42 0.13 300)",
    trackIds: ["t3", "t9", "t1", "t5", "t2"],
  },
  {
    id: "lime-structures",
    name: "Lime Structures",
    description: "Hard edges, harder kicks.",
    cover: cover4,
    accent: "oklch(0.55 0.19 130)",
    trackIds: ["t4", "t6", "t10", "t1"],
  },
  {
    id: "slow-fog",
    name: "Slow Fog",
    description: "Ambient folk for grey mornings.",
    cover: cover5,
    accent: "oklch(0.48 0.06 150)",
    trackIds: ["t5", "t3", "t2", "t7"],
  },
  {
    id: "grid-runner",
    name: "Grid Runner",
    description: "Synth arpeggios at full speed.",
    cover: cover6,
    accent: "oklch(0.45 0.2 330)",
    trackIds: ["t6", "t10", "t4", "t9"],
  },
];

export function getTrack(id: string) {
  return tracks.find((t) => t.id === id);
}

export function getPlaylist(id: string) {
  return playlists.find((p) => p.id === id);
}

export function playlistTracks(playlist: Playlist): Track[] {
  return playlist.trackIds
    .map((id) => getTrack(id))
    .filter((t): t is Track => Boolean(t));
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
