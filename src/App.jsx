import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
// import About from './pages/About/about';
import Product from './Pages/Product/Product'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Cart from './Pages/Cart/Cart'
import Wishlist from './Pages/Wishlist/Wishlist'
import Login from './Pages/Auth/Login/Login'
import SignUp from './Pages/Auth/SignUp/SignUp'
import ForgetPassword from './Pages/Auth/ForgetPassword/ForgetPassword'
import ResetPassword from './Pages/Auth/ResetPassword/ResetPassword'
import VerifyAccount from './Pages/Auth/VerifyAccount/VerifyAccount'
import UserAccount from './Pages/UserAccount/UserAccount'
import Contact from './Pages/Contact/Contact'
import Test from './Pages/Test'

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
    path : '/product/:slug',
    element : <ProductDetail/>
  },
  {
    path : '/category/:category',
    element : <Product/>
  },
  {
    path : '/category/:category/:sub_Category',
    element : <Product/>
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
    path : '/login',
    element : <Login/>
  },
  {
    path : '/signup',
    element : <SignUp/>
  },
  {
    path : '/forget-password',
    element : <ForgetPassword/>
  },
  {
    path : '/reset-password',
    element : <ResetPassword/>
  },
  {
    path : '/verify',
    element : <VerifyAccount/>
  },
  {
    path : '/user-account',
    element : <UserAccount/>
  },
  {
    path : '/contact-us',
    element : <Contact/>
  },
  {
    path : '/test',
    element : <Test/>
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
