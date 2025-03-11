from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Customer, Feedback, Order, Menu, OrderItem, Category
from django.contrib.auth.models import User


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number']
        extra_kwargs = {
            'email': {'validators': [UniqueValidator(queryset=Customer.objects.all())]},
            'phone_number': {'validators': [UniqueValidator(queryset=Customer.objects.all())]},
        }


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']
        extra_kwargs = {
            'name': {'validators': [UniqueValidator(queryset=Category.objects.all())]},
        }


class MenuSerializer(serializers.ModelSerializer):
    # image_url = serializers.URLField(required=False, allow_null=True)
    class Meta:
        model = Menu
        fields = ['id', 'name', 'description', 'category', 'image', 'price', 'is_available']


class OrderItemSerializer(serializers.ModelSerializer):
    menu = serializers.PrimaryKeyRelatedField(queryset=Menu.objects.all())

    class Meta:
        model = OrderItem
        fields = ['menu', 'quantity', 'price']
        read_only_fields = ['price']


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'customer', 'items', 'status', 'total_price', 'created_at', 'updated_at']
        read_only_fields = ['total_price', 'created_at', 'updated_at']

    def validate(self, data):
        """Ensure all ordered menu items are available before saving."""
        items_data = data.get('items', [])
        unavailable_items = [item['menu'].name for item in items_data if not item['menu'].is_available]

        if unavailable_items:
            raise serializers.ValidationError(f"The following items are not available: {', '.join(unavailable_items)}")

        return data

    def create(self, validated_data):
        """Create an order only after validation."""
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)

        order_items = [
            OrderItem(
                order=order,
                menu=item_data['menu'],
                quantity=item_data['quantity'],
                price=item_data['menu'].price  # Auto-assign price from menu
            )
            for item_data in items_data
        ]
        
        OrderItem.objects.bulk_create(order_items)
        order.update_total_price()  # Ensure total price is updated
        return order

class FeedbackSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True) 

    class Meta:
        model = Feedback
        fields = ['id', 'customer', 'rating', 'comment', 'created_at']
        
    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value
    

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
