import React, {useState} from 'react';
import { Form, useNavigate } from "react-router-dom";
import {login, User} from "../../services/authService"
import './Login.css'
const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const user: User = {
            username: username,
            password: password,
    
        }
        
        try {
            await login(user);
            navigate('/')
        }

        catch(e) {
            console.log(e)
        }
    }

    return (
        <div className='flex justify-center items-center h-[60vh]'>
            <Form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='mb-3 font-semibold' htmlFor='username'>Username</label>
                        <input
                            className='block border border-gray-300 text-gray-900 rounded w-full' 
                            id='username'
                            name='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className='mb-5'>
                    <label className='mb-3 font-semibold' htmlFor='password'>Password</label>
                        <input 
                            id='password'
                            name='password'
                            type='password'
                            className='block border border-gray-300 text-gray-900 rounded w-full'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='flex justify-between'>
                    <button className='bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' type='submit'>Login</button>
                    <button onClick={() => navigate('/register')} className='bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' >Register</button>
                </div>
            </Form>
        </div>
    );
}

export default Login;
