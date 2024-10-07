// src/components/MenuItemCard.tsx
import React from 'react';
import { MenuItem } from '../interfaces';

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => (
  <div className="border rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow">
    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
    <p className="text-gray-600 mb-4">{item.description}</p>
    <p className="font-bold text-lg mb-4">${item.price}</p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Order Now
    </button>
  </div>
);

export default MenuItemCard;
