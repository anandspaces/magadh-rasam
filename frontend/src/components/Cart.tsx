import { useSelector } from "react-redux";
import { RootState } from "../store/store";


function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed top-6 right-6 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
      <p className="text-lg font-semibold">🛒 Cart ({itemCount})</p>
    </div>
  );
}

export default Cart;
