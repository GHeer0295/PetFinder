import React, {useState} from 'react';
import { Form } from "react-router-dom";
import {login, User} from "../../services/authService"
import './Login.css'

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const user: User = {
            username: username,
            password: password,
    
        }
    
        await login(user);
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
                    <label className='mb-3 font-semibold' htmlFor='password'>Password
                        <input 
                            id='password'
                            name='password'
                            className='block border border-gray-300 text-gray-900 rounded w-full'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button className='bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' type='submit'>Login</button>
            </Form>
        </div>
    );
}

export default Login;
