import { createContext, useContext, useEffect,useState, ReactNode } from "react";
import { auth } from "../configs/firebase";
import {onAuthStateChanged, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut, User } from 'firebase/auth';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export type Usertype = User | null;

export interface AuthContextType {
    user : Usertype;
    photo : string;
    signInWithGoogle: () => Promise<void>;
    signInWithGitHub: () => Promise<void>;
    signOutUser : () => Promise<void>;
}

const AuthContext = createContext<AuthContextType| null>(null);

export const useAuth = () => {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider:React.FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<Usertype>(null);
    const [photo,setPhoto] = useState<string>('');
    const navigate = useNavigate();

    const signInWithGoogle = async ():Promise<void> => {
        const provider = new GoogleAuthProvider();
        await signIn(provider);
    }

    const signInWithGitHub = async (): Promise<void> => {
        const provider = new GithubAuthProvider();
        await signIn(provider);
    }


    const signIn = async (provider: any): Promise<void> => {
        try {
            await signInWithPopup(auth, provider);
            toast.success('Sign in successful!');
            navigate(-1);
        } catch (error) {
            console.error("Error in Sign in with provider", error);
            toast.error('Sign in failed. Please try again.');
        }
    }

    const signOutUser = async ():Promise<void> => {
        try {
            localStorage.removeItem('cart');
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
            if(user?.photoURL !== null && user?.photoURL !== undefined ){
                setPhoto(user.photoURL);
            }
        });

        return () => unsubscribe();
    }, []);

    const value: AuthContextType = {
        user,
        signInWithGoogle,
        signInWithGitHub,
        signOutUser,
        photo
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}   

export default AuthProvider;