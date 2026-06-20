import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const features = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 14v10l7 7" />
      </svg>
    ),
    title: 'FAST DELIVERY',
    description: 'Your food arrives hot and fresh within 30 minutes, guaranteed.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="24 4 29 18 44 18 32 27 36 42 24 33 12 42 16 27 4 18 19 18" />
      </svg>
    ),
    title: 'PREMIUM QUALITY',
    description: 'Only the freshest ingredients, sourced daily from trusted suppliers.',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="16" width="36" height="22" rx="2" />
        <path d="M14 16V10a10 10 0 0120 0v6" />
        <circle cx="24" cy="29" r="3" />
        <path d="M24 32v3" />
      </svg>
    ),
    title: 'FREE DELIVERY',
    description: 'Free delivery on all orders above Rs 999. No hidden charges ever.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, '.feature-col', {
    y: 40,
    stagger: 0.2,
    duration: 0.8,
  });

  useScrollReveal(sectionRef, '.section-header', {
    y: 40,
    stagger: 0.1,
    duration: 0.8,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-dark py-20 md:py-[120px] px-4 md:px-10 text-white"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="section-header">
          <span className="font-inter font-medium text-[14px] uppercase tracking-[0.08em] text-orange">
            WHY QUICKBITE
          </span>
          <h2
            className="font-syne font-bold uppercase text-white mt-3"
            style={{ fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 0.95, letterSpacing: '-2px' }}
          >
            WE DELIVER MORE THAN FOOD
          </h2>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-16">
          {features.map((feature) => (
            <div key={feature.title} className="feature-col text-center md:text-left">
              <div className="flex justify-center md:justify-start">{feature.icon}</div>
              <h3 className="font-syne font-bold text-[22px] md:text-[24px] uppercase text-white mt-5">
                {feature.title}
              </h3>
              <p className="font-inter text-[16px] text-white/60 mt-3 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
