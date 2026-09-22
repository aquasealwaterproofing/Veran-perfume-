import React from 'react';
import { ArrowRight, Droplet, Plus, ShoppingBag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES } from '../data/fragrances';

export const AttarSection: React.FC = () => {
  const { addToCart, buyNow, setActiveProductModal } = useCart();
  const attars = FRAGRANCES.filter((f) => f.category === 'attar');

  return (
    <section
      id="attars"
      className="relative w-full bg-[#050505] py-24 md:py-36 px-6 md:px-12 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Editorial Intro: Large Heading & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-24 items-end">
          <div className="lg:col-span-7">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] block mb-3 font-mono">
              THE HERITAGE EXTRACTION
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.04em] text-[#F3F0E8] uppercase font-light leading-[1.02]">
              ROOTED IN<br />
              <span className="italic font-normal">TRADITION.</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-xl text-[#F3F0E8]/90 font-light leading-relaxed font-serif">
              &ldquo;Traditional attar culture, interpreted through a modern fragrance house.&rdquo;
            </p>
            <p className="mt-4 text-xs text-[#8B8B8B] font-light leading-relaxed tracking-wide">
              Hydro-distilled in traditional deg-bhapka copper stills without carrier alcohol. 100% pure, viscous, meditative perfume oils applied intimately using handcrafted glass rods.
            </p>
          </div>
        </div>

        {/* Dramatic Dark Imagery & The Attar Trio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Atmospheric Attar Imagery */}
          <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden bg-[#0D0D0D] group">
            <img
              src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1600&auto=format&fit=crop"
              alt="Handcrafted crystal attar flacon and pure distilled oil"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-110 transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C9A45C] font-mono mb-1">
                <Droplet className="w-3 h-3" />
                <span>100% ALCOHOL-FREE OIL</span>
              </div>
              <p className="text-xs text-[#F3F0E8]/80 font-light">
                Distilled in Kannauj and Assam from wild agarwood bark, dried resins, and fresh damascena petals.
              </p>
            </div>
          </div>

          {/* Right: ATTARS LIST */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#8B8B8B] font-mono block pb-4 border-b border-white/[0.08]">
                ATTARS / 12ML PURE EXTRACT
              </span>

              <div className="divide-y divide-white/[0.08]">
                {attars.map((attar) => (
                  <div
                    key={attar.id}
                    className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white/[0.02] px-2 -mx-2 transition-colors duration-200 cursor-pointer"
                    onClick={() => setActiveProductModal(attar)}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-[#8B8B8B]">
                          {attar.number}
                        </span>
                        <h3 className="font-editorial text-2xl sm:text-3xl text-[#F3F0E8] uppercase tracking-[0.08em] font-light group-hover:text-[#C9A45C] transition-colors">
                          {attar.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#8B8B8B] tracking-[0.2em] uppercase mt-1">
                        {attar.notesSummary}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-base text-[#F3F0E8] font-light">
                        ₹{attar.price.toLocaleString('en-IN')}
                      </span>
                      <button
                        id={`buy-attar-${attar.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          buyNow(attar, 1);
                        }}
                        className="px-3.5 py-2 bg-[#C9A45C] text-[#050505] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#F3F0E8] transition-colors flex items-center gap-1"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>BUY</span>
                      </button>
                      <button
                        id={`add-attar-${attar.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(attar, 1);
                        }}
                        className="px-3.5 py-2 border border-white/20 text-[10px] uppercase tracking-[0.2em] text-[#F3F0E8] hover:border-[#C9A45C] hover:text-[#C9A45C] transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>BAG</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                id="explore-attars-btn"
                onClick={() => {
                  if (attars.length > 0) setActiveProductModal(attars[0]);
                }}
                className="group inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#F3F0E8] hover:text-[#C9A45C] border-b border-white/20 hover:border-[#C9A45C] pb-2 transition-all duration-300"
              >
                <span>EXPLORE ATTARS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#C9A45C]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
