import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Cookies from "js-cookie";

interface AuthModalProps {
  onClose: () => void;
}

function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = Cookies.get("access_token") || Cookies.get("fallback_auth");
    if (storedToken) {
      dispatch(login(storedToken));
    }
  }, [dispatch]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    if (!password || (!isLogin && (!username || !email))) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
  
    try {
      let token;
  
      if (isLogin) {
        // Attempt Backend Login
        const response = await axios.post("http://localhost:8000/api/login/", {
          username,
          password,
        });
        token = response.data.token;
      } else {
        // Attempt Backend Registration
        await axios.post("http://localhost:8000/api/register/", {
          username,
          email,
          password,
        });
  
        // Save Credentials Locally as a Fallback
        localStorage.setItem("fallback_username", username);
        localStorage.setItem("fallback_email", email);
        localStorage.setItem("fallback_password", password);
  
        token = `fallback-${new Date().getTime()}`; // Generate fallback token
      }
  
      // Store token in cookies
      Cookies.set("access_token", token, { expires: 7, secure: true });
      dispatch(login(token));
  
      alert(isLogin ? "Login Successful" : "Registered Successfully");
      setTimeout(() => onClose(), 500);
    } catch (err) {
      console.error("Backend error, falling back:", err);
  
      if (!isLogin) {
        // Local Fallback Registration
        localStorage.setItem("fallback_username", username);
        localStorage.setItem("fallback_email", email);
        localStorage.setItem("fallback_password", password);
  
        const fallbackToken = `fallback-${new Date().getTime()}`;
        Cookies.set("fallback_auth", fallbackToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
  
        dispatch(login(fallbackToken));
        alert("Registered Successfully");
        setTimeout(() => onClose(), 500);
      } else {
        // Fallback Login
        const storedUsername = localStorage.getItem("fallback_username");
        const storedPassword = localStorage.getItem("fallback_password");
  
        if (storedUsername === username && storedPassword === password) {
          const fallbackToken = `fallback-${new Date().getTime()}`;
          Cookies.set("fallback_auth", fallbackToken, {
            expires: 1,
            secure: true,
            sameSite: "Strict",
          });
  
          dispatch(login(fallbackToken));
          alert("Login Successful");
          setTimeout(() => onClose(), 500);
        } else {
          setError("Invalid credentials");
        }
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-100 py-2 px-4 rounded">
            {error}
          </p>
        )}

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition duration-150 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-yellow-600 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
