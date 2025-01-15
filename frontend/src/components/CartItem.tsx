import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utils/helper";
import { getCurrentQuantityById, removeItem } from "../utils/cartSlice";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { RootState } from "../store/store";

interface CartItemProps {
  item: {
    pizzaId: number;
    name: string;
    quantity: number;
    totalPrice: number;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch();

  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector((state: RootState) => getCurrentQuantityById(state, pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="rounded-lg bg-gray-200 p-1">
          <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity} />
        </div>
        <button
          onClick={() => dispatch(removeItem(pizzaId))}
          className="ml-2 text-red-600 hover:text-red-800"
        >
          <FiX />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
