import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Heart, 
  Zap, 
  ChevronDown, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Droplets
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES, DISCOVERY_SET } from '../data/fragrances';
import { AnnouncementBar } from './AnnouncementBar';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const {
    cartCount,
    cartTotal,
    setIsCartOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    setIsCheckoutOpen,
    buyNow,
    wishlist,
    setActiveProductModal
  } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    onNavigate(id);
  };

  const perfumes = FRAGRANCES.slice(0, 3); // Oud Noir, Royal Amber, Imperial Musk
  const attars = FRAGRANCES.filter((f) => f.category === 'attar');

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-[#C9A45C]/25 shadow-[0_12px_40px_rgba(0,0,0,0.85)]'
          : 'bg-gradient-to-b from-[#050505] via-[#050505]/85 to-transparent'
      }`}
    >
      {/* Top Luxury Announcement Ribbon - Smooth collapse on scroll */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          scrolled ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-12 opacity-100'
        }`}
      >
        <AnnouncementBar />
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'py-3 md:py-3.5' : 'py-3.5 md:py-5'
      }`}>
        {/* Mobile Left: Menu Toggle Button */}
        <div className="md:hidden flex items-center">
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-[#F3F0E8] hover:text-[#C9A45C] transition-colors flex items-center gap-1.5"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8B8B8B] hidden sm:inline">MENU</span>
          </button>
        </div>

        {/* Brand Logo with Monogram Crest */}
        <div className="flex items-center">
          <a
            id="brand-logo"
            href="#hero"
            onClick={(e) => handleLinkClick(e, 'hero')}
            className="group flex items-center gap-3 text-left"
          >
            {/* Elegant Luxury Gilded Crest */}
            <div className="relative w-8 h-8 md:w-9 md:h-9 border border-[#C9A45C]/60 rotate-45 flex items-center justify-center bg-black/40 group-hover:border-[#C9A45C] group-hover:shadow-[0_0_15px_rgba(201,164,92,0.35)] transition-all duration-300">
              <span className="-rotate-45 font-editorial text-sm md:text-base font-semibold text-[#C9A45C] tracking-tighter">
                V
              </span>
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#C9A45C] rounded-full opacity-60" />
            </div>

            <div className="flex flex-col">
              <span className="font-editorial text-2xl md:text-3xl tracking-[0.28em] text-[#F3F0E8] font-light group-hover:text-[#C9A45C] transition-colors duration-300 uppercase leading-none">
                VÉRAN
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.38em] text-[#C9A45C]/80 font-mono mt-0.5">
                HAUTE PARFUMERIE
              </span>
            </div>
          </a>
        </div>

        {/* Center: Desktop Navigation with Mega Menus */}
        <nav
          id="desktop-nav"
          className="hidden md:flex items-center space-x-1 lg:space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#F3F0E8]/85 font-medium"
        >
          {/* Collection Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('collection')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              id="nav-collection"
              href="#collection"
              onClick={(e) => handleLinkClick(e, 'collection')}
              className={`px-3 py-2 rounded flex items-center gap-1 transition-all duration-200 ${
                activeDropdown === 'collection' ? 'text-[#C9A45C] bg-white/[0.04]' : 'hover:text-[#C9A45C]'
              }`}
            >
              <span>PARFUMS</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'collection' ? 'rotate-180 text-[#C9A45C]' : 'opacity-60'}`} />
            </a>

            {/* Parfums Dropdown Menu */}
            {activeDropdown === 'collection' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-[#0c0c0c]/98 border border-[#C9A45C]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-5 backdrop-blur-2xl rounded-none z-50 animate-fadeIn"
                onMouseEnter={() => handleMouseEnter('collection')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <span className="text-[10px] tracking-[0.25em] text-[#C9A45C] font-mono uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    SIGNATURE EXTRAIT DE PARFUM (50ML)
                  </span>
                  <button
                    onClick={(e) => handleLinkClick(e, 'collection')}
                    className="text-[9px] uppercase tracking-wider text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
                  >
                    VIEW ALL &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {perfumes.map((perfume) => (
                    <div
                      key={perfume.id}
                      className="group/item relative bg-white/[0.02] border border-white/[0.06] hover:border-[#C9A45C]/50 p-2.5 transition-all text-left flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-square w-full overflow-hidden bg-black/60 mb-2 relative">
                          <img
                            src={perfume.image}
                            alt={perfume.name}
                            className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-1 right-1 text-[8px] px-1 py-0.5 bg-black/80 text-[#C9A45C] font-mono border border-[#C9A45C]/30">
                            ₹{perfume.price}
                          </span>
                        </div>
                        <h4 className="font-editorial text-sm text-[#F3F0E8] group-hover/item:text-[#C9A45C] transition-colors">
                          {perfume.name}
                        </h4>
                        <p className="text-[9px] text-[#8B8B8B] tracking-normal line-clamp-1 mt-0.5">
                          {perfume.notes.heart.join(', ')}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center justify-between">
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            setActiveProductModal(perfume);
                          }}
                          className="text-[9px] uppercase tracking-wider text-[#8B8B8B] hover:text-[#F3F0E8]"
                        >
                          DETAILS
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            buyNow(perfume, 1);
                          }}
                          className="text-[9px] uppercase tracking-wider font-semibold text-[#050505] bg-[#C9A45C] px-2 py-0.5 hover:bg-[#F3F0E8] transition-colors flex items-center gap-0.5"
                        >
                          <Zap className="w-2.5 h-2.5 fill-current" />
                          <span>BUY</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Attars Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter('attars')}
            onMouseLeave={handleMouseLeave}
          >
            <a
              id="nav-attars"
              href="#attars"
              onClick={(e) => handleLinkClick(e, 'attars')}
              className={`px-3 py-2 rounded flex items-center gap-1 transition-all duration-200 ${
                activeDropdown === 'attars' ? 'text-[#C9A45C] bg-white/[0.04]' : 'hover:text-[#C9A45C]'
              }`}
            >
              <span>PURE ATTARS</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === 'attars' ? 'rotate-180 text-[#C9A45C]' : 'opacity-60'}`} />
            </a>

            {/* Attars Dropdown Menu */}
            {activeDropdown === 'attars' && (
              <div 
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[440px] bg-[#0c0c0c]/98 border border-[#C9A45C]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-5 backdrop-blur-2xl rounded-none z-50 animate-fadeIn"
                onMouseEnter={() => handleMouseEnter('attars')}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <span className="text-[10px] tracking-[0.25em] text-[#C9A45C] font-mono uppercase flex items-center gap-1.5">
                    <Droplets className="w-3 h-3" />
                    PURE CONCENTRATED OIL EXTRACTS (12ML)
                  </span>
                  <button
                    onClick={(e) => handleLinkClick(e, 'attars')}
                    className="text-[9px] uppercase tracking-wider text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
                  >
                    EXPLORE ALL &rarr;
                  </button>
                </div>

                <div className="space-y-2.5">
                  {attars.map((attar) => (
                    <div
                      key={attar.id}
                      className="group/item flex items-center justify-between p-2.5 bg-white/[0.02] border border-white/[0.06] hover:border-[#C9A45C]/40 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={attar.image}
                          alt={attar.name}
                          className="w-10 h-10 object-cover border border-white/10"
                        />
                        <div>
                          <h4 className="font-editorial text-sm text-[#F3F0E8] group-hover/item:text-[#C9A45C] transition-colors">
                            {attar.name}
                          </h4>
                          <p className="text-[10px] text-[#8B8B8B]">
                            {attar.concentration} &bull; {attar.notes.heart.join(', ')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#F3F0E8]">
                          ₹{attar.price}
                        </span>
                        <button
                          onClick={() => {
                            setActiveDropdown(null);
                            buyNow(attar, 1);
                          }}
                          className="px-2.5 py-1 bg-[#C9A45C] text-[#050505] text-[9px] uppercase tracking-wider font-semibold hover:bg-[#F3F0E8] transition-colors"
                        >
                          BUY NOW
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Discovery Link */}
          <a
            id="nav-discovery"
            href="#discovery"
            onClick={(e) => handleLinkClick(e, 'discovery')}
            className="px-3 py-2 hover:text-[#C9A45C] transition-colors flex items-center gap-1.5"
          >
            <span>DISCOVERY SET</span>
            <span className="px-1.5 py-0.2 bg-[#C9A45C]/20 text-[#C9A45C] text-[8px] font-mono border border-[#C9A45C]/40">
              ₹499
            </span>
          </a>

          {/* Story Link */}
          <a
            id="nav-story"
            href="#story"
            onClick={(e) => handleLinkClick(e, 'story')}
            className="px-3 py-2 hover:text-[#C9A45C] transition-colors"
          >
            STORY
          </a>
        </nav>

        {/* Right: Search, Wishlist, Bag & Direct Checkout */}
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-5 text-[#F3F0E8]">
          {/* Quick Search */}
          <button
            id="header-search-btn"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:text-[#C9A45C] transition-colors flex items-center gap-1.5 text-xs text-[#8B8B8B] hover:border-white/20"
            aria-label="Search fragrances"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden xl:inline text-[10px] tracking-widest text-[#8B8B8B]">SEARCH</span>
          </button>

          {/* Wishlist Icon */}
          <button
            id="header-wishlist-btn"
            onClick={() => onNavigate('collection')}
            className="relative p-2 hover:text-[#C9A45C] transition-colors"
            aria-label="View wishlist"
          >
            <Heart className={`w-4 h-4 stroke-[1.5] ${wishlist.length > 0 ? 'fill-[#C9A45C] text-[#C9A45C]' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute 1 top-0.5 right-0.5 text-[9px] w-3.5 h-3.5 flex items-center justify-center bg-[#C9A45C] text-[#050505] rounded-full font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            id="header-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:text-[#C9A45C] transition-colors flex items-center gap-2 group"
            aria-label="View shopping bag"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[9px] min-w-4 h-4 px-1 flex items-center justify-center bg-[#C9A45C] text-[#050505] rounded-full font-bold shadow-md">
                  {cartCount}
                </span>
              )}
            </div>

            {cartCount > 0 ? (
              <span className="hidden sm:inline text-[11px] font-mono text-[#C9A45C] tracking-wide font-medium">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            ) : (
              <span className="hidden lg:inline text-[10px] tracking-[0.2em] uppercase text-[#8B8B8B]">
                BAG
              </span>
            )}
          </button>

          {/* Elevated Luxury Direct Buy Button */}
          <button
            id="header-buy-now-btn"
            onClick={() => {
              if (cartCount === 0) {
                buyNow(FRAGRANCES[0], 1);
              } else {
                setIsCheckoutOpen(true);
              }
            }}
            className="relative group overflow-hidden py-2 px-3 sm:px-4 bg-[#C9A45C] hover:bg-[#dfb96f] text-[#050505] text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-medium transition-all duration-300 shadow-[0_4px_20px_rgba(201,164,92,0.3)] flex items-center gap-1.5"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <Zap className="w-3 h-3 fill-current shrink-0" />
            <span className="font-semibold whitespace-nowrap">
              {cartCount > 0 ? 'CHECKOUT' : 'BUY NOW'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
