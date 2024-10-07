// src/components/FeedbackForm.tsx
import React, { useState } from 'react';
import { submitFeedback } from '../services/api';
import { Feedback } from '../interfaces';

const FeedbackForm: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const feedback: Feedback = { customer_name: customerName, comments, rating };
    const result = await submitFeedback(feedback);
    console.log('Feedback submitted:', result);
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
        <span className="text-gray-700">Comments:</span>
        <textarea
          className="mt-1 block w-full border rounded p-2"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Rating:</span>
        <input
          type="number"
          className="mt-1 block w-full border rounded p-2"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
        />
      </label>
      <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
