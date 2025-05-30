"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCog, faClock } from "@fortawesome/free-solid-svg-icons";

interface BuildStatusProps {
  steps: { label: string; status: "pending" | "progress" | "complete" }[];
}

export default function BuildStatus({ steps }: BuildStatusProps) {
  // Placeholder for build status animation and step icons
  return (
    <div className="mt-8 bg-white rounded-xl shadow-xl p-8 animate-fade-in">
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FontAwesomeIcon icon={faCog} spin className="text-blue-600 text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Repository</h3>
          <p className="text-gray-600">
            Please wait while we validate and process your repository...
          </p>
        </div>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div
              key={step.label}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    step.status === "complete"
                      ? "bg-green-600"
                      : step.status === "progress"
                      ? "bg-blue-600"
                      : "bg-gray-300"
                  }`}
                >
                  {step.status === "complete" ? (
                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                  ) : step.status === "progress" ? (
                    <FontAwesomeIcon icon={faCog} spin className="text-white text-xs" />
                  ) : (
                    <FontAwesomeIcon icon={faClock} className="text-white text-xs" />
                  )}
                </div>
                <span className="font-medium">{step.label}</span>
              </div>
              <span
                className={`font-medium ${
                  step.status === "complete"
                    ? "text-green-600"
                    : step.status === "progress"
                    ? "text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {step.status === "complete"
                  ? "Complete"
                  : step.status === "progress"
                  ? "In Progress"
                  : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
