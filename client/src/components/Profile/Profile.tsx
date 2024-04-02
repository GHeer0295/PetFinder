import React, {useState, useEffect} from 'react';
import { Form, useNavigate} from "react-router-dom";
import { logout } from "../../services/authService"
import { getUserProfile, User } from "../../services/profileService"
import { profile } from 'console';


const Profile: React.FC = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('test@gmail.com');
    const [firstName, setFirstname] = useState<string>('John');
    const [lastName, setLastname] = useState<string>('Smith');
    const [age, setAge] = useState<number | string >('21');

    const [province, setProvince] = useState<string>('BC');
    const [city, setCity] = useState<string>('Vancouver');

    const checkAuthentication = async () => {
        try {
            let profileInfo = await getUserProfile()
            console.log(profileInfo)
            setEmail(profileInfo.email)
            setFirstname(profileInfo.firstName)
            setLastname(profileInfo.lastName)
            setAge(profileInfo.age)

            setProvince(profileInfo.province)
            setCity(profileInfo.city)

        }
        catch(e) {
            console.log(e)
            navigate('/login')
        }   
    }

    useEffect(() => {
        //checkAuthentication();
      }, []);

      const handleLogout = async(e: React.FormEvent) => {
        try {
            await logout();
            navigate('/login')
        }

        catch(e) {
            console.log(e)
        }
      }
    
    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-row flex-wrap w-1/2'>
                <div className='basis-full flex justify-center mt-3'>
                    <img className='rounded-full w-64 h-64 object-cover border-4 hover:shadow-md' src='https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'></img>
                </div>
                <div className='basis-full mt-3'>
                <p className='font-bold'>Name:</p>
                    <p>{firstName} {lastName}</p>
                </div>
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>Age:</p>
                    <p>{age}</p>
                </div>
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>Email:</p>
                    <p>{email}</p>
                </div>
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>City:</p>
                    <p>{city}</p>
                </div>
                <div className='basis-1/2 mt-3'>
                <p className='font-bold'>Province:</p>
                    <p>{province}</p>
                </div>
            </div>
            
            {/* <h1>
                Logged in!
            </h1>
            */}
        </div>
    );
}

export default Profile;
