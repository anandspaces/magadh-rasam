import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderConfirmation(){
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order data from the backend
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get("/api/orders/confirmation/"); // Replace with your actual API endpoint
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-600">Failed to load order details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🎉 Order Confirmed!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Thank you, <span className="font-medium">{order.customerName}</span>! Your order{" "}
          <span className="font-medium text-yellow-500">#{order.id}</span> has been placed successfully.
        </p>

        {/* Order Details */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Details:</h2>
          <ul className="space-y-2">
            {order.items.map((item: any, index: number) => (
              <li
                key={index}
                className="flex justify-between items-center text-gray-700"
              >
                <span>{item.name}</span>
                <span className="font-medium">x{item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center border-t border-gray-300 mt-4 pt-2">
            <span className="text-gray-700 font-semibold">Total Amount:</span>
            <span className="text-gray-900 font-bold">{order.totalAmount}</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Delivery Address:</h2>
          <p className="text-gray-600">{order.deliveryAddress}</p>
          <p className="text-gray-600 mt-2">
            Estimated Delivery Time:{" "}
            <span className="font-medium text-gray-700">{order.estimatedTime}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <button
            className="w-full sm:w-auto rounded bg-yellow-500 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600"
            onClick={() => navigate("/menu")}
          >
            Back to Menu
          </button>
          <button
            className="w-full sm:w-auto rounded bg-gray-700 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-gray-800"
            onClick={() => navigate("/order-summary")}
          >
            View Order Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
