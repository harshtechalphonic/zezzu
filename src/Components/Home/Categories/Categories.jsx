import React, { useEffect, useState } from "react";
import "./Categories.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { categoriesAction } from "../../../store/Categories/categoriesSlice";
import config from "../../../Config/config.json"
import CategoriesApi from "../../../API/CategoriesAPi";
import { Link } from "react-router-dom";

export default function Categories() {
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
    centerMode: false, // Set to true if you want a centered slide effect
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
  // console.log(categories)
  return (
    <section className="Shop_by_health ">
      <CategoriesApi/>
      <div className="container">
        <div className="feature-product-tile d-flex align-items-center justify-content-between">
          <div className="title-box">
            <h2>Categories </h2>
          </div>
        </div>
        <Slider {...settings} className="xyzg-slider">
          {categories.map((cat) => (
            <div key={cat.id} className="Shop_by_health-card">
              <div className="card-img">
                <img src={cat.image_url} alt="Product" />
              </div>
              <div className="product-detail">
                <h3>
                  <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
