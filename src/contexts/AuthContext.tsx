import { createContext, useContext, useEffect,useState, ReactNode } from "react";
import { auth } from "../configs/firebase";
import {onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


type Usertype = User | null;

interface AuthContextType {
    user : Usertype;
    signInWithGoogle: () => Promise<void>;
    signOutUser : () => Promise<void>;
}

const AuthContext = createContext<AuthContextType| undefined>(undefined);

export const useAuth = () => {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<Usertype>(null);
    const navigate = useNavigate();

    const signInWithGoogle = async ():Promise<void> => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success('Sign in successful!');
            navigate(-1);
        } catch (error) {
            console.error("Error in Sign in with google", error);
            toast.error('Sign in failed. Please try again.');
        }
    }

    const signOutUser = async ():Promise<void> => {
        try {
            await signOut(auth);
            toast.success('Sign out successful!');
            navigate(-1);
        } catch (error) {
            console.error("Error while signing out the user", error);
            toast.error("Sign out failed");
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const value: AuthContextType = {
        user,
        signInWithGoogle,
        signOutUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}   

export default AuthProvider;
