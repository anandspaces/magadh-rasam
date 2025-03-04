import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router-dom";

const CartOverview = () => {

  return (
    <>
        <div className="flex flex-col max-sm:hidden">
          <div className="text-right text-xs opacity-50">Total</div>
          {/* <div className="-mt-1 font-medium">{formatCurrency(total)}</div> */}
        </div>
      <Link
        to="/cart"
        className="relative rounded-full border p-2 text-gray-900 transition-all duration-500 ease-in-out hover:bg-orange-600 hover:text-white"
      >
        <LuShoppingBag className="text-2xl" />
          <div className="absolute -right-1 -top-1 rounded-full bg-orange-600 px-1.5 text-xs text-white">
          </div>
      </Link>
    </>
  );
};

export default CartOverview;