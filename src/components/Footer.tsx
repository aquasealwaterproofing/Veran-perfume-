import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer
      id="main-footer"
      className="relative w-full bg-[#050505] pt-24 pb-16 px-6 md:px-12 border-t border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
          {/* Brand Wordmark & Tagline */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
            <div>
              <a
                href="#hero"
                onClick={(e) => handleLinkClick(e, 'hero')}
                className="font-editorial text-3xl sm:text-4xl tracking-[0.25em] text-[#F3F0E8] font-light uppercase block mb-4"
              >
                VÉRAN
              </a>
              <p className="text-xs tracking-[0.3em] uppercase text-[#8B8B8B] font-light max-w-xs leading-relaxed">
                WEAR THE UNFORGETTABLE.
              </p>
              <p className="mt-6 text-xs text-[#8B8B8B]/70 font-light leading-relaxed max-w-sm">
                A modern Indian luxury fragrance brand combining sophisticated perfumes with traditional attar culture.
              </p>
            </div>

            <div className="mt-8 text-[10px] tracking-[0.25em] uppercase text-[#8B8B8B]/60 font-mono">
              NEW DELHI &bull; KANNAUJ &bull; ASSAM
            </div>
          </div>

          {/* Navigation Links Group 1: Shop */}
          <div className="md:col-span-3 lg:col-span-3">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#F3F0E8] font-medium block mb-6">
              SHOP
            </span>
            <ul className="space-y-4 text-xs uppercase tracking-[0.25em] text-[#8B8B8B] font-light">
              <li>
                <a
                  href="#collection"
                  onClick={(e) => handleLinkClick(e, 'collection')}
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  href="#attars"
                  onClick={(e) => handleLinkClick(e, 'attars')}
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Attars
                </a>
              </li>
              <li>
                <a
                  href="#discovery"
                  onClick={(e) => handleLinkClick(e, 'discovery')}
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Discovery Set
                </a>
              </li>
              <li>
                <a
                  href="#story"
                  onClick={(e) => handleLinkClick(e, 'story')}
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="mailto:concierge@veranfragrance.com"
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links Group 2: House & Legal */}
          <div className="md:col-span-3 lg:col-span-4">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#F3F0E8] font-medium block mb-6">
              LEGAL & ATELIER
            </span>
            <ul className="space-y-4 text-xs uppercase tracking-[0.25em] text-[#8B8B8B] font-light">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleLinkClick(e, 'faq')}
                  className="hover:text-[#F3F0E8] transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Bottom Copyright */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#8B8B8B]">
          <div>&copy; 2026 V&Eacute;RAN. ALL RIGHTS RESERVED.</div>
          <div className="mt-4 sm:mt-0 font-mono text-[#8B8B8B]/60">
            HAUTE FRAGRANCE &bull; INDIA
          </div>
        </div>
      </div>
    </footer>
  );
};
