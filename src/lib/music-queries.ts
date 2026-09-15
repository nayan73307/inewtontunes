import { queryOptions } from "@tanstack/react-query";
import { searchTracks } from "./itunes.functions";

export function tracksQuery(term: string, limit = 25) {
  return queryOptions({
    queryKey: ["itunes", term, limit],
    queryFn: () => searchTracks({ data: { term, limit } }),
    staleTime: 1000 * 60 * 10,
    enabled: term.trim().length > 0,
  });
}
