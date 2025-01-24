import { useState, useEffect } from "react";
import CreateOrder from "../components/CreateOrder";
import OrderConfirmation from "../components/OrderConfirmation";
import axios from "axios";

interface OrderData {
  id: string;
  status: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  deliveryAddress: string;
  estimatedTime: string;
}

const Order = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null); // Stores fetched order details
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState<string | null>(null); // Error state for API call

  const fetchOrderDetails = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<OrderData>(`/api/orders/${orderId}/`);
      setOrderData(response.data);
    } catch (err) {
      console.error("Error fetching order details:", err);
      setError("Failed to fetch order details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate fetching order ID from URL
    const query = new URLSearchParams(window.location.search);
    const orderId = query.get("order_id");
    if (orderId) {
      fetchOrderDetails(orderId);
    } else {
      setLoading(false); // No order ID, so no need to fetch
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      {orderData && orderData.status === "Confirmed" ? (
        <OrderConfirmation/>
      ) : (
        <CreateOrder />
      )}
    </div>
  );
};

export default Order;
