import React, { useState } from "react";

const SearchDropdown = ({ categoryOption, formData, handleChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter options based on the search term
  const filteredOptions = categoryOption.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle when an option is selected
  const handleOptionSelect = (value) => {
    handleChange({ target: { name: "category", value } });
    setSearchTerm(value); // Set search input to selected value
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative bg-white p-4 rounded shadow">
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search for category"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsDropdownOpen(true); // Open dropdown when typing
        }}
        onFocus={() => setIsDropdownOpen(true)} // Open dropdown on input focus
        className="w-full border border-black/50 py-2.5 px-3 mt-3 rounded"
      />

      {/* Combined dropdown options */}
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full max-h-40 mt-1 overflow-y-auto border border-black/50 bg-white rounded shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;
