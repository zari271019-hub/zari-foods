import { useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  useScrollReveal(sectionRef, '.contact-left', {
    x: -40,
    duration: 0.8,
  });

  useScrollReveal(sectionRef, '.contact-right', {
    x: 40,
    duration: 0.8,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', notes: '' });
    }, 3000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hi QuickBite! I would like to place an order.');
    window.open(`https://wa.me/923244088859?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full bg-cream py-20 md:py-[120px] px-4 md:px-10"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Left Column */}
        <div className="contact-left">
          <span className="font-inter font-medium text-[14px] uppercase tracking-[0.08em] text-orange">
            GET IN TOUCH
          </span>
          <h2
            className="font-syne font-bold uppercase text-dark mt-3"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 0.95, letterSpacing: '-2px' }}
          >
            ORDER NOW
          </h2>
          <p className="font-inter text-[16px] text-text-secondary mt-4 max-w-[400px] leading-relaxed">
            Craving something delicious? Place your order now and we&apos;ll deliver hot, fresh food to your doorstep.
          </p>

          {/* Contact Details */}
          <div className="flex flex-col gap-6 mt-10">
            <div className="flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span className="font-inter font-medium text-[16px] text-dark">+92 305 4466509</span>
            </div>

            <div className="flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="font-inter font-medium text-[16px] text-dark">order@quickbite.pk</span>
            </div>

            <div className="flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="font-inter font-medium text-[16px]" style={{ color: '#25D366' }}>
                +92 324 4088859
              </span>
            </div>

            <div className="flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-inter font-medium text-[16px] text-dark">Gulberg III, Lahore</span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <button
            onClick={handleWhatsApp}
            className="mt-8 bg-[#25D366] text-white px-8 py-4 rounded-full font-inter font-semibold text-[14px] uppercase tracking-[0.06em] hover:bg-[#128C7E] transition-colors"
          >
            CHAT ON WHATSAPP
          </button>
        </div>

        {/* Right Column - Form */}
        <div className="contact-right bg-white p-8 md:p-12">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mb-4">
                <circle cx="32" cy="32" r="30" stroke="#FF6B35" strokeWidth="2" />
                <path d="M20 32l8 8 16-16" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h3 className="font-syne font-bold text-[24px] text-dark uppercase">Order Sent!</h3>
              <p className="font-inter text-text-secondary mt-2">We&apos;ll contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="border-b border-dark/20 bg-transparent py-3 px-0 font-inter text-[15px] text-dark placeholder:text-dark/40 focus:outline-none focus:border-orange transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="border-b border-dark/20 bg-transparent py-3 px-0 font-inter text-[15px] text-dark placeholder:text-dark/40 focus:outline-none focus:border-orange transition-colors"
              />
              <textarea
                placeholder="What would you like to order?"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="border-b border-dark/20 bg-transparent py-3 px-0 font-inter text-[15px] text-dark placeholder:text-dark/40 focus:outline-none focus:border-orange transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-orange text-white py-4 font-inter font-semibold text-[14px] uppercase tracking-[0.05em] hover:bg-[#e55a2b] transition-colors mt-2"
              >
                SEND ORDER
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
