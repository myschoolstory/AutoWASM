"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faKey, faExclamationCircle, faRocket, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface RepositorySubmissionFormProps {
  onStartBuild: () => void;
}

function validateRepositoryUrl(url: string) {
  const githubUrlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+\/?$/;
  return githubUrlPattern.test(url);
}

export default function RepositorySubmissionForm({ onStartBuild }: RepositorySubmissionFormProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [oauthToken, setOauthToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateRepositoryUrl(repoUrl)) {
      setError("Please enter a valid GitHub repository URL (e.g., https://github.com/username/repository)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/submit-repository", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl, oauthToken })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "An error occurred while validating the repository.");
      } else {
        onStartBuild();
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Repository URL Input */}
        <div>
          <label htmlFor="repo-url" className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Repository URL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faGithub} className="text-gray-400" />
            </div>
            <input
              type="url"
              id="repo-url"
              name="repo-url"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="https://github.com/username/repository"
              required
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Enter the full URL of your GitHub repository</p>
        </div>
        {/* OAuth Token Input */}
        <div>
          <label htmlFor="oauth-token" className="block text-sm font-medium text-gray-700 mb-2">
            OAuth Token (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faKey} className="text-gray-400" />
            </div>
            <input
              type="password"
              id="oauth-token"
              name="oauth-token"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={oauthToken}
              onChange={(e) => setOauthToken(e.target.value)}
              disabled={loading}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">Required only for private repositories</p>
        </div>
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-slide-up">
            <div className="flex">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faExclamationCircle} className="text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}
        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            disabled={loading}
          >
            <span>{loading ? "Processing..." : "Start Build Process"}</span>
            <span className="ml-2">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <FontAwesomeIcon icon={faRocket} />
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
