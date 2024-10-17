import React, { useState } from 'react';
import { placeOrder } from '../services/api';
import { Order } from '../interfaces';

const OrderForm: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newItem, setNewItem] = useState<number | ''>(''); // State expects number or empty string

  const handleAddItem = () => {
    if (newItem !== '') {
      setItems((prevItems) => [...prevItems, newItem]); // Add newItem to items array
      setNewItem(''); // Clear input field after adding item
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = { customer_name: customerName, items, total_price: totalPrice };
    const result = await placeOrder(order);
    console.log('Order placed:', result);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <label className="block mb-4">
        <span className="text-gray-700">Name:</span>
        <input
          className="mt-1 block w-full border rounded p-2"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Total Price:</span>
        <input
          type="number"
          className="mt-1 block w-full border rounded p-2"
          value={totalPrice}
          onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
        />
      </label>

      {/* Add item input */}
      <label className="block mb-4">
        <span className="text-gray-700">Add Item:</span>
        <input
          type="number"
          className="mt-1 block w-full border rounded p-2"
          value={newItem === '' ? '' : newItem} // Show empty string when it's ''
          onChange={(e) => setNewItem(e.target.value === '' ? '' : Number(e.target.value))} // Parse value to number
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </label>

      {/* Display added items */}
      {items.length > 0 && (
        <ul className="mb-4">
          {items.map((item, index) => (
            <li key={index} className="text-gray-700">
              Item {index + 1}: {item}
            </li>
          ))}
        </ul>
      )}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
