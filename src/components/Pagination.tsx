"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
  // Even if totalPages is less than or equal to 1, render a pagination control for demonstration
  const pages = [];
  const maxPages = totalPages > 0 ? totalPages : 1;
  for (let i = 1; i <= maxPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-2">
        <button
          className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            className={`px-3 py-2 ${
              p === page
                ? "bg-blue-600 text-white rounded"
                : "text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
        <button
          className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
          disabled={page === maxPages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </nav>
    </div>
  );
}
