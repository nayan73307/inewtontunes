import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";
import cover5 from "@/assets/cover-5.jpg";
import cover6 from "@/assets/cover-6.jpg";

export type { Track } from "./track";
export { formatTime } from "./track";

export type Playlist = {
  id: string;
  name: string;
  description: string;
  cover: string;
  accent: string;
  /** iTunes search term used to load this playlist's songs. */
  query: string;
};

export const playlists: Playlist[] = [
  {
    id: "midnight-current",
    name: "Midnight Current",
    description: "Deep electronic drift for the small hours.",
    cover: cover1,
    accent: "oklch(0.45 0.15 250)",
    query: "deep house electronic",
  },
  {
    id: "backlight",
    name: "Backlight Ballads",
    description: "Voices, warmth and a single spotlight.",
    cover: cover2,
    accent: "oklch(0.5 0.17 40)",
    query: "acoustic ballad",
  },
  {
    id: "night-tapes",
    name: "Night Tapes",
    description: "Lo-fi loops recorded after everyone left.",
    cover: cover3,
    accent: "oklch(0.42 0.13 300)",
    query: "lofi hip hop",
  },
  {
    id: "lime-structures",
    name: "Lime Structures",
    description: "Hard edges, harder kicks.",
    cover: cover4,
    accent: "oklch(0.55 0.19 130)",
    query: "techno",
  },
  {
    id: "slow-fog",
    name: "Slow Fog",
    description: "Ambient folk for grey mornings.",
    cover: cover5,
    accent: "oklch(0.48 0.06 150)",
    query: "ambient folk",
  },
  {
    id: "grid-runner",
    name: "Grid Runner",
    description: "Synth arpeggios at full speed.",
    cover: cover6,
    accent: "oklch(0.45 0.2 330)",
    query: "synthwave",
  },
];

export const newReleasesQuery = "top hits 2026";

export function getPlaylist(id: string) {
  return playlists.find((p) => p.id === id);
}
