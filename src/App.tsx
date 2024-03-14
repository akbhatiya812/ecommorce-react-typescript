import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home/Home';
import ProductDetails from './components/productDetails/ProductDetails';
import Signin from './components/signin/Signin';
import { db } from './configs/firebase';
import { collection, getDocs, DocumentData, QuerySnapshot } from 'firebase/firestore';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/AuthContext';
import CartProvider from './contexts/CartContext';
import Cart from './components/cart/cart';
import { Usertype } from './contexts/AuthContext';
import Checkout from './components/checkout/chekout';

function App():JSX.Element {

  const [products,setProducts] = useState<DocumentData[]>([]);
  const [user,setUser] = useState<Usertype | null>(null);
  useEffect(()=> {
    const fetchProducts = async ():Promise<void> => {
      try{
        const productCollection: QuerySnapshot<DocumentData> = await getDocs(collection(db, 'products'));
        const productsData: DocumentData[] = productCollection.docs.map((doc) => ({id: doc.id, ...doc.data()}));
        setProducts(productsData);
      }catch(err){
        toast.error("Error fatching products");
        console.error(err);
      }
    } 
    fetchProducts();
  },[setProducts]);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <ToastContainer/>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Home products={products}/>}/>
              <Route path='/product/:productId' element={<ProductDetails/>} />
              <Route path='/sign-in' element={<Signin user={user} setUser={setUser}/>}/>
              <Route path='/cart' element={<Cart/>} /> 
              <Route path='/checkout' element={<Checkout/>}/>
            </Routes>  
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
