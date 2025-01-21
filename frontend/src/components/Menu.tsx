import axios from "axios";
import { useEffect, useState } from "react";

interface MenuItem {
  name: string;
  description: string;
  image: string;
}

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    // Fetch the menu items from the backend using axios
    axios.get('http://localhost:8000/menu/')  // Adjust the URL if necessary
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the menu items!', error);
        setLoading(false);
      });
  }, []);


  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {loading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-300 rounded-lg p-4">
            <div className="h-8 bg-gray-400 mb-4 rounded"></div>
            <div className="h-6 bg-gray-400 mb-2 rounded"></div>
            <div className="h-48 bg-gray-400 rounded-lg"></div>
          </div>
        ))
      ) : menuItems.length === 0 ? (
        <p className="text-center text-xl">No menu items available.</p>
      ) : (
        menuItems.map((item, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "col-span-2" : ""
            } transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl rounded-lg p-4 bg-gradient-to-r from-yellow-600 to-yellow-200`}
          >
            <p className="text-3xl font-semibold text-white">{item.name}</p>
            <p className="text-lg text-white mt-2">{item.description}</p>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg mt-4 transform transition duration-500 ease-in-out hover:scale-110"
            />
          </div>
        ))
      )}
    </div>

  );
};

export default Menu;
