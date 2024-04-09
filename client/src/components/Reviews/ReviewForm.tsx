import React, {useState} from 'react';
import { Form, useNavigate, useParams} from "react-router-dom";
import {addReview} from "../../services/reviewService"

const ReviewForm: React.FC = () => {
    const [rating, setRating] = useState<number>(1);
    const [description, setDescription] = useState<string>('');
    let { username } = useParams()

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const review: any = {
            rating: rating,
            desc: description,
        }

        try {
            await addReview(username!, review);
            navigate('/')
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='flex justify-center items-center mt-5'>
            <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                    <label htmlFor='rating' className='mb-2 font-semibold text-left block'>Rating</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full' 
                        id='rating'
                        name='rating'
                        value={rating}
                        min={1}
                        max={5}
                        required
                        type='number'
                        onChange={(e) => setRating(parseInt(e.target.value))} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='description' className='mb-2 font-semibold text-left block'>Description</label>
                    <textarea 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='description'
                        name='description'
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)} />
                </div>

                <button className='bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default ReviewForm;
