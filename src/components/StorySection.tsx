import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

export const StorySection: React.FC = () => {
  const [isFullStoryOpen, setIsFullStoryOpen] = useState(false);

  return (
    <section
      id="story"
      className="relative w-full bg-[#050505] py-24 md:py-36 px-6 md:px-12 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Atmospheric Fragrance Image */}
          <div className="lg:col-span-6 relative aspect-[4/5] overflow-hidden bg-[#0D0D0D] group">
            <img
              src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop"
              alt="Atmospheric fragrance bottle and amber shadow"
              className="w-full h-full object-cover object-center filter brightness-85 contrast-110 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 text-[10px] tracking-[0.3em] uppercase text-[#8B8B8B] font-mono">
              KANNAUJ DISTILLERY ARCHIVES / EST. 2026
            </div>
          </div>

          {/* Right: The House of VÉRAN Story */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8B8B8B] block mb-3 font-mono">
                ORIGINS & IDENTITY
              </span>

              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-[0.05em] text-[#F3F0E8] uppercase font-light mb-8">
                THE HOUSE OF VÉRAN
              </h2>

              <p className="text-base sm:text-lg text-[#F3F0E8]/90 font-light leading-relaxed font-serif mb-8">
                Born from an appreciation for both modern perfumery and India’s rich fragrance heritage, VÉRAN exists to create scents with character.
              </p>

              <div className="space-y-2 text-xl sm:text-2xl font-editorial tracking-[0.05em] text-[#F3F0E8] uppercase font-light border-l border-[#C9A45C] pl-6 py-2 my-8">
                <div className="text-[#8B8B8B]">Not louder.</div>
                <div className="text-[#8B8B8B]">Not ordinary.</div>
                <div className="text-[#F3F0E8] font-normal">Distinct.</div>
              </div>

              <p className="text-xs text-[#8B8B8B] font-light tracking-wide leading-relaxed max-w-md">
                We refuse synthetic fillers and mass-market formulas designed to scream for five minutes and disappear. Each formulation is steeped in high-concentration resinous extracts, aged Assam agarwood, and botanical distillates aged to perfection.
              </p>
            </div>

            {/* CTA: OUR STORY → */}
            <div>
              <button
                id="story-learn-more-btn"
                onClick={() => setIsFullStoryOpen(true)}
                className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#F3F0E8] hover:text-[#C9A45C] border-b border-white/20 hover:border-[#C9A45C] pb-2 transition-all duration-300"
              >
                <span>OUR STORY</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#C9A45C]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Editorial Story Overlay Modal */}
      {isFullStoryOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#0D0D0D] border border-white/[0.12] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12 relative">
            <button
              onClick={() => setIsFullStoryOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
              aria-label="Close story dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] font-mono block mb-3">
              THE HOUSE CHRONICLE
            </span>
            <h3 className="font-editorial text-3xl md:text-4xl text-[#F3F0E8] uppercase tracking-[0.06em] font-light mb-6">
              A DUAL HERITAGE
            </h3>

            <div className="space-y-5 text-sm text-[#8B8B8B] font-light leading-relaxed">
              <p>
                For centuries, the perfume capital of Kannauj along the banks of the Ganges has preserved the ancient alchemy of attar—capturing petrichor from rain-soaked baked earth, distilling rose damascena over sandalwood, and aging agarwood in copper stills.
              </p>
              <p>
                Meanwhile, contemporary haute perfumerie in Paris and Milan developed precision ethanol diffusion, architectural note layering, and sublime sillage.
              </p>
              <p className="text-[#F3F0E8] font-serif text-base italic">
                &ldquo;VÉRAN bridges these two worlds without compromise. We do not dilute Indian heritage for Western palates, nor do we present traditional perfumery as a rustic novelty. We formulate modern classics for those who command distinction.&rdquo;
              </p>
              <p>
                Every flacon is individually numbered, rested for 60 days of maceration, and inspected by hand before leaving our studio.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-[#8B8B8B]">
              <span>VÉRAN / NEW DELHI</span>
              <button
                onClick={() => setIsFullStoryOpen(false)}
                className="text-[#C9A45C] hover:underline"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
