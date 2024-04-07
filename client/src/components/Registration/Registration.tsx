import React, {useState} from 'react';
import { Form, useNavigate} from "react-router-dom";
import {register, NewUser} from "../../services/authService"
import './Registration.css'


const Registration: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstname] = useState<string>('');
    const [lastName, setLastname] = useState<string>('');
    const [age, setAge] = useState<number>(18);

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
        <div className='flex justify-center items-center h-[90vh]'>
            <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                    <label htmlFor='firstname' className='mb-2 font-semibold text-left block'>First Name</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full' 
                        id='firstname'
                        name='firstname'
                        value={firstName}
                        required
                        onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='lastname' className='mb-2 font-semibold text-left block'>Last Name</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='lastname'
                        name='lastname'
                        value={lastName}
                        required
                        onChange={(e) => setLastname(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='mb-2 font-semibold text-left block'>Email</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='email'
                        name='email'
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='mb-4'>
                    <label htmlFor='age' className='mb-2 font-semibold text-left block'>Age</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='age'
                        type='number'
                        name='age'
                        value={age}
                        min="18"
                        required
                        onChange={(e) => setAge(parseInt(e.target.value))} />
                </div>
                <div className='mb-4'>
                    <label className='mb-2 font-semibold text-left block' htmlFor='username'>Username</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='username'
                        name='username'
                        value={username}
                        required
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className='mb-6'>
                    <label htmlFor='password' className='mb-2 font-semibold text-left block'>Password</label>
                    <input 
                        className=' border border-gray-300 text-gray-900 rounded w-full'
                        id='password'
                        type='password'
                        name='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' type='submit'>Register</button>
            </form>
        </div>
    );
}

export default Registration;
