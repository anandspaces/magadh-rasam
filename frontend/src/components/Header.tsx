import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import AuthModal from "./AuthModal";
import { logout } from "../store/authSlice";

export default function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  const handleNavigation = (path: string) => {
    if (path === "/order" && !isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div
          className="text-2xl font-extrabold text-yellow-500 cursor-pointer tracking-wide hover:text-yellow-600 transition"
          onClick={() => navigate("/")}
        >
          Magadh Rasam
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
            {[
              { name: "About Us", path: "/about" },
              { name: "Contact", path: "/contact" },
              { name: "Order", path: "/order" },
            ].map((item) => (
              <button
                key={item.name}
                className="text-gray-700 font-medium hover:text-yellow-600 transition duration-200"
                onClick={() => handleNavigation(item.path)}
              >
                {item.name}
              </button>
            ))}
          </nav>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
            {isAuthenticated ? (
              <button
                className="rounded-lg bg-red-500 px-5 py-2 font-medium text-white transition duration-200 hover:bg-red-600 hover:shadow-lg"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="rounded-lg bg-yellow-500 px-5 py-2 font-medium text-white transition duration-200 hover:bg-yellow-600 hover:shadow-lg"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Sign In
              </button>
            )}
          </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-500 text-2xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center space-y-6 py-8 transition-all duration-300 ${
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

        {/* Mobile Navigation Links */}
        <nav className="mt-10 flex flex-col space-y-6 text-lg">
        {[
          { name: "About Us", path: "/about" },
          { name: "Contact", path: "/contact" },
          { name: "Order", path: "/order" },
        ].map((item) => (
          <button
            key={item.name}
            className="text-white text-lg font-medium hover:text-yellow-400 transition"
            onClick={() => {
              handleNavigation(item.path);
              setIsMobileMenuOpen(false);
            }}
          >
            {item.name}
          </button>
        ))}
        </nav>

        {/* Auth Button for Mobile */}
        {isAuthenticated ? (
              <button
                className="rounded-lg bg-red-500 px-6 py-2 font-medium text-white transition duration-200 hover:bg-red-600 hover:shadow-lg"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="rounded-lg bg-yellow-500 px-6 py-2 font-medium text-white transition duration-200 hover:bg-yellow-600 hover:shadow-lg"
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </button>
            )}
      </div>
    </header>
    {/* Auth Modal */}
    {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </>
  );
}
