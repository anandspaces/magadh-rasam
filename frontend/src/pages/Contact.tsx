import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setAlertMessage("Please fill all fields!");
      setIsSuccess(false);
    } else {
      setAlertMessage("Message sent successfully!");
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    }

    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      <Header />

      {/* Alert Message */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 animate-fade-in z-50">
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
            <button onClick={() => setShowAlert(false)} className="text-gray-400 hover:text-gray-500 ml-auto">
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 flex flex-col items-center mt-6 py-16 px-6 md:px-12">
        {/* Hero Section */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-600">Contact Us</h2>
          <p className="text-gray-600 mt-3 max-w-lg mx-auto">
            We'd love to hear from you! Reach out with any questions or inquiries.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 mt-8 w-full max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows={5}
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: FaMapMarkerAlt, text: "123 Culinary Lane, Foodie City, BR 824143" },
            { icon: FaPhone, text: "+919602743680" },
            { icon: FaEnvelope, text: "anandvaibhaw000@gmail.com" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-center space-x-3 text-gray-700">
              <item.icon className="text-yellow-500 text-3xl" />
              <p className="text-lg">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Contact;