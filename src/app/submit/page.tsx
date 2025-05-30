"use client";

import RepositorySubmissionForm from "@/components/RepositorySubmissionForm";
import { useState } from "react";
import BuildStatus from "@/components/BuildStatus";

export default function SubmitPage() {
  const [buildStatus, setBuildStatus] = useState<null | "processing" | "done">(null);
  const [buildSteps, setBuildSteps] = useState([
    { label: "Repository Validation", status: "pending" },
    { label: "WASM Compilation", status: "pending" },
    { label: "Static Code Analysis", status: "pending" },
  ]);

  // Simulate build process for demo
  const handleStartBuild = () => {
    setBuildStatus("processing");
    setBuildSteps([
      { label: "Repository Validation", status: "complete" },
      { label: "WASM Compilation", status: "progress" },
      { label: "Static Code Analysis", status: "pending" },
    ]);
    setTimeout(() => {
      setBuildSteps([
        { label: "Repository Validation", status: "complete" },
        { label: "WASM Compilation", status: "complete" },
        { label: "Static Code Analysis", status: "progress" },
      ]);
      setTimeout(() => {
        setBuildSteps([
          { label: "Repository Validation", status: "complete" },
          { label: "WASM Compilation", status: "complete" },
          { label: "Static Code Analysis", status: "complete" },
        ]);
        setTimeout(() => {
          setBuildStatus("done");
        }, 1000);
      }, 3000);
    }, 2000);
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Repository</h1>
          <p className="text-xl text-gray-600">
            Enter your GitHub repository URL to start the WASM compilation process
          </p>
        </div>
        {buildStatus !== "processing" && buildStatus !== "done" && (
          <RepositorySubmissionForm onStartBuild={handleStartBuild} />
        )}
        {buildStatus === "processing" && (
          <BuildStatus steps={buildSteps} />
        )}
        {/* Optionally, redirect to /results or show a link when buildStatus === "done" */}
        {buildStatus === "done" && (
          <div className="mt-8 text-center">
            <p className="text-lg text-green-700 font-semibold mb-4">
              Build process completed! View your results.
            </p>
            <a
              href="/results"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Go to Results
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
