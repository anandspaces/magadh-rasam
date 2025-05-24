import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { OrderState } from "../store/orderSlice";
import { FaCheckCircle, FaChevronLeft } from "react-icons/fa";
import API_URL from "../api/api";

export default function OrderConfirmation({ 
  onConfirm, 
  onBack ,
  order
}: {
  onConfirm: () => void; 
  onBack: () => void;
  order: OrderState; 
}) {
  const [loading, setLoading] = useState(true);

  const reduxOrder = useSelector((state: RootState) => state.order);

  // Handle moving to the next stage
  const handleConfirm = () => {
    onConfirm(); // Move to the summary stage
  };

  // Fetch order details from the backend or fallback to Redux
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/confirmation/`);
      // setOrder(response.data); // Use backend data
      console.log(response)
    } catch (error) {
      console.warn("Using local order data:", error, "API URL: ", API_URL);
      // setOrder(reduxOrder); // Fallback to Redux data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [reduxOrder]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Loading order details...</p>
      </div>
    );
  }

  // Error state
  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-600">
          Failed to load order details. Please try again later.
        </p>
        <button
          className="mt-4 rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 sm:p-8">
        {/* Order Details */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Details:</h2>
          <ul className="space-y-2">
            {order.orderItems.map((item, index) => (
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
            <span className="text-gray-900 font-bold">
              {order.totalAmount.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Delivery Address:</h2>
          <p className="text-gray-600">{order.address}</p>
          <p className="text-gray-600 mt-2">
            Estimated Delivery Time:{" "}
            <span className="font-medium text-gray-700">30 minutes</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <button
            className="w-full sm:w-auto rounded flex bg-yellow-500 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600"
            onClick={onBack}
          >
            <FaChevronLeft className="w-4 h-4 my-1 mx-1" /> Edit order
          </button>
          <button
            className="w-full sm:w-auto rounded flex bg-gray-700 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-gray-800"
            onClick={handleConfirm}
          >
            Confirm Order <FaCheckCircle className="w-4 h-4 my-1 mx-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
