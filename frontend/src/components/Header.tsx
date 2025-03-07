import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-yellow-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Magadh Rasam
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <button
          className="text-gray-700 font-medium hover:text-yellow-600 transition"
          onClick={() => navigate("/")}
        >
          About Us
        </button>
        <button
          className="text-gray-700 font-medium hover:text-yellow-600 transition"
          onClick={() => navigate("/")}
        >
          Menu
        </button>
        <button
          className="text-gray-700 font-medium hover:text-yellow-600 transition"
          onClick={() => navigate("/")}
        >
          Contact
        </button>
      </nav>

      {/* Desktop Authentication Buttons */}
      <div className="hidden md:flex space-x-4">
        <button
          className="rounded bg-yellow-400 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600 hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
        <button
          className="rounded bg-yellow-400 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600 hover:scale-105"
          onClick={() => navigate("/order")}
        >
          Create Order
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="text-yellow-400 text-2xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 z-50 md:hidden">
          <button
            className="text-gray-700 font-medium hover:text-yellow-600 transition"
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
            }}
          >
            About Us
          </button>
          <button
            className="text-gray-700 font-medium hover:text-yellow-600 transition"
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
            }}
          >
            Menu
          </button>
          <button
            className="text-gray-700 font-medium hover:text-yellow-600 transition"
            onClick={() => {
              navigate("/");
              setIsMobileMenuOpen(false);
            }}
          >
            Contact
          </button>
          <button
            className="rounded bg-yellow-400 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600 hover:scale-105"
            onClick={() => {
              navigate("/login");
              setIsMobileMenuOpen(false);
            }}
          >
            Sign In
          </button>
          <button
            className="rounded bg-yellow-400 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600 hover:scale-105"
            onClick={() => {
              navigate("/order");
              setIsMobileMenuOpen(false);
            }}
          >
            Create Order
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
