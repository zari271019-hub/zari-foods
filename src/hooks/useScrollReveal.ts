import { useEffect } from 'react';
import type { RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  start?: string;
  x?: number;
  delay?: number;
}

export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  selector: string,
  options: RevealOptions = {}
) {
  useEffect(() => {
    if (!ref.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = ref.current.querySelectorAll(selector);
    if (elements.length === 0) return;

    if (prefersReducedMotion) {
      gsap.set(elements, { opacity: 0 });
      gsap.to(elements, {
        opacity: 1,
        duration: 0.3,
        stagger: options.stagger ?? 0.1,
        scrollTrigger: {
          trigger: options.x ? ref.current : (elements[0].parentElement || ref.current),
          start: options.start ?? 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      return;
    }

    gsap.set(elements, { willChange: 'transform, opacity' });

    const tweenConfig: gsap.TweenVars = {
      y: options.y ?? 40,
      x: options.x ?? 0,
      opacity: 0,
      duration: options.duration ?? 0.8,
      stagger: options.stagger ?? 0.1,
      ease: options.ease ?? 'power3.out',
      scrollTrigger: {
        trigger: options.x ? ref.current : (elements[0].parentElement || ref.current),
        start: options.start ?? 'top 80%',
        toggleActions: 'play none none none',
      },
      onComplete: () => {
        gsap.set(elements, { willChange: 'auto' });
      },
    };

    gsap.from(elements, tweenConfig);

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current || st.trigger === elements[0].parentElement) {
          st.kill();
        }
      });
    };
  }, [ref, selector, options.y, options.x, options.duration, options.stagger, options.ease, options.start]);
}
