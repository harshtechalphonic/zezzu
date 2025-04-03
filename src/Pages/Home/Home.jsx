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


// images 
// import grs_certified from '../../assets/grs_certified.png'



export default function Home() {



    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);

      const gps = [
        {
          id: 1,
          image: "/grs_certified.png",
          imagesAlt:"GRS Certified",
          title: "GRS Certified.",
        },
        {
            id: 2,
            image: "/sustainable-materials.png",
            imagesAlt:"Sustainable Materials",
            title: "Sustainable Materials.",
          },
          {
            id: 3,
            image: "/pan_india_free_delivery.png",
            imagesAlt:"PAN India Free Delivery",
            title: "PAN India Free Delivery.",
          },
          {
            id: 4,
            image: "/easy_secure_payment_mode.png",
            imagesAlt:"Easy & Secured Payment modes",
            title: "Easy & Secured Payment modes.",
          },
      ]
    
     

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
