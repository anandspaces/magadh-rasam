import { useState } from "react";

interface Item {
  id: number;
  name: string;
}

const data: Item[] = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Orange" },
  { id: 4, name: "Grapes" },
];

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter data only if searchTerm is not empty
  const filteredData =
    searchTerm.trim() === ""
      ? []
      : data.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-md w-full text-black"
      />

      {searchTerm.trim() !== "" && ( // Show list only when input is not empty
        <ul className="mt-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li key={item.id} className="p-2 border-b">
                {item.name}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
