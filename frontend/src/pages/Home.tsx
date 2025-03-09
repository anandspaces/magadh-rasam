import { useEffect, useRef, useState } from "react";
import image from "../assets/wallpaper1.jpg";
import Navbar from "../components/Header";
import { FaArrowUp, FaBookOpen } from "react-icons/fa";
import { GiChiliPepper } from "react-icons/gi";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const Home = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Show menu when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShowMenu(true);
      }
      setShowScrollButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show menu and scroll to it
  const handleArrowClick = () => {
    setShowMenu(true);
    menuRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <Navbar />

      {/* Dashboard Section */}
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

        {/* Dashboard Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            Magadh
            <span className="text-amber-400 inline-flex items-center ml-2">
              Rasam
              <GiChiliPepper
                className="w-14 h-14 ml-3 animate-pulse drop-shadow-[0px_0px_8px_rgb(255,69,0)]"
                style={{ fill: "url(#chiliGradient)" }}
              />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="chiliGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#8B0000" /> {/* Dark Red */}
                    <stop offset="50%" stopColor="#FF4500" /> {/* Vibrant Red */}
                    <stop offset="100%" stopColor="#FFA500" /> {/* Orange */}
                  </linearGradient>
                </defs>
              </svg>
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
              <FaBookOpen className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section
        ref={menuRef}
        className={`py-20 transition-all duration-700 ease-in-out ${
          showMenu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {showMenu && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Menu />
            </div>
          </div>
        )}
      </section>

      {/* Floating Back to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 transition-all duration-300 flex items-center justify-center animate-fadeIn"
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Home;