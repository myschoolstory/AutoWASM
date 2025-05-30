"use client";

import { useState, useEffect } from "react";

export type BuildResultStatus = "success" | "failed" | "progress";
export interface BuildResult {
  id: string;
  repo: string;
  status: BuildResultStatus;
  wasmResult?: { output?: string };
  staticResult?: { qualityScore?: string, codeMetrics?: object };
  builtAgo?: string;
}

// Updated hook to fetch live build results from the new API endpoint
export function useBuildResults({ filter, search, page }: { filter: "all" | "success" | "failed" | "progress"; search: string; page: number; }) {
  const [results, setResults] = useState<BuildResult[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch("/api/build-results");
        if (res.ok) {
          const data = await res.json();
          let fetchedResults = data.results || [];
          if (filter !== "all") {
            fetchedResults = fetchedResults.filter((r: BuildResult) => r.status === filter);
          }
          if (search) {
            fetchedResults = fetchedResults.filter((r: BuildResult) => r.repo.toLowerCase().includes(search.toLowerCase()));
          }
          setResults(fetchedResults);
          setTotalPages(1); // For simulation, using 1 page
        } else {
          console.error('Error fetching build results:', res.statusText);
        }
      } catch (error) {
        console.error("Error fetching build results", error);
      }
    }
    fetchResults();
  }, [filter, search, page]);

  return { results, totalPages };
}
