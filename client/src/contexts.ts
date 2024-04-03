import { createContext } from 'react';

type AuthContext = {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
} 

export const AuthContext = createContext<AuthContext | undefined>(undefined);
