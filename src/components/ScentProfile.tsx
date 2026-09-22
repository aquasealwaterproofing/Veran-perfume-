import React from 'react';

export const ScentProfile: React.FC = () => {
  return (
    <section
      id="scent-profile"
      className="relative w-full bg-[#050505] py-24 md:py-36 px-6 md:px-12 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Subtle Section Label & Title */}
        <div className="text-center md:text-left mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#8B8B8B] block mb-3 font-mono">
            OLFACTORY ARCHITECTURE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.06em] text-[#F3F0E8] uppercase font-light">
            THE COMPOSITION
          </h2>
        </div>

        {/* Horizontal Minimal Scent Profile Structure */}
        <div className="relative">
          {/* Subtle horizontal connecting line */}
          <div className="hidden md:block absolute top-[2.5rem] left-0 right-0 h-[1px] bg-white/[0.12] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {/* 01: TOP */}
            <div className="relative group pt-0 md:pt-14 border-t border-white/[0.12] md:border-t-0">
              {/* Subtle top indicator dot on desktop */}
              <div className="hidden md:block absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-[#C9A45C] ring-4 ring-[#050505]" />

              <div className="pt-4 md:pt-0">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#8B8B8B] font-mono block mb-2">
                  01 / PHASE ONE
                </span>
                <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A45C] font-semibold mb-3">
                  TOP
                </h3>
                <div className="font-editorial text-3xl sm:text-4xl text-[#F3F0E8] font-normal tracking-[0.05em] uppercase mb-4">
                  SAFFRON
                </div>
                <p className="text-xs text-[#8B8B8B] font-light leading-relaxed max-w-xs">
                  Harvested threads offering immediate metallic warmth, spiced honey, and a fleeting crimson brilliance.
                </p>
              </div>
            </div>

            {/* 02: HEART */}
            <div className="relative group pt-0 md:pt-14 border-t border-white/[0.12] md:border-t-0">
              {/* Subtle top indicator dot on desktop */}
              <div className="hidden md:block absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-[#F3F0E8] ring-4 ring-[#050505]" />

              <div className="pt-4 md:pt-0">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#8B8B8B] font-mono block mb-2">
                  02 / PHASE TWO
                </span>
                <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A45C] font-semibold mb-3">
                  HEART
                </h3>
                <div className="font-editorial text-3xl sm:text-4xl text-[#F3F0E8] font-normal tracking-[0.05em] uppercase mb-4">
                  OUD
                </div>
                <p className="text-xs text-[#8B8B8B] font-light leading-relaxed max-w-xs">
                  Hydro-distilled Assam agarwood; resinous, deep, balsamic, and commanding an unmistakable presence.
                </p>
              </div>
            </div>

            {/* 03: BASE */}
            <div className="relative group pt-0 md:pt-14 border-t border-white/[0.12] md:border-t-0">
              {/* Subtle top indicator dot on desktop */}
              <div className="hidden md:block absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-[#8B8B8B] ring-4 ring-[#050505]" />

              <div className="pt-4 md:pt-0">
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#8B8B8B] font-mono block mb-2">
                  03 / PERSISTENCE
                </span>
                <h3 className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A45C] font-semibold mb-3">
                  BASE
                </h3>
                <div className="font-editorial text-3xl sm:text-4xl text-[#F3F0E8] font-normal tracking-[0.05em] uppercase mb-4">
                  LEATHER / WOODS
                </div>
                <p className="text-xs text-[#8B8B8B] font-light leading-relaxed max-w-xs">
                  Hand-polished saddle leather married to dry cedarwood and birch tar for an indelible, lasting imprint.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal baseline footnote */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#8B8B8B]">
          <span>FORMULATION: 24% CONCENTRATION</span>
          <span className="mt-2 sm:mt-0 font-mono">NATURAL ESSENCES & RESINOUS EXTRACTS</span>
        </div>
      </div>
    </section>
  );
};
