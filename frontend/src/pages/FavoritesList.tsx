import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, removeFromFavorites } from "../store/favoritesSlice";
import { MenuItem } from "../components/Menu";
import defaultImage from "../assets/default.jpg";
import { IoMdHeart } from "react-icons/io";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FavoritesList() {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  return (
    <>
    <Header />
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Favorites ❤️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length === 0 ? (
          <p className="text-center text-xl col-span-full text-gray-500">
            No favorites yet. Start adding some delicious items!
          </p>
        ) : (
          favorites.map((item: MenuItem) => (
            <div
              key={item.name}
              className="group transition duration-300 ease-in-out transform hover:shadow-lg rounded-lg p-6 bg-white border border-gray-200"
            >
              <div className="border-b border-gray-200 pb-2">
                <p className="text-xl font-semibold text-gray-900 truncate">
                  {item.name}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {item.description}
              </p>
              <img
                src={item.image || defaultImage}
                alt={item.name}
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-bold text-gray-800">
                  ${item.price.toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromFavorites(item.name))}
                  className="text-red-600 hover:text-red-700 transition-colors"
                >
                  <IoMdHeart size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}