import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const dishes = [
  {
    name: 'ZINGER BURGER',
    description: 'Crispy fried chicken fillet with fresh lettuce and our signature mayo.',
    price: 'Rs 550',
    image: '/images/zinger-burger.jpg',
  },
  {
    name: 'CHICKEN MANCHURIAN',
    description: 'Tender chicken in our special tangy Manchurian sauce.',
    price: 'Rs 650',
    image: '/images/chicken-manchurian.jpg',
  },
  {
    name: 'BEEF BURGER',
    description: 'Juicy beef patty with melted cheese, caramelized onions and pickles.',
    price: 'Rs 750',
    image: '/images/beef-burger.jpg',
  },
  {
    name: 'CHICKEN CHOWMEIN',
    description: 'Stir-fried noodles with tender chicken and fresh vegetables.',
    price: 'Rs 480',
    image: '/images/chicken-chowmein.jpg',
  },
  {
    name: 'LOADED FRIES',
    description: 'Crispy fries topped with cheese sauce, jalapenos and chicken strips.',
    price: 'Rs 450',
    image: '/images/loaded-fries.jpg',
  },
  {
    name: 'HOT & SOUR SOUP',
    description: 'Classic Chinese soup with the perfect balance of spice and tang.',
    price: 'Rs 350',
    image: '/images/hot-sour-soup.jpg',
  },
];

export default function PopularDishes() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, '.dish-card', {
    y: 60,
    stagger: 0.12,
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
      id="menu"
      className="w-full bg-cream py-20 md:py-[120px] px-4 md:px-10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="section-header">
          <span className="font-inter font-medium text-[14px] uppercase tracking-[0.08em] text-orange">
            OUR MENU
          </span>
          <h2
            className="font-syne font-bold uppercase text-dark mt-3"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 0.95, letterSpacing: '-2px' }}
          >
            TASTE THE BEST
          </h2>
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {dishes.map((dish) => (
            <div key={dish.name} className="dish-card group">
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                />
              </div>
              <h3 className="font-syne font-bold text-[22px] md:text-[24px] uppercase text-dark mt-4">
                {dish.name}
              </h3>
              <p className="font-inter text-[15px] text-text-secondary mt-2 line-clamp-2">
                {dish.description}
              </p>
              <p className="font-inter font-semibold text-[18px] text-orange mt-3">
                {dish.price}
              </p>
              <button className="mt-4 border border-dark bg-transparent text-dark px-6 py-2.5 font-inter font-medium text-[12px] uppercase tracking-[0.05em] hover:bg-dark hover:text-white transition-colors">
                ADD TO ORDER
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
