import React, { useState,useEffect } from 'react'
import style from './checkout.module.css';
import { useAuth} from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

import { CartType, CartContextType, Order, AuthContextType } from '../../Interfaces';
import { toast } from 'react-toastify';
import axios from 'axios';

const Checkout = () => {
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const cart = location.state?.cart;
    const isFromBuyNow = location.state?.buyNow;
    const cartContext = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(()=>{
        if(!auth || !auth.user){
            navigate('/sign-in');
        }
        if(!cartContext){
            navigate('/cart');
        }
    },[auth,navigate,cartContext])

    const {user} = useAuth() as AuthContextType;
    
    const {emptyCart, cartAmount,totalItems} = useCart() as CartContextType;

    const [order, setOrder] = useState<Order>({
        email: user?.email,
        firstName: '',
        lastName: '',
        address: '',
        city:'',
        state:'',
        pincode: '',
        phone: '',
        pgMethod:'cod' ,
        cart: cart,
        amount: cartAmount,
        totalItems: totalItems
    });

    useEffect(()=> {
        if (isFromBuyNow) {
            setOrder({ ...order, amount: cart[0].price });
        }
    },[isFromBuyNow,cart,order]);
    

    useEffect(()=>{
        if(!user){
            navigate('/signin')
        }
    },[user,navigate]);

    const handleInputChange = (e:React.FormEvent<HTMLInputElement>) => {
        const {name,value} = e.currentTarget;
        setOrder((prevState) => ({...prevState, [name] : value}));
    }

    const handleForm = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        
        const addOrder = async () => {
            try{
                setIsSubmitting(true);
                await axios.post('https://typescript-with-backend.onrender.com/api/order/createOrder',{
                    email: user?.email,
                    orderAmount: order.amount,
                    firstName: order.firstName,
                    lastName : order.lastName,
                    order: order
                });
                // await axios.post('http://localhost:5000/api/order/createOrder',{
                //     email: user?.email,
                //     orderAmount: order.amount,
                //     firstName: order.firstName,
                //     lastName : order.lastName,
                //     order: order
                // });

                navigate('/');
                emptyCart();
                toast.success("Order confirmed!");
            }catch(error){
                console.log(error);
                toast.error("Error creating Order");
            }finally{
                setIsSubmitting(false);
            }
        }
        addOrder();
    }

  return (
    <>
        {user ?
            <div className={style.CheckoutContainer} >  
                <div className={style.formContainer}>
                    <form onSubmit={handleForm}>
                        <h3>Delivery</h3>
                        <input type="text" name="firstName" id="firstName" placeholder='First Name' className={style.firstName} onChange={handleInputChange} value={order.firstName} />
                        <input type="text" name='lastName' id='lastName' placeholder='Last Name' className={style.lastName} onChange={handleInputChange} value={order.lastName} /><br/>
                        <input type="text" name='address' id='address' placeholder='Address' className={style.address} onChange={handleInputChange} value={order.address} /><br/>
                        <input type="text" name='city' id='city' placeholder='City' className={style.city} onChange={handleInputChange} value={order.city} />
                        <input type="text" name='state' id='state' placeholder='State' className={style.state} onChange={handleInputChange} value={order.state} />
                        <input type="text" name='pincode' id='pincode' placeholder='Pincode' className={style.pincode} onChange={handleInputChange} value={order.pincode} /><br/>
                        <input type="tel" name="phone" id="phone" placeholder='Mobile No.' className={style.phone} onChange={handleInputChange} value={order.phone} />
                        <div>
                            <h3>Payment method</h3>
                            <input type="radio" id='cod' name='pgMethod' onChange={handleInputChange} checked={order.pgMethod==='cod'} value='cod' />
                            <label htmlFor="cod">Cash on Delivery(COD)</label><br/>
                            <input type="radio" id='prepaid' name='pgMethod' onChange={handleInputChange} checked={order.pgMethod==='prepaid'} value='prepaid' />
                            <label htmlFor="prepaid">Razorpay Secure (UPI, Cards, Wallets, NetBanking)</label>
                        </div>
                        <button className={style.buyNow} type='submit' disabled={isSubmitting}>{isSubmitting ? "Processing Your Order": "Complete Your Order"}</button>
                    </form>
                </div>
                <div className={style.billContainer}>
                    {cart.map((item:CartType,index:number) => (<div className={style.productsContainer} key={index}>
                        <div className={style.imgContainer}>
                            <img src={item.img} alt="" />
                        </div>
                        <div className={style.titleContainer}>
                            <p>{item.title}</p>
                        </div>
                        <div className={style.priceContainer}>
                            <p>{item.cartQty} x ₹{item.price}</p>
                        </div>
                    </div>))}
                    
                    <div className={style.amountContainer}>
                        <div>
                            <p>Subtotal</p>
                            <p>Shipping</p>
                            <p>Total</p>
                        </div>
                        <div>
                            <p>₹{isFromBuyNow ? cart[0].price :cartAmount}</p>
                            <p>₹0.00</p>
                            <p>₹{isFromBuyNow ? cart[0].price :cartAmount}</p>
                        </div>
                    </div>
                </div>

            </div> : null
        }
    </>
  )
}

export default Checkout;