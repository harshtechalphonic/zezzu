import React, { useEffect, useState } from "react";
import "./Categories.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { categoriesAction } from "../../../store/Categories/categoriesSlice";

export default function Categories() {
  const categories = useSelector((store) => store.categories);
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (categories.status) return;
    axios
      .get("https://demotechalphonic.site/multivendor/api/category")
      .then(function (response) {
        dispatch(categoriesAction.getCategory(response.data))
        setCategory(response.data.categories);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [categories.status]);

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
  
  return (
    <section className="Shop_by_health ">
      <div className="container">
        <div className="feature-product-tile d-flex align-items-center justify-content-between">
          <div className="title-box">
            <h2>Categories </h2>
          </div>
        </div>
        <Slider {...settings} className="xyzg-slider">
          {category.map((product) => (
            <div key={product.id} className="Shop_by_health-card">
              <div className="card-img">
                <img src={product.image_url} alt="Product" />
              </div>
              <div className="product-detail">
                <h3>
                  <a href={product.link}>{product.name}</a>
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
