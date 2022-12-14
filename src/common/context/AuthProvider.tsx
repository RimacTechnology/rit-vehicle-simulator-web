import React, { createContext, useState } from 'react'
import { UserLogin } from '../interfaces';

const AuthContext = createContext({ auth: { email: '', password: '' },login: (obj:UserLogin)=>{}});

type Props = {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<UserLogin>({ email: '', password: '' })

    const login = (obj:UserLogin) => { 
        setAuth(obj)
    }

    return (
        <AuthContext.Provider value={{ auth, login }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext