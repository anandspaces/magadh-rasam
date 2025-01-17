import { useNavigate } from "react-router-dom";
import image from "../assets/wallpaper1.jpg";
import Login from "./Login";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  function handleSubmit(e:any) {
    e.preventDefault();

    navigate('/menu')
  }
  function handleContinue(e:any) {
    e.preventDefault();
    navigate('/menu')
  }
  return (
    <div className="relative">
      <Navbar />
      <img src={image} alt="wallpaper" className="w-full h-auto" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="mb-4 text-3xl sm:text-6xl font-semibold md:text-6xl">
          Magadh Rasam
          <br />
            <span className="text-yellow-600 text-2xl sm:text-4xl md:text-4xl">
            Experience the authentic taste of Magadh with every bite.
            </span>
        </h1>
      </div>
    </div>
  );
};

export default Home;
