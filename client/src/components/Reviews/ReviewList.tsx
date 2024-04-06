import React, {useState, useEffect} from 'react';
import { getReviews, Review } from '../../services/reviewService';
import { ReviewComponent } from './Review';

export const ReviewList: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    const getUserReviews = async (data: string) => {
        try {
            let results = await getReviews('')
            setReviews(results)
            console.log(reviews)
        }
        catch(e) {
            console.log(e)
        }   
    }
    
    useEffect(() => {
        // getUserReviews('')
      }, []);

      const testReviews = [
        {
            reviewerFirstName: "Taro",
            reviewerLastName: "Cat",
            rating: 2,
            desc: "Very Cool!"
        },
        {
            reviewerFirstName: "Taro",
            reviewerLastName: "Cat",
            rating: 2,
            desc: "Very Cool! eat eat eat eat eat eat eat eat eat eat eat eat eat eat "
        },

    ]
    const listItems = testReviews.map(review => <ReviewComponent review={review} />);

    return (
        <div className='flex border-l-2 justify-center m-2 basis-1/4 w-1/4'>
            <div className='py-5 overflow-y-scroll max-h-lvh max-w-lvh'>
                <p className='text-center mb-5 font-bold'>Reviews</p>
                <ul className='flex flex-row flex-wrap text-left '>
                    {listItems}
                </ul>
            </div>
        </div>
    )
}