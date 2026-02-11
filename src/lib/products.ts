export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 15,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 'prod_2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, sleep tracking, and 7-day battery life.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 23,
    rating: 4.3,
    reviews: 89
  },
  {
    id: 'prod_3',
    name: 'Organic Green Tea Collection',
    description: 'Premium collection of 5 different organic green teas sourced from the finest tea gardens. Includes Matcha, Sencha, Jasmine, Gunpowder, and Dragon Well.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
    category: 'Food & Beverages',
    stock: 50,
    rating: 4.7,
    reviews: 234
  },
  {
    id: 'prod_4',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather messenger bag with multiple compartments. Perfect for laptops up to 15 inches. Includes adjustable shoulder strap.',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
    category: 'Fashion',
    stock: 12,
    rating: 4.6,
    reviews: 67
  },
  {
    id: 'prod_5',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound, 20-hour playtime, and built-in microphone for calls. Perfect for outdoor adventures.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 30,
    rating: 4.4,
    reviews: 156
  },
  {
    id: 'prod_6',
    name: 'Yoga Mat Premium',
    description: 'Extra thick 6mm eco-friendly yoga mat with alignment lines. Non-slip surface, includes carrying strap. Perfect for yoga and pilates.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'Sports',
    stock: 45,
    rating: 4.8,
    reviews: 312
  },
  {
    id: 'prod_7',
    name: 'Stainless Steel Water Bottle',
    description: 'Double-walled vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, 750ml capacity.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Lifestyle',
    stock: 100,
    rating: 4.5,
    reviews: 445
  },
  {
    id: 'prod_8',
    name: 'Mechanical Keyboard RGB',
    description: 'Premium mechanical keyboard with Cherry MX switches, per-key RGB lighting, aluminum frame, and programmable macros.',
    price: 5999,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
    category: 'Electronics',
    stock: 8,
    rating: 4.9,
    reviews: 78
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getCategories(): string[] {
  return [...new Set(products.map(p => p.category))];
}
