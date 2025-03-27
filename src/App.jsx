import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
// import About from './pages/About/about';
import Product from './Pages/Product/Product'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Cart from './Pages/Cart/Cart'
import Wishlist from './Pages/Wishlist/Wishlist'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const router= createBrowserRouter([
  {
    path : '/',
    element : <Home/>
  },
  {
    path : '/product',
    element : <Product/>
  },
  {
    path : '/product-detail',
    element : <ProductDetail/>
  },
  {
    path : '/cart',
    element : <Cart/>
  },
  {
    path : '/wishlist',
    element : <Wishlist/>
  },
  {
    path : '*',
    element : <Home/>
  },
])



function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
