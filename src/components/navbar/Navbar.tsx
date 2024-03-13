import React from 'react'
import styles from './Navbar.module.css';
import { LuShoppingCart, LuUserCircle2 } from "react-icons/lu";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.logoCont}><Link to='/'><h1>LOGO</h1></Link></div>
        <ul className={styles.menuCont}>
          <li>
            <LuUserCircle2 className={styles.icons}/>
          </li>
          <li>
            <LuShoppingCart className={styles.icons}/>
            <div className={styles.cartCountCont}><p>0</p></div>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
