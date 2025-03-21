import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
// import About from './pages/About/about';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const router= createBrowserRouter([
  {
    path : '/',
    element : <Home/>
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
