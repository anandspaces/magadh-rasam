from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from django.contrib.auth import authenticate
from django.db import IntegrityError
from django.core.exceptions import ValidationError
from django.utils.decorators import method_decorator
import logging
from .models import Customer, OrderItem, Feedback, Order, Menu, Category
from .serializers import (
    CustomerSerializer, CategorySerializer, FeedbackSerializer, OrderSerializer, MenuSerializer, OrderItemSerializer, RegisterSerializer
)

# Set up logging
logger = logging.getLogger(__name__)

# Pagination Class
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100

class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    
    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as e:
            logger.error(f"Customer creation failed: {str(e)}")
            return Response(
                {"error": "Customer with this email or phone number already exists."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error in customer creation: {str(e)}")
            return Response(
                {"error": "An unexpected error occurred."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except IntegrityError as e:
            logger.error(f"Category creation failed: {str(e)}")
            return Response(
                {"error": "Category with this name already exists."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            logger.error(f"Unexpected error in category creation: {str(e)}")
            return Response(
                {"error": "An unexpected error occurred."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class MenuListView(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_available']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'created_at']
    pagination_class = StandardResultsSetPagination

class MenuDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filter orders by authenticated user if they have a related customer
        return Order.objects.all().select_related('customer').prefetch_related('items__menu')
    
    def perform_create(self, serializer):
        try:
            # You'll need to associate the order with a customer
            # For now, let's assume customer_id is passed in request data
            customer_id = self.request.data.get('customer_id')
            if not customer_id:
                raise ValidationError("Customer ID is required")
            
            customer = Customer.objects.get(id=customer_id)
            order = serializer.save(customer=customer)
            logger.info(f"Order created successfully: {order.id}")
        except Customer.DoesNotExist:
            raise ValidationError("Invalid customer ID")
        except Exception as e:
            logger.error(f"Order creation failed: {str(e)}")
            raise

class OrderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        try:
            kwargs["partial"] = True
            return super().update(request, *args, **kwargs)
        except Exception as e:
            logger.error(f"Order update failed: {str(e)}")
            return Response(
                {"error": "Failed to update order."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

class OrderItemListCreateView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class OrderItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

class FeedbackListCreateView(generics.ListCreateAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    
    def perform_create(self, serializer):
        try:
            # Associate feedback with customer
            customer_id = self.request.data.get('customer_id')
            if not customer_id:
                raise ValidationError("Customer ID is required")
            
            customer = Customer.objects.get(id=customer_id)
            feedback = serializer.save(customer=customer)
            logger.info(f"Feedback created successfully: {feedback.id}")
        except Customer.DoesNotExist:
            raise ValidationError("Invalid customer ID")
        except Exception as e:
            logger.error(f"Feedback creation failed: {str(e)}")
            raise

class FeedbackDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer

# Custom throttle classes
class LoginRateThrottle(UserRateThrottle):
    scope = 'login'

class RegisterRateThrottle(AnonRateThrottle):
    scope = 'register'

# User Registration View
class RegisterView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [RegisterRateThrottle]

    def post(self, request):
        try:
            logger.info(f"Registration attempt for data: {request.data}")
            serializer = RegisterSerializer(data=request.data)
            
            if serializer.is_valid():
                user = serializer.save()
                logger.info(f"User registered successfully: {user.username}")
                return Response({
                    "message": "User registered successfully",
                    "user_id": user.id,
                    "username": user.username
                }, status=status.HTTP_201_CREATED)
            else:
                logger.warning(f"Registration validation failed: {serializer.errors}")
                return Response({
                    "error": "Registration failed",
                    "details": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except IntegrityError as e:
            logger.error(f"Registration integrity error: {str(e)}")
            return Response({
                "error": "User with this username or email already exists"
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Unexpected registration error: {str(e)}")
            return Response({
                "error": "An unexpected error occurred during registration"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# User Login View
class LoginView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = [LoginRateThrottle]

    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            if not username or not password:
                return Response({
                    "error": "Username and password are required"
                }, status=status.HTTP_400_BAD_REQUEST)

            logger.info(f"Login attempt for username: {username}")
            user = authenticate(username=username, password=password)

            if user:
                if user.is_active:
                    refresh = RefreshToken.for_user(user)
                    logger.info(f"Successful login for user: {username}")
                    return Response({
                        "message": "Login successful",
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email
                        }
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        "error": "User account is inactive"
                    }, status=status.HTTP_401_UNAUTHORIZED)
            else:
                logger.warning(f"Failed login attempt for username: {username}")
                return Response({
                    "error": "Invalid credentials"
                }, status=status.HTTP_401_UNAUTHORIZED)
                
        except Exception as e:
            logger.error(f"Unexpected login error: {str(e)}")
            return Response({
                "error": "An unexpected error occurred during login"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)