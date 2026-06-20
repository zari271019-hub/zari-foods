import { useEffect, useRef, useState, useCallback } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const testimonials = [
  {
    quote: "The Zinger Burger is absolutely killer! Crispy, juicy, and delivered piping hot. QuickBite has become our family's go-to for weekend treats.",
    name: 'AHMAD K.',
    rating: 5,
    avatar: '/images/avatar-1.jpg',
  },
  {
    quote: "Best Chicken Manchurian in town, hands down. Tastes just like the Chinese restaurants but delivered to my door in 20 minutes!",
    name: 'FATIMA R.',
    rating: 5,
    avatar: '/images/avatar-2.jpg',
  },
  {
    quote: "The combo deals are insane value. We ordered the Family Feast and it fed 4 of us easily. Everything was fresh and delicious.",
    name: 'HASSAN M.',
    rating: 5,
    avatar: '/images/avatar-3.jpg',
  },
  {
    quote: "I've tried every Chinese delivery in the city. QuickBite is the only one that gets the Hot & Sour Soup right every single time.",
    name: 'SANA A.',
    rating: 5,
    avatar: '/images/avatar-4.jpg',
  },
  {
    quote: "Their Loaded Fries are addictive! And the free delivery on big orders is a game changer. Highly recommend!",
    name: 'USMAN T.',
    rating: 5,
    avatar: '/images/avatar-5.jpg',
  },
];

const StarIcon = ({ fill }: { fill: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill={fill ? '#FF6B35' : 'none'}
    stroke={fill ? '#FF6B35' : 'rgba(255,255,255,0.3)'}
    strokeWidth="1"
  >
    <polygon points="8 1 10 5.5 15 6 11.5 9.5 12.5 14.5 8 12 3.5 14.5 4.5 9.5 1 6 6 5.5" />
  </svg>
);

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, '.section-header', {
    y: 30,
    stagger: 0.1,
    duration: 0.8,
  });

  const goToSlide = useCallback((index: number) => {
    const total = testimonials.length;
    const clampedIndex = ((index % total) + total) % total;
    setCurrentIndex(clampedIndex);
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % testimonials.length;
        return next;
      });
    }, 5000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${currentIndex * (100 / 3)}%)`;
    }
  }, [currentIndex]);

  // Mobile: show 1 at a time
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = isMobile
        ? `translateX(-${currentIndex * 100}%)`
        : `translateX(-${currentIndex * (100 / 3)}%)`;
    }
  }, [currentIndex, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-dark py-20 md:py-[120px] px-4 md:px-10 text-white"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="section-header mb-16">
          <span className="font-inter font-medium text-[14px] uppercase tracking-[0.08em] text-orange">
            REVIEWS
          </span>
          <h2
            className="font-syne font-bold uppercase text-white mt-3"
            style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 0.95, letterSpacing: '-2px' }}
          >
            WHAT OUR CUSTOMERS SAY
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div
          className="overflow-hidden"
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
          onTouchStart={stopAutoPlay}
          onTouchEnd={startAutoPlay}
        >
          <div
            ref={trackRef}
            className="flex transition-transform duration-600"
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-2 md:px-4"
                style={{ width: isMobile ? '100%' : '33.333%' }}
              >
                <div className="bg-white/5 p-8 md:p-10 h-full">
                  <p className="font-inter text-[16px] md:text-[18px] text-white/85 leading-[1.7] italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mt-6">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-inter font-semibold text-[16px] text-white">
                        {t.name}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <StarIcon key={j} fill={j < t.rating} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-orange' : 'bg-white/30'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
