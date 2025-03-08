import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6 md:px-12">
      {/* Hero Section */}
      <h2 className="text-3xl md:text-5xl font-bold text-yellow-600 text-center">Contact Us</h2>
      <p className="text-gray-600 mt-4 text-center">We'd love to hear from you! Get in touch with us.</p>
      
      {/* Contact Form */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-10 mt-8 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Details */}
      <div className="mt-12 text-gray-700 flex flex-col md:flex-row md:space-x-12 text-center md:text-left">
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-yellow-500 text-2xl" />
          <p>123 Street, Your City, Country</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <FaPhone className="text-yellow-500 text-2xl" />
          <p>+123 456 7890</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <FaEnvelope className="text-yellow-500 text-2xl" />
          <p>info@yourcompany.com</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Contact;
