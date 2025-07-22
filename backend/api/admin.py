from django.contrib import admin
from .models import Menu, Category, Customer, Order, OrderItem, Feedback
# Register your models here.
admin.site.register(Menu)
admin.site.register(Category)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Feedback)