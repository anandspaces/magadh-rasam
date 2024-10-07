# from django import forms
# from .models import Customer, Reservation, Feedback, Order  # Removed OrderItem since it's merged with Order

# # Customer Form for handling customer data
# class CustomerForm(forms.ModelForm):
#     class Meta:
#         model = Customer
#         fields = ['first_name', 'last_name', 'email', 'phone_number']
#         widgets = {
#             'first_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'First Name'}),
#             'last_name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Last Name'}),
#             'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Email'}),
#             'phone_number': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Phone Number'}),
#         }

# # Reservation Form for booking tables
# class ReservationForm(forms.ModelForm):
#     class Meta:
#         model = Reservation
#         fields = ['customer', 'table', 'reservation_time', 'num_of_guests']
#         widgets = {
#             'customer': forms.Select(attrs={'class': 'form-control'}),
#             'table': forms.Select(attrs={'class': 'form-control'}),
#             'reservation_time': forms.DateTimeInput(attrs={
#                 'class': 'form-control', 
#                 'placeholder': 'YYYY-MM-DD HH:MM:SS',
#                 'type': 'datetime-local'  # Use HTML5 input type for better UX
#             }),
#             'num_of_guests': forms.NumberInput(attrs={
#                 'class': 'form-control', 
#                 'placeholder': 'Number of Guests',
#                 'min': 1
#             }),
#         }

# # Feedback Form for customer feedback
# class FeedbackForm(forms.ModelForm):
#     class Meta:
#         model = Feedback
#         fields = ['customer', 'rating', 'comment']
#         widgets = {
#             'customer': forms.Select(attrs={'class': 'form-control'}),
#             'rating': forms.NumberInput(attrs={
#                 'class': 'form-control', 
#                 'min': 1, 
#                 'max': 5, 
#                 'placeholder': '1-5'
#             }),
#             'comment': forms.Textarea(attrs={
#                 'class': 'form-control', 
#                 'placeholder': 'Leave your comment here...', 
#                 'rows': 3
#             }),
#         }

# # Order Form for creating new orders
# class OrderForm(forms.ModelForm):
#     class Meta:
#         model = Order
#         fields = ['customer', 'table', 'status']
#         widgets = {
#             'customer': forms.Select(attrs={'class': 'form-control'}),
#             'table': forms.Select(attrs={'class': 'form-control'}),
#             'status': forms.Select(attrs={'class': 'form-control'}),
#         }

