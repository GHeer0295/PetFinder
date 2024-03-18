import React, { useEffect, useState } from 'react';

interface SearchModalProps {
  currentValue: string;
  searchResults: string[];
  onSelectResult: (result: string) => void;
  isHidden: boolean;
  hoveredItem: number;
  setHoveredItem: (num: number) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ currentValue, searchResults, onSelectResult, isHidden, hoveredItem, setHoveredItem }) => {
  const [filteredResults, setFilteredResults] = useState<string[]>(searchResults);

  useEffect(() => {
    // const filtered = searchResults;
    if (searchResults && currentValue) {
      const filtered = searchResults.filter(result =>
        result.toLowerCase().includes(currentValue.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [currentValue, searchResults, hoveredItem]);

  useEffect(() => {
    if (hoveredItem === -2) {
      setHoveredItem(filteredResults.length - 1);
    }
    else if (hoveredItem > filteredResults.length - 1) {
      setHoveredItem(-1);
    }
    if (hoveredItem !== -1) {
      onSelectResult(filteredResults[hoveredItem]);
    }
  }, [hoveredItem])

  if (isHidden) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 w-full mt-2.5 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      { filteredResults.length > 0 && (filteredResults.map((result, index) => (
        <div
          key={index}
          className={index === hoveredItem ? "px-4 py-2 cursor-pointer bg-gray-100" : "px-4 py-2 cursor-pointer hover:bg-gray-100"}
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