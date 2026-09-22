import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES } from '../data/fragrances';

export const FirstFragrance: React.FC = () => {
  const { addToCart, buyNow, setActiveProductModal } = useCart();
  const oudNoir = FRAGRANCES[0]; // Oud Noir

  return (
    <section
      id="first-fragrance"
      className="relative min-h-screen w-full bg-[#050505] py-20 md:py-32 px-6 md:px-12 flex flex-col justify-center border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Editorial Section Number and Title */}
        <div className="mb-8 md:mb-14">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#8B8B8B] block mb-2 font-mono">
            FLAGSHIP CREATION
          </span>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-[0.05em] text-[#F3F0E8] uppercase font-light">
            01 / OUD NOIR
          </h2>
        </div>

        {/* Giant Editorial Layout: Bottle image occupying most of screen, alongside minimal typography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Enormous Bottle Imagery */}
          <div className="lg:col-span-8 relative group overflow-hidden bg-[#0D0D0D] aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/12] flex items-center justify-center">
            <img
              src={oudNoir.image}
              alt="Oud Noir bottle flacon"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Cinematic subtle shadow gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-black/20 pointer-events-none" />

            {/* Subtle floating overlay tags */}
            <div className="absolute bottom-6 left-6 text-[10px] tracking-[0.3em] uppercase text-[#8B8B8B] font-mono">
              PARFUM REVEAL / 50ML
            </div>
          </div>

          {/* Beside / Below Editorial Details */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:space-y-12">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C9A45C] font-medium mb-4">
                OUD • SAFFRON • LEATHER
              </p>

              <p className="text-base sm:text-lg text-[#F3F0E8]/90 font-light leading-relaxed mb-6 font-serif">
                &ldquo;A dark composition built around rich oud, warm saffron and polished leather.&rdquo;
              </p>

              <div className="text-2xl sm:text-3xl text-[#F3F0E8] font-light tracking-wide mb-8">
                ₹1,299
              </div>

              {/* Small Specification Information */}
              <div className="flex items-center space-x-6 text-[11px] uppercase tracking-[0.25em] text-[#8B8B8B] border-y border-white/[0.08] py-4 mb-8">
                <span>50 ML</span>
                <span className="text-white/20">•</span>
                <span>EAU DE PARFUM</span>
                <span className="text-white/20">•</span>
                <span>24% EXTRACT</span>
              </div>
            </div>

            {/* Action Buttons: Minimal luxury styling with prominent Buy Now */}
            <div className="space-y-3">
              <button
                id="oud-noir-buy-now"
                onClick={() => buyNow(oudNoir, 1)}
                className="w-full py-4 px-6 bg-[#C9A45C] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#F3F0E8] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>BUY NOW &bull; ₹1,299 (PAY VIA UPI / COD)</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  id="oud-noir-add-bag"
                  onClick={() => addToCart(oudNoir, 1)}
                  className="w-full py-3.5 px-4 bg-[#F3F0E8] text-[#050505] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#C9A45C] transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>

                <button
                  id="oud-noir-discover-scent"
                  onClick={() => setActiveProductModal(oudNoir)}
                  className="w-full py-3.5 px-4 bg-transparent text-[#F3F0E8] border border-white/20 text-[10px] uppercase tracking-[0.2em] font-medium hover:border-[#C9A45C] hover:text-[#C9A45C] transition-all"
                >
                  VIEW SCENT NOTES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
