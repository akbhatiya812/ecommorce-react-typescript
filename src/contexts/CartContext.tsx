import React from "react";
import { useEffect, useState, createContext, ReactNode, useContext } from "react";
import { DocumentData } from "firebase/firestore";


export type CartType = DocumentData & {
    cartQty: number | 1;
}

export interface CartContextType {
    cart : CartType[];
    totalItems: number;
    cartAmount: number;
    addToCart: (item: DocumentData) => void;
    minusFromCart: (item: DocumentData ) => void;
    removeFromCart: (item: DocumentData) => void;
    emptyCart : () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
    return useContext(CartContext);
}

const CartProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [cart,setCart] = useState<CartType[]>([]);
    const [totalItems,setTotalItems] = useState<number>(0);
    const [cartAmount,setCartAmount] = useState<number>(0);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []); 

    
    useEffect(() => {
        let itemsCount = 0;
        let totalAmount = 0;

        cart.forEach( (item) => {
            itemsCount += item.cartQty;
            totalAmount += item.cartQty*item.price;
        } )
        setTotalItems(itemsCount);
        setCartAmount(totalAmount);
        if(cart.length>0){
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    },[cart]);

    const addToCart = (p: DocumentData) => {
        const existingProduct = cart.find((item) => item.id === p.id);
        if(existingProduct){
            const updateCart = cart.map((item) => item.id === p.id ? {...item, cartQty : item.cartQty+1} : item );
            setCart(updateCart);
        }else{
            setCart([...cart, {...p,cartQty : 1}])
        }
    }

    const minusFromCart = (p: DocumentData) => {
        const existingProduct = cart.find( item => item.id === p.id);
        if(existingProduct){
            const updateCart = cart.map((item) => {
                if(item.id === p.id ){
                    const updatedCart = item.cartQty - 1;
                    return updatedCart > 0 ? {...item,cartQty: updatedCart} :item;
                }
                return item;
            });
            setCart(updateCart);
        }
    }

    const removeFromCart = (p:DocumentData) => {
        setCart(cart.filter(item => item.id !== p.id));
    }

    const emptyCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    }


    const value={cart,addToCart,removeFromCart,totalItems,cartAmount, minusFromCart,emptyCart};
    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}

export default CartProvider