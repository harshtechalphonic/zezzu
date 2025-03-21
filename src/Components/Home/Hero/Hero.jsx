import React from 'react'
import './Hero.css'
import Slider from "react-slick";


export default function Hero() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
      };

      const banners = [
        {
          id: 1,
          btnlink: "#!",
          btntext: "Quick Order",
          image: "/banner1.png",
          imagesAlt:"Vorem ipsum dolor inceptos himenaeos",
          title: "Vorem ipsum dolor inceptos himenaeos.",
          desc:"Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem.",
        },
        {
          id: 2,
          btnlink: "#!",
          btntext: "View Items",
          image: "/banner1.png",
          imagesAlt:"Vorem ipsum dolor inceptos himenaeos",
          title: "Vorem ipsum dolor inceptos himenaeos.",
          desc:"Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem.",
        },
        {
          id: 3,
          btnlink: "#!",
          btntext: "Go for More",   
          image: "/banner1.png",
          imagesAlt:"Vorem ipsum dolor inceptos himenaeos",
          title: "Vorem ipsum dolor inceptos himenaeos.",
          desc:"Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem.",
        }
      ];
  return (
    <div className="home_hero">            
    <Slider {...settings}>
    {banners.map((item) => (
        <div key={item.id}>
            <div className='main-content-box py-4'>
                <div className='container'>
                    <div className='row justify-content-between align-items-center'>
                        <div className='col-lg-5'>
                            <div className='content-box'>
                                <h1>{item.title}</h1>
                                <p className='my-4'>{item.desc} </p>
                                <div className='button-light mt-5'>
                                    <a href={item.btnlink}>{item.btntext}</a>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-5'>
                            <div className='image-box'>
                                <img src={item.image} alt={item.imagesAlt} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        ))}
    </Slider>
</div>
  )
}
