import React, { useContext, useEffect, useState } from 'react';
import SwipeableImage from '../Swipe/SwipeableImage';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css'
import { AuthContext } from '../../contexts';

const SearchResults: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const URL = useLocation();
    const searchParams = new URLSearchParams(URL.search);
    const pet = searchParams.get('pet');
    const location = searchParams.get('location');
    const [searchResults, setSearchResults] = useState([]);

    const getSearchResults = async () => {
        const res = await fetch(`http://localhost:8000/api/search?pets=${pet}&city=${location}`);
        const searchRes = await res.json();
        if (searchRes.data) {
            setSearchResults(searchRes.data);
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
