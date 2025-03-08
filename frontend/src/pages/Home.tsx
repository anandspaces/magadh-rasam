import { useRef, useState } from "react";
import image from "../assets/wallpaper1.jpg";
import Navbar from "../components/Header";
import { FaArrowDown, FaArrowUp, FaBookOpen } from "react-icons/fa";
import { GiChiliPepper } from "react-icons/gi";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleArrowClick = () => {
    setShowMenu(true);
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Magadh Rasam traditional cuisine"
            className="w-full h-full object-cover object-center scale-110 transition-transform duration-[10s] ease-out"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            Magadh
            <span className="text-amber-400 animate-pulse inline-flex items-center ml-2">
              Rasam <GiChiliPepper className="w-8 h-8 ml-2" />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mt-4 max-w-2xl mx-auto leading-relaxed">
            Experience the authentic taste of Magadh with every bite.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleArrowClick}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              Explore Menu
              <FaBookOpen className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {!showMenu && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={handleArrowClick}
          >
            <div className="p-3 rounded-full bg-amber-500/20 backdrop-blur-sm animate-bounce">
              <FaArrowDown className="w-8 h-8 text-amber-400 hover:text-amber-300 transition-colors" />
            </div>
          </div>
        )}
      </section>

      {/* Menu Section */}
      <section
        ref={menuRef}
        className={`py-20 transition-all duration-500 ease-out ${
          showMenu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {showMenu && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Menu />
              {/* Back to Top */}
              </div>
              <div className="flex justify-center mt-16 text-center">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 px-6 py-2 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <FaArrowUp className="w-5 h-5" /> Back to Top
                </button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Home;