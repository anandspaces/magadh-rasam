import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <button
        className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        onClick={() => navigate('/login')}
      >
        signin
      </button>
      <button
        className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        onClick={() => navigate('/signup')}
      >
        Sign up
      </button>
    </div>
  )
}