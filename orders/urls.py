from django.urls import path
from . import views

app_name = 'orders'

urlpatterns = [
    path('checkout/', views.checkout, name='checkout'),
    path('success/', views.order_success, name='order_success'),
    path('detail/<str:order_id>/', views.order_detail, name='order_detail'),
    path('api/create/', views.create_order_api, name='create_order_api'),
]
