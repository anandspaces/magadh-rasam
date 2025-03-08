import { FaUsers, FaHandshake, FaBullseye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  const navigate = useNavigate();

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="relative bg-yellow-500 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">About Magadh Rasam</h1>
        <p className="mt-4 text-lg max-w-3xl mx-auto">
          Bringing you the authentic taste of Magadh with love and tradition.
        </p>
      </div>

      {/* Our Story */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-600">Our Story</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Magadh Rasam was born out of a passion for authentic flavors. We bring
            traditional recipes to modern kitchens while preserving the legacy of
            our ancestors.
          </p>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="bg-white py-16">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 shadow-md rounded-lg bg-gray-50">
            <FaHandshake className="text-yellow-500 text-4xl mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">Commitment</h3>
            <p className="mt-2">We promise authenticity and quality in every bite.</p>
          </div>
          <div className="p-6 shadow-md rounded-lg bg-gray-50">
            <FaBullseye className="text-yellow-500 text-4xl mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">Our Mission</h3>
            <p className="mt-2">To bring the taste of Magadh to every home.</p>
          </div>
          <div className="p-6 shadow-md rounded-lg bg-gray-50">
            <FaUsers className="text-yellow-500 text-4xl mx-auto" />
            <h3 className="mt-4 text-xl font-semibold">Our Community</h3>
            <p className="mt-2">We cherish and grow with our loyal customers.</p>
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-yellow-600">Meet Our Team</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {["Anjali Sharma", "Rohan Verma", "Priya Singh"].map((name, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full"></div>
              <h3 className="mt-4 text-xl font-semibold">{name}</h3>
              <p className="text-gray-600">Co-founder</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-yellow-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">Want to Learn More?</h2>
        <p className="mt-2 text-lg">Get in touch with us today!</p>
        <button
          className="mt-4 bg-white text-yellow-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>
      </section>
    </div>
    <Footer />
    </>
  );
}

export default About;
