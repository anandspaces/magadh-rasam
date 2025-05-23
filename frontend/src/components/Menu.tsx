import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import defaultImage from "../assets/default.jpg";
import SearchComponent from "./Search";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
// import { addToCart } from "../store/cartSlice";
import { addToFavorites, initializeFavorites, removeFromFavorites, selectFavorites } from "../store/favoritesSlice";
import { AppDispatch } from "../store/store";
import API_URL from "../api/api";

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

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector(selectFavorites);

  // function to handle item selection
  const handleItemSelect = (item: MenuItem) => {
    if (item.category !== selectedCategory) {
      setSelectedCategory(item.category);
    }

    setTimeout(() => {
      setHighlightedItem(item.name);
      const element = document.getElementById(`item-${item.name}`);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        element.classList.add('bg-yellow-50', 'border-yellow-400');
        setTimeout(() => {
          element.classList.remove('bg-yellow-50', 'border-yellow-400');
        }, 2000);
      }
    }, 350);
  };

  useEffect(() => {
    if (highlightedItem) {
      const timer = setTimeout(() => setHighlightedItem(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedItem]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API_URL}/menu/`);
      setMenuItems(response.data);
    } catch (error) {
      console.error("Backend fetch failed. Fetching local data.", error, "API URL: ", API_URL);
      try {
        const response = await fetch("/data/menu_data.json");
        if (!response.ok) throw new Error("Failed to fetch local JSON");

        const data = await response.json();
        setMenuItems(
          data.map((item: any) => ({
            ...item,
            image: item.image_url || defaultImage,
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
    dispatch(initializeFavorites());
  }, [dispatch]);

  const filteredItems = menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search Component */}
      <div className="mb-2">
        <SearchComponent data={menuItems} onItemSelect={handleItemSelect} />
      </div>
      {/* Category Selector */}
      <div className="flex justify-start md:justify-center overflow-x-auto whitespace-nowrap space-x-4 mb-8 pl-2 pr-4 py-2 scrollbar-hide snap-x snap-mandatory scroll-px-4">
        {Object.entries(categoryNames).map(([id, name]) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(Number(id))}
            className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 snap-start
        ${selectedCategory === Number(id)
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
              id={`item-${item.name}`}
              className={`group relative transition-all duration-300 ease-out hover:z-10 ${highlightedItem === item.name
                  ? 'bg-yellow-50 border-yellow-400 animate-pulse'
                  : 'border-gray-200'
                }`}
            >
              <div className="h-full bg-white border rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <div className="border-b border-gray-200 pb-2 relative">
                    <p className="text-xl font-semibold text-gray-900 truncate peer">
                      {item.name}
                    </p>
                    {/* Tooltip for full name */}
                    {/* <div className="hidden group-hover:block absolute bg-gray-900 text-white px-3 py-1 rounded-md text-sm -mt-12 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.name}
                    </div> */}
                  </div>
                  {/* Description with gradient fade */}
                  <div className="relative mt-2 h-[4.5rem] overflow-hidden">
                    <p className="text-sm text-gray-600 line-clamp-3 transition-all duration-300 group-hover:line-clamp-none">
                      {item.description}
                    </p>
                    {/* <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white via-white group-hover:from-transparent group-hover:via-transparent transition-all duration-300" /> */}
                  </div>
                </div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    onError={(e) => (e.currentTarget.src = defaultImage)}
                    alt={item.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <p className="text-lg font-bold text-gray-800">₹{(Number(item.price)).toFixed(2)}</p>
                  <div className="flex gap-2">
                    {/* <button
                    onClick={() => dispatch(addToCart({ name: item.name, price: item.price, quantity: 1 }))}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg"
                  >
                    Add to Cart
                  </button> */}
                    <button
                      onClick={() => {
                        const isFavorite = favorites.some(fav => fav.name === item.name);
                        if (isFavorite) {
                          dispatch(removeFromFavorites(item.name));
                        } else {
                          dispatch(addToFavorites(item));
                        }
                      }}
                      className="text-red-600 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded-full"                  >
                      {favorites.some(fav => fav.name === item.name) ? (
                        <IoMdHeart size={24} className="scale-100 group-hover:scale-110 transition-transform" />
                      ) : (
                        <IoMdHeartEmpty size={24} className="scale-100 group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                    </div>
                  </div>
                </div>
              </div>
              ))
          )}
      </div>
    </div>
  );
}
