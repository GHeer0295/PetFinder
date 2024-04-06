import React, {useState, useEffect} from 'react';
import { Form, useNavigate, useParams} from "react-router-dom";
import { logout } from "../../services/authService"
import { getUserProfile, updateUserProfile, User } from "../../services/profileService"
import { profile } from 'console';
import { ReviewList } from '../Reviews/ReviewList';
const Profile: React.FC = () => {
    const navigate = useNavigate()
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('test@gmail.com');
    const [rating, setRating] = useState<number>(5);
    const [firstName, setFirstname] = useState<string>('John');
    const [lastName, setLastname] = useState<string>('Smith');
    const [age, setAge] = useState<number | string >(21);
    const [province, setProvince] = useState<string>('BC');
    const [city, setCity] = useState<string>('Vancouver');
    const [address, setAddress] = useState<string>('8888 University Dr W');
    const [description, setDescription] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut massa gravida, sagittis nisl a, gravida augue. Cras elementum rhoncus faucibus. Vivamus condimentum vehicula laoreet. Nunc tincidunt lacus ac viverra vehicula. Quisque tortor orci, aliquet quis sagittis at, posuere eu lorem. Nunc ullamcorper, erat vitae sodales volutpat, lorem augue elementum dui, ut volutpat leo sem lobortis orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum eget ultrices lectus, eget sodales ipsum. Maecenas egestas pulvinar sem, ac imperdiet lectus ornare gravida. Phasellus pharetra faucibus quam nec vestibulum. Nunc auctor velit dictum diam dapibus, sit amet eleifend orci pretium.');
    let { username } = useParams()
    
    const getProfile = async (data:string) => {
        try {
            let profileInfo = await getUserProfile(data)
            console.log(profileInfo)
            setEmail(profileInfo[0].email)
            setFirstname(profileInfo[0].firstName)
            setLastname(profileInfo[0].lastName)
            setAge(profileInfo[0].age)

            setProvince(profileInfo[0].province)
            setCity(profileInfo[0].city)
            setAddress(profileInfo[0].address)
            setDescription(profileInfo[0].description)
            setRating(profileInfo[0].rating)

        }
        catch(e) {
            console.log(e)
            navigate('/login')
        }   
    }

    useEffect(() => {
        if (username !== undefined) {
            setIsCurrentUser(false)
            getProfile(username)
        }
        else {
            setIsCurrentUser(true)
            getProfile('');
        }
      }, [username]);

    
    const handleEdit = async () => {
        if (isEdit) {
            try {
                const userUpdate: any = {
                    description: description
                }
                await updateUserProfile(userUpdate)
            }

            catch(e) {
                console.log(e)
            }

        }
        
        setIsEdit(!isEdit)
    }

    const handleAddReview = async () => {
        navigate('reviews/add')
    }

    const RatingIcons: React.FC = () => {
        return <p>{'* '.repeat(Math.floor(rating))}</p>
    }
    
    return (
        <div className='flex'>
            <div className='flex justify-center m-2  basis-3/4'>
                <div className='flex flex-row flex-wrap w-4/5'>
                    <div className='basis-full mt-2'>
                    <RatingIcons 
                    />
                    </div>
                    <div className='basis-full flex justify-center mt-2'>
                        <img className='rounded-full w-64 h-64 object-cover border-4 hover:shadow-md' src='https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'></img>
                    </div>
                    <div className='basis-full mt-2'>
                    <p className='font-bold'>Name:</p>
                    <p>{firstName} {lastName}</p>
                    </div>
                    <div className='basis-1/2 mt-2'>
                    <p className='font-bold'>Age:</p>
                    <p>{age}</p>
                    </div>
                    <div className='basis-1/2 mt-2'>
                    <p className='font-bold'>Email:</p>
                    <p>{email}</p>        
                    </div>                
                    <div className='basis-1/2 mt-2'>
                    <p className='font-bold'>Address:</p>
                    <p>{address}</p>              
                    </div>
                    <div className='basis-1/2 mt-2'>
                    <p className='font-bold'>City:</p>
                    <p>{city} {province}</p>      
                    </div>

                    <div className='basis-full mt-4'>
                    <p className='font-bold'>Description:</p>
                        {!isEdit? <p className=''>{description}</p> : <input className='border border-gray-300 text-gray-900 rounded w-full text-start' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />}
                    </div>

                    <div className='basis-full mt-4'>
                        {isCurrentUser? <button className='mx-2 bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' onClick={handleEdit}>{isEdit? "Save" : "Edit"}</button> :
                            <button className='mx-2 bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' onClick={handleAddReview}>Leave Review</button>}
                    </div>
                </div>
            </div>
            <ReviewList/>
        </div>
    );            

}

export default Profile;
