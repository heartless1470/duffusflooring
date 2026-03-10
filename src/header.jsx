"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A192F]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Duffus <span className="text-yellow-500">Flooring</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-white font-medium">
          <Link href="#home" className="hover:text-yellow-500 transition">
            Home
          </Link>
          <Link href="#services" className="hover:text-yellow-500 transition">
            Services
          </Link>
          <Link href="#projects" className="hover:text-yellow-500 transition">
            Projects
          </Link>
          <Link href="#about" className="hover:text-yellow-500 transition">
            About
          </Link>
          <Link href="#contact" className="hover:text-yellow-500 transition">
            Contact
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A192F] px-6 pb-6 space-y-4 text-white">
          <Link href="#home" onClick={() => setIsOpen(false)} className="block">
            Home
          </Link>
          <Link href="#services" onClick={() => setIsOpen(false)} className="block">
            Services
          </Link>
          <Link href="#projects" onClick={() => setIsOpen(false)} className="block">
            Projects
          </Link>
          <Link href="#about" onClick={() => setIsOpen(false)} className="block">
            About
          </Link>
          <Link href="#contact" onClick={() => setIsOpen(false)} className="block">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}