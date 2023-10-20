// import logo from './logo.svg';
import { useState } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Master from './website/mainComponent/Master';
import Home from './website/mainComponent/Home';
import Index from './website/mainComponent/Index';
import SubcategoryProduct from './website/Pages/SubcategoryProduct';
import Login from './website/Authentication/Login';
import axios from "axios";
import Register from './website/Authentication/Register';
import Search from './website/Search/Search';
import Wishlist from './website/Pages/Wishlist';
import Cart from './website/Pages/Cart';
import Checkout from './website/Pages/Checkout';
import BrandProduct from './website/Pages/BrandProduct';
import ProductAll from './website/Pages/ProductAll';
import Orders from './website/Pages/Orders';

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>

          <Route  path="/" element={<Master Rcf={Index} />}></Route>
          <Route  path="/home" element={<Master Rcf={Home} />}></Route>
          <Route  path="/search" element={<Master Rcf={Search} />}></Route>
          <Route  path="/wishlist" element={<Master Rcf={Wishlist} />}></Route>
          <Route  path="/cart" element={<Master Rcf={Cart} />}></Route>
          <Route  path="/checkout" element={<Master Rcf={Checkout} />}></Route>
          <Route  path="/orders" element={<Master Rcf={Orders} />}></Route>
          <Route  path="/product-shop/:cat_id/:sub_id" element={<Master Rcf={SubcategoryProduct} />}></Route>
          <Route  path="/product-shop/:brand_id" element={<Master Rcf={BrandProduct} />}></Route>
          <Route  path="/product" element={<Master Rcf={ProductAll} />}></Route>
          <Route  path="/login" element={<Login/>}></Route>
          <Route  path="/register" element={<Register/>}></Route>

          </Routes>
          </BrowserRouter>

</>
  );
}
export default App;
  