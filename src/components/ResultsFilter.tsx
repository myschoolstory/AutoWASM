"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

interface ResultsFilterProps {
  filter: "all" | "success" | "failed" | "progress";
  setFilter: (f: "all" | "success" | "failed" | "progress") => void;
  search: string;
  setSearch: (s: string) => void;
}

export default function ResultsFilter({
  filter,
  setFilter,
  search,
  setSearch,
}: ResultsFilterProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "success" | "failed" | "progress")
            }
          >
            <option value="all">All Results</option>
            <option value="success">Successful Builds</option>
            <option value="failed">Failed Builds</option>
            <option value="progress">In Progress</option>
          </select>
          <input
            type="text"
            placeholder="Search repositories..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => router.push("/submit")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          New Build
        </button>
      </div>
    </div>
  );
}
