import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../store/orderSlice";
import { RootState } from "../store/store";
import { FaCheckCircle, FaSearch, FaShoppingCart, FaSpinner } from "react-icons/fa";
import LocationFetcher from "./LocationFetcher";

function CreateOrder({ onSubmit }: { onSubmit: () => void }) {
  const dispatch = useDispatch();
  const existingOrder = useSelector((state: RootState) => state.order);

  // State management
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [customerName, setCustomerName] = useState(existingOrder?.customerName || "");
  const [phone, setPhone] = useState(existingOrder?.phone || "");
  const [address, setAddress] = useState(existingOrder?.address || "");
  const [orderItems, setOrderItems] = useState(existingOrder?.orderItems || []);
  const [instructions, setInstructions] = useState(existingOrder?.instructions || "");
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  // Fetch menu items
  useEffect(() => {
    const loadMenu = async () => {
      try {
        const response = await axios.get("http://localhost:8000/menu/");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Using local menu data", error);
        try {
          const localResponse = await fetch("/data/menu_data.json");
          const data = await localResponse.json();
          setMenuItems(data);
        } catch (err) {
          console.error("Failed to load local menu", err);
        }
      }
    };
    loadMenu();
  }, []);

  // Filter menu items based on search
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add item from search
  const addItemFromSearch = (item: any) => {
    setOrderItems(prev => [...prev, { 
      ...item,
      quantity: 1 
    }]);
    setSearchQuery("");
  };

  // Location handler
  const handleLocationFound = (address: string) => {
    setAddress(address);
    setLocationError("");
  };

  // Order item handlers
  const updateQuantity = (index: number, quantity: number) => {
    setOrderItems(prev => {
      const updated = [...prev];
      updated[index].quantity = Math.max(1, quantity);
      return updated;
    });
  };

  
  // Handle item selection from search component
  // const handleItemSelect = (index: number, selectedItem: { name: string; price: number }) => {
  //   setOrderItems((prevItems) => {
  //     const updatedItems = [...prevItems];
  //     updatedItems[index] = { ...updatedItems[index], name: selectedItem.name, price: selectedItem.price };
  //     return updatedItems;
  //   });
  // };
  
  // Handle changes in order items
  // const handleItemChange = (index: number, field: string, value: string) => {
  //   setOrderItems((prevItems) => {
  //     const updatedItems = [...prevItems];
  //     switch (field) {
  //       case "name":
  //         updatedItems[index].name = value;
  //         break;
  //         case "quantity":
  //           updatedItems[index].quantity = Math.max(1, parseInt(value) || 1);
  //           break;
  //         }
  //         return updatedItems;
  //       });
  //     };
      
      // addOrderItem function
      // const addOrderItem = () => {
      //   setOrderItems(prevItems => [
      //     ...prevItems,
      //     { name: "", quantity: 1, price: 0 }
      //   ]);
      // };
      
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
      
      // Calculate total
      const calculateTotal = () => orderItems.reduce(
        (sum, item) => sum + (item.price * item.quantity), 0
  ).toLocaleString("en-IN", { 
    style: "currency", 
    currency: "INR" 
  });
  
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
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

    // Validate Order list
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
        resetForm();
        onSubmit(); // Move to the next stage
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
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
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <FaShoppingCart className="text-yellow-500" />
         Create New Order
      </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Customer Details */}
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
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
        </div>
        </div>

          {/* <div>
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
          </div> */}

          {/* Address Section with LocationFetcher */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium mb-1">
                Delivery Address
              </label>
              <LocationFetcher
                onLocationFound={handleLocationFound}
                onError={setLocationError}
                onLoading={setLocationLoading}
                loading={locationLoading}
              />
            </div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
              rows={3}
              required
            />
            {locationError && (
              <p className="text-red-500 text-sm">{locationError}</p>
            )}
          </div>

          {/* Order Items */}
          {/* <div>
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
          </div> */}

          {/* Menu Search Section */}
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center gap-2 border rounded-lg px-3">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 focus:outline-none"
                />
              </div>
              
              {searchQuery && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
                  {filteredMenuItems.map(item => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => addItemFromSearch(item)}
                      className="w-full p-2 text-left hover:bg-gray-100 flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span className="text-yellow-600">
                        ₹{item.price}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Items */}
            <div className="space-y-2">
              {orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 border rounded-lg p-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">₹{item.price} each</p>
                  </div>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                    className="w-20 p-2 border rounded-lg"
                    min="1"
                  />
                  <button
                    type="button"
                    onClick={() => removeOrderItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>


          {/* Total Amount Display */}
          {/* <div className="text-lg font-semibold text-gray-800 pt-4 border-t border-gray-200">
            Total Amount: {calculateTotalAmount()}
          </div> */}

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
          {/* <button
            type="submit"
            className={`w-full flex justify-center items-center py-2 px-4 rounded-md bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition duration-150 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
              <FaCheckCircle /> Submit Order
            </>
            )}
          </button> */}

          {/* Total and Submit Section */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold">Total:</span>
              <span className="text-xl font-bold text-yellow-600">
                {calculateTotal()}
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaCheckCircle />
              )}
              {loading ? "Processing..." : "Submit Order"}
            </button>
            </div>
            
        </form>
      </div>
    </div>
  );
}

export default CreateOrder;