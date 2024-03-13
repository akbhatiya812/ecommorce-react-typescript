import React from "react";
import { DocumentData } from "firebase/firestore";
import styles from './Home.module.css'
import { useNavigate } from "react-router-dom";


const Home: React.FC<{products: DocumentData[]}> = ({products}) => {

    const navigate = useNavigate();

    const handleProductClik = (p:DocumentData) => {
        navigate(`/product/${p.id}`, {
            state: {product : p}
        })
    }

    return (
        <>  
            <h1 className={styles.filterCont}>Filter & Sorting Container</h1>
            <div className={styles.productsCont}>
                {products.map((product:DocumentData,i:number) => (
                    <div className={styles.productCont} onClick={() => handleProductClik( product)} key={i}>
                        <img src={product.img} alt={product.title} />
                        <h3 className={styles.productTitle}>{product.title.length > 60 ? `${product.title.slice(0,20)}...`:product.title}</h3>
                        <p>₹{product.price}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;