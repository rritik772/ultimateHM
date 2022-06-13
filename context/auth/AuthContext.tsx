import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useState, FC, useEffect, ReactNode } from "react";
import Loading from "../../components/loading/Loading";
import { auth } from "../../firebase";
import AuthContextModal, { defaultAuthContextModal } from "../../model/AuthContextModel";

import { signup_new_user, login_user } from "./UserAuth";

const AuthContext = createContext<AuthContextModal>(defaultAuthContextModal);

const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
    children?: ReactNode
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        const unsubscriber = onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setCurrentUser(user);
                setIsLoggedIn(true);
            }
        })
        setLoading(false);

        return unsubscriber;

    }, [])

    const value = {
        loading,
        isLoggedIn,
        currentUser,
        signup_new_user,
        login_user
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && <Loading />}
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default useAuth;