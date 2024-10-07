// src/pages/OrderPage.tsx
import React from 'react';
import OrderForm from '../components/OrderForm';

const OrderPage: React.FC = () => (
  <div>
    <h2>Place Order</h2>
    <OrderForm />
  </div>
);

export default OrderPage;
