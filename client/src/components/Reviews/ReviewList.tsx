import React, {useState, useEffect} from 'react';
import { getReviews, Review } from '../../services/reviewService';
import { ReviewComponent } from './Review';
import { useParams } from 'react-router-dom';

export const ReviewList: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
    let { username } = useParams()

    const getUserReviews = async (data: string) => {
        try {
            let results = await getReviews(data)
            setReviews(results)
            console.log(reviews)
        }
        catch(e) {
            console.log(e)
        }   
    }
    
    useEffect(() => {
        if (username !== undefined) {
            setIsCurrentUser(false)
            getUserReviews(username)
        }
        else {
            setIsCurrentUser(true)
            getUserReviews('');
        }
      }, [username]);

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
    const listItems = reviews.map(review => <ReviewComponent review={review} />);
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