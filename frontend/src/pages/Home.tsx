import Login from "./Login";

const Home = () => {

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-16 text-3xl sm:text-6xl font-semibold md:text-6xl">
        The best pizza.
        <br />
        <span className="text-orange-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
        <Login />
    </div>
  );
};

export default Home;
