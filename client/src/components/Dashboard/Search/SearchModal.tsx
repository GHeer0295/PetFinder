import React, { useEffect, useState } from 'react';

interface SearchModalProps {
  currentValue: string;
  searchResults: string[];
  onSelectResult: (result: string) => void;
  isHidden: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({ currentValue, searchResults, onSelectResult, isHidden }) => {
  const [filteredResults, setFilteredResults] = useState<string[]>(searchResults);

  useEffect(() => {
    const filtered = searchResults.filter(result =>
      result.toLowerCase().includes(currentValue.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [currentValue, searchResults]);

  if (isHidden) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 w-full mt-2.5 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      { filteredResults.length > 0 && (filteredResults.map((result, index) => (
        <div
          key={index}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onMouseDown={() => onSelectResult(result)}
        >
          {result}
        </div>
      )))}
      { filteredResults.length === 0 && (
        <div className='px-5 py-5'>No Search Results</div>
      )}
    </div>
  );
}

export default SearchModal;