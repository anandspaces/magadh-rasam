from django.urls import path
from .views import (
    CustomerListCreateView, CustomerDetailView,
    CategoryListCreateView, CategoryDetailView,
    MenuItemListCreateView, MenuItemDetailView,
    TableListCreateView, TableDetailView,
    OrderListCreateView, OrderDetailView,
    ReservationListCreateView, ReservationDetailView,
    FeedbackListCreateView, FeedbackDetailView
)

urlpatterns = [
    # Customer API URLs
    path('customers/', CustomerListCreateView.as_view(), name='customer-list'),
    path('customers/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),

    # Category API URLs
    path('categories/', CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),

    # MenuItem API URLs
    path('menu-items/', MenuItemListCreateView.as_view(), name='menu-item-list'),
    path('menu-items/<int:pk>/', MenuItemDetailView.as_view(), name='menu-item-detail'),

    # Table API URLs
    path('tables/', TableListCreateView.as_view(), name='table-list'),
    path('tables/<int:pk>/', TableDetailView.as_view(), name='table-detail'),

    # Order API URLs
    path('orders/', OrderListCreateView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),

    # Reservation API URLs
    path('reservations/', ReservationListCreateView.as_view(), name='reservation-list'),
    path('reservations/<int:pk>/', ReservationDetailView.as_view(), name='reservation-detail'),

    # Feedback API URLs
    path('feedbacks/', FeedbackListCreateView.as_view(), name='feedback-list'),
    path('feedbacks/<int:pk>/', FeedbackDetailView.as_view(), name='feedback-detail'),
]
