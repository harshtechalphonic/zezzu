import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "./ProductDetail.css";

import product1 from "/ProductOne.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy, faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faFacebook,
  faPinterest,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Product_detail({ singleProduct }) {
  // console.log(singleProduct);
  const [quantity, setQuantity] = useState(1);
  const [productVar, setProductVar] = useState({});
  const [productVarSelected, setProductVarSelected] = useState({});
  const [productAmount, setProductAmount] = useState(false);
  const mainSliderRef = useRef(null);
  const navSliderRef = useRef(null);
  // console.log(productVar)
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  useEffect(()=>{
    if(singleProduct.product_inventory_details.length == 0) return;

    const variations = JSON.parse(
      singleProduct.product_inventory_details[0].variation_json
    );
    if(Object.keys(productVarSelected).length == 0 || Object.keys(productVar).length != Object.keys(productVarSelected).length) return;
    const match = variations.find(v =>
      Object.entries(productVarSelected).every(([key, val]) => v[key] === val)
    );
    setProductAmount(match)
  },[productVarSelected])

  useEffect(() => {
    if(singleProduct.product_inventory_details.length == 0) return;
    const varrr = JSON.parse(
      singleProduct.product_inventory_details[0].variation_json
    );
    const variations = varrr || null;

    const removeKeys = ["sale_price", "stock_status", "reguler_price"];
    const createAttr = {};

    varrr.forEach((item) => {
      const filtered = Object.fromEntries(
        Object.entries(item).filter(([key]) => !removeKeys.includes(key))
      );

      for (const [key, value] of Object.entries(filtered)) {
        if (!createAttr[key]) {
          createAttr[key] = [];
        }
        createAttr[key].push(value);
      }
    });

    for (const key in createAttr) {
      createAttr[key] = [...new Set(createAttr[key])];
    }
    setProductVar(createAttr);
  }, []);

  const handleVariation = (type, event) => {
    setProductVarSelected({...productVarSelected, [type]: event.target.value })
    const product_variation = JSON.parse(
      singleProduct.product_inventory_details[0].variation_json
    );
    // console.log(product_variation)
    const varrr = product_variation.filter(
      (check) => check[type] == event.target.value
    );
    const variations = varrr || null;

    const removeKeys = ["sale_price", "stock_status", "reguler_price",`${type}`];
    const createAttr = {};

    varrr.forEach((item) => {
      const filtered = Object.fromEntries(
        Object.entries(item).filter(([key]) => !removeKeys.includes(key))
      );

      for (const [key, value] of Object.entries(filtered)) {
        if (!createAttr[key]) {
          createAttr[key] = [];
        }
        createAttr[key].push(value);
      }
    });

    for (const key in createAttr) {
      createAttr[key] = [...new Set(createAttr[key])];
    }

    setProductVar({...productVar,...createAttr});
  };
  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: navSliderRef.current,
    ref: mainSliderRef,
  };

  const sliderNavSettings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: mainSliderRef.current,
    focusOnSelect: true,
    arrows: true,
    ref: navSliderRef,
  };

  return (
    <div className="product-detail-slider-content my-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="product-galler-slide">
              <div className="main">
                <div className="mainSliderRef">
                  <Slider {...sliderSettings} className="slider slider-for">
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <div key={index}>
                        <img
                          src={`https://demotechalphonic.site/multivendor/assets/uploads/media-uploader/${singleProduct.image.path}`}
                          alt="Product"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="navSliderRef">
                  <Slider {...sliderNavSettings} className="slider slider-nav">
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <div key={index}>
                        <img
                          src={`https://demotechalphonic.site/multivendor/assets/uploads/media-uploader/${singleProduct.image.path}`}
                          alt="Thumbnail"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="product-description">
              <h5>{singleProduct.name}</h5>
              {/* <div className="d-flex align-items-center">
                  <span className="rating-stars"><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStarHalf}/></span>
                  
                </div> */}
              <div className="my-3">
                <div className="rating d-flex align-items-center ">
                  {[...Array(Math.floor(4))].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="star-rating"
                    />
                  ))}
                  {0.5 % 1 !== 0 && (
                    <FontAwesomeIcon
                      icon={faStarHalfAlt}
                      className="star-rating"
                    />
                  )}
                  <span className="ms-2 rating-test d-flex align-items-center">
                    4.7 Star Rating <pre className="mb-0">(1,671 Users)</pre>
                  </span>
                </div>
              </div>
              {productAmount ?
              <div className="mt-2">
              <span className="fw-bold fs-4 Pricing">
                {" "}
                ₹{productAmount.sale_price}
              </span>
              <span className="text-decoration-line-through text-muted ms-2">
                ₹{productAmount.reguler_price}
              </span>
              <span className="discount ms-2">
                {(
                  ((productAmount.reguler_price - productAmount.sale_price) /
                  productAmount.reguler_price) *
                  100
                ).toFixed(0)}
                % OFF
              </span>
            </div>
              : <div className="mt-2">
              <span className="fw-bold fs-4 Pricing">
                ₹{singleProduct.sale_price}
              </span>
              <span className="text-decoration-line-through text-muted ms-2">
                ₹{singleProduct.price}
              </span>
              <span className="discount ms-2">
                {(
                  ((singleProduct.price - singleProduct.sale_price) /
                    singleProduct.price) *
                  100
                ).toFixed(0)}
                % OFF
              </span>
            </div>}
              
              {Object.entries(productVar).map(([key, values]) => (
                <div key={key}>
                  <label htmlFor={`${key}_${key}`} className="form-label text-capitalize">Select {key}</label>
                  <select
                    id={`${key}_${key}`}
                    className="form-select"
                    aria-label={`Product ${key}`}
                    defaultValue=""
                    onChange={(event) => handleVariation(key, event)}
                  >
                    <option value="" disabled>
                      Choose a {key}
                    </option>
                    {values.map((option, idx) => (
                      <option value={option} key={idx}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              {productAmount ?
              <div className="cate-text mt-3">
                <span className="text-success fw-bold">
                  <b className="text-dark">Availability:</b> In Stock
                </span>
              </div>
              :
              <div className="cate-text mt-3">
                <span className="text-success fw-bold">
                  <b className="text-dark">Availability:</b> In Stock
                </span>
              </div>}

              {singleProduct.category != null ? (
                <div className="cate-text mt-3">
                  {/* {console.log(singleProduct.category,singleProduct.sub_category)} */}
                  <span className="text-success fw-bold">
                    <b className="text-dark">Category:</b>
                    <Link
                      className="fw-bold"
                      to={`/category/${singleProduct?.category?.slug}`}
                    >
                      {singleProduct?.category?.name}
                    </Link>{" "}
                    /{" "}
                    <Link
                      className="fw-bold"
                      to={`/category/${singleProduct?.category?.slug}/${singleProduct?.sub_category?.slug}`}
                    >
                      {singleProduct?.sub_category?.name}
                    </Link>
                  </span>
                </div>
              ) : (
                ""
              )}

              <hr className="my-5" />
              <div className="purchase-btns">
                <div className="mt-4 d-flex gap-3 align-items-center justify-content-between w-100">
                  <div className="d-flex">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center mx-2"
                      style={{ width: "50px" }}
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  <button className="btn btn-success w-50">
                    ADD TO CART{" "}
                    <FontAwesomeIcon icon={faCartShopping} className="ms-2" />
                  </button>
                  {/* <button className="btn btn-outline-dark w-50">BUY NOW</button> */}
                  <Link to="/checkout" className="btn btn-outline-dark w-50">BUY NOW</Link>
                </div>
              </div>

              <div className="mt-3 wishlist-sec-prodet d-flex align-items-center gap-3 justify-content-between">
                <div className="whiashad d-flex align-items-center gap-2">
                  <label>
                    <FontAwesomeIcon icon={faHeart} />
                  </label>
                  <input type="checkbox" className="d-none" />
                  <label>Add to Wishlist</label>
                </div>

                <div className="share-product d-flex align-items-center">
                  <p>Share product: </p>
                  <ul className="d-flex align-items-center gap-2 list-unstyled mb-0 ms-2">
                    <li>
                      <FontAwesomeIcon icon={faCopy} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faFacebook} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faXTwitter} />
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faPinterest} />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-3 Guarantee_Checkout border p-4 bg-light">
                <span>100% Guarantee Safe Checkout</span>
                <div className="paymetn-img mt-3">
                  <img src="/Payment Method.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
