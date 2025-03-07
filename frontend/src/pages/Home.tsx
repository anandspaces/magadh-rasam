import { useEffect, useRef, useState } from "react";
import image from "../assets/wallpaper1.jpg";
import Navbar from "../components/Header";
import { FaArrowDown } from "react-icons/fa";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import SearchComponent from "../components/Search";
import LocationFetcher from "../components/LocationFetcher";

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleArrowClick = () => {
    setShowMenu(true);
    if (menuRef.current) {
      menuRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="relative">
          <img
            src={image}
            alt="wallpaper"
            className="w-full h-[80vh] md:h-screen object-cover"
          />
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center text-center text-white ${
              fadeIn ? "opacity-100" : "opacity-0"
            } transition-opacity duration-1000 ease-in-out`}
          >
            <h1 className="mb-4 text-3xl sm:text-5xl md:text-6xl font-semibold">
              Magadh Rasam
              <br />
              <span className="text-lg sm:text-2xl md:text-4xl">
                Experience the authentic taste of Magadh with every bite.
              </span>
            </h1>
            <SearchComponent />
            <LocationFetcher />
          </div>
        </div>

        {/* Scroll Down Arrow */}
        {!showMenu && (
          <div className="flex justify-center mt-8" onClick={handleArrowClick} style={{ cursor: "pointer"}}>
            <FaArrowDown
              className="text-brown-500 animate-bounce w-8 h-8 cursor-pointer"
            />
            <p><br />Explore the Menu</p>
          </div>
        )}

        {/* Menu Section */}
        <div ref={menuRef}>
          {showMenu && <Menu />}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
