import { useSelector } from "react-redux";
import Login from "./Login";
import { Link } from "react-router-dom";
import { RootState } from "..//store/store"; // Assuming you have a RootState type defined in your store

const Home = () => {
  const username = useSelector((state: RootState) => state.user.name);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-16 text-3xl sm:text-6xl font-semibold md:text-6xl">
        The best pizza.
        <br />
        <span className="text-orange-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === "" ? (
        <Login />
      ) : (
        <Link
          to="/menu"
          className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        >
          Continue ordering, {username}!
        </Link>
      )}{" "}
    </div>
  );
};

export default Home;
