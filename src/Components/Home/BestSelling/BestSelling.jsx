import React, { useEffect, useState } from "react";
import "./BestSelling.css";
import Slider from "react-slick";

import {faArrowRightLong} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {useSelector } from "react-redux";
import SingleProductSlide from "../../Product/SingleProductSlide";

export default function BestSelling() {
  const fetch_products = useSelector((store) => store.products);
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   console.log('cccccc',fetch_products.data)
  //   setProducts(fetch_products.data);
  // }, [fetch_products.status]);

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
    <section className="Best_selling my-5">
      <div className="container">
        <div className="feature-product-tile d-flex align-items-center justify-content-between">
          <div className="title-box">
            <h2>
              <span>Best</span> Selling
            </h2>
          </div>
          <div className="title-box">
            <Link href="/product">
              View All <FontAwesomeIcon icon={faArrowRightLong} />
            </Link>
          </div>
        </div>

        <div className="featureslider_one my-4">
          <Slider {...settings} className="xyzg-slider">
            
            {fetch_products.data.filter(e => e.type == 1).map((product, index) => (
              <SingleProductSlide key={index} product={product}/>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
