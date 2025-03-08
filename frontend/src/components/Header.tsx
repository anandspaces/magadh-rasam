import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import Cart from "./Cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import AuthModal from "./AuthModal";
import { logout } from "../store/authSlice";

function Header() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

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
        <nav className="hidden md:flex items-center space-x-8">
          {["About Us", "Contact", "Order"].map((item) => (
            <button
              key={item}
              className="text-gray-700 font-medium hover:text-yellow-600 hover:border-b-2 hover:border-yellow-600 transition"
              onClick={() => navigate(`/${item.toLowerCase().replace(" ", "")}`)}
            >
              {item}
            </button>
          ))}
          <div>
          <Cart />
          </div>
        </nav>

        {/* Sign In Button */}
        {/* <button
          className="hidden md:block rounded-xl bg-yellow-500 px-5 py-2 font-medium text-white transition duration-200 ease-in-out hover:bg-yellow-600 hover:shadow-lg hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button> */}

        {/* Auth Button */}
        <div>
            {isAuthenticated ? (
              <button
                className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white transition duration-200 hover:bg-red-600 hover:shadow-lg hover:scale-105"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="rounded-xl bg-yellow-500 px-5 py-2 font-medium text-white transition duration-200 hover:bg-yellow-600 hover:shadow-lg hover:scale-105"
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

        {["About Us", "Contact", "Order"].map((item) => (
          <button
            key={item}
            className="text-white text-lg font-medium hover:text-yellow-400 transition"
            onClick={() => {
              navigate(`/${item.toLowerCase().replace(" ", "")}`);
              setIsMobileMenuOpen(false);
            }}
          >
            {item}
          </button>
        ))}

        {/* Sign In Button */}
        {/* <button
          className="w-40 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-xl transition"
          onClick={() => {
            navigate("/login");
            setIsMobileMenuOpen(false);
          }}
        >
          Sign In
        </button> */}
        {/* Auth Button for Mobile */}
        {isAuthenticated ? (
              <button
                className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white transition duration-200 hover:bg-red-600 hover:shadow-lg hover:scale-105"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            ) : (
              <button
                className="rounded-xl bg-yellow-500 px-5 py-2 font-medium text-white transition duration-200 hover:bg-yellow-600 hover:shadow-lg hover:scale-105"
                onClick={() => setIsAuthModalOpen(true)}
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

export default Header;
