import React, {useState, useEffect} from 'react';
import { getReviews, Review } from '../../services/reviewService';


export const ReviewComponent: React.FC<{review: Review}> = ({review}) => {
    return (
        <li className='flex flex-wrap basis-full border-b-2 m-2 justify-between '>
            <div className='mt-2'>
                <p>{review.reviewerFirstName} {review.reviewerLastName}</p>
            </div>
            <div className='mt-2'>
                <p>{review.rating}</p>
            </div>
            <div className='basis-full mt-2'>
                <p className='break-words font-light'>{review.desc}</p>
            </div>
        </li>
    )
}