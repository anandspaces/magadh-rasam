import axios from "axios";
import { useEffect, useState } from "react";
import image from "../assets/default.jpg";

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
    axios.get('http://localhost:8000/menu/')
      .then((response) => {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the menu items!', error);
        setLoading(false);
         // Fallback: Fetch from a local JSON file
         fetch('/data/menu_data.json')
         .then((response) => {
           if (!response.ok) {
             throw new Error('Failed to fetch the local JSON file');
           }
           return response.json();
         })
         .then((data) => {
           setMenuItems(data);
           setLoading(false);
         })
         .catch((fallbackError) => {
           console.error('There was an error fetching the local JSON file!', fallbackError);
           setLoading(false);
         })
         .finally(() => {
          setLoading(false);
        });
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
              src={`${item.image == null ? image : item.image}`}
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
