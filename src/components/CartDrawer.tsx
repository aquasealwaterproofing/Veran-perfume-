import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ArrowRight, Sparkles, ShoppingBag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FRAGRANCES, DISCOVERY_SET } from '../data/fragrances';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    addToCart,
    buyNow,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    couponCode,
    applyCoupon,
    removeCoupon,
    couponError,
    setActiveProductModal
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = applyCoupon(inputCode);
    if (success) setInputCode('');
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#050505]/80 backdrop-blur-sm flex justify-end"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer-container"
        className="w-full max-w-md bg-[#0D0D0D] border-l border-white/[0.12] h-full flex flex-col justify-between p-6 md:p-8 animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-2xl text-[#F3F0E8] tracking-[0.08em] uppercase font-light">
              YOUR BAG
            </span>
            <span className="text-xs font-mono text-[#8B8B8B]">
              ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>

          <button
            id="close-cart-btn"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content Area */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <ShoppingBag className="w-10 h-10 stroke-[1] text-[#8B8B8B]/40" />
            <p className="font-editorial text-xl text-[#F3F0E8] uppercase tracking-wider font-light">
              YOUR BAG IS EMPTY
            </p>
            <p className="text-xs text-[#8B8B8B] font-light max-w-xs leading-relaxed">
              Test purchase right now with direct UPI payment:
            </p>

            <div className="w-full space-y-2.5 pt-2">
              <button
                id="cart-empty-add-oud"
                onClick={() => {
                  buyNow(FRAGRANCES[0], 1);
                }}
                className="w-full py-3 px-4 bg-[#C9A45C] text-[#050505] text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-[#F3F0E8] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>BUY OUD NOIR &bull; ₹1,299 (UPI)</span>
              </button>

              <button
                id="cart-empty-add-discovery"
                onClick={() => {
                  buyNow(DISCOVERY_SET, 1);
                }}
                className="w-full py-3 px-4 border border-white/20 text-[#F3F0E8] text-[10px] uppercase tracking-[0.25em] font-medium hover:border-[#C9A45C] hover:text-[#C9A45C] transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>BUY DISCOVERY SET &bull; ₹499</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-6 space-y-6 divide-y divide-white/[0.06]">
            {cart.map((item) => (
              <div key={item.product.id} className="pt-6 first:pt-0 flex gap-4">
                {/* Thumbnail */}
                <div
                  className="w-20 h-24 bg-[#050505] overflow-hidden flex-shrink-0 cursor-pointer border border-white/[0.08]"
                  onClick={() => {
                    setActiveProductModal(item.product);
                    setIsCartOpen(false);
                  }}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4
                        className="font-editorial text-lg text-[#F3F0E8] uppercase tracking-wide cursor-pointer hover:text-[#C9A45C] transition-colors"
                        onClick={() => {
                          setActiveProductModal(item.product);
                          setIsCartOpen(false);
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#8B8B8B] hover:text-red-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] uppercase tracking-wider text-[#8B8B8B] mt-0.5">
                      {item.product.volume} &bull; {item.product.concentration}
                    </div>

                    <div className="text-xs text-[#F3F0E8] font-mono mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-white/20 px-2 py-0.5 space-x-3 bg-[#050505]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-[#8B8B8B] hover:text-[#F3F0E8] text-xs"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[11px] font-mono w-4 text-center text-[#F3F0E8]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-[#8B8B8B] hover:text-[#F3F0E8] text-xs"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs text-[#F3F0E8] font-mono font-medium">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer with Voucher and Checkout */}
        {cart.length > 0 && (
          <div className="pt-6 border-t border-white/[0.08] space-y-4">
            {/* Voucher Code Form */}
            {couponCode ? (
              <div className="flex items-center justify-between bg-white/[0.04] border border-[#C9A45C]/40 px-3 py-2 text-xs">
                <div className="flex items-center gap-2 text-[#C9A45C]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-mono uppercase">{couponCode} APPLIED (-₹{discount})</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-[#8B8B8B] hover:text-[#F3F0E8] text-[10px] uppercase tracking-wider"
                >
                  REMOVE
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="PRIVILEGE CODE (e.g. DISCOVERY200)"
                    className="flex-1 bg-[#050505] border border-white/20 px-3 py-2 text-[10px] tracking-widest uppercase text-[#F3F0E8] placeholder:text-[#8B8B8B]/60 focus:outline-none focus:border-[#C9A45C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 border border-white/20 text-[10px] uppercase tracking-[0.2em] text-[#F3F0E8] hover:border-[#C9A45C] hover:text-[#C9A45C] transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-red-400 font-light">{couponError}</p>
                )}
              </form>
            )}

            {/* Totals */}
            <div className="space-y-2 text-xs text-[#8B8B8B] font-light">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#F3F0E8]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#C9A45C]">
                  <span>Privilege Voucher</span>
                  <span className="font-mono">-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-[#F3F0E8] uppercase tracking-wider text-[10px]">COMPLIMENTARY</span>
              </div>
              <div className="flex justify-between text-base text-[#F3F0E8] font-normal pt-2 border-t border-white/[0.08]">
                <span>Total</span>
                <span className="font-mono">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="proceed-checkout-btn"
              onClick={handleProceedCheckout}
              className="w-full py-4 px-6 bg-[#C9A45C] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#F3F0E8] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>PROCEED TO UPI CHECKOUT &bull; ₹{cartTotal.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
