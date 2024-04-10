import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import SearchModal from "./SearchModal";
import "./Search.css";

import { pets, locations } from "./dummydata";
import { getAvailableSpecies } from "../../../services/searchService";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const Search = () => {
  const [petCategory, setPetCategory] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isPetFocused, setPetFocused] = useState(false);
  const [isLocationFocused, setLocationFocused] = useState(false);
  const [hoveredPetModalIndex, setHoveredPetModalIndex] = useState(-1);
  const [hoveredLocationModalIndex, setHoveredLocationModalIndex] =
    useState(-1);
  const [hoveredPetModalString, setHoveredPetString] = useState("");
  const [hoveredLocationModalString, setHoveredLocationString] = useState("");

  const [availableSpecies, setAvailableSpecies] = useState<string[]>([]);

  const petInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const fetchAvailableSpecies = async () => {
    const availableSpeciesRes = await getAvailableSpecies();
    if(!('error' in availableSpeciesRes))
      setAvailableSpecies(availableSpeciesRes.data);
  };

  useEffect(() => {
    fetchAvailableSpecies();
  }, []);

  const focusInput = (inputRef: MutableRefObject<HTMLInputElement | null>) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (e.target === petInputRef.current) {
      setPetFocused(true);
    } else if (e.target === locationInputRef.current) {
      setLocationFocused(true);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (e.target === petInputRef.current) {
      setPetFocused(false);
    } else if (e.target === locationInputRef.current) {
      setLocationFocused(false);
    }
  };

  const handleCloseIcon = (
    inputRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    if (inputRef.current) {
      if (inputRef === petInputRef) {
        setPetCategory("");
      } else if (inputRef === locationInputRef) {
        setLocationValue("");
      }
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    inputRef: MutableRefObject<HTMLInputElement | null>
  ) => {
    if (inputRef === petInputRef) {
      if (e.key === "ArrowDown") {
        setHoveredPetModalIndex(hoveredPetModalIndex + 1);
      } else if (e.key === "ArrowUp") {
        setHoveredPetModalIndex(hoveredPetModalIndex - 1);
      } else if (e.key === "Enter") {
        if (hoveredPetModalString) {
          setPetCategory(hoveredPetModalString);
        }
        focusInput(locationInputRef);
      }
    } else if (inputRef === locationInputRef) {
      if (e.key === "ArrowDown") {
        setHoveredLocationModalIndex(hoveredLocationModalIndex + 1);
      } else if (e.key === "ArrowUp") {
        setHoveredLocationModalIndex(hoveredLocationModalIndex - 1);
      } else if (e.key === "Enter") {
        if (inputRef.current) {
          inputRef.current.blur();
        }
        if (hoveredLocationModalString) {
          handleSearchClick(petCategory, hoveredLocationModalString);
        } else {
          handleSearchClick(petCategory, locationValue);
        }
      }
    }
  };

  const handleSearchClick = (pet: string, location: string) => {
    const searchParams = new URLSearchParams({
      pet,
      location,
    });
    const url = `/search-results?${searchParams.toString()}`;
    navigate(url);
  };

  return (
    <div className="bar">
      <div className="petContainer" onClick={() => focusInput(petInputRef)}>
        <input
          type="text"
          value={petCategory}
          onChange={(e) => setPetCategory(e.target.value)}
          placeholder="Search Dog, Kitten, etc"
          className="labelPetInput"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, petInputRef)}
          ref={petInputRef}
        />
        {isPetFocused && petCategory !== "" && (
          <IoIosClose
            size={30}
            onMouseDown={() => handleCloseIcon(petInputRef)}
          />
        )}
        <SearchModal
          currentValue={petCategory}
          searchResults={availableSpecies}
          onSelectResult={setPetCategory}
          isHidden={!isPetFocused}
          hoveredIndex={hoveredPetModalIndex}
          setHoveredItem={setHoveredPetModalIndex}
          setValueString={setHoveredPetString}
        />
      </div>
      <div className="locationContainer">
        {/* <input
          type="text"
          value={locationValue}
          onChange={(e) => setLocationValue(e.target.value)}
          placeholder="Enter Location"
          className="labelLocationInput"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => handleKeyDown(e, locationInputRef)}
          ref={locationInputRef}
        />
        {isLocationFocused && locationValue !== "" && (
          <IoIosClose
            size={50}
            onMouseDown={() => handleCloseIcon(locationInputRef)}
          />
        )} */}
        {/* <SearchModal
          currentValue={locationValue}
          searchResults={locations}
          onSelectResult={setLocationValue}
          isHidden={!isLocationFocused}
          hoveredIndex={hoveredLocationModalIndex}
          setHoveredItem={setHoveredLocationModalIndex}
          setValueString={setHoveredLocationString}
        /> */}
        <GooglePlacesAutocomplete
          apiKey={process.env.REACT_APP_PLACES_API_KEY}
          apiOptions={{ region: 'ca' }}
          selectProps={{
              value: {
                value: locationValue,
                label: 'Enter Location'
              },
              onChange: val => setLocationValue(val?.value),
          }}
          autocompletionRequest={{
              componentRestrictions: {
                  country: ['ca'],
              },
              types: ['(cities)']
          }}
        />
        <div
          className={isFocused ? "searchIcon focus" : "searchIcon"}
          onClick={() => handleSearchClick(petCategory, locationValue)}
        >
          <BiSearch size={20} />
          <span
            id="search"
            style={{ display: isFocused ? "inline-block" : "none" }}
          >
            Search
          </span>
        </div>
      </div>
    </div>
  );
};

export default Search;
