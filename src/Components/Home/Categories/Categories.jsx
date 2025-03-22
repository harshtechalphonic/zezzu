import React from 'react'
import './Categories.css'
import Slider from "react-slick";


export default function Categories() {
  const products = [
    {
      id: 1,
      link: "#!",
        image: "/PersonalCare.png",
      title: "Personal Care",
    },
    {
      id: 2,
      link: "#!",
      image: "/Kitchen.png",
      title: "Kitchen",
    },
    {
      id: 3,
      link: "#!",
      image: "/Clothing.png",
      title: "Clothing",
    }
    ,
    {
      id: 4,
      link: "#!",
      image: "/Electronic.png",
      title: "Electronic",
    }
    ,
    {
      id: 5,
      link: "#!",
      image: "/Qorem.png",
      title: "Qorem",     
    }
    ,
    {
      id: 6,
      link: "#!",
      image: "/Yorem.png",
      title: "Yorem",
      
    }
  ];

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
      };
      


  return (
    <section className='Shop_by_health '>
          <div className='container'>
            <div className='feature-product-tile d-flex align-items-center justify-content-between'>
              <div className='title-box'>
                <h2>Categories </h2>
              </div>
            </div> 


            <Slider {...settings} className="xyzg-slider" >
              {products.map((product) => (
                <div key={product.id} className="Shop_by_health-card">
                  <div className="card-img">
                    <img src={product.image} alt="Product" />
                  </div>
                  <div className="product-detail">
                    <h3><a href={product.link}>{product.title}</a></h3> 
                  </div>
                </div>
              ))}
            </Slider>

          </div>
      </section>
  )
}
