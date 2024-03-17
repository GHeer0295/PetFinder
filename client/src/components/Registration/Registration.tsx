import React, {useState} from 'react';
import { Form } from "react-router-dom";
import './Registration.css'


const Registration: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [age, setAge] = useState<number>(18);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className='flex justify-center items-center h-screen'>
            <Form action='register'>
            <div className='mb-2'>
                    <label>First Name:
                        <input 
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                </div>
                <div className='mb-2'>
                    <label>Last Name: 
                        <input 
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)} />
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
                            type="number"
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
