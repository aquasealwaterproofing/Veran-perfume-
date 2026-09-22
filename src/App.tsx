import React, { useCallback } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FirstFragrance } from './components/FirstFragrance';
import { ScentProfile } from './components/ScentProfile';
import { Collection } from './components/Collection';
import { DiscoverySet } from './components/DiscoverySet';
import { AttarSection } from './components/AttarSection';
import { BrandManifesto } from './components/BrandManifesto';
import { StorySection } from './components/StorySection';
import { SocialProof } from './components/SocialProof';
import { InstagramGallery } from './components/InstagramGallery';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchDrawer } from './components/SearchDrawer';
import { MobileMenu } from './components/MobileMenu';

const MainLayout: React.FC = () => {
  const { activeProductModal, setActiveProductModal } = useCart();

  const handleNavigate = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F0E8] selection:bg-[#C9A45C]/25 selection:text-[#F3F0E8] relative">
      {/* Ultra-minimal transparent Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Content Flow */}
      <main className="w-full overflow-hidden">
        {/* SECTION 01 — HERO */}
        <Hero onDiscover={() => handleNavigate('first-fragrance')} />

        {/* SECTION 02 — THE FIRST FRAGRANCE (Giant Editorial Presentation) */}
        <FirstFragrance />

        {/* SECTION 03 — SCENT PROFILE (Olfactory Architecture) */}
        <ScentProfile />

        {/* SECTION 04 — THE COLLECTION (Only 3 Fragrances in Editorial Grid) */}
        <Collection />

        {/* SECTION 05 — DISCOVERY SET (Deep Charcoal Background, Gift Experience) */}
        <DiscoverySet />

        {/* SECTION 06 — ATTAR (Rooted in Tradition) */}
        <AttarSection />

        {/* SECTION 07 — BRAND MANIFESTO (Full-width minimalist statement) */}
        <BrandManifesto />

        {/* SECTION 08 — STORY (Split Editorial Layout) */}
        <StorySection />

        {/* SECTION 09 — SOCIAL PROOF (The Impression — Demo/Placeholder Reviews) */}
        <SocialProof />

        {/* SECTION 10 — INSTAGRAM (@VERAN.FRAGRANCE Visual Gallery) */}
        <InstagramGallery />

        {/* SECTION 11 — FAQ (Minimal Accordion) */}
        <FAQSection />
      </main>

      {/* FOOTER */}
      <Footer onNavigate={handleNavigate} />

      {/* E-Commerce Interactive Drawers & Modals */}
      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
        />
      )}

      <CartDrawer />
      <CheckoutModal />
      <SearchDrawer />
      <MobileMenu onNavigate={handleNavigate} />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}
