import React from 'react';
import styles from './Signin.module.css';
import { Usertype, useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

interface SignInUser {
  user: Usertype;
  setUser: (user: Usertype) => void;
}


const Signin: React.FC<SignInUser> = () => {

  const auth = useAuth();
  const CartContext = useCart();
  let emptyCart: ()=> void = CartContext?.emptyCart ?? (() => {}) ;

  if(!auth){
    return (<div className={styles.signInPageCont}>
      <div className={styles.signInCont}>
        <button className={styles.signInBtn}>
          ...Loading
        </button>
      </div>
    </div>)
  }
  const {user, signInWithGoogle, signOutUser} = auth;
  return (
    <div className={styles.signInPageCont}>
      <div className={styles.signInCont}>
        {user?<>
          <h3>Hi, {user.displayName}</h3><br/>
          <button className={styles.signInBtn} onClick={() => {signOutUser(); emptyCart()}}>Sign Out</button>
          </>:<button className={styles.signInBtn} onClick={signInWithGoogle}>
          <img className={styles.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" alt="" />
          &nbsp;Sign In With Google
        </button>}
        
      </div>
    </div>
  )
}

export default Signin;
