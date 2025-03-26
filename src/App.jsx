import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
// import About from './pages/About/about';
import Product from './Pages/Product/Product'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Cart from './Pages/Cart/Cart'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from 'react-redux'
import ecommerceStore from './store'



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
    path : '*',
    element : <Home/>
  },
])



function App() {
  return (
    <main>
      <Provider store={ecommerceStore}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </main>
  )
}

export default App
