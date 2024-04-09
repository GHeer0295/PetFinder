import React, { useContext, useEffect, useState } from 'react';
import SwipeableImage from '../Swipe/SwipeableImage';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css'
import { AuthContext } from '../../contexts';

interface SearchResult {
    postId: string;
    title: string;
    province: string;
    city: string;
    petName: string;
    speciesName: string;
    petImage?: { data: ArrayBufferLike }; // Define the petImage field with an optional data property
}

const SearchResults: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const searchURL = useLocation();
    const searchParams = new URLSearchParams(searchURL.search);
    const pet = searchParams.get('pet');
    const location = searchParams.get('location');
    const [searchResults, setSearchResults] = useState([]);

    const getSearchResults = async () => {
        const res = await fetch(`/api/search?species=${pet}&city=${location}`);
        const searchRes = await res.json();
        if (searchRes.data) {
            const searchData = searchRes.data.map((item: SearchResult) => {
                let petImage: string;
                if (item.petImage && item.petImage.data) {
                    const unit8Array = new Uint8Array(item.petImage.data);
                    const blob = new Blob([unit8Array], {type: 'image/png'});
                    petImage = URL.createObjectURL(blob);
                } else {
                    // Default placeholder image URL
                    petImage = "https://posfacturar.com/pos_organicnails/public/upload/default_image/default_pet.jpg";
                }
                return { ...item, petImage };
            });
            setSearchResults(searchData);
        }
    }

    useEffect(() => {
      if (!authContext?.isAuth) {
        navigate("/login");
      }
      getSearchResults();
    }, []);
    
    return (

        <div className='search-results-container'>
            <SwipeableImage data={searchResults}/>
        </div>
    );
}

export default SearchResults;
