import React, { useEffect, useState } from "react";
import "./BestSelling.css";
import Slider from "react-slick";

import {
  faArrowRightLong,
  faBagShopping,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BestSelling() {
  const fetch_products = useSelector((store) => store.products);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setProducts(fetch_products.data);
    if(localStorage.getItem("wishlist")){
      setWishlist([...JSON.parse(localStorage.getItem("wishlist"))]);
    }
  }, [fetch_products.status]);


  const toggleWishlist = (id) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.includes(id) ? wishlist.filter(num => num !== id) : [id, ...wishlist];
    setWishlist(wishlist);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
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
            {products.filter(e => e.type == 1).map((product) => (
              <div key={product.prd_id} className="feature-card">
                <span className="disco">
                  {Math.round(
                    ((product.price - product.discount_price) / product.price) *
                      100
                  )}
                  %
                </span>
                <span
                  className="wishicon"
                  onClick={() => toggleWishlist(product.prd_id)}
                  style={{ cursor: "pointer", fontSize: "16px" }}
                >
                  <FontAwesomeIcon
                    icon={
                      wishlist.includes(product.prd_id) ? faSolidHeart : faRegularHeart
                    }
                    color={wishlist.includes(product.prd_id) ? "red" : "black"}
                  />
                </span>
                <div className="card-img">
                  <img src={product.img_url} alt="Product" />
                </div>
                <div className="product-detail">
                  <h3>
                    <Link to={product.url}>{product.title}</Link>
                  </h3>
                  <div className="rating d-flex align-items-center ">
                    <FontAwesomeIcon key={0} icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <span>({product.avg_ratting})</span>
                  </div>
                  <div className="Pricing d-flex align-items-center ">
                    <p className="price">₹ {product.discount_price} </p>
                    <p className="slashPrice">₹ {product.price} </p>
                  </div>
                </div>
                <a href="#!" className="cart-btn">
                  Add to Cart{" "}
                  <FontAwesomeIcon icon={faBagShopping} className="ms-2" />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
