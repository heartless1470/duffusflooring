import { useState, useEffect } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="container nav-container">
        <nav>
          <a href="#home" className="logo">Duffus <span>Flooring</span></a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button
            className="hamburger"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </nav>
      </div>

      {isOpen && (
        <nav id="mobile-menu" className="mobile-menu container" role="navigation">
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#portfolio" onClick={() => setIsOpen(false)}>Portfolio</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
        </nav>
      )}
    </header>
  )
}
