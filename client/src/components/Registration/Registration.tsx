import React, {useState} from 'react';
import { Form } from "react-router-dom";
import {register, NewUser} from "../../services/authService"
import './Registration.css'


const Registration: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstname] = useState<string>('');
    const [lastName, setLastname] = useState<string>('');
    const [age, setAge] = useState<number | undefined>(undefined);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: NewUser = {
            username: username,
            password: password,
            firstname: firstName,
            lastname: lastName,
            age: age,
            email: email
        }

        await register(newUser);
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Form onSubmit={handleSubmit}>
            <div className='mb-2'>
                    <label>First Name:
                        <input 
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstname(e.target.value)} />
                    </label>
                </div>
                <div className='mb-2'>
                    <label>Last Name: 
                        <input 
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastname(e.target.value)} />
                    </label>
                </div>
                <div className='mb-2'>
                    <label>Email: 
                        <input 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div className='mb-2'>
                    <label>Age: 
                        <input 
                            type="text"
                            value={age}
                            onChange={(e) => setAge(parseInt(e.target.value))} />
                    </label>
                </div>
                <div className='mb-2'>
                    <label>Username: 
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div className='mb-2'>
                    <label>Password: 
                        <input 
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <button type='submit'>Register</button>
            </Form>
        </div>
    );
}

export default Registration;
