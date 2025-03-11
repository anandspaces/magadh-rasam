# from django.test import TestCase
# from .models import Customer, Category, Menu, Order, OrderItem, Feedback

# class CustomerModelTest(TestCase):
#     def setUp(self):
#         self.customer = Customer.objects.create(
#             first_name="John", last_name="Doe", email="john@example.com", phone_number="1234567890"
#         )
    
#     def test_customer_creation(self):
#         self.assertEqual(self.customer.first_name, "John")
#         self.assertEqual(str(self.customer), "John Doe")


# class CategoryModelTest(TestCase):
#     def setUp(self):
#         self.category = Category.objects.create(name="Desserts")
    
#     def test_category_creation(self):
#         self.assertEqual(str(self.category), "Desserts")


# class MenuModelTest(TestCase):
#     def setUp(self):
#         self.category = Category.objects.create(name="Beverages")
#         self.menu = Menu.objects.create(
#             name="Latte", description="A delicious coffee", category=self.category, price=4.99, is_available=True
#         )
    
#     def test_menu_creation(self):
#         self.assertEqual(str(self.menu), "Latte")
#         self.assertTrue(self.menu.is_available)


# class OrderModelTest(TestCase):
#     def setUp(self):
#         self.customer = Customer.objects.create(
#             first_name="Alice", last_name="Brown", email="alice@example.com", phone_number="9876543210"
#         )
#         self.order = Order.objects.create(customer=self.customer, status="PENDING", total_price=0)
    
#     def test_order_creation(self):
#         self.assertEqual(str(self.order), f"Order #{self.order.id} for {self.customer}")
#         self.assertEqual(self.order.status, "PENDING")


# class OrderItemModelTest(TestCase):
#     def setUp(self):
#         self.customer = Customer.objects.create(
#             first_name="Eve", last_name="Smith", email="eve@example.com", phone_number="1112223333"
#         )
#         self.category = Category.objects.create(name="Fast Food")
#         self.menu = Menu.objects.create(
#             name="Burger", description="Tasty burger", category=self.category, price=5.99, is_available=True
#         )
#         self.order = Order.objects.create(customer=self.customer, status="PENDING")
#         self.order_item = OrderItem.objects.create(order=self.order, menu=self.menu, quantity=2)
    
#     def test_order_item_creation(self):
#         self.assertEqual(str(self.order_item), "2x Burger (₹5.99)")
#         self.assertEqual(self.order_item.quantity, 2)
#         self.assertEqual(self.order_item.price, self.menu.price)


# class FeedbackModelTest(TestCase):
#     def setUp(self):
#         self.customer = Customer.objects.create(
#             first_name="Bob", last_name="Taylor", email="bob@example.com", phone_number="4445556666"
#         )
#         self.feedback = Feedback.objects.create(customer=self.customer, rating=4, comment="Great food!")
    
#     def test_feedback_creation(self):
#         self.assertEqual(str(self.feedback), "Feedback from Bob Taylor - 4 stars")
#         self.assertEqual(self.feedback.rating, 4)
#         self.assertEqual(self.feedback.comment, "Great food!")
# from django.test import TestCase
# from rest_framework.exceptions import ValidationError
# from django.contrib.auth.models import User
# from .models import Customer, Category, Menu, Order, OrderItem, Feedback
# from .serializers import (
#     CustomerSerializer, CategorySerializer, MenuSerializer,
#     OrderSerializer, OrderItemSerializer, FeedbackSerializer, RegisterSerializer
# )

# class SerializerTestCase(TestCase):
#     def setUp(self):
#         self.customer = Customer.objects.create(
#             first_name="John", last_name="Doe", email="john@example.com", phone_number="1234567890"
#         )
#         self.category = Category.objects.create(name="Beverages")
#         self.menu = Menu.objects.create(
#             name="Cappuccino", description="Delicious coffee", category=self.category, price=5.99, is_available=True
#         )
#         self.order = Order.objects.create(customer=self.customer, status="PENDING")
#         self.order_item = OrderItem.objects.create(order=self.order, menu=self.menu, quantity=2, price=5.99)
#         self.feedback = Feedback.objects.create(customer=self.customer, rating=5, comment="Great service!")

#     def test_customer_serializer(self):
#         data = CustomerSerializer(self.customer).data
#         self.assertEqual(data['first_name'], "John")
#         self.assertEqual(data['email'], "john@example.com")

#     def test_category_serializer(self):
#         data = CategorySerializer(self.category).data
#         self.assertEqual(data['name'], "Beverages")

#     def test_menu_serializer(self):
#         data = MenuSerializer(self.menu).data
#         self.assertEqual(data['name'], "Cappuccino")
#         self.assertEqual(data['price'], "5.99")

#     def test_order_item_serializer(self):
#         data = OrderItemSerializer(self.order_item).data
#         self.assertEqual(data['quantity'], 2)
#         self.assertEqual(float(data['price']), 5.99)

#     def test_order_serializer(self):
#         data = OrderSerializer(self.order).data
#         self.assertEqual(data['status'], "PENDING")
#         self.assertEqual(len(data['items']), 1)

#     def test_feedback_serializer(self):
#         data = FeedbackSerializer(self.feedback).data
#         self.assertEqual(data['rating'], 5)
#         self.assertEqual(data['comment'], "Great service!")

#     def test_register_serializer(self):
#         user_data = {"username": "testuser", "email": "test@example.com", "password": "securepass"}
#         serializer = RegisterSerializer(data=user_data)
#         self.assertTrue(serializer.is_valid())
#         user = serializer.save()
#         self.assertEqual(user.username, "testuser")

#     def test_invalid_rating_feedback(self):
#         invalid_data = {"customer": self.customer.id, "rating": 6, "comment": "Bad rating"}
#         serializer = FeedbackSerializer(data=invalid_data)
#         with self.assertRaises(ValidationError):
#             serializer.is_valid(raise_exception=True)


from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from .models import Customer, Order, OrderItem, Feedback, Menu, Category

class APITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Creating test user
        self.user = User.objects.create_user(username="testuser", password="password123")
        
        # Creating test data
        self.category = Category.objects.create(name="Fast Food")
        self.menu = Menu.objects.create(name="Burger", description="good food",price=5.99, category=self.category)
        self.customer = Customer.objects.create(first_name="John",last_name= "Doe", email="john@gmail.com",phone_number="1234567890")
        self.order = Order.objects.create(customer=self.customer, status="pending")
        self.order_item = OrderItem.objects.create(order=self.order, menu=self.menu, quantity=2)
        self.feedback = Feedback.objects.create(customer=self.customer, rating=3, comment="Great food!")

    def test_customer_list_create(self):
        response = self.client.get("/customers/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_category_list_create(self):
        response = self.client.get("/categories/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_menu_list_create(self):
        response = self.client.get("/menu/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_order_list_create(self):
        response = self.client.get("/orders/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_order_item_list_create(self):
        response = self.client.get("/order-items/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_feedback_list_create(self):
        response = self.client.get("/feedbacks/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_register_user(self):
        response = self.client.post("/register/", {"username": "newuser","email": "newuser@gmail.com", "password": "newpass123"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        response = self.client.post("/login/", {"username": "testuser", "password": "password123"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_login(self):
        response = self.client.post("/login/", {"username": "wronguser", "password": "wrongpass"})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
