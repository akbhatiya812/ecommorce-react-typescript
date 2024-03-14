import React from 'react'
import styles from './Navbar.module.css';
import { LuShoppingCart, LuUserCircle2 } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth, Usertype } from '../../contexts/AuthContext';

const Navbar = () => {

  const cart = useCart();
  const auth = useAuth();
  let user:Usertype|null = null;
  let photoUrl :string  = '';
  let totalItems:number = 0;


  if(cart){
    totalItems = cart.totalItems;
  }
  if(auth){
    user = auth.user; 
    photoUrl = auth.photo;
  }

  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.logoCont}><Link to='/'><h1>LOGO</h1></Link></div>
        <ul className={styles.menuCont}>
          <li>
            <Link to="/sign-in">{user? <img className={styles.userImg} src={photoUrl} alt=''/> : <LuUserCircle2 className={styles.icons}/>}</Link>
          </li>
          <li>
            <Link to='/cart'>
              <LuShoppingCart className={styles.icons}/>
              <div className={styles.cartCountCont}><p>{totalItems}</p></div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
