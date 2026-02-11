from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from store.models import Product
from .cart import Cart


def cart_detail(request):
    """Display cart contents."""
    cart = Cart(request)
    return render(request, 'cart/detail.html', {'cart': cart})


@require_POST
def cart_add(request, product_id):
    """Add a product to the cart."""
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    quantity = int(request.POST.get('quantity', 1))
    override = request.POST.get('override') == 'true'

    cart.add(product=product, quantity=quantity, override_quantity=override)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'success': True,
            'cart_count': len(cart),
            'message': f'{product.name} added to cart'
        })

    return redirect('cart:cart_detail')


@require_POST
def cart_remove(request, product_id):
    """Remove a product from the cart."""
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    cart.remove(product)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'success': True,
            'cart_count': len(cart),
            'subtotal': str(cart.get_subtotal()),
            'tax': str(cart.get_tax()),
            'total': str(cart.get_total())
        })

    return redirect('cart:cart_detail')


@require_POST
def cart_update(request, product_id):
    """Update product quantity in cart."""
    cart = Cart(request)
    product = get_object_or_404(Product, id=product_id)
    quantity = int(request.POST.get('quantity', 1))

    if quantity > 0:
        cart.add(product=product, quantity=quantity, override_quantity=True)
    else:
        cart.remove(product)

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return JsonResponse({
            'success': True,
            'cart_count': len(cart),
            'subtotal': str(cart.get_subtotal()),
            'tax': str(cart.get_tax()),
            'total': str(cart.get_total())
        })

    return redirect('cart:cart_detail')
