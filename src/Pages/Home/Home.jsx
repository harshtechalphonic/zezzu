import React, { useEffect } from 'react'
import './Home.css'
import Header from '../../Components/Partials/Header/Header'
import Footer from '../../Components/Partials/Footer/Footer'
import Categories from '../../Components/Home/Categories/Categories'
import Hero from '../../Components/Home/Hero/Hero'
import AOS from "aos";
import "aos/dist/aos.css";

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

        <section className='gprscertified'>
            <div className='container'>
                <div className='row'>
                    {gps.map((item) =>(
                        <div className='col-lg-3' key={item.id}>
                            <div class="gprscertified-box d-flex align-items-center  gap-3">
                                <div class="gprscertified-icon">
                                    <img alt="" src={item.image} alt={item.imagesAlt}/>
                                </div>
                                <div class="gprscertified-content">
                                    <h4 className='mb-0'>{item.title}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <Categories/>

       



        <Footer/>
    </>
  )
}
