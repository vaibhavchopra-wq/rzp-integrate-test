from django.db import models
from store.models import Product
import uuid


class Order(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    PAYMENT_METHOD_CHOICES = [
        ('cod', 'Cash on Delivery'),
    ]

    order_id = models.CharField(max_length=50, unique=True, editable=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)

    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    tax = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_METHOD_CHOICES,
        default='cod'
    )
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default='pending'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created']

    def __str__(self):
        return f'Order {self.order_id}'

    def save(self, *args, **kwargs):
        if not self.order_id:
            self.order_id = f'ORD-{uuid.uuid4().hex[:8].upper()}'
        super().save(*args, **kwargs)

    def get_total_items(self):
        return sum(item.quantity for item in self.items.all())


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name='order_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.quantity}x {self.product.name}'

    def get_total(self):
        return self.price * self.quantity


class ShippingAddress(models.Model):
    """Saved shipping addresses for users."""
    user_email = models.EmailField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)
    is_default = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Shipping Addresses'

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.city}'
