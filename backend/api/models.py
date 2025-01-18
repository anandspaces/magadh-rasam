from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Customer model for storing customer information
class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# Category model for classifying menu items (e.g., Appetizers, Main Course, Desserts)
class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# Menu model for storing menu details
class Menu(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    category = models.ForeignKey(Category, related_name='menu_items', on_delete=models.CASCADE)
    # image = models.ImageField(upload_to='menu_images/', null=True, blank=True)
    image_url = models.URLField(blank=True, null=True)
    def __str__(self):
        return self.name
    
# MenuItem model for storing menu item details
class MenuItem(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, related_name='menu_items', on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=6, decimal_places=2)  # Example: $9999.99
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.name

# Table model for reserving or assigning tables to customers
class Table(models.Model):
    table_number = models.PositiveIntegerField(unique=True)
    seating_capacity = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    def __str__(self):
        return f"Table {self.table_number} - {self.seating_capacity} seats"

# Order model for handling customer orders and items in the same model
class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    customer = models.ForeignKey(Customer, related_name='orders', on_delete=models.CASCADE)
    table = models.ForeignKey(Table, related_name='orders', null=True, blank=True, on_delete=models.SET_NULL)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Fields related to individual items in the order
    menu_item = models.ForeignKey(MenuItem, related_name='order_items', on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField(validators=[MinValueValidator(1)], null=True)
    total_price = models.DecimalField(max_digits=6, decimal_places=2, null=True)

    def __str__(self):
        return f"Order #{self.id} for {self.customer}"

# Reservation model for booking tables
class Reservation(models.Model):
    customer = models.ForeignKey(Customer, related_name='reservations', on_delete=models.CASCADE)
    table = models.ForeignKey(Table, related_name='reservations', on_delete=models.CASCADE)
    reservation_time = models.DateTimeField()
    num_of_guests = models.PositiveIntegerField(validators=[MinValueValidator(1)])

    def __str__(self):
        return f"Reservation by {self.customer} at {self.reservation_time}"

# Feedback model for collecting customer feedback
class Feedback(models.Model):
    customer = models.ForeignKey(Customer, related_name='feedback', on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback from {self.customer} - {self.rating} stars"
