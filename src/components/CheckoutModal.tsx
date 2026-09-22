import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  QrCode, 
  Copy, 
  Check, 
  ExternalLink,
  Edit2,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Share2
} from 'lucide-react';
import QRCode from 'qrcode';
import { useCart } from '../context/CartContext';
import { FRAGRANCES, DISCOVERY_SET } from '../data/fragrances';
import {
  getMerchantWhatsApp,
  setMerchantWhatsApp,
  formatWhatsAppOrderMessage,
  getWhatsAppOrderLink,
  OrderCustomerDetails
} from '../utils/whatsapp';

// Clean, recognized WhatsApp Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, discount, clearCart, addToCart } = useCart();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Delhi',
    pincode: '',
    paymentMethod: 'upi',
    specialNotes: ''
  });

  // Default UPI ID for the store (Merchant receiving account)
  const PRIMARY_STORE_UPI = 'za7602293@oksbi';
  const [storeUpiId, setStoreUpiId] = useState(() => {
    const saved = localStorage.getItem('veran_merchant_upi');
    if (!saved || saved.includes('@icici') || saved === 'veran.atelier@icici') {
      localStorage.setItem('veran_merchant_upi', PRIMARY_STORE_UPI);
      return PRIMARY_STORE_UPI;
    }
    return saved;
  });
  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [customUpiInput, setCustomUpiInput] = useState(storeUpiId);

  // Store WhatsApp State (where customer order details will arrive)
  const [merchantWhatsApp, setMerchantWhatsAppState] = useState(() => getMerchantWhatsApp());
  const [isEditingWhatsApp, setIsEditingWhatsApp] = useState(false);
  const [customWhatsAppInput, setCustomWhatsAppInput] = useState(merchantWhatsApp);
  const [whatsAppUrl, setWhatsAppUrl] = useState('');
  const [copiedSlip, setCopiedSlip] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState<{
    items: typeof cart;
    total: number;
    orderDetails: OrderCustomerDetails;
  } | null>(null);

  // UPI Transaction tracking
  const [upiUtr, setUpiUtr] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  // Checkout steps
  const [step, setStep] = useState<'details' | 'upi_pay' | 'success'>('details');
  const [orderNumber, setOrderNumber] = useState('');

  // Generate UPI Intent URL:
  // upi://pay?pa=VPA&pn=NAME&am=AMOUNT&cu=INR&tn=ORDER_ID
  const currentOrderId = orderNumber || 'VRN-PENDING';
  const upiPayUrl = `upi://pay?pa=${storeUpiId}&pn=VERAN%20ATELIER&am=${cartTotal}&cu=INR&tn=Order%20${currentOrderId}`;

  // Generate QR Code whenever cartTotal, storeUpiId, or orderNumber changes
  useEffect(() => {
    if (cartTotal > 0) {
      QRCode.toDataURL(upiPayUrl, {
        width: 280,
        margin: 1,
        color: {
          dark: '#050505',
          light: '#F3F0E8'
        }
      })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error('QR code generation error:', err));
    }
  }, [upiPayUrl, cartTotal]);

  if (!isCheckoutOpen) return null;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(storeUpiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSaveCustomUpi = () => {
    if (customUpiInput.trim()) {
      setStoreUpiId(customUpiInput.trim());
      localStorage.setItem('veran_merchant_upi', customUpiInput.trim());
      setIsEditingUpi(false);
    }
  };

  const handleSaveCustomWhatsApp = () => {
    if (customWhatsAppInput.trim()) {
      const saved = setMerchantWhatsApp(customWhatsAppInput.trim());
      setMerchantWhatsAppState(saved);
      setIsEditingWhatsApp(false);
      if (orderSnapshot) {
        const link = getWhatsAppOrderLink(saved, orderSnapshot.orderDetails, orderSnapshot.items, orderSnapshot.total);
        setWhatsAppUrl(link);
      }
    }
  };

  // Helper to compile and trigger WhatsApp order
  const buildAndSendWhatsAppOrder = (
    orderNum: string,
    targetForm: typeof form,
    utrVal?: string
  ) => {
    const currentItems = cart.length > 0 ? cart : (orderSnapshot?.items || []);
    const currentTotal = cartTotal > 0 ? cartTotal : (orderSnapshot?.total || 0);

    const details: OrderCustomerDetails = {
      fullName: targetForm.fullName.trim() || 'Patron of VÉRAN',
      phone: targetForm.phone.trim(),
      email: targetForm.email.trim(),
      address: targetForm.address.trim(),
      city: targetForm.city.trim(),
      state: targetForm.state.trim(),
      pincode: targetForm.pincode.trim(),
      paymentMethod: targetForm.paymentMethod,
      specialNotes: targetForm.specialNotes?.trim(),
      orderNumber: orderNum,
      upiUtr: utrVal || upiUtr,
      storeUpiId: storeUpiId
    };

    setOrderSnapshot({
      items: [...currentItems],
      total: currentTotal,
      orderDetails: details
    });

    const link = getWhatsAppOrderLink(merchantWhatsApp, details, currentItems, currentTotal);
    setWhatsAppUrl(link);

    // Auto-open WhatsApp in new window/tab
    try {
      window.open(link, '_blank');
    } catch (err) {
      console.error('WhatsApp redirect:', err);
    }

    return link;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `VRN-2026-${randomNum}`;
    setOrderNumber(newOrderId);

    // Snapshot cart items and details before changing step
    const details: OrderCustomerDetails = {
      fullName: form.fullName.trim() || 'Patron of VÉRAN',
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pincode: form.pincode.trim(),
      paymentMethod: form.paymentMethod,
      specialNotes: form.specialNotes?.trim(),
      orderNumber: newOrderId,
      storeUpiId: storeUpiId
    };

    setOrderSnapshot({
      items: [...cart],
      total: cartTotal,
      orderDetails: details
    });

    if (form.paymentMethod === 'upi') {
      setStep('upi_pay');
    } else {
      // COD or Card
      buildAndSendWhatsAppOrder(newOrderId, form);
      setStep('success');
      clearCart();
    }
  };

  const handleConfirmUpiPayment = (e: React.FormEvent) => {
    e.preventDefault();
    buildAndSendWhatsAppOrder(orderNumber, form, upiUtr);
    setStep('success');
    clearCart();
  };

  const handleDirectWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.phone.trim() || !form.address.trim()) {
      alert('Please fill your Full Name, Phone Number, and Delivery Address to dispatch your order details to WhatsApp.');
      return;
    }
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `VRN-2026-${randomNum}`;
    setOrderNumber(newOrderId);
    buildAndSendWhatsAppOrder(newOrderId, form);
    setStep('success');
    clearCart();
  };

  const handleCopyOrderSlip = () => {
    if (!orderSnapshot) return;
    const text = formatWhatsAppOrderMessage(
      orderSnapshot.orderDetails,
      orderSnapshot.items,
      orderSnapshot.total
    );
    navigator.clipboard.writeText(text);
    setCopiedSlip(true);
    setTimeout(() => setCopiedSlip(false), 2500);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('details');
    setUpiUtr('');
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        id="checkout-modal-container"
        className="relative bg-[#0D0D0D] border border-white/[0.12] max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-10 my-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-[#8B8B8B] hover:text-[#F3F0E8] transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* STEP: SUCCESS */}
        {step === 'success' ? (
          <div className="text-center py-8 space-y-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-[#25D366] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#25D366]" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#25D366] uppercase block mb-2">
                ORDER COMMISSIONED &bull; READY FOR WHATSAPP TRANSMISSION
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#F3F0E8] uppercase tracking-wide font-light">
                THANK YOU FOR ACQUIRING VÉRAN
              </h3>
            </div>

            <p className="text-sm text-[#8B8B8B] max-w-md mx-auto font-light leading-relaxed">
              Order <span className="font-mono text-[#F3F0E8] font-bold">{orderNumber}</span> has been logged. Customer details and delivery address are formatted below for WhatsApp dispatch to our atelier desk.
            </p>

            {/* Prominent WhatsApp Dispatch Card */}
            <div className="bg-[#0A140E] border border-[#25D366]/40 p-5 max-w-lg mx-auto text-left space-y-3.5 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#25D366]/20 pb-2.5">
                <div className="flex items-center gap-2 text-[#25D366]">
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span className="text-xs uppercase tracking-[0.2em] font-bold">
                    WHATSAPP ORDER SLIP
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#8B8B8B]">
                  TO: +{merchantWhatsApp}
                </span>
              </div>

              <p className="text-xs text-[#E0E0E0] font-light leading-relaxed">
                Customer ki saari details (Name, Phone, Address, Ordered Fragrances aur Payment UTR) WhatsApp message me compile ho chuki hain. Neeche click karke WhatsApp par order bhejein:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <a
                  href={whatsAppUrl || getWhatsAppOrderLink(merchantWhatsApp, orderSnapshot?.orderDetails || {
                    fullName: form.fullName,
                    phone: form.phone,
                    address: form.address,
                    city: form.city,
                    state: form.state,
                    pincode: form.pincode,
                    paymentMethod: form.paymentMethod,
                    orderNumber
                  }, orderSnapshot?.items || [], orderSnapshot?.total || cartTotal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#20be5a] text-[#050505] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>SEND ON WHATSAPP</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyOrderSlip}
                  className="py-3 px-4 bg-[#050505] border border-white/20 hover:border-[#25D366] text-[#F3F0E8] text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  {copiedSlip ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSlip ? 'COPIED TO CLIPBOARD' : 'COPY ORDER SLIP'}</span>
                </button>
              </div>

              {/* Editable Merchant WhatsApp Number */}
              <div className="pt-2 border-t border-white/[0.08] text-[10px] text-[#8B8B8B] flex items-center justify-between">
                {isEditingWhatsApp ? (
                  <div className="flex items-center gap-2 w-full mt-1">
                    <input
                      type="text"
                      placeholder="e.g. 9876543210 (10-digit WhatsApp No.)"
                      value={customWhatsAppInput}
                      onChange={(e) => setCustomWhatsAppInput(e.target.value)}
                      className="bg-[#050505] border border-white/30 px-2.5 py-1 text-xs text-[#F3F0E8] font-mono flex-1 focus:outline-none focus:border-[#25D366]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveCustomWhatsApp}
                      className="px-2.5 py-1 bg-[#25D366] text-[#050505] text-[10px] uppercase font-semibold"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingWhatsApp(false)}
                      className="px-2 py-1 text-[#8B8B8B] text-[10px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <span>Deliver to: <strong className="font-mono text-[#F3F0E8]">+{merchantWhatsApp}</strong></span>
                    <button
                      type="button"
                      onClick={() => setIsEditingWhatsApp(true)}
                      className="text-[#25D366] hover:underline flex items-center gap-1 font-mono"
                    >
                      <Edit2 className="w-2.5 h-2.5" />
                      <span>Change WhatsApp Number</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Comprehensive Customer Details Table */}
            <div className="bg-[#050505] border border-white/[0.08] p-6 max-w-lg mx-auto text-left space-y-2.5 text-xs text-[#8B8B8B]">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#C9A45C] font-mono mb-2">
                CUSTOMER & DISPATCH RECORD
              </div>
              <div className="flex justify-between">
                <span>Customer Name:</span>
                <span className="text-[#F3F0E8] font-medium">{form.fullName || orderSnapshot?.orderDetails?.fullName || 'Patron'}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone / WhatsApp:</span>
                <span className="text-[#F3F0E8] font-mono">{form.phone || orderSnapshot?.orderDetails?.phone || '—'}</span>
              </div>
              {form.email && (
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="text-[#F3F0E8]">{form.email}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="text-[#C9A45C] font-mono uppercase">
                  {form.paymentMethod === 'upi' ? 'Direct UPI (Prepaid)' : form.paymentMethod.toUpperCase()}
                </span>
              </div>
              {upiUtr && (
                <div className="flex justify-between">
                  <span>UPI Reference / UTR:</span>
                  <span className="text-[#25D366] font-mono">{upiUtr}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="text-[#F3F0E8] font-mono font-medium">₹{(orderSnapshot?.total || cartTotal).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <span className="text-[#F3F0E8] text-right max-w-[60%] truncate">
                  {form.address}, {form.city}, {form.pincode}
                </span>
              </div>
              <div className="flex justify-between border-t border-white/[0.08] pt-2 text-[#C9A45C]">
                <span>Insured Courier:</span>
                <span>BlueDart Air Express (2-3 Days)</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="mt-6 px-8 py-3.5 bg-[#F3F0E8] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#C9A45C] transition-colors"
            >
              RETURN TO ATELIER
            </button>
          </div>
        ) : step === 'upi_pay' ? (
          /* STEP: DIRECT UPI PAYMENT SCREEN */
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-white/[0.08] pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] font-mono block mb-1">
                  SEAMLESS UPI COMMISSION
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#F3F0E8] uppercase tracking-wide font-light">
                  PAY VIA UPI &bull; ₹{cartTotal.toLocaleString('en-IN')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#8B8B8B] hover:text-[#F3F0E8] uppercase tracking-wider underline underline-offset-4"
              >
                &larr; Back to Details
              </button>
            </div>

            {/* Quick Mobile UPI Intent Trigger */}
            <div className="bg-[#050505] border border-[#C9A45C]/30 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-[#F3F0E8] font-medium flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#C9A45C]" />
                  METHOD A: ONE-TAP PAYMENT (MOBILE APPS)
                </span>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider">0% SURCHARGE</span>
              </div>
              <p className="text-xs text-[#8B8B8B] font-light leading-relaxed">
                Clicking below automatically opens Google Pay, PhonePe, Paytm, or CRED with the exact amount (₹{cartTotal}) and Order ID ({orderNumber}) pre-filled:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={upiPayUrl}
                  className="flex items-center justify-center gap-2.5 py-3 px-4 bg-[#F3F0E8] text-[#050505] hover:bg-[#C9A45C] transition-all text-xs font-medium uppercase tracking-wider rounded-none"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>PAY VIA ANY UPI APP</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0D0D0D] border border-white/10 text-xs">
                  <div className="overflow-hidden">
                    <span className="text-[9px] uppercase tracking-widest text-[#8B8B8B] block">STORE UPI ID</span>
                    <span className="font-mono text-[#F3F0E8] truncate block">{storeUpiId}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="p-2 text-[#8B8B8B] hover:text-[#C9A45C] transition-colors"
                    title="Copy UPI ID"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Customizable UPI ID helper for store owner */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#8B8B8B]">
                {isEditingUpi ? (
                  <div className="flex items-center gap-2 w-full">
                    <input
                      type="text"
                      placeholder="e.g. 9876543210@paytm or yourname@okhdfcbank"
                      value={customUpiInput}
                      onChange={(e) => setCustomUpiInput(e.target.value)}
                      className="bg-[#050505] border border-white/30 px-3 py-1 text-xs text-[#F3F0E8] font-mono flex-1 focus:outline-none focus:border-[#C9A45C]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveCustomUpi}
                      className="px-3 py-1 bg-[#C9A45C] text-[#050505] text-[10px] uppercase tracking-widest font-medium"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingUpi(false)}
                      className="px-2 py-1 text-[#8B8B8B] hover:text-[#F3F0E8] text-[10px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingUpi(true)}
                    className="text-[10px] text-[#8B8B8B]/80 hover:text-[#C9A45C] flex items-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Change merchant UPI ID to your own ID / Phone number</span>
                  </button>
                )}
              </div>
            </div>

            {/* Method B: QR Code Scanning */}
            <div className="bg-[#050505] border border-white/[0.08] p-5 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0 bg-[#F3F0E8] p-3 rounded-none shadow-lg">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt={`UPI QR Code for ₹${cartTotal}`}
                    className="w-44 h-44 object-contain"
                  />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center text-xs text-[#050505]">
                    Generating QR...
                  </div>
                )}
              </div>

              <div className="space-y-3 text-left">
                <span className="text-xs uppercase tracking-wider text-[#F3F0E8] font-medium flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-[#C9A45C]" />
                  METHOD B: SCAN WITH ANY PHONE CAMERA / UPI APP
                </span>
                <p className="text-xs text-[#8B8B8B] font-light leading-relaxed">
                  Open <strong>Google Pay, PhonePe, Paytm, CRED, or BHIM</strong> on your phone and scan this QR code. The exact payable amount of <strong>₹{cartTotal.toLocaleString('en-IN')}</strong> will appear automatically.
                </p>
                <div className="text-[11px] font-mono text-[#C9A45C] space-y-1">
                  <div>&bull; Recipient: VÉRAN ATELIER ({storeUpiId})</div>
                  <div>&bull; Reference: {orderNumber}</div>
                </div>
              </div>
            </div>

            {/* Step to finalize and confirm */}
            <form onSubmit={handleConfirmUpiPayment} className="space-y-4 pt-2">
              <div className="bg-[#050505] border border-white/[0.08] p-4 space-y-3">
                <label className="text-xs uppercase tracking-wider text-[#F3F0E8] font-medium block">
                  ALREADY TRANSFERRED? ENTER UPI 12-DIGIT REF / UTR (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 423987123456 (Found in UPI receipt)"
                  value={upiUtr}
                  onChange={(e) => setUpiUtr(e.target.value)}
                  className="w-full bg-[#0D0D0D] border border-white/20 p-3 text-xs text-[#F3F0E8] font-mono placeholder:text-[#8B8B8B]/40 focus:outline-none focus:border-[#C9A45C]"
                />
                <p className="text-[10px] text-[#8B8B8B]">
                  * Entering the UTR allows our dispatch desk to reconcile your payment immediately without manual delays.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#C9A45C] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#F3F0E8] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>I HAVE PAID &bull; CONFIRM MY ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* STEP: CLIENT DETAILS & PAYMENT METHOD SELECTION */
          <div>
            {/* Modal Title */}
            <div className="mb-8 pb-4 border-b border-white/[0.08]">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C9A45C] font-mono block mb-1">
                SECURE COMMISSION
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F3F0E8] uppercase tracking-wide font-light">
                CHECKOUT
              </h2>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-6">
                <ShoppingBag className="w-12 h-12 stroke-[1] text-[#C9A45C] mx-auto opacity-70" />
                <div>
                  <h3 className="font-editorial text-2xl text-[#F3F0E8] uppercase tracking-wide">
                    YOUR BAG IS EMPTY
                  </h3>
                  <p className="text-xs text-[#8B8B8B] max-w-sm mx-auto mt-2 leading-relaxed">
                    Select a fragrance below to proceed to direct UPI payment to <span className="text-[#C9A45C] font-mono">{storeUpiId}</span>:
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => addToCart(FRAGRANCES[0], 1)}
                    className="flex-1 py-3 px-4 bg-[#C9A45C] text-[#050505] text-[11px] uppercase tracking-widest font-medium hover:bg-[#F3F0E8] transition-all"
                  >
                    + ADD OUD NOIR (₹1,299)
                  </button>
                  <button
                    type="button"
                    onClick={() => addToCart(DISCOVERY_SET, 1)}
                    className="flex-1 py-3 px-4 border border-white/20 text-[#F3F0E8] text-[11px] uppercase tracking-widest font-medium hover:border-[#C9A45C] hover:text-[#C9A45C] transition-all"
                  >
                    + ADD DISCOVERY SET (₹499)
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleProceedToPayment} className="space-y-8">
              {/* Client Info */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#F3F0E8] font-medium">
                  01 / CLIENT CONTACT
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8B8B8B] block mb-1">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vikramaditya Rao"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full bg-[#050505] border border-white/20 p-3 text-xs text-[#F3F0E8] placeholder:text-[#8B8B8B]/40 focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8B8B8B] block mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="client@domain.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#050505] border border-white/20 p-3 text-xs text-[#F3F0E8] placeholder:text-[#8B8B8B]/40 focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8B8B8B] block mb-1">
                    Phone Number (for Courier & UPI updates) *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#050505] border border-white/20 p-3 text-xs text-[#F3F0E8] placeholder:text-[#8B8B8B]/40 focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-[0.25em] text-[#F3F0E8] font-medium">
                  02 / DELIVERY ADDRESS
                </h3>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#8B8B8B] block mb-1">
                    Street Address / Residence *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Apartment, suite, street name"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full bg-[#050505] border border-white/20 p-3 text-xs text-[#F3F0E8] placeholder:text-[#8B8B8B]/40 focus:outline-none focus:border-[#C9A45C]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8B8B8B] block mb-1">
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full bg-[#050505] border border-white/20 p-3 text-xs text-[#F3F0E8] placeholder:text-[#8B8B8B]/40 focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8B8B8B] block mb-1">
                      State *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Maharashtra"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full bg-[#050505] border border-white/20 p-3 text-xs text-[#F3F0E8] placeholder:text-[#8B8B8B]/40 focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#8B8B8B] block mb-1">
                      Pin Code *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="400001"
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      className="w-full bg-[#050505] border border-white/20 p-3 text-xs text-[#F3F0E8] placeholder:text-[#8B8B8B]/40 focus:outline-none focus:border-[#C9A45C]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-[#F3F0E8] font-medium">
                    03 / PAYMENT METHOD
                  </h3>
                  <span className="text-[10px] font-mono text-[#C9A45C]">RECOMMENDED: UPI</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`border p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors relative ${
                      form.paymentMethod === 'upi'
                        ? 'border-[#C9A45C] bg-[#C9A45C]/10 ring-1 ring-[#C9A45C]'
                        : 'border-white/10 bg-[#050505] hover:border-white/30'
                    }`}
                  >
                    <span className="absolute top-2 right-2 text-[8px] bg-[#C9A45C] text-[#050505] font-bold px-1.5 py-0.5 tracking-wider">
                      INSTANT
                    </span>
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={form.paymentMethod === 'upi'}
                      onChange={() => setForm({ ...form, paymentMethod: 'upi' })}
                      className="sr-only"
                    />
                    <Smartphone className="w-5 h-5 text-[#C9A45C]" />
                    <span className="text-xs uppercase tracking-wider text-[#F3F0E8] font-medium">UPI &bull; QR Code</span>
                    <span className="text-[9px] text-[#8B8B8B]">GPay, PhonePe, Paytm</span>
                  </label>

                  <label
                    className={`border p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                      form.paymentMethod === 'card'
                        ? 'border-[#C9A45C] bg-white/[0.04]'
                        : 'border-white/10 bg-[#050505] hover:border-white/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={form.paymentMethod === 'card'}
                      onChange={() => setForm({ ...form, paymentMethod: 'card' })}
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 text-[#C9A45C]" />
                    <span className="text-xs uppercase tracking-wider text-[#F3F0E8]">Cards</span>
                    <span className="text-[9px] text-[#8B8B8B]">Visa, Master, Amex</span>
                  </label>

                  <label
                    className={`border p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${
                      form.paymentMethod === 'cod'
                        ? 'border-[#C9A45C] bg-white/[0.04]'
                        : 'border-white/10 bg-[#050505] hover:border-white/30'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={form.paymentMethod === 'cod'}
                      onChange={() => setForm({ ...form, paymentMethod: 'cod' })}
                      className="sr-only"
                    />
                    <Banknote className="w-5 h-5 text-[#C9A45C]" />
                    <span className="text-xs uppercase tracking-wider text-[#F3F0E8]">Pay on Delivery</span>
                    <span className="text-[9px] text-[#8B8B8B]">Cash / UPI at doorstep</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Line */}
              <div className="bg-[#050505] p-5 border border-white/[0.08] space-y-2 text-xs">
                <div className="flex justify-between text-[#8B8B8B]">
                  <span>Order Items:</span>
                  <span>{cart.length} item(s)</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#C9A45C]">
                    <span>Privilege Discount:</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#8B8B8B]">
                  <span>Insured Shipping:</span>
                  <span className="text-emerald-400 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm text-[#F3F0E8] pt-2 border-t border-white/[0.08]">
                  <span className="uppercase tracking-wider">Total Payable:</span>
                  <span className="font-mono font-medium text-[#C9A45C]">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* WhatsApp Notification Notice */}
              <div className="bg-[#0A140E] border border-[#25D366]/30 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#25D366] font-semibold flex items-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    AUTOMATIC WHATSAPP ORDER DISPATCH
                  </span>
                  <span className="text-[10px] text-[#8B8B8B] font-mono">
                    +{merchantWhatsApp}
                  </span>
                </div>
                <p className="text-[11px] text-[#8B8B8B] font-light leading-relaxed">
                  Order confirm hote hi, customer ka poora naam, phone, delivery address, ordered items aur payment details direct atelier ke WhatsApp par dispatch ho jayengi for immediate confirmation.
                </p>

                {isEditingWhatsApp ? (
                  <div className="flex items-center gap-2 w-full pt-1">
                    <input
                      type="text"
                      placeholder="e.g. 9876543210 (10-digit Phone No.)"
                      value={customWhatsAppInput}
                      onChange={(e) => setCustomWhatsAppInput(e.target.value)}
                      className="bg-[#050505] border border-white/30 px-2.5 py-1 text-xs text-[#F3F0E8] font-mono flex-1 focus:outline-none focus:border-[#25D366]"
                    />
                    <button
                      type="button"
                      onClick={handleSaveCustomWhatsApp}
                      className="px-2.5 py-1 bg-[#25D366] text-[#050505] text-[10px] uppercase font-semibold"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingWhatsApp(false)}
                      className="px-2 py-1 text-[#8B8B8B] text-[10px]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[10px]">
                    <span className="text-[#8B8B8B]">Receiving Number: <strong className="text-[#F3F0E8] font-mono">+{merchantWhatsApp}</strong></span>
                    <button
                      type="button"
                      onClick={() => setIsEditingWhatsApp(true)}
                      className="text-[#25D366] hover:underline flex items-center gap-1 font-mono"
                    >
                      <Edit2 className="w-2.5 h-2.5" />
                      <span>Change WhatsApp Number</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Submit CTAs */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#F3F0E8] text-[#050505] text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#C9A45C] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                >
                  {form.paymentMethod === 'upi'
                    ? `CONTINUE TO UPI PAYMENT \u2022 \u20B9${cartTotal.toLocaleString('en-IN')}`
                    : `CONFIRM ORDER & SEND TO WHATSAPP \u2022 \u20B9${cartTotal.toLocaleString('en-IN')}`}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsAppOrder}
                  className="w-full py-3.5 px-6 bg-[#25D366]/15 border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-[#050505] text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>DIRECT 1-CLICK ORDER VIA WHATSAPP</span>
                </button>
              </div>
            </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
