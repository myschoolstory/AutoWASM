"use client";

import ResultCard from "./ResultCard";
import { BuildResult } from "@/services/buildService";

interface ResultsGridProps {
  results: BuildResult[];
}

export default function ResultsGrid({ results }: ResultsGridProps) {
  // Placeholder for empty state, replace with real content or illustration if needed
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No build results found.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}
