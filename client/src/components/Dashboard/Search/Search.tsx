import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { IoIosClose } from "react-icons/io";
import SearchModal from './SearchModal';
import './Search.css';

import { pets, locations } from './dummydata';

const Search = () => {
  const [petCategory, setPetCategory] = useState('');
  const [locationValue, setLocationValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isPetFocused, setPetFocused] = useState(false);
  const [isLocationFocused, setLocationFocused] = useState(false);
  const [hoveredPetModalItem, setHoveredPetModalItem] = useState(-1);
  const [hoveredLocationModalItem, setHoveredLocationModalItem] = useState(-1);

  const petInputRef = useRef(null);
  const locationInputRef = useRef(null);

  // useEffect(() => {
  //   if (petInputRef.current) {
  //     petInputRef.current.focus();
  //   }
  // }, [petCategory]); // Focus input when petCategory changes
  
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

  const handleCloseIcon = (inputRef: MutableRefObject<HTMLInputElement | null>) => {
    if (inputRef.current) {
      if (inputRef === petInputRef) {
        setPetCategory('');
      } else if (inputRef === locationInputRef) {
        setLocationValue('');
      }
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, inputRef: MutableRefObject<HTMLInputElement | null>) => {
    if (inputRef === petInputRef) {
      if (e.key === 'ArrowDown') {
        setHoveredPetModalItem(hoveredPetModalItem + 1);
      }
      else if (e.key === 'ArrowUp') {
        setHoveredPetModalItem(hoveredPetModalItem - 1);
      }
    }
  };

  return (
    <div className='bar'>
      <div className='petContainer' onClick={() => focusInput(petInputRef)}>
        {/* <SearchBar /> */}
        <input
          type="text"
          value={petCategory}
          onChange={(e) => setPetCategory(e.target.value)}
          placeholder="Search Dog, Kitten, etc"
          className='labelPetInput'
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, petInputRef)}
          ref={petInputRef}
        />
        { isPetFocused && petCategory !== '' && (
          <IoIosClose size={30} onMouseDown={() => handleCloseIcon(petInputRef)}/>
        )}
        <SearchModal
          currentValue={petCategory}
          searchResults={pets} 
          onSelectResult={setPetCategory}
          isHidden={!isPetFocused}
          hoveredItem={hoveredPetModalItem}
          setHoveredItem={setHoveredPetModalItem}
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
        { isLocationFocused && locationValue !== '' && (
          <IoIosClose size={50} onMouseDown={() => handleCloseIcon(locationInputRef)}/>
        )}
        <SearchModal
          currentValue={locationValue}
          searchResults={locations} 
          onSelectResult={setLocationValue}
          isHidden={!isLocationFocused}
          hoveredItem={hoveredLocationModalItem}
          setHoveredItem={setHoveredLocationModalItem}
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