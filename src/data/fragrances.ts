import { Product, Review, FAQItem } from '../types';

export const FRAGRANCES: Product[] = [
  {
    id: 'oud-noir',
    number: '01',
    name: 'OUD NOIR',
    subtitle: 'OUD / SAFFRON / LEATHER',
    tagline: 'Dark. Warm. Distinct.',
    description: 'A dark composition built around rich oud, warm saffron and polished leather.',
    editorialQuote: 'A nocturnal aura for individuals whose quiet confidence commands the room before a word is spoken.',
    price: 1299,
    volume: '50 ML',
    concentration: 'EAU DE PARFUM',
    category: 'perfume',
    notes: {
      top: ['Kashmiri Saffron', 'Black Pepper', 'Cardamom'],
      heart: ['Smoky Assam Oud', 'Taif Rose', 'Cistus Incanus'],
      base: ['Polished Leather', 'Dark Cedar', 'Birch Tar', 'Amber']
    },
    notesSummary: 'Oud • Saffron • Leather',
    intensity: 'Intense',
    longevity: '12+ Hours on skin, 24+ on fabrics',
    sillage: 'Commanding and enveloping',
    character: ['Smoky', 'Leathery', 'Resinous', 'Opulent'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: 'royal-amber',
    number: '02',
    name: 'ROYAL AMBER',
    subtitle: 'AMBER / VANILLA / MUSK',
    tagline: 'Gilded. Sensual. Luminous.',
    description: 'A molten warmth that melts into skin—sun-drenched fossilized amber draped in Bourbon vanilla and smoky musk.',
    editorialQuote: 'An intoxicating evening silhouette that radiates warmth in cool winter air and leaves a golden trail.',
    price: 1299,
    volume: '50 ML',
    concentration: 'EAU DE PARFUM',
    category: 'perfume',
    notes: {
      top: ['Bergamot Peel', 'Golden Saffron', 'Nutmeg'],
      heart: ['Fossilized Amber', 'Bourbon Vanilla', 'Benzoin Siam'],
      base: ['Cashmeran', 'Smoky Musk', 'Sandalwood Mysore']
    },
    notesSummary: 'Amber / Vanilla / Musk',
    intensity: 'Deep',
    longevity: '10–12 Hours',
    sillage: 'Warm & magnetic intimate projection',
    character: ['Golden', 'Balsamic', 'Gourmand Wood', 'Velvety'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: 'imperial-musk',
    number: '03',
    name: 'IMPERIAL MUSK',
    subtitle: 'WHITE MUSK / WOODS / AMBER',
    tagline: 'Pure. Architectural. Unspoken.',
    description: 'Second-skin clean musk structured over distilled Virginia cedar and dry crystal amber.',
    editorialQuote: 'Neither heavy nor sweet—a pristine, sculpted masculine silhouette that feels like clean linen draped over warm marble.',
    price: 1299,
    volume: '50 ML',
    concentration: 'EAU DE PARFUM',
    category: 'perfume',
    notes: {
      top: ['White Angelica Root', 'Cold Aldehydes', 'Juniper Berry'],
      heart: ['Florentine Orris', 'Pure White Musk', 'Frankincense'],
      base: ['Atlas Cedarwood', 'Dry Amber', 'Clean Vetiver']
    },
    notesSummary: 'White Musk / Woods / Amber',
    intensity: 'Sublime',
    longevity: '10+ Hours skin persistence',
    sillage: 'Subtle halo that lingers gracefully',
    character: ['Crisp', 'Architectural', 'Earthy', 'Sophisticated'],
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: 'discovery-set',
    number: '00',
    name: 'VÉRAN DISCOVERY SET',
    subtitle: '4 × 5ML SAMPLES',
    tagline: 'Four signatures. One discovery set.',
    description: 'Experience Oud Noir, Royal Amber, Imperial Musk, and our signature Royal Oud Attar before committing to a full flacon.',
    editorialQuote: 'Includes a ₹200 privilege voucher redeemable against your first full-size bottle or attar within 60 days.',
    price: 499,
    volume: '4 × 5 ML',
    concentration: 'DISCOVERY SET',
    category: 'discovery',
    notes: {
      top: ['Oud Noir (5ml EDP)', 'Royal Amber (5ml EDP)'],
      heart: ['Imperial Musk (5ml EDP)'],
      base: ['Dehn Al Oud (2.5ml Attar Oil)']
    },
    notesSummary: '4 Sample Vials in Matte Charcoal Box',
    intensity: 'Medium',
    longevity: 'Complete sensory exploration',
    sillage: 'Varies by vial',
    character: ['Curated', 'Refined', 'Travel-Ready', 'Complimentary Voucher'],
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=1600&auto=format&fit=crop',
    isFeatured: false
  },
  {
    id: 'oud-attar',
    number: 'A1',
    name: 'OUD ATTAR',
    subtitle: 'PURE CONCENTRATED OIL / 12ML',
    tagline: 'Aged. Sacred. Ancient.',
    description: 'Alcohol-free 100% pure attar oil distilled from aged Assam agarwood chips over a traditional hydro-distillation copper vessel.',
    editorialQuote: 'Applied with the traditional crystal rod directly to pulse points. One drop provides a profound, meditative presence that endures from dusk till dawn.',
    price: 1599,
    volume: '12 ML',
    concentration: 'PURE CONCENTRATED ATTAR',
    category: 'attar',
    notes: {
      top: ['Smoked Earth', 'Aged Bark'],
      heart: ['Dark Assam Agarwood Resin', 'Spiced Balsam'],
      base: ['Cured Leather', 'Sacred Frankincense']
    },
    notesSummary: 'Pure Aged Assam Agarwood Oil',
    intensity: 'Intense',
    longevity: '18–24 Hours on skin',
    sillage: 'Intimate, deep, meditative aura',
    character: ['Traditional', 'Sacred', 'Alcohol-Free', 'Potent'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1600&auto=format&fit=crop',
    isFeatured: true
  },
  {
    id: 'musk-attar',
    number: 'A2',
    name: 'MUSK ATTAR',
    subtitle: 'PURE CONCENTRATED OIL / 12ML',
    tagline: 'Velvet. Animalic. Unfiltered.',
    description: 'A deeply rich, cruelty-free botanical black musk oil crafted with ambrette seeds and warm amber resin.',
    editorialQuote: 'Blends seamlessly with your individual body chemistry to radiate an enigmatic, magnetic trail.',
    price: 1499,
    volume: '12 ML',
    concentration: 'PURE CONCENTRATED ATTAR',
    category: 'attar',
    notes: {
      top: ['Ambrette Seed', 'White Pepper'],
      heart: ['Rich Dark Musk Concentrate', 'Labdanum'],
      base: ['Warm Amber Resins', 'Smoked Vetiver']
    },
    notesSummary: 'Botanical Black Musk & Golden Amber Resin',
    intensity: 'Deep',
    longevity: '16+ Hours on skin',
    sillage: 'Magnetic, close skin contact',
    character: ['Sensual', 'Alcohol-Free', 'Warm', 'Hypnotic'],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1600&auto=format&fit=crop',
    isFeatured: false
  },
  {
    id: 'rose-attar',
    number: 'A3',
    name: 'ROSE ATTAR',
    subtitle: 'PURE CONCENTRATED OIL / 12ML',
    tagline: 'Damascus Petals. Pure Sandalwood.',
    description: 'Ruh Gulab—thousands of fresh Kannauj Damascus rose blossoms distilled slowly into a base of pure Mysore sandalwood oil.',
    editorialQuote: 'A nocturnal, regal Indian rose devoid of powdery sweetness; dark, velvety, and anchored by sacred sandalwood.',
    price: 1699,
    volume: '12 ML',
    concentration: 'PURE CONCENTRATED ATTAR',
    category: 'attar',
    notes: {
      top: ['Kannauj Damascus Rose Petals', 'Morning Dew'],
      heart: ['Deep Crimson Rose Otto', 'Cardamom'],
      base: ['Mysore Sandalwood Base', 'Dry Saffron']
    },
    notesSummary: 'Ruh Gulab Distilled in Sandalwood',
    intensity: 'Deep',
    longevity: '14+ Hours on skin',
    sillage: 'Noble and poetic projection',
    character: ['Regal', 'Velvety', 'Sacred', 'Alcohol-Free'],
    image: 'https://images.unsplash.com/photo-1519669011783-4eaa95fa1b7d?q=80&w=1600&auto=format&fit=crop',
    isFeatured: false
  }
];

export const DISCOVERY_SET: Product = FRAGRANCES.find((f) => f.id === 'discovery-set') || FRAGRANCES[3];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    quote: 'The sillage of Oud Noir is unlike anything in commercial perfumery. It leaves an intoxicating, smoky leather trail that lingers in the elevator minutes after you leave.',
    author: 'Editorial Tester / Batch #001',
    city: 'Mumbai',
    scent: 'OUD NOIR',
    rating: 5,
    note: 'DEMO / PRE-LAUNCH EDITORIAL REVIEW'
  },
  {
    id: 'rev-2',
    quote: 'Rooted in tradition yet sharp and modern. The Discovery Set let me explore both the Eau de Parfum and the pure attar oils before selecting Royal Amber.',
    author: 'Fragrance Archivist / Trial Panel',
    city: 'New Delhi',
    scent: 'ROYAL AMBER & DISCOVERY SET',
    rating: 5,
    note: 'DEMO / PRE-LAUNCH EDITORIAL REVIEW'
  },
  {
    id: 'rev-3',
    quote: 'Imperial Musk feels like an architectural statement. Restrained, clean, masculine, and completely devoid of artificial sweetness. Truly an unforgettable presence.',
    author: 'Design Director / Early Panelist',
    city: 'Bengaluru',
    scent: 'IMPERIAL MUSK',
    rating: 5,
    note: 'DEMO / PRE-LAUNCH EDITORIAL REVIEW'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is the difference between perfume and attar?',
    answer: 'Eau de Parfum is an alcohol-based formulation that provides expansive aerosol projection and immediate sillage upon spray. Attar is a 100% pure, alcohol-free perfume oil concentrated via traditional hydro-distillation. Attars wear closer to the skin, react intimately with your natural body warmth, and often last considerably longer without alcohol evaporation.'
  },
  {
    id: 'faq-2',
    question: 'How long does the fragrance last?',
    answer: 'Our Eau de Parfum formulations have a high 22–25% oil concentration (Extrait strength standards), yielding 10 to 14+ hours of noticeable longevity on skin and over 24 hours on wool or cotton. Our pure Attars, applied with the traditional glass wand, last 14 to 24+ hours on skin due to their dense oil carrier.'
  },
  {
    id: 'faq-3',
    question: 'Do you offer samples?',
    answer: 'Yes. The VÉRAN Discovery Set features 4 × 5ml miniature glass flacons (Oud Noir, Royal Amber, Imperial Musk, and our signature Dehn Al Oud Attar) for ₹499. Every discovery set includes an exclusive ₹200 privilege voucher redeemable against your first full-size bottle.'
  },
  {
    id: 'faq-4',
    question: 'How should I store my fragrance?',
    answer: 'Keep your flacons and attar vials away from direct sunlight, extreme heat, and bathroom humidity. Store them in a cool, dark drawer, wardrobe, or the included matte presentation box to preserve delicate top notes like saffron and rose over years.'
  },
  {
    id: 'faq-5',
    question: 'Do you ship across India?',
    answer: 'Yes. We provide complimentary express insured delivery across all serviceable pin codes in India via premium courier partners. Delivery to metro cities typically takes 2–3 business days; other regions take 4–5 business days.'
  },
  {
    id: 'faq-6',
    question: 'What is your return policy?',
    answer: 'Because fine fragrances are personal care items, opened full-size flacons cannot be returned. However, every order is backed by our transit guarantee: if damaged in transit, we issue immediate replacements. We highly recommend starting with the Discovery Set to test each scent on your skin first.'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    title: 'Oud Noir in obsidian light',
    tag: '#VeranFragrance'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop',
    title: 'Warm amber refractions in private study',
    tag: '#WearTheUnforgettable'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
    title: 'Traditional copper deg hydro-distillation',
    tag: '#IndianAttar'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=800&auto=format&fit=crop',
    title: 'Imperial Musk on carved black stone',
    tag: '#NicheFragrance'
  }
];
