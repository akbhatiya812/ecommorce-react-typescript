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

function App():JSX.Element {

  const [products,setProducts] = useState<DocumentData[]>([]);

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
        <div className="App">
          <ToastContainer/>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home products={products}/>}/>
            <Route path='/product/:productId' element={<ProductDetails/>} />
            <Route path='/sign-in' element={<Signin/>}/>
          </Routes>  
        </div>
      </AuthProvider>
    </Router>
  );
}
export default App;
