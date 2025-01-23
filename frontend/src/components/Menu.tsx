import axios from "axios";
import { useEffect, useState } from "react";
import image from "../assets/default.jpg";

interface MenuItem {
  name: string;
  description: string;
  image: string;
  category: number;
}

const categoryNames: { [key: number]: string } = {
  1: "Appetizers",
  2: "Main Course",
  3: "Desserts",
  4: "Beverages",
};

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(1); // Default to the first category

  const toggleCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/menu/")
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error("Backend fetch failed. Fetching local data.", error);
        return fetch("/data/menu_data.json")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch the local JSON file");
            }
            return response.json();
          })
          .then((data) => {
            setMenuItems(data);
          })
          .catch((fallbackError) => {
            console.error("Error fetching the local JSON file.", fallbackError);
          });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      {/* Category Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {Object.entries(categoryNames).map(([id, name]) => (
          <button
            key={id}
            onClick={() => toggleCategory(Number(id))}
            className={`px-4 py-2 rounded ${
              selectedCategory === Number(id)
                ? "bg-yellow-600 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-yellow-500 transition`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-300 rounded-lg p-4"
            >
              <div className="h-8 bg-gray-400 mb-4 rounded"></div>
              <div className="h-6 bg-gray-400 mb-2 rounded"></div>
              <div className="h-48 bg-gray-400 rounded-lg"></div>
            </div>
          ))
        ) : menuItems.length === 0 ? (
          <p className="text-center text-xl col-span-4">
            No menu items available.
          </p>
        ) : (
          menuItems
            .filter((item) => item.category === selectedCategory)
            .map((item, index) => (
              <div
                key={index}
                className="transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl rounded-lg p-4 bg-white"
              >
                <p className="text-xl font-semibold">{item.name}</p>
                <p className="text-sm text-gray-700 mt-2">
                  {item.description}
                </p>
                <img
                  src={item.image || image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mt-4 transform transition duration-500 ease-in-out hover:scale-110"
                />
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Menu;
