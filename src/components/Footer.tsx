"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faDiscord
} from "@fortawesome/free-brands-svg-icons";
import data from "@/data/data.json";

const SOCIAL_ICONS = {
  github: faGithub,
  twitter: faTwitter,
  discord: faDiscord
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="WASM Build App Logo" className="h-10" />
              <span className="text-xl font-bold">{data.companyName}</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              {data.companyDescription}
            </p>
            <div className="flex space-x-4">
              {data.socialLinks.map((link) => (
                <a
                  key={link.icon}
                  href={link.url}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={SOCIAL_ICONS[link.icon]} className="text-xl" />
                </a>
              ))}
            </div>
          </div>
          {/* Documentation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Documentation</h3>
            <ul className="space-y-2">
              {data.documentationLinks.map((doc) => (
                <li key={doc.label}>
                  <a
                    href={doc.url}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {data.supportLinks.map((support) => (
                <li key={support.label}>
                  <a
                    href={support.url}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {support.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            {data.footerCopyright}
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            {data.footerCreatedBy} <a
              href={data.footerCreatedByUrl}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Proofs.io
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
