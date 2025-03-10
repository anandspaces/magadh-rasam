import { useState, useEffect } from "react";
import { MenuItem } from "./Menu";
import { FaSearch } from "react-icons/fa";

interface SearchComponentProps {
  data: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
}

export default function SearchComponent({ data, onItemSelect }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Filter menu items based on search term
  const filteredData =
    searchTerm.trim() === ""
      ? []
      : data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (filteredData.length === 0) return;

      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => (prev < filteredData.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && activeIndex !== -1) {
        setSearchTerm(filteredData[activeIndex].name);
        setActiveIndex(-1); // Reset index
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredData, activeIndex]);

  const handleItemClick = (item: MenuItem) => {
    setSearchTerm(item.name);
    setActiveIndex(-1);
    onItemSelect(item);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Search Input */}
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-yellow-500">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-500"
        />
      </div>

      {/* Search Suggestions Dropdown */}
      {searchTerm.trim() !== "" && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <li
                key={item.name}
                className={`p-3 flex justify-between items-center cursor-pointer hover:bg-yellow-500 hover:text-white transition-all ${
                  activeIndex === index ? "bg-yellow-500 text-white" : "bg-white"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleItemClick(item)}
              >
                <span className="font-semibold">{item.name}</span>
                <span className="text-green-600 font-semibold">₹{(Number(item.price)).toFixed(2)}</span>
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
