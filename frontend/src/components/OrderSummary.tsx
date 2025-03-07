import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { OrderState } from "../store/orderSlice";

function OrderSummary(
  {
    onBack 
  }: {
    onBack: () => void 
  }
) {
  const [order, setOrder] = useState<OrderState | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingLocalData, setUsingLocalData] = useState(false); // Track if using local data

  const reduxOrder = useSelector((state: RootState) => state.order);

  // Fetch order summary from the backend or fallback to Redux
  const fetchOrderSummary = async () => {
    try {
      const response = await axios.get("/api/orders/summary/");
      setOrder(response.data); // Use backend data
    } catch (error) {
      console.warn("Using local order data:", error);
      setOrder(reduxOrder); // Fallback to Redux data
      setUsingLocalData(true); // Indicate that local data is being used
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderSummary();
  }, [reduxOrder]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Loading order summary...</p>
      </div>
    );
  }

  // Error state
  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-lg text-red-600">
          Failed to load order summary. Please try again later.
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
        {/* Offline Mode Warning */}
        {usingLocalData && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-4">
            You are viewing locally saved data. Some features may be limited.
          </div>
        )}

        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          📝 Order Summary
        </h1>

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
            className="w-full sm:w-auto rounded bg-yellow-500 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600"
              onClick={onBack}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;