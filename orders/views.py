from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib import messages
from cart.cart import Cart
from .models import Order, OrderItem
from .forms import OrderCreateForm


def checkout(request):
    """Display checkout form and handle order creation."""
    cart = Cart(request)

    if len(cart) == 0:
        messages.warning(request, 'Your cart is empty.')
        return redirect('store:product_list')

    if request.method == 'POST':
        form = OrderCreateForm(request.POST)
        if form.is_valid():
            order = form.save(commit=False)
            order.subtotal = cart.get_subtotal()
            order.tax = cart.get_tax()
            order.total = cart.get_total()
            order.payment_method = 'cod'  # Default to COD, will be changed when payment gateway is integrated
            order.save()

            # Create order items
            for item in cart:
                OrderItem.objects.create(
                    order=order,
                    product=item['product'],
                    price=item['price'],
                    quantity=item['quantity']
                )

            # Clear the cart
            cart.clear()

            # Store order ID in session for success page
            request.session['order_id'] = order.id

            return redirect('orders:order_success')
    else:
        form = OrderCreateForm()

    return render(request, 'orders/checkout.html', {
        'cart': cart,
        'form': form
    })


def order_success(request):
    """Display order success page."""
    order_id = request.session.get('order_id')

    if not order_id:
        return redirect('store:product_list')

    order = get_object_or_404(Order, id=order_id)

    # Clear order ID from session
    del request.session['order_id']

    return render(request, 'orders/success.html', {'order': order})


def order_detail(request, order_id):
    """Display order details."""
    order = get_object_or_404(Order, order_id=order_id)
    return render(request, 'orders/detail.html', {'order': order})


@require_POST
def create_order_api(request):
    """API endpoint to create order (for AJAX requests)."""
    cart = Cart(request)

    if len(cart) == 0:
        return JsonResponse({'success': False, 'error': 'Cart is empty'}, status=400)

    form = OrderCreateForm(request.POST)
    if form.is_valid():
        order = form.save(commit=False)
        order.subtotal = cart.get_subtotal()
        order.tax = cart.get_tax()
        order.total = cart.get_total()
        order.save()

        # Create order items
        for item in cart:
            OrderItem.objects.create(
                order=order,
                product=item['product'],
                price=item['price'],
                quantity=item['quantity']
            )

        return JsonResponse({
            'success': True,
            'order_id': order.order_id,
            'total': float(order.total)
        })

    return JsonResponse({
        'success': False,
        'errors': form.errors
    }, status=400)
