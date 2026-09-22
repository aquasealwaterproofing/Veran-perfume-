import React from 'react';
import { REVIEWS } from '../data/fragrances';

export const SocialProof: React.FC = () => {
  return (
    <section
      id="impression"
      className="relative w-full bg-[#050505] py-24 md:py-36 px-6 md:px-12 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with explicit DEMO/PLACEHOLDER disclosure label */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] block mb-3 font-mono">
              PRE-LAUNCH CRITIQUE
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl tracking-[0.05em] text-[#F3F0E8] uppercase font-light">
              THE IMPRESSION
            </h2>
          </div>

          <div className="mt-4 md:mt-0 text-[10px] tracking-[0.25em] uppercase text-[#8B8B8B] font-mono border border-white/[0.12] px-3 py-1.5 self-start">
            DEMO &bull; EDITORIAL PLACEHOLDER REVIEWS
          </div>
        </div>

        {/* 3 Short Placeholder Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {REVIEWS.map((review, idx) => (
            <div
              key={review.id}
              className="relative p-8 bg-[#0D0D0D] border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8B8B8B] block mb-4">
                  SAMPLE 0{idx + 1} &bull; {review.scent}
                </span>

                <p className="font-serif text-base sm:text-lg text-[#F3F0E8]/90 font-light leading-relaxed italic mb-8">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="border-t border-white/[0.06] pt-4 flex flex-col space-y-1">
                <div className="text-xs uppercase tracking-[0.2em] text-[#F3F0E8] font-medium">
                  {review.author}
                </div>
                <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#8B8B8B]">
                  <span>{review.city}</span>
                  <span className="text-[9px] text-[#C9A45C]/80 font-mono">PLACEHOLDER</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Note */}
        <div className="mt-12 text-center text-[10px] uppercase tracking-[0.25em] text-[#8B8B8B]/60 font-mono">
          Note: Authentic client feedback will populate here following general distribution release.
        </div>
      </div>
    </section>
  );
};
