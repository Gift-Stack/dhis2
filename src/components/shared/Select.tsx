import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  return (
    <div className="relative inline-block w-full">
      {/* Prefix Label */}
      <div className="absolute left-0 inset-y-0 flex items-center pl-2">
        <span className="text-gray-600">Select:</span>
      </div>
      {/* Select Box */}
      <select
        className="block appearance-none w-full border rounded-md px-4 py-2 pr-8"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Custom Dropdown Arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 5.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 7.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default CustomSelect;
