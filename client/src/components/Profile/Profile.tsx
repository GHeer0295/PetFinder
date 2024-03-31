import React, {useState, useEffect} from 'react';
import { Form, useNavigate} from "react-router-dom";
import { logout } from "../../services/authService"
import { getUserProfile } from "../../services/profileService"


const Profile: React.FC = () => {
    const navigate = useNavigate()

    const checkAuthentication = async () => {
        try {
            let res = await getUserProfile()
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
