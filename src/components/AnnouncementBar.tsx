import React, { useState, useEffect } from 'react';
import { Truck, Sparkles, ShieldCheck, Phone, Check } from 'lucide-react';
import { getMerchantWhatsApp } from '../utils/whatsapp';

export const AnnouncementBar: React.FC = () => {
  const [merchantPhone, setMerchantPhone] = useState(() => getMerchantWhatsApp());

  useEffect(() => {
    setMerchantPhone(getMerchantWhatsApp());
  }, []);
  const announcements = [
    {
      text: 'COMPLIMENTARY SHIPPING & 2 SAMPLE VIALS WITH ALL ORDERS',
      highlight: 'FREE DELIVERY',
      code: 'PAN-INDIA'
    },
    {
      text: 'DIRECT UPI INSTANT CHECKOUT (za7602293@oksbi) • 100% SECURE',
      highlight: 'VERIFIED UPI',
      code: 'ZERO FEE'
    },
    {
      text: 'ARTISANAL STEAM DISTILLED PERFUMERY • KANNAUJ & ASSAM AGARWOOD',
      highlight: 'EXTRAIT DE PARFUM',
      code: '40% CONCENTRATION'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div
      id="announcement-bar"
      className="relative z-50 bg-[#0a0a0a] border-b border-white/[0.06] text-[#F3F0E8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.2em] flex items-center justify-between">
        {/* Left: Region & Currency */}
        <div className="hidden lg:flex items-center gap-2 text-[#8B8B8B]">
          <span className="text-xs">🇮🇳</span>
          <span className="font-mono text-[#C9A45C]">INR (₹)</span>
          <span className="text-white/20">•</span>
          <span className="text-[10px] tracking-widest text-[#8B8B8B]">INDIA ATELIER</span>
        </div>

        {/* Center: Dynamic Animated Announcement */}
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="flex items-center gap-2 transition-all duration-700">
            <Sparkles className="w-3 h-3 text-[#C9A45C] shrink-0 animate-pulse" />
            <span className="text-[#F3F0E8] font-light">
              {announcements[currentIndex].text}
            </span>
            <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#C9A45C]/15 text-[#C9A45C] border border-[#C9A45C]/30">
              {announcements[currentIndex].code}
            </span>
          </div>
        </div>

        {/* Right: Concierge & Fast Help */}
        <div className="hidden lg:flex items-center gap-4 text-[#8B8B8B]">
          <span className="flex items-center gap-1.5 hover:text-[#C9A45C] transition-colors cursor-default">
            <ShieldCheck className="w-3 h-3 text-[#C9A45C]" />
            <span>ORIGINAL GUARANTEE</span>
          </span>
          <span className="text-white/20">•</span>
          <a
            href={`https://wa.me/${merchantPhone}?text=${encodeURIComponent('Hello VÉRAN Atelier, I have an inquiry regarding haute fragrances.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-[#C9A45C] transition-colors"
          >
            <Phone className="w-2.5 h-2.5 text-[#C9A45C]" />
            <span>CONCIERGE</span>
          </a>
        </div>
      </div>
    </div>
  );
};
