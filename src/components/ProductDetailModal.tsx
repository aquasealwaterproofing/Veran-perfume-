import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Heart, Check, ShieldCheck, Truck, RotateCcw, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, buyNow, wishlist, toggleWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'scent' | 'notes' | 'wear' | 'shipping'>('scent');
  const [addedNotice, setAddedNotice] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    buyNow(product, quantity);
    onClose();
  };

  return (
    <div
      id="product-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="product-modal-container"
        className="relative bg-[#0D0D0D] border border-white/[0.12] max-w-5xl w-full max-h-[92vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal"
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
          aria-label="Close product view"
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>

        {/* Editorial Product Page Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Left Column: Large Bottle Image with Atmospheric Lighting */}
          <div className="lg:col-span-6 relative bg-[#050505] p-8 md:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.08]">
            <div className="relative w-full aspect-[3/4] max-w-md overflow-hidden bg-[#0A0A0A]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent pointer-events-none" />

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 left-4 p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-[#F3F0E8] hover:text-[#C9A45C] transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C9A45C] text-[#C9A45C]' : ''}`} />
              </button>

              <div className="absolute bottom-4 left-4 text-[9px] uppercase tracking-[0.3em] font-mono text-[#8B8B8B]">
                {product.volume} • {product.concentration}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Product Information */}
          <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between">
            <div>
              {/* Product Header */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] font-mono">
                  {product.number ? `ARCHIVE / ${product.number}` : 'CURATED'}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B8B8B] font-mono">
                  {product.concentration}
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl tracking-[0.06em] text-[#F3F0E8] uppercase font-light mb-2">
                {product.name}
              </h2>

              <p className="text-xs uppercase tracking-[0.25em] text-[#8B8B8B] font-light mb-3">
                {product.subtitle}
              </p>

              {/* Tagline */}
              <p className="font-serif italic text-base text-[#F3F0E8]/90 mb-6">
                &ldquo;{product.tagline}&rdquo;
              </p>

              {/* Price & Specs */}
              <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-white/[0.08]">
                <span className="text-2xl sm:text-3xl text-[#F3F0E8] font-light tracking-wide">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8B8B8B]">
                  {product.volume}
                </span>
              </div>

              {/* Quantity & Add To Bag */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8B8B8B]">
                    QUANTITY
                  </span>
                  <div className="flex items-center border border-white/20 px-3 py-1.5 space-x-4 bg-[#050505]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono w-4 text-center text-[#F3F0E8]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    id="modal-buy-now"
                    onClick={handleBuyNow}
                    className="w-full py-4 px-6 bg-[#C9A45C] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#F3F0E8] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>BUY NOW &bull; ₹{(product.price * quantity).toLocaleString('en-IN')} (UPI / COD)</span>
                  </button>

                  <button
                    id="modal-add-to-bag"
                    onClick={handleAdd}
                    className="w-full py-3.5 px-6 bg-[#F3F0E8] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#C9A45C] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Editorial Accordion / Tabs: THE SCENT, THE NOTES, HOW IT WEARS, SHIPPING & RETURNS */}
              <div className="border-t border-white/[0.08] pt-6">
                <div className="flex flex-wrap gap-6 text-[10px] uppercase tracking-[0.25em] mb-4 border-b border-white/[0.08] pb-3">
                  <button
                    onClick={() => setActiveTab('scent')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'scent'
                        ? 'text-[#F3F0E8] border-b border-[#C9A45C]'
                        : 'text-[#8B8B8B] hover:text-[#F3F0E8]'
                    }`}
                  >
                    THE SCENT
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'notes'
                        ? 'text-[#F3F0E8] border-b border-[#C9A45C]'
                        : 'text-[#8B8B8B] hover:text-[#F3F0E8]'
                    }`}
                  >
                    THE NOTES
                  </button>
                  <button
                    onClick={() => setActiveTab('wear')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'wear'
                        ? 'text-[#F3F0E8] border-b border-[#C9A45C]'
                        : 'text-[#8B8B8B] hover:text-[#F3F0E8]'
                    }`}
                  >
                    HOW IT WEARS
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-1 transition-colors ${
                      activeTab === 'shipping'
                        ? 'text-[#F3F0E8] border-b border-[#C9A45C]'
                        : 'text-[#8B8B8B] hover:text-[#F3F0E8]'
                    }`}
                  >
                    SHIPPING & RETURNS
                  </button>
                </div>

                <div className="text-xs text-[#8B8B8B] font-light leading-relaxed min-h-[100px]">
                  {activeTab === 'scent' && (
                    <div className="space-y-3 animate-fadeIn">
                      <p className="text-[#F3F0E8]/90">{product.description}</p>
                      <p className="italic font-serif text-[#C9A45C]/90 text-sm">
                        &ldquo;{product.editorialQuote}&rdquo;
                      </p>
                    </div>
                  )}

                  {activeTab === 'notes' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A45C] block">
                          Top Notes
                        </span>
                        <p className="text-[#F3F0E8]">{product.notes.top.join(' • ')}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A45C] block">
                          Heart Notes
                        </span>
                        <p className="text-[#F3F0E8]">{product.notes.heart.join(' • ')}</p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A45C] block">
                          Base Notes
                        </span>
                        <p className="text-[#F3F0E8]">{product.notes.base.join(' • ')}</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'wear' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex justify-between border-b border-white/[0.04] pb-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#8B8B8B]">Intensity</span>
                        <span className="text-[#F3F0E8]">{product.intensity}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/[0.04] pb-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#8B8B8B]">Longevity</span>
                        <span className="text-[#F3F0E8]">{product.longevity}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/[0.04] pb-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#8B8B8B]">Sillage</span>
                        <span className="text-[#F3F0E8]">{product.sillage}</span>
                      </div>
                      <p className="pt-1 text-[11px] text-[#8B8B8B]/80">
                        Application: Apply 2–3 sprays to the carotid artery and chest or one dip of attar rod behind earlobes.
                      </p>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-3 text-[11px] animate-fadeIn">
                      <div className="flex items-start gap-2">
                        <Truck className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                        <span>Complimentary insured express delivery across all states in India. Dispatched within 24 hours.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#C9A45C] flex-shrink-0 mt-0.5" />
                        <span>Transit Protection: Complete replacement guarantee in the unlikely event of transit damage.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <RotateCcw className="w-4 h-4 text-[#8B8B8B] flex-shrink-0 mt-0.5" />
                        <span>Returns: Due to hygienic reasons, unsealed flacons cannot be returned. We recommend starting with the Discovery Set.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom atelier footnote */}
            <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-[#8B8B8B]/60 font-mono">
              <span>VÉRAN &bull; MASTER COMPOUNDING</span>
              <span>BATCH #2026-A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
