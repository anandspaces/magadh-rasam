import axios from "axios";
import { useEffect, useState } from "react";
import defaultImage from "../assets/default.jpg";
import SearchComponent from "./Search";

export interface MenuItem {
  name: string;
  description: string;
  image: string | null;
  category: number;
  price: number;
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
  const [selectedCategory, setSelectedCategory] = useState<number>(1); // Default to first category

  const toggleCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:8000/menu/");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Backend fetch failed. Fetching local data.", error);
      try {
        const response = await fetch("/data/menu_data.json");
        if (!response.ok) throw new Error("Failed to fetch the local JSON file");

        const data = await response.json();

        // ✅ Transform data to match expected format
        const formattedData = data.map((item: any) => ({
          name: item.name,
          description: item.description,
          image: item.image_url || defaultImage,  // Handle missing image
          category: item.category_id,  // Map category_id → category
          price: item.price,
        }));

        setMenuItems(formattedData);
      } catch (fallbackError) {
        console.error("Error fetching the local JSON file.", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  
    fetchMenu();
  }, []);
  

  const filteredItems = menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-6">
      {/* Category Buttons */}
      <div>
        <h3>Search Menu</h3>
        <SearchComponent data = {menuItems}/>
      </div>
      <div className="flex justify-center space-x-4 mb-6">
        {Object.entries(categoryNames).map(([id, name]) => (
          <button
            key={id}
            onClick={() => toggleCategory(Number(id))}
            className={`px-4 py-2 rounded font-semibold ${
              selectedCategory === Number(id)
                ? "bg-yellow-600 text-white scale-110 shadow-lg"
                : "bg-gray-200 text-gray-700"
            } hover:bg-yellow-500 transition-transform`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-300 rounded-lg p-4">
              <div className="h-8 bg-gray-400 mb-4 rounded"></div>
              <div className="h-6 bg-gray-400 mb-2 rounded"></div>
              <div className="h-48 bg-gray-400 rounded-lg"></div>
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-xl col-span-4 text-gray-500">
            No menu items available in this category. Please select a different category.
          </p>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl rounded-lg p-4 bg-white"
            >
              <div className="border-b-2 border-gray-200 pb-2">
                <p className="text-xl font-semibold">{item.name}</p>
              </div>
              <p className="text-sm text-gray-700 mt-2">{item.description}</p>
              <img
                src={item.image ? item.image : defaultImage}
                alt={item.name}
                className="w-full h-48 object-contain rounded-lg mt-4 shadow-md"
              />
              <p className="text-lg font-bold mt-2 text-green-600">${item.price.toFixed(2)}</p>
              <button className="text-white bg-red-600 px-4 py-2 rounded mt-2 hover:bg-red-700">
                Buy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Menu;
