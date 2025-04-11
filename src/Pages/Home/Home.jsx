import React, { useEffect } from 'react'
import './Home.css'
import Header from '../../Components/Partials/Header/Header'
import Footer from '../../Components/Partials/Footer/Footer'
import Hero from '../../Components/Home/Hero/Hero'
import Categories from '../../Components/Home/Categories/Categories'
import BestSelling from '../../Components/Home/BestSelling/BestSelling'
import HotOffer from '../../Components/Home/HotOffer/HotOffer'
import SuperSaving from '../../Components/Home/SuperSaving/SuperSaving'
import MultiBanners from '../../Components/Home/MultiBanners/MultiBanners'
import DealsOfDay from '../../Components/Home/DealsOfDay/DealsOfDay'
import CategoryBestSellers from '../../Components/Home/CategoryBestSellers/CategoryBestSellers'
import AOS from "aos";
import "aos/dist/aos.css";
import Gprscertified from '../../Components/Home/Gprscertified/Gprscertified'





export default function Home() {



    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);


  return (
    <>
      <Header/>

      <Hero/>

        <Gprscertified/>

      <Categories/>

      <BestSelling/>

      <HotOffer/>
      <SuperSaving/>
      <MultiBanners/>
      <DealsOfDay/>
      <CategoryBestSellers/>

      <Footer/>
    </>
  )
}
