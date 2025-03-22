import React, { useState } from 'react'
import Slider from "react-slick";
import './SuperSaving.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faBagShopping, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';

export default function SuperSaving() {
    const products = [
        {
          id: 1,
          discount: "-20%",
          image: "/SuperSaving1.png",
          title: "Mini USB Chopper (Rechargeable)",
          rating: 4.5,
          reviews: 12,
          price: 212,
          slashPrice: 312,
        },
        {
          id: 2,
          discount: "-20%",
          image: "/SuperSaving2.png",
          title: " Lighting",
          rating: 4.5,
          reviews: 12,
          price: 212,
          slashPrice: 312,
        },
        {
          id: 3,
          discount: "-20%",
          image: "SuperSaving3.png",
          title: "Epitome Lighting",
          rating: 4.5,
          reviews: 12,
          price: 212,
          slashPrice: 312,
        }
        ,
        {
          id: 4,
          discount: "-20%",
          image: "SuperSaving4.png",
          title: "Colgate Maxfresh with Cooling Crystals.....",
          rating: 4.5,
          reviews: 12,
          price: 212,
          slashPrice: 312,
        },
        {
          id: 5,
          discount: "-20%",
          image: "SuperSaving3.png",
          title: "Epitome Lighting",
          rating: 4.5,
          reviews: 12,
          price: 212,
          slashPrice: 312,
        }
      ];

      const [wishlist, setWishlist] = useState({});
            const toggleWishlist = (id) => {
              setWishlist((prev) => ({
                ...prev,
                [id]: !prev[id], // Toggle the specific product's wishlist state
              }));
            };


      var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
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
    <section className='Super_saving my-5'>
        <div className='container'>
            <div className='feature-product-tile d-flex align-items-center justify-content-between'>
              <div className='title-box'>
                <h2><span>Super</span>  saving deals</h2>
              </div>
              <div className='title-box'>
                <a href="#!">View All <FontAwesomeIcon icon={faArrowRightLong}/></a>
              </div>
            </div>            

            <div className='featureslider_one my-4'>
            <Slider {...settings} className="xyzg-slider">
              {products.map((product) => (
                <div key={product.id} className="feature-card">
                  <span className="disco">{product.discount}</span>
                  <span className="wishicon" onClick={() => toggleWishlist(product.id)} style={{ cursor: 'pointer', fontSize: '16px' }}>
                                    <FontAwesomeIcon 
                                      icon={wishlist[product.id] ? faSolidHeart : faRegularHeart} 
                                      color={wishlist[product.id] ? "red" : "black"} 
                                    />
                                  </span>
                  <div className="card-img">
                    <img src={product.image} alt="Product" />
                  </div>
                  <div className="product-detail">
                    <h3>{product.title}</h3>
                    <div className="rating d-flex align-items-center ">
                      {[...Array(Math.floor(product.rating))].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} />
                      ))}
                      {product.rating % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfAlt} />}
                      <span>({product.reviews})</span>
                    </div>
                    <div className="Pricing d-flex align-items-center ">
                      <p className="price">₹ {product.price} </p>
                      <p className="slashPrice">₹ {product.slashPrice} </p>
                    </div>
                  </div>
                  <a href="#!" className="cart-btn">Add to Cart <FontAwesomeIcon icon={faBagShopping} className="ms-2"/></a>
                </div>
              ))}
            </Slider>
            </div>
        </div>
      </section>
  )
}
