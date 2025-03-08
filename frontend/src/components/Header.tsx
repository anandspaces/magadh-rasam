import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div
          className="text-2xl font-extrabold text-yellow-500 cursor-pointer tracking-wide hover:text-yellow-600 transition"
          onClick={() => navigate("/")}
        >
          Magadh Rasam
        </div>

        {/* Desktop Navigation (Now "Order" matches the other links) */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            className="text-gray-700 font-medium hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition"
            onClick={() => navigate("/about")}
          >
            About Us
          </button>
          <button
            className="text-gray-700 font-medium hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition"
            onClick={() => navigate("/menu")}
          >
            Menu
          </button>
          <button
            className="text-gray-700 font-medium hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition"
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
          <button
            className="text-gray-700 font-medium hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition"
            onClick={() => navigate("/order")}
          >
            Order
          </button>
        </nav>

        {/* Sign In Button */}
        <button
          className="hidden md:block rounded-xl bg-yellow-500 px-5 py-2 font-medium text-white transition duration-200 ease-in-out hover:bg-yellow-600 hover:shadow-lg hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-yellow-500 text-2xl focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center space-y-6 py-8 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-white text-3xl hover:text-yellow-400 transition"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <FaTimes />
        </button>

        <button
          className="text-white text-lg font-medium hover:text-yellow-400 transition"
          onClick={() => {
            navigate("/about");
            setIsMobileMenuOpen(false);
          }}
        >
          About Us
        </button>
        <button
          className="text-white text-lg font-medium hover:text-yellow-400 transition"
          onClick={() => {
            navigate("/menu");
            setIsMobileMenuOpen(false);
          }}
        >
          Menu
        </button>
        <button
          className="text-white text-lg font-medium hover:text-yellow-400 transition"
          onClick={() => {
            navigate("/contact");
            setIsMobileMenuOpen(false);
          }}
        >
          Contact
        </button>
        <button
          className="text-white text-lg font-medium hover:text-yellow-400 transition"
          onClick={() => {
            navigate("/order");
            setIsMobileMenuOpen(false);
          }}
        >
          Order
        </button>

        {/* Sign In Button */}
        <button
          className="w-40 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-xl transition"
          onClick={() => {
            navigate("/login");
            setIsMobileMenuOpen(false);
          }}
        >
          Sign In
        </button>
      </div>
    </header>
  );
}

export default Header;
