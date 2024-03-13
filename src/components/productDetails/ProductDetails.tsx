import React from 'react';
import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import {useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../configs/firebase';
import { getDoc, doc } from 'firebase/firestore';
import styles from './prodcutDetails.module.css';

const ProductDetails = () => {

  // const navigate = useNavigate();
  const location = useLocation();
  const {productId} = useParams();
  const [product,setProduct] = useState<DocumentData| null>();

  useEffect(()=> {
    if(location.state){
      setProduct(location.state.product);
    }else{
      const fetchProduct = async ():Promise<void> => {
        try{
          if(productId){
            const productDoc = await getDoc(doc(db, 'products', productId));
            if(productDoc.exists()){
              setProduct({id: productDoc.id, ...productDoc.data()});
            }else{
              toast.error("No product found");
            }
          }
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
        <div>
          <h2>{product.title}</h2>
          <p className={styles.para}>{product.desc}</p>
          <p className={styles.para}>₹{product.price}</p>
        </div>
      </div>
    }
  
  </>
  )
}

export default ProductDetails
