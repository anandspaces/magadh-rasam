import { useState } from "react";
import axios from "axios";

interface OrderItem {
  name: string;
  quantity: number;
}

function CreateOrder (){
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([{ name: "", quantity: 1 }]);
  const [instructions, setInstructions] = useState("");
  const [success, setSuccess] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...orderItems];
    if (field === "name") updatedItems[index].name = value;
    else updatedItems[index].quantity = Math.max(1, parseInt(value) || 1);
    setOrderItems(updatedItems);
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { name: "", quantity: 1 }]);
  };

  const removeOrderItem = (index: number) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/orders/", { customerName, phone, address, orderItems, instructions });
      setSuccess(true);
      setCustomerName("");
      setPhone("");
      setAddress("");
      setOrderItems([{ name: "", quantity: 1 }]);
      setInstructions("");
    } catch (error) {
      console.error("Error creating order:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Order</h1>

        {/* Success Message */}
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
              <div
                key={index}
                className="flex items-center space-x-4 mt-2"
              >
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
                    className="text-red-600 hover:underline"
                  >
                    Remove
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

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition duration-150
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
