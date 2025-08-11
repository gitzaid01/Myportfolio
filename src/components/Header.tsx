

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Coffee, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock/unlock scrolling when menu is toggled
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <header className="text-white shadow-md bg-black fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        {/* Logo + Quote */}
        <div className="flex items-center flex-wrap">
          <Link href="/" className="text-5xl font-extrabold mr-2 whitespace-nowrap">
            ZAID
          </Link>
           <p className="text-white font-bold text-[8px] sm:text-[10px] tracking-tighter max-w-[170px] sm:max-w-[200px]">
  &quot;He who has a why to live can bear almost any how, for purpose makes the impossible possible.&quot;
  <i> Friedrich Nietzsche</i>
</p>

        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-5">
          <li><Link href="/" className="hover:text-gray-300">Projects</Link></li>
          <li><Link href="/about" className="hover:text-gray-300">Approach</Link></li>
          <li><Link href="/projects" className="hover:text-gray-300">About</Link></li>
          <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={32} /> : <Coffee size={32} />}
        </button>
      </nav>

      {/* Mobile Full-Screen Menu */}
      {isOpen && (
        <div className="md:hidden fixed min-h-screen min-w-full z-50 bg-black flex flex-col space-y-8 p-6">
          <ul className="flex flex-col mt-10 text-2xl font-semibold">
            <li>
              <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-400 font-extrabold text-5xl tackling-tighter">
                Approach
              </Link>
            </li>
            <li>
              <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-400 font-extrabold text-5xl tackling-tighter">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-gray-400 font-extrabold text-5xl tackling-tighter">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/projects" onClick={() => setIsOpen(false)} className="hover:text-gray-400 font-extrabold text-5xl tackling-tighter">
                About
              </Link>
            </li>
          </ul>
          <p className="text-2xl text-gray-200 font-semibold">
            Ready to turn your ideas into reality?
          </p>
          {/* Social Icons */}
          <div className="flex space-x-6 mt-10 justify-center">
            {/* Social Links */}

            {/* Social Icons */}
  <div className="flex space-x-6 mt-10 justify-center">
    <Link href="https://instagram.com" target="_blank" aria-label="Instagram">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 hover:text-pink-400" viewBox="0 0 24 24">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.25 1a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z"/>
      </svg>
    </Link>
    <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 hover:text-blue-400" viewBox="0 0 24 24">
        <path d="M20.447 20.452H16.89V14.83c0-1.343-.027-3.073-1.873-3.073-1.874 0-2.162 1.463-2.162 2.975v5.72H9.297V9h3.409v1.561h.047c.475-.9 1.637-1.85 3.37-1.85 3.6 0 4.268 2.37 4.268 5.456v6.285zM5.337 7.433a1.989 1.989 0 1 1 0-3.978 1.989 1.989 0 0 1 0 3.978zM6.772 20.452H3.902V9h2.87v11.452z"/>
      </svg>
    </Link>
    <Link href="https://twitter.com" target="_blank" aria-label="Twitter (X)">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 hover:text-gray-400" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.24l-5.14-6.71-5.88 6.71H1.91l7.73-8.817L1.41 2.25h6.9l4.647 6.123 5.287-6.123zm-1.16 17.52h1.833L7.084 4.126H5.117l11.967 15.644z"/>
      </svg>
    </Link>
  </div>
          </div>
        </div>
      )}
    </header>
  );
}
