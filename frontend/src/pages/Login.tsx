import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e:any) {
    e.preventDefault();
    if (!email) return;

    navigate('/menu')
  }

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 w-2/3 sm:w-1/2 rounded-md border border-stone-200 p-2 focus:outline-none focus:ring focus:ring-orange-500"
      />
          <button className="rounded bg-orange-600 px-4 py-2 font-medium text-white">
            sign in
          </button>
    </form>
  );
};

export default Login;
