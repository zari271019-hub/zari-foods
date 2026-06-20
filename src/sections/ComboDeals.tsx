import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollReveal } from '../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const combos = [
  {
    name: 'FAMILY FEAST',
    items: '2 Zinger Burgers + 2 Fries + 1.5L Drink',
    price: 'Rs 1,499',
    originalPrice: 'Rs 1,800',
    image: '/images/party-pack.jpg',
  },
  {
    name: 'CHINESE PLATTER',
    items: 'Chicken Manchurian + Chowmein + Soup + 2 Drinks',
    price: 'Rs 1,299',
    originalPrice: 'Rs 1,600',
    image: '/images/chinese-platter.jpg',
  },
  {
    name: "COUPLE'S DEAL",
    items: '1 Beef Burger + 1 Chinese Rice + 2 Fries',
    price: 'Rs 999',
    originalPrice: 'Rs 1,250',
    image: '/images/beef-burger.jpg',
  },
  {
    name: 'PARTY PACK',
    items: '4 Burgers + 2 Chowmein + 4 Fries + 2L Drink',
    price: 'Rs 2,499',
    originalPrice: 'Rs 3,000',
    image: '/images/zinger-burger.jpg',
  },
];

export default function ComboDeals() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useScrollReveal(sectionRef, '.section-header', {
    y: 40,
    stagger: 0.1,
    duration: 0.8,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    if (prefersReducedMotion) {
      gsap.set(track, { width: 'auto' });
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>('.combo-card');
    const cardWidth = 380;
    const gap = 24;
    const totalWidth = cards.length * (cardWidth + gap);

    gsap.set(track, { width: `${totalWidth}px` });

    const tween = gsap.to(track, {
      x: () => -(totalWidth - wrapper.offsetWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${totalWidth - wrapper.offsetWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrapper) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="combos"
      className="w-full bg-cream py-20 md:py-[120px]"
    >
      <div className="px-4 md:px-10 mb-12">
        <div className="max-w-[1280px] mx-auto section-header">
          <span className="font-inter font-medium text-[14px] uppercase tracking-[0.08em] text-orange">
            SPECIAL OFFERS
          </span>
          <h2
            className="font-syne font-bold uppercase text-dark mt-3"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 0.95, letterSpacing: '-2px' }}
          >
            COMBO DEALS
          </h2>
        </div>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div ref={wrapperRef} className="combos-wrapper overflow-hidden">
        <div
          ref={trackRef}
          className="combos-track flex gap-6 px-4 md:px-10"
        >
          {combos.map((combo) => (
            <div
              key={combo.name}
              className="combo-card flex-shrink-0 bg-white overflow-hidden"
              style={{ width: '380px', maxWidth: '85vw' }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={combo.image}
                  alt={combo.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7">
                <h3 className="font-syne font-bold text-[20px] uppercase text-dark">
                  {combo.name}
                </h3>
                <p className="font-inter text-[14px] text-text-secondary mt-2">
                  {combo.items}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="font-inter font-semibold text-[20px] text-orange">
                    {combo.price}
                  </span>
                  <span className="font-inter text-[14px] text-[#999] line-through">
                    {combo.originalPrice}
                  </span>
                </div>
                <button className="w-full bg-orange text-white py-3.5 mt-4 font-inter font-semibold text-[13px] uppercase tracking-[0.05em] hover:bg-[#e55a2b] transition-colors">
                  ORDER NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
