import axios from "axios";
import { useEffect, useState } from "react";

interface MenuItem {
  name: string;
  description: string;
  imageUrl: string;
}

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // Fetch the menu items from the backend using axios
    axios.get('http://localhost:8000/menu/')  // Adjust the URL if necessary
      .then((response) => {
        setMenuItems(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the menu items!', error);
      });
  }, []);

  //  Fetch data from the backend when the component mounts fetch function
  //  useEffect(() => {
  //   const fetchMenuItems = async () => {
  //     try {
  //       const response = await fetch("/api/menu"); // Replace with actual API endpoint
  //       const data = await response.json();
  //       setMenuItems(data); // Assume the data is an array of menu items
  //     } catch (error) {
  //       console.error("Error fetching menu items:", error);
  //     }
  //   };

  //   fetchMenuItems();
  // }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
  {menuItems.length === 0 ? (
    <p>No menu items available.</p>
  ) : (
    menuItems.map((item, index) => (
      <div key={index} className={index % 2 === 0 ? "col-span-2" : ""}>
        <p className="text-3xl font-semibold">{item.name}</p>
        <p className="text-lg">{item.description}</p>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
    ))
  )}
</div>

  );
};

export default Menu;
