import React from 'react';
import { ArrowRight, Sparkles, ShoppingBag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES } from '../data/fragrances';

export const DiscoverySet: React.FC = () => {
  const { addToCart, buyNow, setActiveProductModal } = useCart();
  const discoveryProduct = FRAGRANCES.find((f) => f.id === 'discovery-set') || FRAGRANCES[3];

  const samples = [
    { name: 'OUD NOIR', volume: '5 ML', family: 'Oud / Leather' },
    { name: 'ROYAL AMBER', volume: '5 ML', family: 'Amber / Vanilla' },
    { name: 'IMPERIAL MUSK', volume: '5 ML', family: 'Musk / Woods' },
    { name: 'DEHN AL OUD', volume: '2.5 ML', family: 'Pure Attar Oil' },
  ];

  return (
    <section
      id="discovery"
      className="relative w-full bg-[#111111] py-24 md:py-36 px-6 md:px-12 border-y border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] block mb-4 font-mono">
                THE SAMPLING RITUAL
              </span>

              <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.04em] text-[#F3F0E8] uppercase font-light leading-[1.08] mb-8">
                BEFORE YOU<br />
                <span className="italic font-normal">CHOOSE ONE.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#F3F0E8]/85 font-light leading-relaxed mb-6 font-serif">
                Four signatures.<br />
                One discovery set.<br />
                Find the scent that becomes yours.
              </p>

              <p className="text-xs text-[#8B8B8B] font-light tracking-wide leading-relaxed max-w-md mb-8">
                Skin chemistry transforms fine fragrance. Experience the nocturnal depth of Oud Noir, the warm radiance of Royal Amber, the architectural restraint of Imperial Musk, and pure concentrated Dehn Al Oud in the intimate cadence of your daily life.
              </p>
            </div>

            {/* Product Metadata Card */}
            <div className="bg-[#0A0A0A] p-6 sm:p-8 border border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-[#F3F0E8] tracking-[0.08em] uppercase font-light">
                    VÉRAN DISCOVERY SET
                  </h3>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B8B8B] font-mono">
                    4 × 5ML SAMPLES
                  </span>
                </div>
                <div className="text-2xl text-[#F3F0E8] font-light">
                  ₹499
                </div>
              </div>

              {/* Privilege note */}
              <div className="flex items-center gap-2 text-xs text-[#C9A45C] font-light mb-6 border-t border-white/[0.08] pt-4">
                <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Includes ₹200 off your first full-size fragrance flacon.</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  id="discovery-set-buy-now"
                  onClick={() => buyNow(discoveryProduct, 1)}
                  className="w-full group py-4 px-6 bg-[#C9A45C] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#F3F0E8] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>BUY DISCOVERY SET NOW &bull; ₹499 (PAY VIA UPI)</span>
                </button>

                <button
                  id="discovery-set-cta"
                  onClick={() => addToCart(discoveryProduct, 1)}
                  className="w-full py-3.5 px-6 bg-transparent border border-white/20 text-[#F3F0E8] text-[10px] uppercase tracking-[0.25em] font-medium hover:border-[#C9A45C] hover:text-[#C9A45C] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase of the Four Samples and Presentation Flacons */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-[#0A0A0A] cursor-pointer group"
              onClick={() => setActiveProductModal(discoveryProduct)}
            >
              <img
                src={discoveryProduct.image}
                alt="VÉRAN Discovery Set luxury presentation box and vials"
                className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />

              {/* Box specification badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#8B8B8B] font-mono">
                <span>MATTE OBSIDIAN COFFRET</span>
                <span>LIMITED RUN</span>
              </div>
            </div>

            {/* The Four Individual Sample Miniature Strips */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {samples.map((sample, idx) => (
                <div
                  key={sample.name}
                  className="bg-[#0A0A0A] border border-white/[0.06] p-3 text-center transition-colors hover:border-white/20"
                >
                  <span className="text-[9px] font-mono text-[#8B8B8B] block mb-1">
                    VIAL 0{idx + 1}
                  </span>
                  <div className="text-[11px] font-editorial uppercase tracking-[0.1em] text-[#F3F0E8]">
                    {sample.name}
                  </div>
                  <div className="text-[9px] text-[#C9A45C] uppercase tracking-[0.15em] mt-0.5">
                    {sample.volume}
                  </div>
                  <div className="text-[8px] text-[#8B8B8B] tracking-wider uppercase mt-1">
                    {sample.family}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
