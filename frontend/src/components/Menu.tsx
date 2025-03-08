import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import defaultImage from "../assets/default.jpg";
import SearchComponent from "./Search";

export interface MenuItem {
  name: string;
  description: string;
  image?: string;
  category: number;
  price: number;
}

const categoryNames = {
  1: "Appetizers",
  2: "Main Course",
  3: "Desserts",
  4: "Beverages",
};

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const dispatch = useDispatch();

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:8000/menu/");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Backend fetch failed. Fetching local data.", error);
      try {
        const response = await fetch("/data/menu_data.json");
        if (!response.ok) throw new Error("Failed to fetch local JSON");

        const data = await response.json();
        setMenuItems(
          data.map((item: any) => ({
            ...item,
            image: item.image || defaultImage,
            category: item.category_id,
          }))
        );
      } catch (fallbackError) {
        console.error("Error fetching local JSON file.", fallbackError);
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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Component */}
<div className="mb-2">

      <SearchComponent data = {menuItems} />
</div>

      {/* Category Selector */}
<div className="flex justify-center overflow-x-auto whitespace-nowrap space-x-4 mb-8 px-4 py-2 scrollbar-hide">
  {Object.entries(categoryNames).map(([id, name]) => (
    <button
      key={id}
      onClick={() => setSelectedCategory(Number(id))}
      className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
        selectedCategory === Number(id)
          ? "bg-yellow-600 text-white scale-105 shadow-lg"
          : "bg-gray-200 text-gray-700 hover:bg-yellow-500 hover:text-white"
      }`}
    >
      {name}
    </button>
  ))}
</div>


      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="animate-pulse bg-gray-300 rounded-lg p-6">
              <div className="h-8 bg-gray-400 mb-4 rounded"></div>
              <div className="h-6 bg-gray-400 mb-2 rounded"></div>
              <div className="h-48 bg-gray-400 rounded-lg"></div>
            </div>
          ))
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-xl col-span-4 text-gray-500">
            No menu items available in this category.
          </p>
        ) : (
          filteredItems.map((item, index) => (
            <div
              key={index}
              className="group transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl rounded-lg p-6 bg-white border border-gray-200"
            >
              <div className="border-b border-gray-200 pb-2">
                <p className="text-xl font-semibold text-gray-900">{item.name}</p>
              </div>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <img
                src={item.image}
                onError={(e) => (e.currentTarget.src = defaultImage)}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mt-4 shadow-md transition-all duration-300"
              />
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => dispatch(addToCart({ name: item.name, price: item.price, quantity: 1 }))}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-all duration-300"
                >
                  Buy
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Menu;
