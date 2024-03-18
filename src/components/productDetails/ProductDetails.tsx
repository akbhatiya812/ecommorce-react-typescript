import React from 'react';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { db } from '../../configs/firebase';
// import { getDoc, doc } from 'firebase/firestore';
import styles from './prodcutDetails.module.css';
import { useAuth} from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { CartContextType, AuthContextType,Product } from '../../Interfaces';
import axios from 'axios';


const ProductDetails = () => {

  // const navigate = useNavigate();
  const location = useLocation();
  const {productId} = useParams();
  const [product,setProduct] = useState<Product| null>();
  const navigate = useNavigate();

  const {user} = useAuth() as AuthContextType;
  const {addToCart} = useCart() as CartContextType;

  const handleCart = (product:Product) => {
    if(user){
      addToCart(product)
    }else{
      navigate('/sign-in');
    }
  }

  useEffect(()=> {
    if(location.state){
      setProduct(location.state.product);
    }else{
      const fetchProduct = async ():Promise<void> => {
        try{
          const res = await axios(`https://typescript-with-backend.onrender.com/api/product/get-product/${productId}`);
          setProduct(res.data.product);
        }catch(err){
          toast.error("Error fatchng product");
          console.log(err);
        }
      }
      fetchProduct();
    }
  },[location.state, productId]);

  return (<>  
    {product && 
      <div className={styles.cont}>
        <div>
          <img src={product.img} alt="" />
        </div>
        <div className={styles.productDetailCont}>
          <h2 className={styles.productTitle}>{product.title}</h2>
          <p className={styles.desc}>{product.desc}</p>
          
          <p className={styles.price}><span className={styles.mrp}>MRP: ₹{product.mrp}</span>&nbsp;<span className={styles.sellPrice}> ₹ {product.price}</span></p>
          <div className={styles.discountCont}>
            <span className={styles.discountSpan}>Limited Time Deal</span>
          </div>
          <button className={styles.addToCart} onClick={()=> {handleCart(product)}}>Add To Cart</button>
        </div>
      </div>
    }
  
  </>
  )
}

export default ProductDetails
