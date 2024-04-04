import React, {useState, useEffect} from 'react';
import { Form, useNavigate} from "react-router-dom";
import { logout } from "../../services/authService"
import { getUserProfile, User } from "../../services/profileService"
import { profile } from 'console';

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Profile: React.FC = () => {
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('test@gmail.com');
    const [firstName, setFirstname] = useState<string>('John');
    const [lastName, setLastname] = useState<string>('Smith');
    const [age, setAge] = useState<number | string >(21);
    const [province, setProvince] = useState<string>('BC');
    const [city, setCity] = useState<string>('Vancouver');
    const [address, setAddress] = useState<string>('8888 University Dr W');

    const getProfile = async () => {
        try {
            let profileInfo = await getUserProfile()
            console.log(profileInfo)
            setEmail(profileInfo[0].email)
            setFirstname(profileInfo[0].firstName)
            setLastname(profileInfo[0].lastName)
            setAge(profileInfo[0].age)

            setProvince(profileInfo[0].province)
            setCity(profileInfo[0].city)

        }
        catch(e) {
            console.log(e)
            navigate('/login')
        }   
    }

    useEffect(() => {
        // getProfile();
      }, []);

    
    const handleEdit = () => {
        setIsEdit(!isEdit)
    }

    const Item: React.FC<{name:string | number}> = ({name}) => {
        if (!isEdit) {
            return <p>{name}</p>
        }
        return <input className='border border-gray-300 text-gray-900 rounded w-full' value={name}></input>
    }
    
    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-row flex-wrap w-1/2'>
                <div className='basis-full flex justify-center mt-3'>
                    <img className='rounded-full w-64 h-64 object-cover border-4 hover:shadow-md' src='https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'></img>
                </div>
                <div className='basis-full mt-3'>
                <p className='font-bold'>Name:</p>
                <Item
                    name={firstName + " " + lastName}
                />
                </div>
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>Age:</p>
                <Item
                    name={age}
                />
                </div>
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>Email:</p>
                <Item
                    name={email}
                />               
                </div>                
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>Address:</p>
                <Item
                    name={address}
                />              
                </div>
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>City:</p>
                <Item
                    name={city}
                />              
                </div>
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>Province:</p>
                <Item
                    name={province}
                />              
                </div>

                <div className='basis-full mt-3'>
                    <button className='mx-2 bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' onClick={handleEdit}>{isEdit ? "Save" : "Edit"}</button>
                </div>

                <div>

            </div>
            </div>
            
        </div>
    );
}

export default Profile;
