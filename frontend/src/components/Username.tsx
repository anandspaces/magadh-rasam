import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Username = () => {
  const name = useSelector((state:RootState) => state.user.name);

  if (!name) return null

  return <p className="text-sm text-gray-400">Hey, {name}!</p>;
};

export default Username;
