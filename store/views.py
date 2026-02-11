from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator
from .models import Product, Category


def home(request):
    """Home page with featured products."""
    featured_products = Product.objects.filter(available=True)[:4]
    categories = Category.objects.all()

    return render(request, 'store/home.html', {
        'featured_products': featured_products,
        'categories': categories
    })


def product_list(request, category_slug=None):
    """List all products, optionally filtered by category."""
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter(available=True)

    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)

    # Pagination
    paginator = Paginator(products, 12)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'store/product_list.html', {
        'category': category,
        'categories': categories,
        'products': page_obj,
        'page_obj': page_obj
    })


def product_detail(request, slug):
    """Display single product details."""
    product = get_object_or_404(Product, slug=slug, available=True)
    related_products = Product.objects.filter(
        category=product.category,
        available=True
    ).exclude(id=product.id)[:4]

    return render(request, 'store/product_detail.html', {
        'product': product,
        'related_products': related_products
    })


def about(request):
    """About page."""
    return render(request, 'store/about.html')
