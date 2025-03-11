from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import (
    CustomerListCreateView, CustomerDetailView,
    CategoryListCreateView, CategoryDetailView,
    MenuListView, MenuDetailView,
    OrderItemListCreateView,OrderItemDetailView,
    OrderListCreateView, OrderDetailView,
    FeedbackListCreateView, FeedbackDetailView,
    LoginView, RegisterView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),  # Register endpoint
    path('login/', LoginView.as_view(), name='login'),  # Login endpoint

    # Customer API URLs
    path('customers/', CustomerListCreateView.as_view(), name='customer-list'),
    path('customers/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),

    # Category API URLs
    path('categories/', CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),

    # Menu API URLs
    path('menu/', MenuListView.as_view(), name='menu-list'),
    path('menu/<int:pk>/', MenuDetailView.as_view(), name='menu-detail'),

    # Order API URLs
    path('orders/', OrderListCreateView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),

    # OrderItem API URLs
    path('order-items/', OrderItemListCreateView.as_view(), name='order-item-list'),
    path('order-items/<int:pk>/', OrderItemDetailView.as_view(), name='order-item-detail'),

    # Feedback API URLs
    path('feedbacks/', FeedbackListCreateView.as_view(), name='feedback-list'),
    path('feedbacks/<int:pk>/', FeedbackDetailView.as_view(), name='feedback-detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)