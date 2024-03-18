import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Filter from './components/filter/filter';
import Home from './components/Home/Home';
import ProductDetails from './components/productDetails/ProductDetails';
import Signin from './components/signin/Signin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './contexts/AuthContext';
import CartProvider from './contexts/CartContext';
import Cart from './components/cart/cart';
import Checkout from './components/checkout/chekout';
import axios from 'axios';
import { Product } from './Interfaces';

function App(): JSX.Element {

  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState<string>('');

  


  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      try {
        const res = await axios.get(`https://typescript-with-backend.onrender.com/api/product/get-products/${active}`);
        const productsData: Product[] = res.data.products;
        setProducts(productsData);
      } catch (err) {
        toast.error("Error fatching products");
        console.error(err);
      }
    }
    fetchProducts();
  }, [setProducts, active]);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <ToastContainer />
            <Navbar setActive={setActive} />
            <Filter setProducts={setProducts} active={active} setActive={setActive} />
            <Routes>
              <Route path='/' element={<Home products={products} />} />
              <Route path='/product/:productId' element={<ProductDetails />} />
              <Route path='/sign-in' element={<Signin />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
export default App;
