import React, {useState, useEffect} from 'react';
import { Form, useNavigate} from "react-router-dom";
import { isLoggedIn } from "../../services/authService"


const Profile: React.FC = () => {
    const navigate = useNavigate()

    const checkAuthentication = async () => {
        try {
            await isLoggedIn()
        }
        catch(e) {
            console.log(e)
            navigate('/login')
        }   
    }

    useEffect(() => {
        checkAuthentication();
      }, []);
    
    return (
        <div className='flex'>
            <h1>
                Logged in!
            </h1>
        </div>
    );
}

export default Profile;
