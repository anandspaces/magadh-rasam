from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.core.validators import MinValueValidator
from .models import Customer, Reservation, Feedback, Order, Menu, MenuItem, Table, Category

# Serializer for the Customer model
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number']
        extra_kwargs = {
            'email': {'validators': [UniqueValidator(queryset=Customer.objects.all())]},  # Ensure unique email
            'phone_number': {'validators': [UniqueValidator(queryset=Customer.objects.all())]},  # Ensure unique phone number
        }


# Serializer for the Category model (for menu classification)
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        extra_kwargs = {
            'name': {'validators': [UniqueValidator(queryset=Category.objects.all())]},  # Ensure unique category name
        }

# Serializer for the Menu model (for listing menu items)
class MenuSerializer(serializers.ModelSerializer):
    # image_url = serializers.URLField(required=False, allow_null=True)
    class Meta:
        model = Menu
        fields = ['id', 'name', 'description', 'category','image']

# Serializer for the MenuItem model (for listing menu items)
class MenuItemSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())  # Allow category ID input

    class Meta:
        model = MenuItem
        fields = ['id', 'name', 'description', 'category', 'price', 'is_available']


# Serializer for the Table model
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = ['id', 'table_number', 'seating_capacity']


# Serializer for the Order model
class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    menu_item = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())
    quantity = serializers.IntegerField(validators=[MinValueValidator(1)])  # Added MinValueValidator

    class Meta:
        model = Order
        fields = ['id', 'customer', 'menu_item', 'quantity', 'total_price', 'status', 'created_at']
        read_only_fields = ['total_price', 'created_at']  # Set total_price and created_at as read-only

    def create(self, validated_data):
        menu_item = validated_data.pop('menu_item')
        quantity = validated_data.pop('quantity')
        total_price = quantity * menu_item.price  # Calculate total price
        
        order = Order.objects.create(total_price=total_price, **validated_data)
        return order

    def validate(self, attrs):
        # Additional validation to ensure menu item is available
        menu_item = attrs.get('menu_item')
        if menu_item and not menu_item.is_available:
            raise serializers.ValidationError("The selected menu item is not available.")
        return attrs


# Serializer for the Reservation model
class ReservationSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)  # Display customer info

    class Meta:
        model = Reservation
        fields = ['id', 'customer', 'table', 'reservation_time', 'num_of_guests']
        
    def validate_num_of_guests(self, value):
        if value <= 0:
            raise serializers.ValidationError("Number of guests must be at least 1.")
        return value


# Serializer for the Feedback model
class FeedbackSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)  # Display customer info

    class Meta:
        model = Feedback
        fields = ['id', 'customer', 'rating', 'comment', 'created_at']
        
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value
