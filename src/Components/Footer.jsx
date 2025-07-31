import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-red py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <div className="text-2xl font-bold mb-4 md:mb-0 text-black">
          Cross<span className='text-red-600'>Country</span>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-800 transition text-red-500"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-800 transition text-red-500"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-800 transition text-red-500"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-800 transition text-red-500"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-black text-sm mt-6">
        © {new Date().getFullYear()} CrossCountry. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
