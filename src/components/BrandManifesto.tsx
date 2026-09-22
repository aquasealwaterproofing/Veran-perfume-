import React from 'react';

export const BrandManifesto: React.FC = () => {
  return (
    <section
      id="manifesto"
      className="relative w-full bg-[#050505] py-32 md:py-48 px-6 md:px-12 flex items-center justify-center text-center border-t border-white/[0.08]"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Subtle Brand Watermark */}
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#8B8B8B] font-mono block mb-8">
          THE VÉRAN MANIFESTO
        </span>

        {/* Large Centered Statement */}
        <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.04em] leading-[1.08] text-[#F3F0E8] uppercase font-light">
          FRAGRANCE<br />
          ISN’T AN ACCESSORY.<br />
          <span className="block mt-6 md:mt-8 italic font-normal text-[#F3F0E8]">
            IT’S A<br />SIGNATURE.
          </span>
        </h2>

        {/* Subtle Supporting Subtext */}
        <p className="mt-10 md:mt-14 text-sm sm:text-base md:text-lg text-[#8B8B8B] font-light tracking-[0.06em] max-w-xl mx-auto leading-relaxed">
          VÉRAN creates fragrances designed to become part of how you are remembered.
        </p>

        {/* Minimal Roman numeral footnote */}
        <div className="mt-12 text-[10px] tracking-[0.3em] uppercase text-[#8B8B8B]/40 font-mono">
          MMXXVI • NEW DELHI • KANNAUJ
        </div>
      </div>
    </section>
  );
};
