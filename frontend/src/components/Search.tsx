import { useState } from "react";
import { MenuItem } from "./Menu";

interface SearchComponentProps {
  data: MenuItem[];
}

function SearchComponent({ data }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter data only if searchTerm is not empty
  const filteredData =
    searchTerm.trim() === ""
      ? []
      : data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-md w-full text-black"
      />

      {searchTerm.trim() !== "" && ( // Show list only when input is not empty
        <ul className="mt-4 border rounded-lg bg-white shadow-md">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li key={item.name} className="p-2 border-b last:border-none flex justify-between">
                <span className="font-semibold">{item.name}</span>
                {/* <span className="text-green-600 font-semibold">${item.price.toFixed(2)}</span> */}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchComponent;
