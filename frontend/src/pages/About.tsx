import { FaUsers, FaHandshake, FaBullseye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 text-gray-900 mt-6">
        {/* Hero Section */}
        <div className="relative bg-yellow-500 text-white py-20 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">About Magadh Rasam</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Bringing you the authentic taste of Magadh with love and tradition.
          </p>
        </div>

        {/* Our Story */}
        <section className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-yellow-600">Our Story</h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto leading-relaxed">
            Magadh Rasam was born out of a passion for authentic flavors. We bring
            traditional recipes to modern kitchens while preserving the legacy of our ancestors.
          </p>
        </section>

        {/* Our Mission & Values */}
        <section className="bg-white py-16">
          <div className="container mx-auto grid gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 text-center">
            {[
              { icon: FaHandshake, title: "Commitment", text: "We promise authenticity and quality in every bite." },
              { icon: FaBullseye, title: "Our Mission", text: "To bring the taste of Magadh to every home." },
              { icon: FaUsers, title: "Our Community", text: "We cherish and grow with our loyal customers." }
            ].map((item, index) => (
              <div key={index} className="p-6 shadow-md rounded-lg bg-gray-50">
                <item.icon className="text-yellow-500 text-5xl mx-auto" />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet The Founder */}
        <section className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-yellow-600">Meet Our Founder</h2>
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-64">
              <img
                className="w-24 h-24 mx-auto bg-gray-300 rounded-full"
                src="./profile.jpg"
                alt="profile pic"
              />
              <h3 className="mt-4 text-xl font-semibold">Vaibhaw Anand</h3>
              <p className="text-gray-600">Founder</p>
              <p className="mt-2 text-gray-700 leading-relaxed">
                Passionate about reviving and sharing the authentic flavors of Magadh.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-yellow-500 text-white py-16 text-center px-4">
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
