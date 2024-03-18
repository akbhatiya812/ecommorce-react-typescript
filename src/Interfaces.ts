import { DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";
import { StringifyOptions } from "querystring";

export type Usertype = User | null;

export interface AuthContextType {
    user : Usertype;
    photo : string;
    signInWithGoogle: () => Promise<void>;
    signInWithGitHub: () => Promise<void>;
    signOutUser : () => Promise<void>;
}

export type CartType = Product & {
    cartQty: number | 1;
}

export interface CartContextType {
    cart : CartType[];
    totalItems: number;
    cartAmount: number;
    addToCart: (item: Product) => void;
    minusFromCart: (item: Product ) => void;
    removeFromCart: (item: Product) => void;
    emptyCart : () => void;
}

export type Order =  {
    _id?: string,
    createdAt? : string,
    email: string | null | undefined,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    pincode: string,
    phone: string,
    pgMethod: string,
    cart: CartType[],
    amount: number,
    totalItems: number
}

export type Product = {
    _id?: string,
    title: string,
    desc?: string,
    img: string,
    mrp: number,
    price: number,
    qty: number,
    sku: string,
    type: string,
    createdAt? : string
}