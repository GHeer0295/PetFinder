import React, {useState} from 'react';
import { Form, useNavigate} from "react-router-dom";
import {register, NewUser} from "../../services/authService"
import './Registration.css'


const Registration: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstname] = useState<string>('');
    const [lastName, setLastname] = useState<string>('');
    const [age, setAge] = useState<number | string >('');

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: NewUser = {
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email
        }

        try {
            await register(newUser);
            navigate('/login')
        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Form onSubmit={handleSubmit}>
            <div className='mb-4 flex-auto'>
                    <label htmlFor='firstname' className='mb-3 font-semibold'>First Name:</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full' 
                        id='firstname'
                        name='firstname'
                        value={firstName}
                        onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className='mb-4 flex-auto'>
                    <label htmlFor='lastname' className='mb-3 font-semibold'>Last Name:</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='lastname'
                        name='lastname'
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div className='mb-4 flex-auto'>
                    <label htmlFor='email' className='mb-3 font-semibold'>Email:</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='mb-4 flex-auto'>
                    <label htmlFor='age' className='mb-3 font-semibold'>Age:</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='age'
                        name='age'
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value))} />
                </div>
                <div className='mb-4 flex-auto'>
                    <label className='mb-3 font-semibold' htmlFor='username'>Username:</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='mb-4 flex-auto'>
                    <label htmlFor='password' className='mb-3 font-semibold'>Password:</label>
                        <input 
                            className=' border border-gray-300 text-gray-900 rounded w-full'
                            id='password'
                            type='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' type='submit'>Register</button>
            </Form>
        </div>
    );
}

export default Registration;
