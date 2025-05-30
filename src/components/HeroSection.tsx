"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import data from "@/data/data.json";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white hero-section">
      {/* Branded Background Image */}
      <div className="absolute inset-0">
        <img src="/branded_images/modern_tech-focused_hero_background.0.jpg" alt="Hero Background" className="w-full h-full object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center animate-fade-in">
          <div className="mb-8 animate-float">
            {/* You may add a logo or icon here if needed */}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
            {data.companyName} App
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-slide-up">
            Transform your GitHub repositories into WebAssembly modules with advanced static code analysis
          </p>
          <button
            onClick={() => router.push("/submit")}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-slide-up"
          >
            Get Started <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
