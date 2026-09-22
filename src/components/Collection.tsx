import React from 'react';
import { ShoppingBag, Heart, ArrowUpRight, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES } from '../data/fragrances';

export const Collection: React.FC = () => {
  const { addToCart, buyNow, setActiveProductModal, wishlist, toggleWishlist } = useCart();
  // Display strictly the 3 core perfumes specified: Oud Noir, Royal Amber, Imperial Musk
  const collectionFragrances = FRAGRANCES.slice(0, 3);

  return (
    <section
      id="collection"
      className="relative w-full bg-[#050505] py-24 md:py-36 px-6 md:px-12 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8B8B8B] block mb-3 font-mono">
              CURATED SUITE
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-7xl tracking-[0.05em] text-[#F3F0E8] uppercase font-light">
              THE COLLECTION
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs tracking-[0.2em] uppercase text-[#8B8B8B] max-w-xs font-light">
            Three distinct signatures engineered for enduring presence.
          </p>
        </div>

        {/* 3 Fragrances Editorial Grid: Large Imagery, Almost No Borders, Subtle Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {collectionFragrances.map((item) => {
            const isWishlisted = wishlist.includes(item.id);

            return (
              <div
                key={item.id}
                id={`card-${item.id}`}
                className="group relative flex flex-col justify-between"
              >
                {/* Large Product Image Container */}
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden bg-[#0D0D0D] cursor-pointer"
                  onClick={() => setActiveProductModal(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
                  />

                  {/* Subtle luxury gradient shade */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Top tags: Fragrance Number & Wishlist */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="text-[11px] font-mono tracking-[0.25em] text-[#F3F0E8]/70">
                      {item.number}
                    </span>
                    <button
                      id={`wishlist-btn-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                      className="p-2 text-[#F3F0E8]/70 hover:text-[#C9A45C] transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform duration-200 active:scale-125 ${
                          isWishlisted ? 'fill-[#C9A45C] text-[#C9A45C]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Bottom Quick-View action button appearing on hover */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#F3F0E8] flex items-center gap-1">
                      VIEW SPECIFICATIONS <ArrowUpRight className="w-3 h-3 text-[#C9A45C]" />
                    </span>
                  </div>
                </div>

                {/* Product Information */}
                <div className="pt-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[#8B8B8B] font-mono">
                        {item.number}
                      </span>
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B8B8B]">
                        {item.volume}
                      </span>
                    </div>

                    {/* Product Name with subtle transition */}
                    <h3
                      onClick={() => setActiveProductModal(item)}
                      className="font-editorial text-2xl sm:text-3xl tracking-[0.08em] text-[#F3F0E8] uppercase font-light cursor-pointer group-hover:text-[#C9A45C] transition-colors duration-300"
                    >
                      {item.name}
                    </h3>

                    {/* Notes */}
                    <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#8B8B8B] font-light">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Price and Instant Actions */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base text-[#F3F0E8] font-light tracking-wide">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono tracking-wider">
                        FREE EXPRESS COURIER
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id={`buy-now-${item.id}`}
                        onClick={() => buyNow(item, 1)}
                        className="py-2.5 px-3 bg-[#C9A45C] text-[#050505] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#F3F0E8] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Zap className="w-3 h-3 fill-current" />
                        <span>BUY NOW</span>
                      </button>

                      <button
                        id={`add-bag-${item.id}`}
                        onClick={() => addToCart(item, 1)}
                        className="py-2.5 px-3 bg-transparent border border-white/20 text-[#F3F0E8] text-[10px] uppercase tracking-[0.2em] font-medium hover:border-[#C9A45C] hover:text-[#C9A45C] transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>BAG</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
