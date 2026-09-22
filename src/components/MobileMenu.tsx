import React from 'react';
import { X, Search, ShoppingBag, Heart, Zap, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES, DISCOVERY_SET } from '../data/fragrances';
import { getMerchantWhatsApp } from '../utils/whatsapp';

interface MobileMenuProps {
  onNavigate: (sectionId: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ onNavigate }) => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsSearchOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    buyNow,
    cartCount,
    cartTotal,
    wishlist
  } = useCart();

  if (!isMobileMenuOpen) return null;

  const handleLink = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <div
      id="mobile-menu-drawer"
      className="fixed inset-0 z-50 bg-[#070707] flex flex-col justify-between p-6 sm:p-8 animate-fadeIn overflow-y-auto"
    >
      {/* Top bar with Monogram */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-[#C9A45C] rotate-45 flex items-center justify-center bg-black">
            <span className="-rotate-45 font-editorial text-xs font-bold text-[#C9A45C]">V</span>
          </div>
          <div>
            <span className="font-editorial text-xl tracking-[0.25em] text-[#F3F0E8] font-light uppercase block leading-none">
              VÉRAN
            </span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-[#C9A45C] font-mono">
              HAUTE PARFUMERIE
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="p-2 -mr-2 text-[#8B8B8B] hover:text-[#C9A45C] transition-colors"
          aria-label="Close mobile menu"
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Instant Action Highlight */}
      <div className="my-4 p-3.5 bg-gradient-to-r from-[#C9A45C]/15 to-transparent border-l-2 border-[#C9A45C] flex items-center justify-between">
        <div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9A45C] font-mono font-medium block">
            FEATURED FRAGRANCE
          </span>
          <span className="text-sm font-editorial text-[#F3F0E8]">
            Oud Noir (50ml) &bull; ₹1,299
          </span>
        </div>
        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            buyNow(FRAGRANCES[0], 1);
          }}
          className="py-1.5 px-3 bg-[#C9A45C] text-[#050505] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#F3F0E8] flex items-center gap-1 shadow-sm"
        >
          <Zap className="w-3 h-3 fill-current" />
          <span>BUY</span>
        </button>
      </div>

      {/* Navigation Links with Descriptive Details */}
      <nav className="flex flex-col space-y-4 my-2 text-left">
        <button
          onClick={() => handleLink('collection')}
          className="group text-left py-2 border-b border-white/[0.04]"
        >
          <div className="flex items-center justify-between">
            <span className="font-editorial text-2xl sm:text-3xl text-[#F3F0E8] group-hover:text-[#C9A45C] uppercase tracking-[0.08em] font-light transition-colors">
              01 &bull; PARFUMS COLLECTION
            </span>
            <ArrowRight className="w-4 h-4 text-[#8B8B8B] group-hover:text-[#C9A45C] group-hover:translate-x-1 transition-all" />
          </div>
          <span className="text-[10px] text-[#8B8B8B] tracking-wider block mt-0.5 font-light">
            Oud Noir &bull; Royal Amber &bull; Imperial Musk
          </span>
        </button>

        <button
          onClick={() => handleLink('attars')}
          className="group text-left py-2 border-b border-white/[0.04]"
        >
          <div className="flex items-center justify-between">
            <span className="font-editorial text-2xl sm:text-3xl text-[#F3F0E8] group-hover:text-[#C9A45C] uppercase tracking-[0.08em] font-light transition-colors">
              02 &bull; TRADITIONAL ATTARS
            </span>
            <ArrowRight className="w-4 h-4 text-[#8B8B8B] group-hover:text-[#C9A45C] group-hover:translate-x-1 transition-all" />
          </div>
          <span className="text-[10px] text-[#8B8B8B] tracking-wider block mt-0.5 font-light">
            Pure Kannauj Distilled Oils (12ml)
          </span>
        </button>

        <button
          onClick={() => handleLink('discovery')}
          className="group text-left py-2 border-b border-white/[0.04]"
        >
          <div className="flex items-center justify-between">
            <span className="font-editorial text-2xl sm:text-3xl text-[#F3F0E8] group-hover:text-[#C9A45C] uppercase tracking-[0.08em] font-light transition-colors flex items-center gap-2">
              <span>03 &bull; DISCOVERY SET</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-[#C9A45C]/20 text-[#C9A45C] border border-[#C9A45C]/40 font-mono">
                ₹499
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-[#8B8B8B] group-hover:text-[#C9A45C] group-hover:translate-x-1 transition-all" />
          </div>
          <span className="text-[10px] text-[#8B8B8B] tracking-wider block mt-0.5 font-light">
            Includes ₹200 voucher redeemable on full bottle
          </span>
        </button>

        <button
          onClick={() => handleLink('story')}
          className="group text-left py-2 border-b border-white/[0.04]"
        >
          <div className="flex items-center justify-between">
            <span className="font-editorial text-2xl sm:text-3xl text-[#F3F0E8] group-hover:text-[#C9A45C] uppercase tracking-[0.08em] font-light transition-colors">
              04 &bull; HERITAGE & ATELIER
            </span>
            <ArrowRight className="w-4 h-4 text-[#8B8B8B] group-hover:text-[#C9A45C] group-hover:translate-x-1 transition-all" />
          </div>
          <span className="text-[10px] text-[#8B8B8B] tracking-wider block mt-0.5 font-light">
            400-Year Deg-Bhapka Steam Extraction
          </span>
        </button>

        <button
          onClick={() => handleLink('faq')}
          className="group text-left py-2"
        >
          <div className="flex items-center justify-between">
            <span className="font-editorial text-2xl sm:text-3xl text-[#8B8B8B] group-hover:text-[#F3F0E8] uppercase tracking-[0.08em] font-light transition-colors">
              05 &bull; INQUIRIES & FAQ
            </span>
            <ArrowRight className="w-4 h-4 text-[#8B8B8B] group-hover:text-[#F3F0E8] group-hover:translate-x-1 transition-all" />
          </div>
          <span className="text-[10px] text-[#8B8B8B] tracking-wider block mt-0.5 font-light">
            Shipping, authentic longevity & UPI assistance
          </span>
        </button>
      </nav>

      {/* Bottom utilities */}
      <div className="pt-4 border-t border-white/[0.08] space-y-3">
        {/* Instant Buy All-in-one */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            if (cartCount === 0) {
              buyNow(FRAGRANCES[0], 1);
            } else {
              setIsCheckoutOpen(true);
            }
          }}
          className="w-full py-3.5 bg-[#C9A45C] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{cartCount > 0 ? `CHECKOUT (\u20B9${cartTotal.toLocaleString('en-IN')})` : 'BUY OUD NOIR NOW (\u20B91,299)'}</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="flex items-center justify-center gap-2 py-2.5 border border-white/20 text-[10px] uppercase tracking-widest text-[#F3F0E8] hover:border-[#C9A45C]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>SEARCH</span>
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="flex items-center justify-center gap-2 py-2.5 bg-white/10 border border-white/20 text-[#F3F0E8] text-[10px] uppercase tracking-widest font-medium"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>BAG ({cartCount})</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#8B8B8B] pt-2">
          <span>🇮🇳 PAN-INDIA SHIPPING</span>
          <a
            href={`https://wa.me/${getMerchantWhatsApp()}?text=${encodeURIComponent('Hello VÉRAN Atelier, I would like to inquire about placing an order.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A45C] hover:underline flex items-center gap-1 font-mono"
          >
            <Phone className="w-2.5 h-2.5" />
            <span>WHATSAPP SUPPORT</span>
          </a>
        </div>
      </div>
    </div>
  );
};
