"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCube, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function FeaturesSection() {
  // Placeholder icons and text, replace with real features if needed
  const features = [
    {
      icon: <FontAwesomeIcon icon={faGithub} className="text-white text-2xl" />,
      title: "Repository Validation",
      desc: "Validate GitHub repository URLs and ensure accessibility with comprehensive error handling.",
      bg: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-600"
    },
    {
      icon: <FontAwesomeIcon icon={faCube} className="text-white text-2xl" />,
      title: "WASM Compilation",
      desc: "Compile C, C++, and Rust code to WebAssembly with detailed build reports and error handling.",
      bg: "from-indigo-50 to-indigo-100",
      iconBg: "bg-indigo-600"
    },
    {
      icon: <FontAwesomeIcon icon={faSearch} className="text-white text-2xl" />,
      title: "Static Code Analysis",
      desc: "Advanced analysis for code quality, security vulnerabilities, and dependency checks.",
      bg: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to compile and analyze your code
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`feature-card bg-gradient-to-br ${feature.bg} p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div className={`${feature.iconBg} w-16 h-16 rounded-lg flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
