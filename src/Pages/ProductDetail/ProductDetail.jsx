import React from 'react'
import Header from '../../Components/Partials/Header/Header';
import Footer from '../../Components/Partials/Footer/Footer';
import Product_detail from '../../Components/ProductDetail/Product_detail';
import Product_descrtiption from '../../Components/ProductDetail/Product_descrtiption';
import SimilarProducts from '../../Components/ProductDetail/SimilarProducts';
import ReviewRating from '../../Components/ProductDetail/ReviewRating';
import RecentlyViewed from '../../Components/ProductDetail/RecentlyViewed';


export default function ProductDetail() {
  return (
   <>
    <Header/>
    
    <Product_detail/>
    <Product_descrtiption/>
    <SimilarProducts/>
    <ReviewRating/>
    <RecentlyViewed/>

    <Footer/>
    </>
  );
}