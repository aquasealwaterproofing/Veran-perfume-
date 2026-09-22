import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES } from '../data/fragrances';

export const SearchDrawer: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveProductModal } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const quickTags = ['OUD', 'SAFFRON', 'LEATHER', 'AMBER', 'WHITE MUSK', 'ROSE', 'ATTAR', 'DISCOVERY'];

  const filteredFragrances = FRAGRANCES.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.notesSummary.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.notes.top.some((n) => n.toLowerCase().includes(q)) ||
      item.notes.heart.some((n) => n.toLowerCase().includes(q)) ||
      item.notes.base.some((n) => n.toLowerCase().includes(q))
    );
  });

  const handleSelectProduct = (product: (typeof FRAGRANCES)[0]) => {
    setActiveProductModal(product);
    setIsSearchOpen(false);
  };

  return (
    <div
      id="search-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex flex-col items-center justify-start p-6 md:p-12 overflow-y-auto"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        id="search-drawer-container"
        className="max-w-4xl w-full bg-[#0D0D0D] border border-white/[0.12] p-6 sm:p-10 relative mt-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setIsSearchOpen(false)}
          className="absolute top-6 right-6 p-2 text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
          aria-label="Close search"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Search Input */}
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] font-mono block mb-2">
            OLFACTORY DIRECTORY
          </span>
          <div className="relative flex items-center border-b border-white/20 pb-2">
            <Search className="w-5 h-5 text-[#8B8B8B] mr-3 stroke-[1.5]" />
            <input
              autoFocus
              type="text"
              placeholder="SEARCH BY FRAGRANCE, NOTE, OR ATTAR..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-lg sm:text-2xl text-[#F3F0E8] font-editorial uppercase tracking-wider placeholder:text-[#8B8B8B]/40 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#8B8B8B] hover:text-[#F3F0E8] uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8B8B8B] py-1 mr-2 self-center">
            NOTES:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1 border transition-colors ${
                query.toUpperCase() === tag
                  ? 'border-[#C9A45C] text-[#C9A45C] bg-[#C9A45C]/10'
                  : 'border-white/10 text-[#8B8B8B] hover:border-white/30 hover:text-[#F3F0E8]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[50vh] overflow-y-auto divide-y divide-white/[0.06] -mx-4 px-4">
          {filteredFragrances.length === 0 ? (
            <div className="py-12 text-center text-[#8B8B8B] text-xs uppercase tracking-wider">
              No fragrances matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredFragrances.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectProduct(item)}
                className="py-4 flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] px-2 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-14 bg-[#050505] overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-editorial text-lg text-[#F3F0E8] uppercase tracking-wide group-hover:text-[#C9A45C] transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[10px] uppercase tracking-wider text-[#8B8B8B]">
                      {item.notesSummary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-[#F3F0E8]">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8B8B8B] group-hover:text-[#C9A45C] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
