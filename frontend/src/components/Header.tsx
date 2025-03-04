import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-yellow-400 cursor-pointer" onClick={() => navigate('/')}>
        Magadh Rasam
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <button
          className="text-gray-700 font-medium hover:text-yellow-600 transition"
          onClick={() => navigate('/')}
        >
          About Us
        </button>
        <button
          className="text-gray-700 font-medium hover:text-yellow-600 transition"
          onClick={() => navigate('/')}
        >
          Menu
        </button>
        <button
          className="text-gray-700 font-medium hover:text-yellow-600 transition"
          onClick={() => navigate('/')}
        >
          Contact
        </button>
      </nav>

      {/* Authentication Buttons */}
      <div className="space-x-4">
        <button
          className="rounded bg-yellow-400 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600 hover:scale-105"
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
        {/* <button
          className="rounded bg-yellow-400 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-orange-600 hover:scale-105"
          onClick={() => navigate('/register')}
        >
          Sign Up
        </button> */}
        <button
          className="rounded bg-yellow-400 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-yellow-600 hover:scale-105"
          onClick={() => navigate('/order')}
        >
          Create order
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button
          className="text-yellow-400"
          onClick={() => console.log("Toggle Mobile Menu")}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Header;
