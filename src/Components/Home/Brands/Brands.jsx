import React, { useEffect, useState } from "react";
import "./Brands.css";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import CategoriesApi from "../../../API/CategoriesAPi";
import { Link } from "react-router-dom";

export default function Brands() {
    const fetch_categories = useSelector((store) => store.categories);
    const [categories, setCategory] = useState([])
    useEffect(() => {
        setCategory(fetch_categories.data)
    }, [fetch_categories.status]);
  
    var settings = {
      dots: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: false, 
      responsive: [
        {
          breakpoint: 1400,
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
      <section className="Shop_by_health brands">
        <CategoriesApi/>
        <div className="container">
          <div className="feature-product-tile d-flex align-items-center justify-content-between">
            <div className="title-box">
              <h2>Brands </h2>
            </div>
          </div>
          <Slider {...settings} className="xyzg-slider">
            {categories.map((cat) => (
              <div key={cat.id} className="Shop_by_health-card">
                <Link to={`/category/${cat.slug}`}>
                <div className="card-img">
                  <img src={cat.image_url} alt="Product" />
                </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }
