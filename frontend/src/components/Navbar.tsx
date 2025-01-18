import { useNavigate } from "react-router-dom"


function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
      <button
        className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        onClick={()=>navigate('/login')}
      >
        Sign In
      </button>
      <button
        className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        onClick={()=>navigate('/register')}
      >
        Sign up
      </button>
    </div>
  )
}

export default Navbar;