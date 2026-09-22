import React from 'react';
import { ArrowRight, ShoppingBag, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES, DISCOVERY_SET } from '../data/fragrances';

interface HeroProps {
  onDiscover: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscover }) => {
  const { buyNow, addToCart } = useCart();
  const oudNoir = FRAGRANCES[0];
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] md:min-h-screen w-full flex items-center justify-between overflow-hidden bg-[#050505] pt-32 sm:pt-36 md:pt-40 pb-16 md:py-0"
    >
      {/* Background cinematic photograph with off-center single flacon, black stone, directional light, controlled highlights */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=85&w=2200&auto=format&fit=crop"
          alt="VÉRAN luxury fragrance bottle on dark stone"
          className="w-full h-full object-cover object-[70%_center] md:object-[68%_center] opacity-75 md:opacity-85 filter brightness-90 contrast-110"
        />
        {/* Cinematic atmospheric depth masks: deep shadows, soft smoke vignette, controlled directional highlight gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent w-full md:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-[#050505]/60" />
        {/* Subtle stone texture highlight overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(201,164,92,0.06),transparent_55%)] pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col justify-between min-h-[75vh] md:min-h-[82vh]">
        {/* Top subtle spacing placeholder */}
        <div className="hidden md:block" />

        {/* Main Headline & CTA */}
        <div className="max-w-2xl mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.04em] leading-[1.02] text-[#F3F0E8] font-light uppercase">
              WEAR<br />
              THE<br />
              <span className="italic font-normal text-[#F3F0E8]/95">UNFORGETTABLE.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 text-sm md:text-base text-[#8B8B8B] tracking-[0.06em] max-w-md font-light leading-relaxed"
          >
            Fine fragrance for those who leave a presence behind.
          </motion.p>

          {/* Direct Buy & Discovery Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-10 space-y-4"
          >
            <div className="flex flex-wrap items-center gap-3">
              <button
                id="hero-buy-oud-noir"
                onClick={() => buyNow(oudNoir, 1)}
                className="py-3.5 px-6 bg-[#C9A45C] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#F3F0E8] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#C9A45C]/20"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>BUY OUD NOIR &bull; ₹1,299</span>
              </button>

              <button
                id="hero-buy-discovery"
                onClick={() => buyNow(DISCOVERY_SET, 1)}
                className="py-3.5 px-6 bg-[#F3F0E8]/10 border border-[#F3F0E8]/30 text-[#F3F0E8] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#F3F0E8] hover:text-[#050505] transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>TRY DISCOVERY SET &bull; ₹499</span>
              </button>
            </div>

            <div>
              <button
                id="hero-discover-cta"
                onClick={onDiscover}
                className="group inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#8B8B8B] hover:text-[#C9A45C] border-b border-transparent hover:border-[#C9A45C] pb-1 transition-all duration-300"
              >
                <span>EXPLORE ALL 3 SIGNATURE SCENTS</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-[#C9A45C]" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tiny Bottom Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#8B8B8B] pt-12"
        >
          <span className="font-mono text-[#8B8B8B]/80">VÉRAN / 001</span>
          <div className="hidden sm:flex items-center gap-4 text-[#8B8B8B]/60">
            <span>HAUTE PARFUMERIE</span>
            <span>•</span>
            <span>KANNNAUJ • ASSAM</span>
          </div>
          <span className="text-[#8B8B8B]/60">SCROLL TO IMMERSE</span>
        </motion.div>
      </div>
    </section>
  );
};
