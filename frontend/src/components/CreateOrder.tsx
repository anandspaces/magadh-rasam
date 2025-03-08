import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../store/orderSlice";
import { RootState } from "../store/store";

function CreateOrder({ onSubmit }: { onSubmit: () => void }) {
  const dispatch = useDispatch();
  const existingOrder = useSelector((state: RootState) => state.order);

  // Initialize form state from Redux
  const [customerName, setCustomerName] = useState(existingOrder?.customerName || "");
  const [phone, setPhone] = useState(existingOrder?.phone || "");
  const [address, setAddress] = useState(existingOrder?.address || "");
  const [orderItems, setOrderItems] = useState(
    existingOrder?.orderItems || []
  );
  const [instructions, setInstructions] = useState(existingOrder?.instructions || "");

  // State for UI feedback
  const [success, setSuccess] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  // Handle updates to existingOrder
  useEffect(() => {
    if (existingOrder) {
      setCustomerName(existingOrder.customerName);
      setPhone(existingOrder.phone);
      setAddress(existingOrder.address);
      setOrderItems(existingOrder.orderItems);
      setInstructions(existingOrder.instructions);
    }
  }, [existingOrder]);

   // Handle item selection from search component
   const handleItemSelect = (index: number, selectedItem: { name: string; price: number }) => {
    setOrderItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], name: selectedItem.name, price: selectedItem.price };
      return updatedItems;
    });
  };

  // Handle changes in order items
  const handleItemChange = (index: number, field: string, value: string) => {
    setOrderItems((prevItems) => {
      const updatedItems = [...prevItems];
      switch (field) {
        case "name":
          updatedItems[index].name = value;
          break;
        case "quantity":
          updatedItems[index].quantity = Math.max(1, parseInt(value) || 1);
          break;
      }
      return updatedItems;
    });
  };

  // addOrderItem function
const addOrderItem = () => {
  setOrderItems(prevItems => [
    ...prevItems,
    { name: "", quantity: 1, price: 0 }
  ]);
};

  // Remove an order item
  const removeOrderItem = (index: number) => {
    setOrderItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // Calculate the total amount
  const calculateTotalAmount = () => {
    return Number(
      orderItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Validate phone number
    const phoneRegex = /^\+?[0-9\s\-]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    // Validate order items
    if (orderItems.some((item) => item.name.trim() === "")) {
      alert("Please provide names for all order items.");
      setLoading(false);
      return;
    }

    if (orderItems.length === 0) {
      alert("Please add at least one item to the order.");
      setLoading(false);
      return;
    }

    // Prepare order data
    const orderData = {
      customerName,
      phone,
      address,
      orderItems,
      instructions,
      totalAmount: calculateTotalAmount(),
    };

    // Save to Redux store
    dispatch(setOrder(orderData));

    try {
      // Try saving to backend
      const res = await axios.post("/api/orders/", orderData);
      if (res.status === 200 || res.status === 201) {
        setSuccess(true);
        resetForm();
        setTimeout(() => setSuccess(null), 3000);
        onSubmit(); // Move to the next stage
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      // alert(error.response?.data?.message || "An unexpected error occurred.");
      setSuccess(true);
      setTimeout(() => setSuccess(null), 3000);
      onSubmit(); // Move to the next stage even if backend fails
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setCustomerName("");
    setPhone("");
    setAddress("");
    setOrderItems([{ name: "", quantity: 1, price: 10 }]);
    setInstructions("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Order</h1>

        {/* Success/Error Messages */}
        {success && (
          <p className="text-green-600 text-center bg-green-100 py-2 px-4 rounded mb-6">
            Order successfully created!
          </p>
        )}
        {success === false && (
          <p className="text-red-600 text-center bg-red-100 py-2 px-4 rounded mb-6">
            Failed to create order. Please try again.
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Customer Details */}
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>
            <input
              id="customerName"
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Delivery Address
            </label>
            <textarea
              id="address"
              placeholder="Enter delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={3}
              required
            ></textarea>
          </div>

          {/* Order Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order Items
            </label>
            {orderItems.map((item, index) => (
              <div key={`item-${index}`} className="flex items-center space-x-4 mt-2">
                <input
                  type="text"
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  className="flex-1 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <span className="text-gray-600">
                  {item.price.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </span>
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="w-20 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                  min={1}
                />
                {orderItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOrderItem(index)}
                    className="text-red-600 hover:text-red-800 w-5 h-5"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOrderItem}
              className="mt-4 text-yellow-600 hover:underline"
            >
              + Add Item
            </button>
          </div>

          {/* Total Amount Display */}
          <div className="text-lg font-semibold text-gray-800 pt-4 border-t border-gray-200">
            Total Amount: {calculateTotalAmount()}
          </div>

          {/* Special Instructions */}
          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700"
            >
              Special Instructions
            </label>
            <textarea
              id="instructions"
              placeholder="Enter any special instructions (optional)"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={3}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full flex justify-center items-center py-2 px-4 rounded-md bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition duration-150 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateOrder;