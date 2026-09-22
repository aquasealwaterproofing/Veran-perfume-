import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/fragrances';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#050505] py-24 md:py-36 px-6 md:px-12 border-t border-white/[0.08]"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Heading */}
        <div className="text-center md:text-left mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] block mb-3 font-mono">
            INQUIRIES & PROTOCOLS
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-[0.05em] text-[#F3F0E8] uppercase font-light">
            FREQUENTLY ASKED
          </h2>
        </div>

        {/* Minimal Accordion */}
        <div className="divide-y divide-white/[0.12] border-y border-white/[0.12]">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-6 md:py-8">
                <button
                  id={`faq-btn-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between text-left group"
                  aria-expanded={isOpen}
                >
                  <span className="font-editorial text-lg sm:text-xl md:text-2xl text-[#F3F0E8] tracking-[0.03em] font-light group-hover:text-[#C9A45C] transition-colors pr-6">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 text-[#8B8B8B] group-hover:text-[#F3F0E8] transition-colors">
                    {isOpen ? (
                      <Minus className="w-4 h-4 stroke-[1.5]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[1.5]" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 text-sm text-[#8B8B8B] font-light leading-relaxed animate-fadeIn">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-12 text-center text-xs text-[#8B8B8B] font-light">
          Have a specific request regarding bespoke compounding or private commissions?{' '}
          <a
            href="mailto:concierge@veranfragrance.com"
            className="text-[#F3F0E8] hover:text-[#C9A45C] underline underline-offset-4 transition-colors"
          >
            Contact our Atelier
          </a>
        </div>
      </div>
    </section>
  );
};
