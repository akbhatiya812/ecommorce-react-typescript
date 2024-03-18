import React,{useEffect, useState} from 'react';
import styles from './Signin.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { CartContextType,AuthContextType } from '../../Interfaces';
import { useCart } from '../../contexts/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Order } from '../../Interfaces';

const Signin = () => {

  const [orders,setOrders] = useState<Order[] | null>(null);

  const {user, signInWithGoogle , signInWithGitHub, signOutUser} = useAuth() as AuthContextType;
  const {emptyCart} = useCart() as CartContextType;

  useEffect(()=> {
    const fetchOrders = async () => {
      try{
        const res =  await axios.post("https://typescript-with-backend.onrender.com/api/order/getOrders",{
          email : user?.email
        });
        const fetchedOrders = res.data.orders;
        setOrders(fetchedOrders);
      }catch(err){
        toast.error("Error fatching orders");
      }
    }
    if(user){
      fetchOrders();
    }
    
  },[user]);

  
  return (
    <div className={styles.signInPageCont}>
      <div className={styles.signInCont}>
        {user?<>
          <h3>Hi, {user.displayName}</h3><br/>
          <button className={styles.signInBtn} onClick={() => {signOutUser(); emptyCart()}}>Sign Out</button>
          </>:<>
            <button className={styles.signInBtn} onClick={signInWithGoogle}>
              <img className={styles.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="" />
              &nbsp;Sign In With Google
            </button><br />
            <button className={styles.signInBtn} onClick={signInWithGitHub}>
              <img className={styles.googleIcon} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN0Uu0auB-_30X62d-vUYM-jhN4TkqPqgv6A&usqp=CAU" alt="" />
              &nbsp;Sign In With Github
            </button>
          </>}
          <div className={styles.ordersCont}>
              {orders && orders.length>0 && <>
                  <h2 className={styles.tableHeading}>Order History</h2>
                  <div className={styles.tableHeader}>
                    <div className={styles.orderIdCont}>Order Id</div>
                    <div className={styles.orderDateCont}>Order Date</div>
                    <div className={styles.orderQtyCont}>Order Qty</div>
                    <div className={styles.orderAmountCont}>Order Amount</div>
                  </div>
                  <div className={styles.orderTableBodyCont}>
                    {orders.map((order,index) => <div className={styles.orderRowCont} key={index}>
                      <div className={styles.orderIdCont}>{order._id}</div>
                      <div className={styles.orderDateCont}>{order.createdAt?.slice(0,10)}</div>
                      <div className={styles.orderQtyCont}>{order.totalItems}</div>
                      <div className={styles.orderAmountCont}>₹&nbsp;{order.amount}</div>
                    </div>)}    
                  </div>            
                </>}
          </div>
      </div>
    </div>
  )
}

export default Signin;
