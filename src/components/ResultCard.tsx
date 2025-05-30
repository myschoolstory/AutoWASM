"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faCog,
  faExclamationTriangle,
  faInfoCircle,
  faClock,
  faChevronRight,
  faDownload,
  faRedo,
  faEye,
  faRocket,
  faFileAlt,
  faPlay,
  faStop,
  faBug,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { BuildResult } from "@/services/buildService";

interface ResultCardProps {
  result: BuildResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  // Placeholders for action buttons, icons, and error messages
  if (result.status === "success") {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCheck} className="text-green-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{result.repo}</h3>
              <p className="text-sm text-gray-500">{result.builtAgo}</p>
            </div>
          </div>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Success
          </span>
        </div>
        {/* Build Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Language</div>
            <div className="font-semibold text-gray-900">{result.language}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Build Time</div>
            <div className="font-semibold text-gray-900">{result.time}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">WASM Size</div>
            <div className="font-semibold text-gray-900">{result.wasmSize}</div>
          </div>
        </div>
        {/* Code Analysis Summary */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">Code Analysis Summary</h4>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{result.qualityScore}</div>
              <div className="text-sm text-gray-600">Quality Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{result.vulnerabilities}</div>
              <div className="text-sm text-gray-600">Vulnerabilities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{result.dependencies}</div>
              <div className="text-sm text-gray-600">Dependencies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{result.warnings}</div>
              <div className="text-sm text-gray-600">Warnings</div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            <FontAwesomeIcon icon={faEye} className="mr-1" /> View Details
          </button>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            <FontAwesomeIcon icon={faDownload} className="mr-1" /> Download WASM
          </button>
          <button className="text-gray-600 hover:text-gray-700 font-medium flex items-center">
            <FontAwesomeIcon icon={faRedo} className="mr-1" /> Re-run Build
          </button>
        </div>
      </div>
    );
  }

  if (result.status === "failed") {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{result.repo}</h3>
              <p className="text-sm text-gray-500">{result.builtAgo}</p>
            </div>
          </div>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
            Failed
          </span>
        </div>
        {/* Error Summary */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-red-800">Compilation Error</h4>
              <div className="mt-1 text-sm text-red-700">
                {result.errorMessage}
              </div>
            </div>
          </div>
        </div>
        {/* Build Info */}
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Language</div>
            <div className="font-semibold text-gray-900">{result.language}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Build Time</div>
            <div className="font-semibold text-gray-900">{result.time}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Error Code</div>
            <div className="font-semibold text-gray-900">{result.errorCode}</div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            <FontAwesomeIcon icon={faFileAlt} className="mr-1" /> View Logs
          </button>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            <FontAwesomeIcon icon={faRedo} className="mr-1" /> Retry Build
          </button>
          <button className="text-gray-600 hover:text-gray-700 font-medium flex items-center">
            <FontAwesomeIcon icon={faBug} className="mr-1" /> Get Help
          </button>
        </div>
      </div>
    );
  }

  // In Progress
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faCog} spin className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{result.repo}</h3>
            <p className="text-sm text-gray-500">{result.startedAgo}</p>
          </div>
        </div>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          In Progress
        </span>
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Compiling to WASM...</span>
          <span>{result.progress ?? 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${result.progress ?? 0}%` }}
          ></div>
        </div>
      </div>
      {/* Current Step */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <FontAwesomeIcon icon={faInfoCircle} className="text-blue-400" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">Current Step</h4>
            <div className="mt-1 text-sm text-blue-700">
              {result.currentStep}
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-4 pt-4 border-t">
        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
          <FontAwesomeIcon icon={faPlay} className="mr-1" /> View Live Logs
        </button>
        <button className="text-red-600 hover:text-red-700 font-medium flex items-center">
          <FontAwesomeIcon icon={faStop} className="mr-1" /> Cancel Build
        </button>
      </div>
    </div>
  );
}
