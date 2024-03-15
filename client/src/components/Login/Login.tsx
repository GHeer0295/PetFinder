import React, {useState} from 'react';
import './Login.css'


const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className='flex justify-center'>
            <form>
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
                            value={username}
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
            </form>
        </div>
    );
}

export default Login;
