from django.contrib import admin
from .models import Order, OrderItem, ShippingAddress


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'first_name', 'last_name', 'email', 'total', 'payment_method', 'payment_status', 'created']
    list_filter = ['payment_status', 'payment_method', 'created']
    search_fields = ['order_id', 'first_name', 'last_name', 'email']
    readonly_fields = ['order_id', 'created', 'updated']
    inlines = [OrderItemInline]


@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ['user_email', 'first_name', 'last_name', 'city', 'is_default']
    list_filter = ['is_default', 'state']
    search_fields = ['user_email', 'first_name', 'last_name']
