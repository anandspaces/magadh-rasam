import { formatCurrency } from "../utils/helper";

interface pizzaType {
  pizza: {
    id: number,
    name: string,
    unitPrice: number,
    ingredients: string[],
    soldOut: boolean,
    imageUrl: string,
  }
}
export const MenuItem = ({ pizza }:pizzaType) => {

  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;


  return (
    <div className="rounded-lg bg-white p-2 text-center shadow transition-all hover:shadow-lg">
      <img
        src={imageUrl}
        alt={name}
        className="mx-auto mb-2 w-24 rounded-full"
      />
      <div className="mb-2">
        <h3 className="font-medium">{name}</h3>

        {soldOut ? (
          <p className="text-gray-400">Sold Out!</p>
        ) : (
          <p className="text-orange-600">{formatCurrency(unitPrice)}</p>
        )}

        <p className="line-clamp-1 text-sm opacity-50">
          {ingredients?.join(", ")}
        </p>
      </div>


        <button
          className="mt-2 w-full rounded bg-gray-50 py-1 text-gray-600 transition-all hover:bg-gray-100"
        >
          Add to Cart
        </button>
    </div>
  );
};