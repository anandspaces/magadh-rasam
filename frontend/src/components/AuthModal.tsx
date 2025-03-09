import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import Cookies from "js-cookie";
import { FiUser, FiMail, FiLock, FiX, FiLogIn, FiUserPlus, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = Cookies.get("access_token") || Cookies.get("fallback_auth");
    if (storedToken) {
      dispatch(login(storedToken));
    }
  }, [dispatch]);
  
  const showNotification = (message: string, success: boolean) => {
    setAlertMessage(message);
    setIsSuccess(success);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

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
  
      // Modified alerts
      showNotification(
        isLogin ? "Login Successful" : "Registered Successfully", 
        true
      );
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
        showNotification("Registered Successfully", true);
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
          showNotification("Login Successfully", true);
          setTimeout(() => onClose(), 500);
        } else {
          setError("Invalid credentials");
          showNotification("Invalid credentials", false);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm z-50">
      {/* Notification container - Top Center */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 animate-fade-in">
          <div className={`flex items-center p-4 rounded-lg shadow-lg border ${
            isSuccess 
              ? "bg-green-50 border-green-200 text-green-800" 
              : "bg-red-50 border-red-200 text-red-800"
          }`}>
            {isSuccess ? (
              <FiCheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            ) : (
              <FiAlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
            )}
            <span className="mr-4">{alertMessage}</span>
            <button 
              onClick={() => setShowAlert(false)}
              className="text-gray-400 hover:text-gray-500 ml-auto"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
  
      {/* Modal Content */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl relative">
        {/* Dynamic Content Section - Hidden on mobile */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-amber-500 to-orange-500 p-8 relative overflow-hidden">
          <div className="relative h-full flex items-center justify-center">
            {/* Login Content */}
            <div className={`absolute transition-all duration-500 ${isLogin ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"}`}>
              <div className="text-center text-white space-y-4 px-4">
                <h2 className="text-4xl font-bold font-serif">Welcome Back</h2>
                <p className="text-lg">Sign in to continue your culinary journey and access member-exclusive features</p>
              </div>
            </div>
  
            {/* Register Content */}
            <div className={`absolute transition-all duration-500 ${!isLogin ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}>
              <div className="text-center text-white space-y-4 px-4">
                <h2 className="text-4xl font-bold font-serif">Join Us</h2>
                <p className="text-lg">Create an account to unlock personalized experiences and special offers</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Form Section - Full width on mobile */}
        <div className="w-full md:w-1/2 p-4 md:p-8 relative">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-amber-600 transition-colors"
            onClick={onClose}
          >
            <FiX className="w-6 h-6" />
          </button>
  
          <div className="h-full flex flex-col justify-center md:py-0 py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center font-serif">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
  
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Form inputs remain the same as previous version */}
              <div className="space-y-4">
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  />
                </div>
  
                {!isLogin && (
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                    />
                  </div>
                )}
  
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                  />
                </div>
              </div>
  
              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                  <span>{error}</span>
                </div>
              )}
  
              <button
                type="submit"
                className="w-full py-3 px-6 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : isLogin ? (
                  <>
                    <FiLogIn />
                    Sign In
                  </>
                ) : (
                  <>
                    <FiUserPlus />
                    Create Account
                  </>
                )}
              </button>
            </form>
  
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-amber-600 hover:text-orange-700 font-medium transition-colors"
              >
                {isLogin 
                  ? "New here? Create an account" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
