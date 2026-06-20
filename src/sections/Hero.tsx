import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const leftLabelRef = useRef<HTMLDivElement>(null);
  const rightLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const divider = dividerRef.current;
    const textOverlay = textOverlayRef.current;
    const leftLabel = leftLabelRef.current;
    const rightLabel = rightLabelRef.current;

    if (!leftPanel || !rightPanel || !divider || !textOverlay || !leftLabel || !rightLabel) return;

    const ease = 'power3.inOut';
    const duration = 0.6;

    // Entrance animation
    if (!prefersReducedMotion) {
      gsap.set(leftPanel, { x: '-100%' });
      gsap.set(rightPanel, { x: '100%' });
      gsap.set([textOverlay, leftLabel, rightLabel], { opacity: 0, yPercent: 20 });

      const tl = gsap.timeline({ delay: 0.5 });
      tl.to(leftPanel, { x: '0%', duration: 1, ease });
      tl.to(rightPanel, { x: '0%', duration: 1, ease }, '<');
      tl.to(textOverlay, { opacity: 1, yPercent: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    } else {
      gsap.set([textOverlay], { opacity: 1 });
      gsap.set([leftLabel, rightLabel], { opacity: 0, yPercent: 20 });
    }

    const reset = () => {
      gsap.to(leftPanel, { width: '50vw', left: '0', duration, ease });
      gsap.to(rightPanel, { width: '50vw', left: '50vw', duration, ease });
      gsap.to(divider, { left: '50vw', duration, ease });
      gsap.to(textOverlay, { opacity: prefersReducedMotion ? 1 : 0, yPercent: 20, duration: 0.3, ease: 'power2.in' });
      gsap.to(leftLabel, { opacity: 0, yPercent: 20, duration: 0.3, ease: 'power2.in' });
      gsap.to(rightLabel, { opacity: 0, yPercent: 20, duration: 0.3, ease: 'power2.in' });
    };

    const handleLeftEnter = () => {
      if (prefersReducedMotion) return;
      const tl = gsap.timeline();
      tl.to([leftPanel, rightPanel], { width: '100vw', duration, ease });
      tl.to(rightPanel, { left: '100vw', duration, ease }, '<');
      tl.to(divider, { left: '100vw', duration, ease }, '<');
      tl.to(textOverlay, { opacity: 1, yPercent: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
      tl.to(leftLabel, { opacity: 1, yPercent: 0, duration: 0.4, ease: 'power2.out' }, '<');
    };

    const handleRightEnter = () => {
      if (prefersReducedMotion) return;
      const tl = gsap.timeline();
      tl.to([leftPanel, rightPanel], { width: '100vw', duration, ease });
      tl.to(leftPanel, { left: '-50vw', duration, ease }, '<');
      tl.to(divider, { left: '0vw', duration, ease }, '<');
      tl.to(textOverlay, { opacity: 1, yPercent: 0, duration: 0.4, ease: 'power2.out' }, '-=0.3');
      tl.to(rightLabel, { opacity: 1, yPercent: 0, duration: 0.4, ease: 'power2.out' }, '<');
    };

    leftPanel.addEventListener('mouseenter', handleLeftEnter);
    leftPanel.addEventListener('mouseleave', reset);
    rightPanel.addEventListener('mouseenter', handleRightEnter);
    rightPanel.addEventListener('mouseleave', reset);

    return () => {
      leftPanel.removeEventListener('mouseenter', handleLeftEnter);
      leftPanel.removeEventListener('mouseleave', reset);
      rightPanel.removeEventListener('mouseenter', handleRightEnter);
      rightPanel.removeEventListener('mouseleave', reset);
    };
  }, []);

  const scrollToMenu = () => {
    const el = document.querySelector('#menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative w-screen h-screen overflow-hidden"
      id="hero"
    >
      {/* Left Panel - Fast Food */}
      <div
        ref={leftPanelRef}
        className="absolute top-0 left-0 w-[50vw] h-screen overflow-hidden cursor-pointer"
        style={{ willChange: 'transform, width' }}
      >
        <img
          src="/images/beef-burger.jpg"
          alt="Fast Food"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Right Panel - Chinese */}
      <div
        ref={rightPanelRef}
        className="absolute top-0 left-[50vw] w-[50vw] h-screen overflow-hidden cursor-pointer"
        style={{ willChange: 'transform, width' }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/chinese-platter.jpg"
          className="w-full h-full object-cover absolute top-0 left-0"
        >
          <source src="/videos/hero-chinese.mp4" type="video/mp4" />
          <img src="/images/chinese-platter.jpg" alt="Chinese Food" className="w-full h-full object-cover" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Vertical Divider */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-[50vw] w-px h-screen bg-white/30 z-10 pointer-events-none"
      />

      {/* Center Text Overlay */}
      <div
        ref={textOverlayRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center px-4"
        style={{ opacity: 0 }}
      >
        <h1
          className="font-syne font-bold uppercase text-white text-center"
          style={{
            fontSize: 'clamp(36px, 6vw, 80px)',
            lineHeight: 0.95,
            letterSpacing: '-3px',
            textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            maxWidth: '800px',
          }}
        >
          FAST FOOD &amp; CHINESE DELIVERY
        </h1>
        <p className="font-inter text-[16px] md:text-[18px] text-white/85 mt-4">
          Crispy burgers, sizzling woks, delivered hot to your door.
        </p>
        <button
          onClick={scrollToMenu}
          className="mt-8 bg-orange text-white px-10 py-4 rounded-full font-inter font-semibold text-[14px] uppercase tracking-[0.06em] hover:bg-[#e55a2b] transition-colors"
        >
          ORDER NOW
        </button>
      </div>

      {/* Left Panel Label */}
      <div
        ref={leftLabelRef}
        className="absolute bottom-[60px] left-[25vw] -translate-x-1/2 z-20 text-center"
        style={{ opacity: 0 }}
      >
        <span className="font-syne font-bold text-white text-[32px] md:text-[48px] uppercase">
          FAST FOOD
        </span>
      </div>

      {/* Right Panel Label */}
      <div
        ref={rightLabelRef}
        className="absolute bottom-[60px] left-[75vw] -translate-x-1/2 z-20 text-center"
        style={{ opacity: 0 }}
      >
        <span className="font-syne font-bold text-white text-[32px] md:text-[48px] uppercase">
          CHINESE
        </span>
      </div>
    </section>
  );
}
