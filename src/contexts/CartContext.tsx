import React from "react";
import { useEffect, useState, createContext, ReactNode, useContext } from "react";
import { CartType, CartContextType, Product } from "../Interfaces";




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

    const addToCart = (p: Product) => {
        const existingProduct = cart.find((item) => item._id === p._id);
        if(existingProduct){
            const updateCart = cart.map((item) => item._id === p._id ? {...item, cartQty : item.cartQty+1} : item );
            setCart(updateCart);
        }else{
            setCart([...cart, {...p,cartQty : 1}])
        }
    }

    const minusFromCart = (p: Product) => {
        const existingProduct = cart.find( item => item._id === p._id);
        if(existingProduct){
            const updateCart = cart.map((item) => {
                if(item._id === p._id ){
                    const updatedCart = item.cartQty - 1;
                    return updatedCart > 0 ? {...item,cartQty: updatedCart} :item;
                }
                return item;
            });
            setCart(updateCart);
        }
    }

    const removeFromCart = (p:Product) => {
        setCart(cart.filter(item => item._id !== p._id));
    }

    const emptyCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    }


    const value={cart,addToCart,removeFromCart,totalItems,cartAmount, minusFromCart,emptyCart};
    return <CartContext.Provider value={value} >{children}</CartContext.Provider>
}

export default CartProvider