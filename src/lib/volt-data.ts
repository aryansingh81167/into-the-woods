
export interface VoltProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  image: string;
  category: 'Smartphones' | 'Laptops' | 'Audio' | 'Smart Home' | 'Accessories' | 'PCs' | 'Home Appliances' | 'Tablets' | 'TV & Display' | 'Gaming';
  rating: number;
  reviews: number;
  description: string;
  features: string[];
}

export const voltProductData: VoltProduct[] = [
  // Smartphones (7)
  {
    id: 'volt-1',
    name: 'Nebula X1 Pro',
    brand: 'Stellar',
    price: 3299,
    originalPrice: 3599,
    discount: 'Save Ð300',
    image: 'https://picsum.photos/seed/nebula-phone/600/600',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 1258,
    description: 'The flagship Nebula X1 Pro with a stunning 120Hz display and pro-grade camera system.',
    features: ['6.7" Super-AMOLED Display', 'Stellar Fusion A17 Chip', '108MP Triple Camera', '5000mAh Battery', '120W Fast Charging']
  },
  {
    id: 'volt-2',
    name: 'Orbit One',
    brand: 'GalaxyWorks',
    price: 1899,
    image: 'https://picsum.photos/seed/orbit-phone/600/600',
    category: 'Smartphones',
    rating: 4.6,
    reviews: 982,
    description: 'A perfect balance of performance and price, the Orbit One is the best all-rounder.',
    features: ['6.5" LCD Display', 'GW Snapdragon 8 Gen 1', '50MP Dual Camera', '4800mAh Battery', '67W Fast Charging']
  },
  {
    id: 'volt-3',
    name: 'Pixelix 5a',
    brand: 'AlphaBet',
    price: 2499,
    image: 'https://picsum.photos/seed/pixelix-phone/600/600',
    category: 'Smartphones',
    rating: 4.9,
    reviews: 2103,
    description: 'Experience computational photography at its best with the Pixelix 5a.',
    features: ['6.4" OLED Display', 'Alpha Tensor G2', '12.2MP Dual-Pixel Camera', '4680mAh Battery', 'AI-powered Features']
  },
  {
    id: 'volt-sm4',
    name: 'Vortex V-Fold',
    brand: 'Stellar',
    price: 6999,
    image: 'https://picsum.photos/seed/v-fold-phone/600/600',
    category: 'Smartphones',
    rating: 4.7,
    reviews: 450,
    description: 'The future unfolds with the Vortex V-Fold, featuring a revolutionary foldable display.',
    features: ['7.6" Foldable AMOLED Display', 'Stellar Fusion A17 Chip', 'Under-display Camera', 'All-day Battery Life']
  },
  {
    id: 'volt-sm5',
    name: 'Nova Lite',
    brand: 'GalaxyWorks',
    price: 1199,
    image: 'https://picsum.photos/seed/nova-lite-phone/600/600',
    category: 'Smartphones',
    rating: 4.4,
    reviews: 1530,
    description: 'Affordable without compromise. The Nova Lite offers a large display and a massive battery.',
    features: ['6.8" HD+ Display', 'MediaTek Helio G88', '48MP Main Camera', '6000mAh Battery']
  },
  {
    id: 'volt-sm6',
    name: 'GamerzPhone 7',
    brand: 'Apex',
    price: 3999,
    image: 'https://picsum.photos/seed/gamerz-phone/600/600',
    category: 'Smartphones',
    rating: 4.8,
    reviews: 890,
    description: 'Dominate the competition with the GamerzPhone 7, built for peak mobile gaming performance.',
    features: ['144Hz AMOLED Display', 'Snapdragon 8+ Gen 2', 'Air Triggers', 'Advanced Cooling System']
  },
  {
    id: 'volt-sm7',
    name: 'Element Compact',
    brand: 'Stellar',
    price: 2899,
    image: 'https://picsum.photos/seed/element-compact/600/600',
    category: 'Smartphones',
    rating: 4.6,
    reviews: 720,
    description: 'All the power of a flagship in a compact, one-hand-friendly design.',
    features: ['5.9" 120Hz AMOLED Display', 'Stellar Fusion A17 Chip', 'Gimbal Camera System', 'Compact & Lightweight']
  },

  // Laptops (7)
  {
    id: 'volt-4',
    name: 'AeroBook Pro 14',
    brand: 'Nimbus',
    price: 6499,
    image: 'https://picsum.photos/seed/aerobook/600/600',
    category: 'Laptops',
    rating: 4.9,
    reviews: 890,
    description: 'Unleash your creativity with the powerful and lightweight AeroBook Pro.',
    features: ['14" Liquid Retina XDR Display', 'Nimbus M3 Pro Chip', '18-hour Battery Life', 'Magic Keyboard', '1080p FaceTime Camera']
  },
  {
    id: 'volt-5',
    name: 'Zenith Blade 15',
    brand: 'Apex',
    price: 5899,
    originalPrice: 6299,
    discount: '10% OFF',
    image: 'https://picsum.photos/seed/zenith-laptop/600/600',
    category: 'Laptops',
    rating: 4.7,
    reviews: 641,
    description: 'The ultimate gaming laptop with a high-refresh-rate display and dedicated graphics.',
    features: ['15.6" QHD 240Hz Display', 'Intel Core i9-13900HX', 'NVIDIA GeForce RTX 4070', 'Per-key RGB Keyboard', 'Advanced Vapor Chamber Cooling']
  },
  {
    id: 'volt-6',
    name: 'Surface Craft 3',
    brand: 'MegaSoft',
    price: 4599,
    image: 'https://picsum.photos/seed/surface-craft/600/600',
    category: 'Laptops',
    rating: 4.6,
    reviews: 552,
    description: 'The versatile 2-in-1 that adapts to you, with a stunning touchscreen and detachable keyboard.',
    features: ['13.5" PixelSense Touchscreen', 'Intel Core i7 Processor', 'Detachable Keyboard', 'Surface Pen Support', 'Windows 11 Pro']
  },
  {
    id: 'volt-lp4',
    name: 'ChronoBook 13',
    brand: 'AlphaBet',
    price: 1499,
    image: 'https://picsum.photos/seed/chronobook-13/600/600',
    category: 'Laptops',
    rating: 4.5,
    reviews: 2450,
    description: 'Simple, fast, and secure. The perfect laptop for everyday tasks and browsing.',
    features: ['13.3" Full HD Display', 'Intel Pentium Processor', 'ChromeOS', 'All-day Battery Life']
  },
  {
    id: 'volt-lp5',
    name: 'Creator Studio 16',
    brand: 'Nimbus',
    price: 11999,
    image: 'https://picsum.photos/seed/creator-studio-16/600/600',
    category: 'Laptops',
    rating: 4.9,
    reviews: 450,
    description: 'The ultimate mobile workstation for creative professionals, with a stunning 4K OLED display.',
    features: ['16" 4K OLED Touch Display', 'Intel Core i9-13980HX', 'NVIDIA RTX 4080 Studio', '32GB DDR5 RAM', '2TB NVMe SSD']
  },
  {
    id: 'volt-lp6',
    name: 'Traveler Ultralight',
    brand: 'Zenith',
    price: 3499,
    image: 'https://picsum.photos/seed/traveler-ultralight/600/600',
    category: 'Laptops',
    rating: 4.7,
    reviews: 888,
    description: 'Weighing just under 1kg, this is the perfect companion for professionals on the move.',
    features: ['13" QHD+ Display', 'Intel Core i5 Evo', 'Magnesium Alloy Chassis', 'Thunderbolt 4', 'Weighs 990g']
  },
  {
    id: 'volt-lp7',
    name: 'EnduroBook Rugged',
    brand: 'MegaSoft',
    price: 4999,
    image: 'https://picsum.photos/seed/endurobook-rugged/600/600',
    category: 'Laptops',
    rating: 4.8,
    reviews: 320,
    description: 'Built to withstand the toughest environments. MIL-STD-810H certified.',
    features: ['14" Sunlight-readable Display', 'Spill-resistant keyboard', 'Shock-absorbent corners', 'Dual hot-swappable batteries']
  },

  // Audio (7)
  {
    id: 'volt-7',
    name: 'EchoBuds Pro 2',
    brand: 'SonicSphere',
    price: 899,
    image: 'https://picsum.photos/seed/echobuds/600/600',
    category: 'Audio',
    rating: 4.8,
    reviews: 3019,
    description: 'Immerse yourself in sound with best-in-class noise cancellation and personalized spatial audio.',
    features: ['Active Noise Cancellation', 'Adaptive EQ', 'Sweat and Water Resistant', 'Up to 30 hours of listening time', 'Wireless Charging Case']
  },
  {
    id: 'volt-8',
    name: 'SoundWave Max',
    brand: 'Acoustic',
    price: 1299,
    image: 'https://picsum.photos/seed/soundwave-headphones/600/600',
    category: 'Audio',
    rating: 4.7,
    reviews: 1543,
    description: 'High-fidelity audio and elegant design for a magical listening experience.',
    features: ['Over-ear design', 'High-Fidelity Audio', 'Noise Cancellation', 'Spatial Audio', '20-hour Battery Life']
  },
  {
    id: 'volt-9',
    name: 'Rhythm GO 5',
    brand: 'JBL-C',
    price: 499,
    originalPrice: 549,
    discount: 'Save Ð50',
    image: 'https://picsum.photos/seed/rhythm-speaker/600/600',
    category: 'Audio',
    rating: 4.9,
    reviews: 4502,
    description: 'Take the party anywhere with this powerful and waterproof portable Bluetooth speaker.',
    features: ['Portable Bluetooth Speaker', '12-hour Battery Life', 'IP67 Waterproof and Dustproof', 'PartyBoost Feature', 'Bold Design']
  },
  {
    id: 'volt-au4',
    name: 'Studio Monitor M1',
    brand: 'Acoustic',
    price: 2499,
    image: 'https://picsum.photos/seed/studio-monitor/600/600',
    category: 'Audio',
    rating: 4.9,
    reviews: 780,
    description: 'Professional-grade bookshelf speakers for critical listening and music production.',
    features: ['5" Kevlar Woofer', '1" Silk Dome Tweeter', 'Flat Frequency Response', 'Sold as a pair']
  },
  {
    id: 'volt-au5',
    name: 'SportFit Buds',
    brand: 'SonicSphere',
    price: 499,
    image: 'https://picsum.photos/seed/sportfit-buds/600/600',
    category: 'Audio',
    rating: 4.6,
    reviews: 4210,
    description: 'Secure-fit wireless earbuds designed for workouts and active lifestyles.',
    features: ['IPX7 Waterproof', 'Secure Wingtips', '8-hour Playback', 'Punchy Bass']
  },
  {
    id: 'volt-au6',
    name: 'SoundBar 5.1',
    brand: 'JBL-C',
    price: 1999,
    image: 'https://picsum.photos/seed/soundbar-5.1/600/600',
    category: 'Audio',
    rating: 4.7,
    reviews: 1120,
    description: 'Elevate your home cinema experience with this 5.1 channel soundbar and wireless subwoofer.',
    features: ['Dolby Atmos Support', 'Wireless Subwoofer', 'Bluetooth Streaming', 'HDMI eARC']
  },
  {
    id: 'volt-au7',
    name: 'Podcaster Pro Mic',
    brand: 'Acoustic',
    price: 699,
    image: 'https://picsum.photos/seed/podcaster-mic/600/600',
    category: 'Audio',
    rating: 4.8,
    reviews: 1340,
    description: 'USB microphone with broadcast quality for podcasting, streaming, and recording.',
    features: ['Cardioid Pickup Pattern', 'Zero-latency Monitoring', 'Built-in Pop Filter', 'USB-C Connectivity']
  },

  // Smart Home (7)
  {
    id: 'volt-10',
    name: 'Home Hub Max',
    brand: 'AlphaBet',
    price: 899,
    image: 'https://picsum.photos/seed/home-hub/600/600',
    category: 'Smart Home',
    rating: 4.7,
    reviews: 1899,
    description: 'The ultimate smart display for your home. Control your devices, watch videos, and make video calls.',
    features: ['10" HD Touchscreen', 'Built-in Smart Camera', 'Voice Control with Alpha Assistant', 'Control compatible devices', 'Stereo Speakers']
  },
  {
    id: 'volt-11',
    name: 'Aura Smart Bulb Kit',
    brand: 'Lumen',
    price: 399,
    image: 'https://picsum.photos/seed/aura-bulbs/600/600',
    category: 'Smart Home',
    rating: 4.6,
    reviews: 2341,
    description: 'Transform your space with millions of colors. Starter kit includes 3 bulbs and a bridge.',
    features: ['16 Million Colors', 'Works with voice assistants', 'App Control', 'Create schedules and routines', 'Easy Setup']
  },
  {
    id: 'volt-sh3',
    name: 'SecureView Doorbell',
    brand: 'Apex',
    price: 749,
    image: 'https://picsum.photos/seed/video-doorbell/600/600',
    category: 'Smart Home',
    rating: 4.8,
    reviews: 1980,
    description: 'See who is at your door from anywhere with the SecureView video doorbell.',
    features: ['1080p HD Video', 'Two-way Talk', 'Motion Detection', 'Night Vision']
  },
  {
    id: 'volt-sh4',
    name: 'Smart Thermostat T3',
    brand: 'AlphaBet',
    price: 999,
    image: 'https://picsum.photos/seed/smart-thermostat/600/600',
    category: 'Smart Home',
    rating: 4.9,
    reviews: 3200,
    description: 'Learns your schedule and programs itself to save energy.',
    features: ['Learns your habits', 'Remote control via app', 'Energy saving reports', 'Sleek design']
  },
  {
    id: 'volt-sh5',
    name: 'Smart Lock Pro',
    brand: 'SecureView',
    price: 1199,
    image: 'https://picsum.photos/seed/smart-lock/600/600',
    category: 'Smart Home',
    rating: 4.7,
    reviews: 1540,
    description: 'Keyless entry for your home. Lock and unlock your door from anywhere.',
    features: ['Keyless Entry', 'Auto-Lock & Unlock', 'Guest Access', 'Activity Log']
  },
  {
    id: 'volt-sh6',
    name: 'Aura Light Strip',
    brand: 'Lumen',
    price: 299,
    image: 'https://picsum.photos/seed/light-strip/600/600',
    category: 'Smart Home',
    rating: 4.6,
    reviews: 1880,
    description: 'Add ambient lighting anywhere with this flexible 2-meter smart light strip.',
    features: ['16 Million Colors', 'Extendable up to 10m', 'Sync with Music', 'App Control']
  },
  {
    id: 'volt-sh7',
    name: 'Smart Plug Mini',
    brand: 'Apex',
    price: 99,
    image: 'https://picsum.photos/seed/smart-plug/600/600',
    category: 'Smart Home',
    rating: 4.8,
    reviews: 5600,
    description: 'Turn any appliance into a smart device. Control it from anywhere with your phone.',
    features: ['Remote Control', 'Scheduling', 'Voice Control', 'Compact Design']
  },

  // Accessories (7)
  {
    id: 'volt-12',
    name: 'PowerCore 20K',
    brand: 'AnkerCharge',
    price: 249,
    image: 'https://picsum.photos/seed/powercore-bank/600/600',
    category: 'Accessories',
    rating: 4.9,
    reviews: 10582,
    description: 'High-capacity 20,000mAh portable charger to keep your devices powered on the go.',
    features: ['20,000mAh Capacity', 'Dual USB-A Ports', 'High-Speed Charging', 'Compact and Portable']
  },
  {
    id: 'volt-13',
    name: 'FlexiGrip Phone Stand',
    brand: 'MountIt',
    price: 89,
    image: 'https://picsum.photos/seed/phone-stand/600/600',
    category: 'Accessories',
    rating: 4.5,
    reviews: 3122,
    description: 'A versatile and adjustable stand for your smartphone, perfect for video calls and content watching.',
    features: ['Adjustable Angle & Height', 'Sturdy Aluminum Build', 'Foldable & Portable', 'Case Friendly']
  },
  {
    id: 'volt-ac3',
    name: 'Wireless Charging Pad',
    brand: 'AnkerCharge',
    price: 159,
    image: 'https://picsum.photos/seed/wireless-charger/600/600',
    category: 'Accessories',
    rating: 4.7,
    reviews: 6543,
    description: 'Fast wireless charging for your smartphone. Just place your device and go.',
    features: ['15W Fast Charging', 'Case-friendly', 'Non-slip surface', 'LED Indicator']
  },
  {
    id: 'volt-ac4',
    name: 'USB-C Hub 7-in-1',
    brand: 'Nexus',
    price: 299,
    image: 'https://picsum.photos/seed/usb-hub/600/600',
    category: 'Accessories',
    rating: 4.8,
    reviews: 2109,
    description: 'Expand your laptop\'s connectivity with this all-in-one USB-C hub.',
    features: ['4K HDMI', 'USB 3.0 Ports', 'SD/MicroSD Reader', '100W Power Delivery']
  },
  {
    id: 'volt-ac5',
    name: 'Laptop Sleeve 14"',
    brand: 'Incase',
    price: 199,
    image: 'https://picsum.photos/seed/laptop-sleeve/600/600',
    category: 'Accessories',
    rating: 4.9,
    reviews: 4321,
    description: 'Protect your laptop with this stylish and durable sleeve with a plush fleece lining.',
    features: ['360-degree protection', 'Faux-fur lining', 'Accessory pocket', 'Durable fabric']
  },
  {
    id: 'volt-ac6',
    name: 'Car Mount Pro',
    brand: 'MountIt',
    price: 129,
    image: 'https://picsum.photos/seed/car-mount/600/600',
    category: 'Accessories',
    rating: 4.6,
    reviews: 8765,
    description: 'Securely mount your phone in your car for safe navigation.',
    features: ['Strong magnetic hold', 'Vent or Dash mounting', '360-degree rotation', 'Easy one-handed operation']
  },
  {
    id: 'volt-ac7',
    name: 'Braided USB-C Cable',
    brand: 'AnkerCharge',
    price: 79,
    image: 'https://picsum.photos/seed/usb-cable/600/600',
    category: 'Accessories',
    rating: 4.9,
    reviews: 12098,
    description: 'A durable and tangle-free 2-meter braided nylon USB-C to USB-C cable.',
    features: ['Durable Nylon Braiding', '2-meter length', 'Supports 100W Charging', 'High-speed data transfer']
  },
  
  // PCs (7)
  {
    id: 'volt-pc1',
    name: 'Aurora R15 Gaming Desktop',
    brand: 'Alienware',
    price: 8999,
    image: 'https://picsum.photos/seed/aurora-pc/600/600',
    category: 'PCs',
    rating: 4.9,
    reviews: 560,
    description: 'The ultimate pre-built gaming PC for enthusiasts who demand the best performance.',
    features: ['Intel Core i9-13900KF', 'NVIDIA GeForce RTX 4090', '32GB DDR5 RAM', '1TB NVMe SSD + 2TB HDD', 'Liquid Cooling']
  },
  {
    id: 'volt-pc2',
    name: 'Zenith Mini PC',
    brand: 'Apex',
    price: 2199,
    image: 'https://picsum.photos/seed/mini-pc/600/600',
    category: 'PCs',
    rating: 4.7,
    reviews: 890,
    description: 'A powerful yet compact mini PC perfect for home office and media center use.',
    features: ['AMD Ryzen 7 7735HS', '16GB DDR5 RAM', '512GB NVMe SSD', 'Wi-Fi 6E', 'VESA Mountable']
  },
  {
    id: 'volt-pc3',
    name: 'All-in-One Creator 27"',
    brand: 'Nimbus',
    price: 7999,
    image: 'https://picsum.photos/seed/aio-pc/600/600',
    category: 'PCs',
    rating: 4.8,
    reviews: 450,
    description: 'A beautiful All-in-One PC with a stunning 4K display and powerful performance for creative work.',
    features: ['27" 4K Display', 'Intel Core i7-13700', '16GB RAM', '1TB NVMe SSD', 'Wireless Keyboard & Mouse']
  },
  {
    id: 'volt-pc4',
    name: 'OfficePro Tower',
    brand: 'Dellnova',
    price: 3299,
    image: 'https://picsum.photos/seed/office-pc/600/600',
    category: 'PCs',
    rating: 4.6,
    reviews: 1200,
    description: 'A reliable and expandable tower PC for business and productivity.',
    features: ['Intel Core i5-13400', '16GB DDR4 RAM', '512GB SSD', 'Windows 11 Pro', 'Multiple expansion slots']
  },
  {
    id: 'volt-pc5',
    name: 'Mac Mini M3',
    brand: 'Nimbus',
    price: 2999,
    image: 'https://picsum.photos/seed/mac-mini/600/600',
    category: 'PCs',
    rating: 4.9,
    reviews: 1800,
    description: 'Supercharged by the M3 chip, the Mac Mini is more powerful and capable than ever.',
    features: ['Nimbus M3 Chip', '8GB Unified Memory', '256GB SSD Storage', 'macOS', 'Compact 7.7-inch square design']
  },
  {
    id: 'volt-pc6',
    name: 'Streamer\'s Dream PC',
    brand: 'CustomBuilds',
    price: 10999,
    image: 'https://picsum.photos/seed/streamer-pc/600/600',
    category: 'PCs',
    rating: 4.8,
    reviews: 210,
    description: 'A pre-built PC optimized for high-quality streaming and gaming simultaneously.',
    features: ['Dual PC setup in one case (concept)', 'AMD Ryzen 9 7950X', 'NVIDIA RTX 4080', 'Capture Card Included', 'Custom RGB lighting']
  },
  {
    id: 'volt-pc7',
    name: 'Home Basic Desktop',
    brand: 'HPavilion',
    price: 1999,
    image: 'https://picsum.photos/seed/home-pc/600/600',
    category: 'PCs',
    rating: 4.4,
    reviews: 2500,
    description: 'An affordable and reliable desktop for family use, schoolwork, and web browsing.',
    features: ['Intel Core i3-12100', '8GB RAM', '256GB SSD', 'Windows 11 Home', 'Includes Keyboard & Mouse']
  },

  // Home Appliances (7)
  {
    id: 'volt-ha1',
    name: 'Smart Air Purifier 4',
    brand: 'Xiomi',
    price: 799,
    image: 'https://picsum.photos/seed/air-purifier/600/600',
    category: 'Home Appliances',
    rating: 4.8,
    reviews: 3400,
    description: 'Breathe clean air with this smart air purifier that removes 99.97% of airborne particles.',
    features: ['HEPA Filter', 'App & Voice Control', 'Auto Mode', 'Quiet Operation']
  },
  {
    id: 'volt-ha2',
    name: 'RoboVac X8 Hybrid',
    brand: 'Eufy',
    price: 2499,
    image: 'https://picsum.photos/seed/robovac/600/600',
    category: 'Home Appliances',
    rating: 4.7,
    reviews: 1800,
    description: 'A 2-in-1 robot vacuum and mop with powerful suction and smart navigation.',
    features: ['LIDAR Navigation', '2000Pa Suction', 'Mopping Function', 'App Control & Scheduling']
  },
  {
    id: 'volt-ha3',
    name: 'Digital Air Fryer',
    brand: 'Phillips',
    price: 699,
    image: 'https://picsum.photos/seed/air-fryer/600/600',
    category: 'Home Appliances',
    rating: 4.9,
    reviews: 5200,
    description: 'Enjoy delicious and healthy food with up to 90% less fat using this digital air fryer.',
    features: ['5.5L Capacity', 'Digital Touchscreen', '7 Presets', 'Rapid Air Technology']
  },
  {
    id: 'volt-ha4',
    name: 'Smart Insta-Pot',
    brand: 'InstaPot',
    price: 599,
    image: 'https://picsum.photos/seed/insta-pot/600/600',
    category: 'Home Appliances',
    rating: 4.8,
    reviews: 4100,
    description: 'The 9-in-1 smart multi-cooker: pressure cooker, slow cooker, rice cooker, and more.',
    features: ['9-in-1 functionality', '6-Quart Capacity', 'App control with 1000+ recipes', 'Stainless Steel Pot']
  },
  {
    id: 'volt-ha5',
    name: 'V15 Cordless Vacuum',
    brand: 'Dyson',
    price: 2999,
    image: 'https://picsum.photos/seed/dyson-v15/600/600',
    category: 'Home Appliances',
    rating: 4.9,
    reviews: 2800,
    description: 'The most powerful, intelligent cordless vacuum with laser illumination.',
    features: ['Laser reveals microscopic dust', 'Piezo sensor sizes and counts dust particles', 'Up to 60 mins run time', 'HEPA filtration']
  },
  {
    id: 'volt-ha6',
    name: 'Smart Fridge 25L',
    brand: 'Samsong',
    price: 4999,
    image: 'https://picsum.photos/seed/smart-fridge/600/600',
    category: 'Home Appliances',
    rating: 4.6,
    reviews: 950,
    description: 'A smart refrigerator with a family hub screen to manage your groceries and family schedules.',
    features: ['25L Capacity', 'Family Hub Touchscreen', 'Internal Cameras', 'Ice and Water Dispenser']
  },
  {
    id: 'volt-ha7',
    name: 'Nespresso Vertuo',
    brand: 'Nespresso',
    price: 899,
    image: 'https://picsum.photos/seed/nespresso/600/600',
    category: 'Home Appliances',
    rating: 4.8,
    reviews: 3500,
    description: 'Brew perfect coffee every time with the push of a button using smart capsule technology.',
    features: ['5 cup sizes', 'Centrifusion Technology', 'Heats up in 15 seconds', 'Includes Aeroccino milk frother']
  },

  // Tablets (7)
  {
    id: 'volt-tb1',
    name: 'iPad Pro 11"',
    brand: 'Nimbus',
    price: 3499,
    image: 'https://picsum.photos/seed/ipad-pro/600/600',
    category: 'Tablets',
    rating: 4.9,
    reviews: 3100,
    description: 'The ultimate iPad experience with the powerful M3 chip and a stunning Liquid Retina display.',
    features: ['11" Liquid Retina Display', 'Nimbus M3 Chip', 'ProMotion Technology', 'Supports Apple Pencil Pro']
  },
  {
    id: 'volt-tb2',
    name: 'Galaxy Tab S9',
    brand: 'Samsong',
    price: 2899,
    image: 'https://picsum.photos/seed/galaxy-tab/600/600',
    category: 'Tablets',
    rating: 4.8,
    reviews: 2500,
    description: 'A premium Android tablet with a beautiful AMOLED display and included S Pen.',
    features: ['11" Dynamic AMOLED 2X Display', 'Snapdragon 8 Gen 2 for Galaxy', 'S Pen included', 'IP68 Water Resistance']
  },
  {
    id: 'volt-tb3',
    name: 'Paperwhite E-Reader',
    brand: 'Amazonian',
    price: 599,
    image: 'https://picsum.photos/seed/e-reader/600/600',
    category: 'Tablets',
    rating: 4.9,
    reviews: 15000,
    description: 'Read comfortably for hours with a glare-free display that reads like real paper.',
    features: ['6.8" 300 ppi glare-free display', 'Waterproof (IPX8)', 'Weeks of battery life', 'Adjustable warm light']
  },
  {
    id: 'volt-tb4',
    name: 'Fire HD 10',
    brand: 'Amazonian',
    price: 499,
    image: 'https://picsum.photos/seed/fire-tablet/600/600',
    category: 'Tablets',
    rating: 4.5,
    reviews: 8500,
    description: 'An affordable and durable tablet for entertainment, browsing, and more.',
    features: ['10.1" 1080p Full HD display', '3GB RAM', 'Up to 12-hour battery life', 'Hands-free with Alexa']
  },
  {
    id: 'volt-tb5',
    name: 'ReMarkable 2',
    brand: 'ReMarkable',
    price: 1899,
    image: 'https://picsum.photos/seed/remarkable/600/600',
    category: 'Tablets',
    rating: 4.7,
    reviews: 1200,
    description: 'The paper tablet for note-taking, reading, and reviewing documents. Feels like writing on paper.',
    features: ['10.3" CANVAS display', 'Paper-like writing experience', 'Convert handwritten notes to text', 'Weeks of battery']
  },
  {
    id: 'volt-tb6',
    name: 'Surface Go 3',
    brand: 'MegaSoft',
    price: 1599,
    image: 'https://picsum.photos/seed/surface-go/600/600',
    category: 'Tablets',
    rating: 4.4,
    reviews: 980,
    description: 'The most portable Surface 2-in-1, perfect for everyday tasks, homework, and play.',
    features: ['10.5" Touchscreen', 'Intel Pentium Gold Processor', 'Runs Windows 11', 'Optional Type Cover']
  },
  {
    id: 'volt-tb7',
    name: 'Drawing Tablet Pro',
    brand: 'Wacom',
    price: 1499,
    image: 'https://picsum.photos/seed/drawing-tablet/600/600',
    category: 'Tablets',
    rating: 4.8,
    reviews: 1900,
    description: 'A professional drawing tablet for digital artists and designers.',
    features: ['Battery-free Pro Pen 2', '8,192 Pressure Levels', 'Customizable ExpressKeys', 'Multi-touch gestures']
  },
];
