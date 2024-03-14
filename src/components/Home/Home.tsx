import React from "react";
import { DocumentData } from "firebase/firestore";
import styles from './Home.module.css'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Usertype } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

interface HomePage {
    products: DocumentData[];
}


const Home: React.FC<HomePage> = ({products}) => {

    const navigate = useNavigate();

    const handleProductClik = (p:DocumentData) => {
        navigate(`/product/${p.id}`, {
            state: {product : p}
        })
    }

    const auth = useAuth();
    let user:Usertype;
    if(auth){
        user = auth.user; 
    }

    const cart = useCart();
    let addToCart: (item:DocumentData) => void;
    if(cart){
        addToCart = cart.addToCart;
    }

    const handleAddToCart = (event:React.MouseEvent<HTMLButtonElement>,product: DocumentData) => {
        event.stopPropagation();
        addToCart(product);
    };

    
    return (
        <>  
            <h1 className={styles.filterCont}>Filter & Sorting Container</h1>
            <div className={styles.productsCont}>
                {products.map((product:DocumentData,i:number) => (
                    <div className={styles.productCont} onClick={() => handleProductClik( product)} key={i}>
                        <img src={product.img} alt={product.title} />
                        <h3 className={styles.productTitle}>{product.title.length > 45 ? `${product.title.slice(0,20)}...`:product.title}</h3>
                        <p>₹{product.price}</p>
                        {user && <button className={styles.addToCartBtn} onClick={(event) => handleAddToCart(event,product)}>Add To Cart</button> }
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;