import image from "../assets/wallpaper1.jpg";
import Login from "./Login";

const Home = () => {
  return (
    <div className="relative">
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
      <div className="my-10 px-4 text-center sm:my-16">
        <Login />
      </div>
    </div>
  );
};

export default Home;
