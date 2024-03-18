import React from 'react'
import styles from './Navbar.module.css';
import { LuShoppingCart, LuUserCircle2 } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { useCart} from '../../contexts/CartContext';
import { CartContextType, AuthContextType } from '../../Interfaces';
import { useAuth} from '../../contexts/AuthContext';
import logo from '../../logo.png';

interface NavbarInterface {
  setActive: (type:string) => void;
}

const Navbar:React.FC<NavbarInterface> = ({setActive}) => {

  const {user, photo} = useAuth() as AuthContextType;
  // console.log(user);
  const {totalItems} = useCart() as CartContextType;
  const navigate = useNavigate();

  const goToHome = () => {
    setActive('');
    navigate('/');
  }


  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.logoCont} onClick={goToHome}><img className={styles.logo}  src={logo} alt='LOGO'/> <h1 className={styles.brandName}>XYZ</h1></div>
        <ul className={styles.menuCont}>
          <li>
            <Link to="/sign-in">{user? <img className={styles.userImg} src={photo} alt=''/> : <LuUserCircle2 className={styles.icons}/>}</Link>
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
