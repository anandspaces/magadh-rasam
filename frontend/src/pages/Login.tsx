import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e:any) {
    e.preventDefault();
    if (!email || !password) return;
    navigate('/menu')
  }

  return (
    <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 w-2/3 sm:w-1/2 rounded-md border border-stone-200 p-2 focus:outline-none focus:ring focus:ring-yellow-600"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 w-2/3 sm:w-1/2 rounded-md border border-stone-200 p-2 focus:outline-none focus:ring focus:ring-yellow-600"
      />
      <div className="flex space-x-4">
          <button className="rounded bg-yellow-500 px-4 py-2 font-medium text-white">
            sign in
          </button>
          <button onClick={() => navigate('/register')} className="rounded bg-yellow-500 px-4 py-2 font-medium text-white">
            create an account 
          </button>
      </div>
    </form>
  );
};

export default Login;
