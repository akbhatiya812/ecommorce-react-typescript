import React from "react";
import styles from './Home.module.css'
import { useNavigate } from "react-router-dom";
import { useAuth} from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { CartContextType, AuthContextType, Product  } from "../../Interfaces";

interface HomePage {
    products: Product[];
}


const Home: React.FC<HomePage> = ({products}) => {

    const navigate = useNavigate();

    const handleProductClik = (p:Product) => {
        navigate(`/product/${p._id}`, {
            state: {product : p}
        })
    }

    const {user} = useAuth() as AuthContextType;
    const {addToCart} = useCart() as CartContextType;

    const handleAddToCart = (event:React.MouseEvent<HTMLButtonElement>,product: Product) => {
        event.stopPropagation();
        addToCart(product);
    };
    
    return (
        <>  
            <div className={styles.productsCont}>
                {products.map((product:Product,i:number) => (
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