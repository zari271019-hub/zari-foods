import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const navLinks = [
  { label: 'FAST FOOD', href: '#menu' },
  { label: 'CHINESE', href: '#menu' },
  { label: 'COMBOS', href: '#combos' },
  { label: 'DRINKS', href: '#menu' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3,
      });
    }
  }, []);

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream shadow-[0_1px_0_rgba(26,26,26,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-syne font-bold text-[20px] uppercase tracking-[0.1em] text-dark"
        >
          QUICKBITE
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-inter font-medium text-[14px] uppercase tracking-[0.05em] text-dark hover:text-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#contact');
          }}
          className="hidden lg:inline-block bg-orange text-white px-7 py-3 rounded-full font-inter font-semibold text-[13px] uppercase tracking-[0.06em] hover:bg-[#e55a2b] transition-colors"
        >
          ORDER NOW
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark transition-opacity duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark transition-transform duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-cream px-6 pb-6 pt-2 flex flex-col gap-4 shadow-[0_1px_0_rgba(26,26,26,0.08)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-inter font-medium text-[14px] uppercase tracking-[0.05em] text-dark hover:text-orange transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className="bg-orange text-white px-7 py-3 rounded-full font-inter font-semibold text-[13px] uppercase tracking-[0.06em] text-center hover:bg-[#e55a2b] transition-colors mt-2"
          >
            ORDER NOW
          </a>
        </div>
      </div>
    </nav>
  );
}
