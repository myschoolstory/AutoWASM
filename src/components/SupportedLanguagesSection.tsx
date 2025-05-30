"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCuttlefish, faRust } from "@fortawesome/free-brands-svg-icons";
import { faC } from "@fortawesome/free-solid-svg-icons"; // Placeholder, FontAwesome does not have a C icon

export default function SupportedLanguagesSection() {
  // Placeholder icons, replace with SVGs or images for C/C++/Rust if needed
  const languages = [
    {
      icon: (
        // FontAwesome does not have a C icon, so we use a styled "C" as placeholder
        <span className="font-mono font-bold text-5xl text-blue-600">C</span>
      ),
      name: "C",
      color: "text-blue-600"
    },
    {
      icon: <FontAwesomeIcon icon={faCuttlefish} className="text-6xl text-indigo-600" />,
      name: "C++",
      color: "text-indigo-600"
    },
    {
      icon: <FontAwesomeIcon icon={faRust} className="text-6xl text-orange-600" />,
      name: "Rust",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Supported Languages</h2>
          <p className="text-xl text-gray-600">
            Currently supporting these programming languages for WASM compilation
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className={`mb-4 ${lang.color}`}>{lang.icon}</div>
              <h3 className="text-xl font-bold text-gray-900">{lang.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
