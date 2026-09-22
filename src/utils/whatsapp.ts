import { CartItem } from '../types';

export interface OrderCustomerDetails {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: string;
  specialNotes?: string;
  orderNumber: string;
  upiUtr?: string;
  storeUpiId?: string;
}

export const DEFAULT_MERCHANT_PHONE = '919999999999';

export const getMerchantWhatsApp = (): string => {
  const saved = localStorage.getItem('veran_merchant_whatsapp');
  if (saved && saved.trim().length >= 10) {
    return cleanPhoneNumber(saved);
  }
  return DEFAULT_MERCHANT_PHONE;
};

export const setMerchantWhatsApp = (phone: string): string => {
  const cleaned = cleanPhoneNumber(phone);
  localStorage.setItem('veran_merchant_whatsapp', cleaned);
  return cleaned;
};

export const cleanPhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  } else if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = '91' + cleaned.substring(1);
  }
  return cleaned;
};

export const formatWhatsAppOrderMessage = (
  order: OrderCustomerDetails,
  items: CartItem[],
  total: number
): string => {
  const dateStr = new Date().toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const itemsFormatted = items
    .map((item, i) => {
      const p = item.product;
      return `${i + 1}. *${p.name}* (${p.volume || '50ml'})
   Qty: ${item.quantity} × ₹${p.price.toLocaleString('en-IN')} = ₹${(p.price * item.quantity).toLocaleString('en-IN')}`;
    })
    .join('\n');

  const paymentModeLabel =
    order.paymentMethod === 'upi'
      ? `Direct UPI Prepaid (${order.storeUpiId || 'za7602293@oksbi'})`
      : order.paymentMethod === 'cod'
      ? 'Cash on Delivery (COD)'
      : 'Card / NetBanking';

  return `🛍️ *NEW ORDER - VÉRAN HAUTE PARFUMERIE*
━━━━━━━━━━━━━━━━━━━━━━━━
🆔 *Order ID:* ${order.orderNumber}
📅 *Time:* ${dateStr}

👤 *CUSTOMER DETAILS:*
• *Name:* ${order.fullName}
• *Phone / WhatsApp:* ${order.phone}
• *Email:* ${order.email || 'Not provided'}

📍 *DELIVERY ADDRESS:*
• *Address:* ${order.address}
• *City & State:* ${order.city}, ${order.state}
• *Pincode:* ${order.pincode}
${order.specialNotes ? `• *Customer Note:* ${order.specialNotes}\n` : ''}
📦 *ORDERED FRAGRANCES:*
${itemsFormatted}

💰 *PAYMENT & BILLING:*
• *Order Total:* ₹${total.toLocaleString('en-IN')}
• *Shipping:* FREE (Insured Pan-India Express)
• *Payment Mode:* ${paymentModeLabel}
${order.upiUtr ? `• *UPI Transaction UTR / Ref:* ${order.upiUtr}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━
✨ _Kindly confirm receipt and dispatch tracking details to the customer._`;
};

export const getWhatsAppOrderLink = (
  merchantPhone: string,
  order: OrderCustomerDetails,
  items: CartItem[],
  total: number
): string => {
  const message = formatWhatsAppOrderMessage(order, items, total);
  const cleanPhone = cleanPhoneNumber(merchantPhone || getMerchantWhatsApp());
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};
