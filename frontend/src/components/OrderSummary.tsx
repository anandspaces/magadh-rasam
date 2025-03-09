import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { OrderState } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaClock, FaHome } from "react-icons/fa";

function OrderSummary(
  {
    order
  }: {
    order: OrderState
  }
) {
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [redirecting, setRedirecting] = useState(false);

  const reduxOrder = useSelector((state: RootState) => state.order);

  const navigate = useNavigate();
  // Fetch order summary from the backend or fallback to Redux
  const fetchOrderSummary = async () => {
    try {
      const response = await axios.get("/api/orders/summary/");
      // setOrder(response.data); // Use backend data
      console.log(response)
    } catch (error) {
      console.warn("Using local order data:", error);
      // setOrder(reduxOrder); // Fallback to Redux data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderSummary();
  }, [reduxOrder]);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Immediate redirect handler
  const handleImmediateRedirect = () => {
    setRedirecting(true);
    setTimeout(() => navigate("/"), 300); // Allows animation to complete
  };

  // Progress bar animation
  const progressStyle = {
    width: `${(countdown / 30) * 100}%`,
    transition: 'width 1s linear',
  };

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
      <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        {/* Redirect overlay */}
        {redirecting && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="text-white text-xl font-semibold animate-pulse">
              Redirecting...
            </div>
          </div>
        )}

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-yellow-500 rounded-full transition-all duration-1000"
              style={progressStyle}
            />
          </div>
          <FaClock className="text-yellow-500" />
          <div className="text-center mt-2 text-sm text-gray-600">
            Redirecting to homepage in {countdown} seconds
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🎉 Order Confirmed!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Thank you, <span className="font-medium">{order.customerName}</span>! Your order{" "}
          <span className="font-medium text-yellow-500">#{order.id}</span> has been placed successfully.
        </p>
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
          {/* <button
            className="w-full sm:w-auto rounded bg-yellow-500 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600"
              onClick={onBack}
          >
            Back to Menu
          </button> */}
          {/* write function to redirect to home("/") in 30 s */}
          {/* Immediate action button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleImmediateRedirect}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition-colors duration-200"
            >
              <FaArrowRight className="h-5 w-5 mr-2" />
              <FaHome /> Return to Home Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;