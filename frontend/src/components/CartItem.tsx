import { FiX } from "react-icons/fi";
import { formatCurrency } from "../utils/helper";
import item from "../type";

const CartItem = ({ item }:{item:item}) => {

  const { name, quantity, totalPrice } = item;


  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="rounded-lg bg-gray-200 p-1">
        </div>
          <FiX />
      </div>
    </li>
  );
};

export default CartItem;