import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <div className="px-4 py-3">
      <Link
        to="/menu"
        className="rounded-md px-3 py-2 font-medium text-orange-600 transition-all duration-300 ease-in-out hover:bg-orange-600 hover:text-white"
      >
        &larr; Back to menu
      </Link>


      <ul className="mt-3 divide-y divide-stone-200 border-b">
      </ul>

      <div className="mt-6 space-x-2">
        <Link
          to="/order/new"
          className="rounded bg-orange-600 px-4 py-2 font-medium text-white"
        >
          Order pizzas
        </Link>
          Clear cart
      </div>
    </div>
  );
};

export default Cart;
