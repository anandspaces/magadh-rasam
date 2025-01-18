import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <button
        className="rounded bg-orange-600 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-orange-700 hover:scale-105"
        onClick={() => navigate('/login')}
      >
        Sign In
      </button>
      <button
        className="rounded bg-orange-600 px-4 py-2 font-medium text-white transition duration-150 ease-in-out hover:bg-orange-700 hover:scale-105"
        onClick={() => navigate('/register')}
      >
        Sign Up
      </button>
    </div>
  );
}

export default Navbar;
