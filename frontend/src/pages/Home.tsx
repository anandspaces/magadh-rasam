import { useEffect, useState } from "react";
import image from "../assets/wallpaper1.jpg";
import Navbar from "../components/Navbar";
import { FaArrowDown } from "react-icons/fa";
import Menu from "./Menu";

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false); // State to trigger fade-in effect
  const [showMenu, setShowMenu] = useState(false);

  const handleArrowClick = () => {
    // Toggle the showMenu state on arrow click
    setShowMenu(true);
  };
  useEffect(() => {
    // Trigger the fade-in effect after the component mounts
    const timer = setTimeout(() => setFadeIn(true), 500); // 500ms delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative">
        <img src={image} alt="wallpaper" className="w-full h-auto" />
        <div className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-in-out`}>
          <h1 className="mb-4 text-3xl sm:text-6xl font-semibold md:text-6xl">
            Magadh Rasam
            <br />
            <span className="text-2xl sm:text-4xl md:text-4xl">
              Experience the authentic taste of Magadh with every bite.
            </span>
          </h1>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="flex justify-center mt-8">
      <FaArrowDown
        className="text-brown-600 animate-bounce w-8 h-8 cursor-pointer"
        onClick={handleArrowClick}
      />
       {/* Conditionally Render Menu */}
       {showMenu && <Menu />}
      </div>
    </>
  );
};

export default Home;
