import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/fragrances';

export const InstagramGallery: React.FC = () => {
  return (
    <section
      id="instagram"
      className="relative w-full bg-[#050505] py-24 md:py-32 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] block mb-2 font-mono">
            VISUAL DISPATCHES
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl tracking-[0.05em] text-[#F3F0E8] uppercase font-light">
            @VERAN.FRAGRANCE
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-[#8B8B8B] mt-2 font-light">
            THE WORLD OF VÉRAN
          </p>
        </div>

        <div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#F3F0E8] hover:text-[#C9A45C] border border-white/20 hover:border-[#C9A45C] px-5 py-2.5 transition-all duration-300"
          >
            <span>FOLLOW</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#C9A45C]" />
          </a>
        </div>
      </div>

      {/* Full-width visual Instagram grid */}
      <div className="w-full px-2 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square overflow-hidden bg-[#0D0D0D] group cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-all duration-700 group-hover:scale-105 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-[#050505]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A45C] font-mono">
                  {post.tag}
                </span>
                <p className="text-xs text-[#F3F0E8] font-light mt-1 truncate">
                  {post.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
