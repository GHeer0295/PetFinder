import React, {useState, useEffect} from 'react';
import { Form, useNavigate} from "react-router-dom";
import { logout } from "../../services/authService"
import { getUserProfile, User } from "../../services/profileService"
import { profile } from 'console';


const Profile: React.FC = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstname] = useState<string>('');
    const [lastName, setLastname] = useState<string>('');
    const [age, setAge] = useState<number | string >('');

    const [province, setProvince] = useState<string>('');
    const [city, setCity] = useState<string>('');

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
        checkAuthentication();
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
        <div className='flex justify-center items-center h-[90vh]'>
            <h1>
                Logged in!
            </h1>
            <button className='bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Profile;
