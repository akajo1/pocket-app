import {createContext, ReactNode, useState} from "react";
import {User} from "@/src/entities/auth/store/userStore";

export const AuthContext =  createContext<any>(null)

type Props = {
    children: ReactNode
}

export default function AuthProvider ({children}: Props) {
    const [userInfo, setUserInfo] = useState<User>({} as User)
    return <AuthContext value={{userInfo, setUserInfo}}>
        {children}
    </AuthContext>
}
