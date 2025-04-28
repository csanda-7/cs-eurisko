import React, { useState } from 'react';
import useDebounce from '../hooks/useDebounce'; // Import the custom debounce hook

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const Searchbar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value); // Local state for the input value
  const debouncedValue = useDebounce(inputValue, 500); // Debounce the input value with a 300ms delay

  // Update the parent's state when the debounced value changes
  React.useEffect(() => {
    onChange(debouncedValue); // Trigger the parent's onChange handler with the debounced value
  }, [debouncedValue, onChange]);

  return (
    <div className="w-full px-6 py-4">
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update local state immediately
        placeholder="Search users..."
        className="w-full max-w-md px-3 py-2 text-black bg-white border border-gray-400 rounded shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
};

export default Searchbar;