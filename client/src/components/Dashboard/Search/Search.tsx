import { MutableRefObject, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import SearchModal from './SearchModal';
import './Search.css';

import { pets, locations } from './dummydata';

const Search = () => {
  const [petCategory, setPetCategory] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isPetFocused, setPetFocused] = useState(false);
  const [isLocationFocused, setLocationFocused] = useState(false);

  const petInputRef = useRef(null);
  const locationInputRef = useRef(null);

  const focusInput = (inputRef: MutableRefObject<HTMLInputElement | null>) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (e.target === petInputRef.current) {
      setPetFocused(true);
    }
    else if (e.target === locationInputRef.current) {
      setLocationFocused(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (e.target === petInputRef.current) {
      setPetFocused(false);
    }
    else if (e.target === locationInputRef.current) {
      setLocationFocused(false);
    }
  };

  const handleSearchClick = () => { };

  return (
    <div className='bar'>
      <div className='petContainer' onClick={() => focusInput(petInputRef)}>
        <input
          type="text"
          value={petCategory}
          onChange={(e) => setPetCategory(e.target.value)}
          placeholder="Search Dog, Kitten, etc"
          className='labelPetInput'
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={petInputRef}
        />
        <SearchModal
          currentValue={petCategory}
          searchResults={pets} 
          onSelectResult={setPetCategory}
          isHidden={!isPetFocused}
        />
      </div>
      <div className='locationContainer'>
        <input
          type="text"
          value={locationValue}
          onChange={(e) => setLocationValue(e.target.value)}
          placeholder="Enter Location"
          className='labelLocationInput'
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={locationInputRef}
        />
        <SearchModal
          currentValue={locationValue}
          searchResults={locations} 
          onSelectResult={setLocationValue}
          isHidden={!isLocationFocused}
        />
        <div className={isFocused ? 'searchIcon focus' : 'searchIcon'} onClick={() => handleSearchClick()}>
          <BiSearch size={20} />
          <span id="search" style={{ display: isFocused ? 'inline-block' : 'none' }}>Search</span>
        </div>
      </div>
    </div>
  );
};

export default Search;