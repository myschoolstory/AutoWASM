"use client";

import ResultsFilter from "@/components/ResultsFilter";
import ResultsGrid from "@/components/ResultsGrid";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { useBuildResults } from "@/services/buildService";

export default function ResultsPage() {
  const [filter, setFilter] = useState<"all" | "success" | "failed" | "progress">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Mocked build results and pagination
  const { results, totalPages } = useBuildResults({ filter, search, page });

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Build Results</h1>
          <p className="text-xl text-gray-600">
            Detailed reports and historical logs of your WASM builds
          </p>
        </div>
        <ResultsFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
        <ResultsGrid results={results} />
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </section>
  );
}
