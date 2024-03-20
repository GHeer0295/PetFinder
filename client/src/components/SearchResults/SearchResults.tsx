import React from 'react';
import SwipeableImage from '../Swipe/SwipeableImage';
import './SearchResults.css'

const SearchResults: React.FC = () => {
    return (
        <div className='search-results-container'>
            <SwipeableImage />
        </div>
    );
}

export default SearchResults;
