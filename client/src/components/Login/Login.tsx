import React, {useState} from 'react';
import { Form } from "react-router-dom";
import './Login.css'


const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className='flex justify-center'>
            <Form action='login'>
                <div>
                    <label>Username:
                        <input 
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
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
