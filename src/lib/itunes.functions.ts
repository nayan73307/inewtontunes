import { createServerFn } from "@tanstack/react-start";
import type { Track } from "./track";

type ITunesResult = {
  trackId?: number;
  trackName?: string;
  artistName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  trackTimeMillis?: number;
  previewUrl?: string;
};

function toTrack(r: ITunesResult): Track | null {
  if (!r.trackId || !r.trackName || !r.previewUrl) return null;
  return {
    id: String(r.trackId),
    title: r.trackName,
    artist: r.artistName ?? "Unknown artist",
    album: r.collectionName ?? "Single",
    cover: (r.artworkUrl100 ?? "").replace("100x100bb", "600x600bb"),
    duration: r.trackTimeMillis ? Math.round(r.trackTimeMillis / 1000) : 30,
    src: r.previewUrl,
  };
}

export const searchTracks = createServerFn({ method: "GET" })
  .inputValidator((input: { term: string; limit?: number }) => ({
    term: String(input.term ?? "").slice(0, 120),
    limit: Math.min(Math.max(input.limit ?? 25, 1), 50),
  }))
  .handler(async ({ data }): Promise<Track[]> => {
    if (!data.term.trim()) return [];
    const url = new URL("https://itunes.apple.com/search");
    url.searchParams.set("term", data.term);
    url.searchParams.set("media", "music");
    url.searchParams.set("entity", "song");
    url.searchParams.set("limit", String(data.limit));

    const res = await fetch(url.toString());
    if (!res.ok) return [];
    const json = (await res.json()) as { results?: ITunesResult[] };
    return (json.results ?? [])
      .map(toTrack)
      .filter((t): t is Track => Boolean(t));
  });
