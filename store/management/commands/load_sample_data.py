from django.core.management.base import BaseCommand
from store.models import Category, Product


class Command(BaseCommand):
    help = 'Load sample categories and products'

    def handle(self, *args, **options):
        self.stdout.write('Loading sample data...')

        # Create categories
        categories_data = [
            {'name': 'Electronics', 'slug': 'electronics', 'description': 'Latest gadgets and electronics'},
            {'name': 'Fashion', 'slug': 'fashion', 'description': 'Trendy fashion items'},
            {'name': 'Food & Beverages', 'slug': 'food-beverages', 'description': 'Gourmet food and drinks'},
            {'name': 'Lifestyle', 'slug': 'lifestyle', 'description': 'Lifestyle products'},
            {'name': 'Sports', 'slug': 'sports', 'description': 'Sports and fitness gear'},
        ]

        categories = {}
        for cat_data in categories_data:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults=cat_data
            )
            categories[cat_data['slug']] = cat
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Category "{cat.name}"')

        # Create products
        products_data = [
            {
                'category': 'electronics',
                'name': 'Premium Wireless Headphones',
                'slug': 'premium-wireless-headphones',
                'description': 'High-quality wireless headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and professionals.',
                'price': 4999,
                'image': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
                'stock': 15,
                'rating': 4.5,
                'reviews_count': 128
            },
            {
                'category': 'electronics',
                'name': 'Smart Fitness Watch',
                'slug': 'smart-fitness-watch',
                'description': 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, sleep tracking, and 7-day battery life.',
                'price': 3499,
                'image': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
                'stock': 23,
                'rating': 4.3,
                'reviews_count': 89
            },
            {
                'category': 'food-beverages',
                'name': 'Organic Green Tea Collection',
                'slug': 'organic-green-tea-collection',
                'description': 'Premium collection of 5 different organic green teas sourced from the finest tea gardens. Includes Matcha, Sencha, Jasmine, Gunpowder, and Dragon Well.',
                'price': 899,
                'image': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
                'stock': 50,
                'rating': 4.7,
                'reviews_count': 234
            },
            {
                'category': 'fashion',
                'name': 'Leather Messenger Bag',
                'slug': 'leather-messenger-bag',
                'description': 'Handcrafted genuine leather messenger bag with multiple compartments. Perfect for laptops up to 15 inches. Includes adjustable shoulder strap.',
                'price': 2799,
                'image': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
                'stock': 12,
                'rating': 4.6,
                'reviews_count': 67
            },
            {
                'category': 'electronics',
                'name': 'Portable Bluetooth Speaker',
                'slug': 'portable-bluetooth-speaker',
                'description': 'Waterproof portable speaker with 360-degree sound, 20-hour playtime, and built-in microphone for calls. Perfect for outdoor adventures.',
                'price': 1999,
                'image': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
                'stock': 30,
                'rating': 4.4,
                'reviews_count': 156
            },
            {
                'category': 'sports',
                'name': 'Yoga Mat Premium',
                'slug': 'yoga-mat-premium',
                'description': 'Extra thick 6mm eco-friendly yoga mat with alignment lines. Non-slip surface, includes carrying strap. Perfect for yoga and pilates.',
                'price': 1299,
                'image': 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
                'stock': 45,
                'rating': 4.8,
                'reviews_count': 312
            },
            {
                'category': 'lifestyle',
                'name': 'Stainless Steel Water Bottle',
                'slug': 'stainless-steel-water-bottle',
                'description': 'Double-walled vacuum insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, 750ml capacity.',
                'price': 699,
                'image': 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
                'stock': 100,
                'rating': 4.5,
                'reviews_count': 445
            },
            {
                'category': 'electronics',
                'name': 'Mechanical Keyboard RGB',
                'slug': 'mechanical-keyboard-rgb',
                'description': 'Premium mechanical keyboard with Cherry MX switches, per-key RGB lighting, aluminum frame, and programmable macros.',
                'price': 5999,
                'image': 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500',
                'stock': 8,
                'rating': 4.9,
                'reviews_count': 78
            },
        ]

        for prod_data in products_data:
            category = categories.get(prod_data.pop('category'))
            if category:
                product, created = Product.objects.get_or_create(
                    slug=prod_data['slug'],
                    defaults={**prod_data, 'category': category}
                )
                status = 'Created' if created else 'Exists'
                self.stdout.write(f'  {status}: Product "{product.name}"')

        self.stdout.write(self.style.SUCCESS('Sample data loaded successfully!'))
