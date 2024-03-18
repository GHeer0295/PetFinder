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
        <div className='flex justify-center items-center h-screen'>
            <Form onSubmit={handleSubmit}>
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
                <button type='submit'>Login</button>
            </Form>
        </div>
    );
}

export default Login;
