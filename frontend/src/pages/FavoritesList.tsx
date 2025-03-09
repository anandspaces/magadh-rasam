import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, removeFromFavorites, initializeFavorites } from "../store/favoritesSlice";
import { MenuItem } from "../components/Menu";
import defaultImage from "../assets/default.jpg";
import { IoMdHeart } from "react-icons/io";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";

export default function FavoritesList() {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-gray-50">
          <div className="p-6 max-w-7xl mx-auto flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center md:mb-12">
              Your Favorites ❤️
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {favorites.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center min-h-[50vh]">
                  <p className="text-xl text-gray-500 mb-4">
                    No favorites yet
                  </p>
                  <p className="text-gray-400 text-center">
                    Start adding delicious items from our menu!
                  </p>
                </div>
              ) : (
                favorites.map((item: MenuItem) => (
                  <div
                    key={item.name}
                    className="group transition duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-lg rounded-xl bg-white border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="border-b border-gray-200 pb-2">
                        <p className="text-xl font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    <div className="relative aspect-square">
                      <img
                        src={item.image || defaultImage}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4 flex justify-between items-center bg-gray-50 border-t border-gray-100">
                      <p className="text-lg font-bold text-gray-800">
                        ${item.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => dispatch(removeFromFavorites(item.name))}
                        className="text-red-600 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                      >
                        <IoMdHeart size={24} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>

      </div>
      <Footer />
    </>
  );
}