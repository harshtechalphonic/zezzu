import React, { useRef, useState } from 'react'
import Slider from 'react-slick';
import "./ProductDetail.css"

import product1 from "/ProductOne.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faCopy, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faPinterest, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Product_detail() {
    const [quantity, setQuantity] = useState(1);
    const mainSliderRef = useRef(null);
    const navSliderRef = useRef(null);
  
    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  
    const sliderSettings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: navSliderRef.current,
      ref: mainSliderRef
    };
  
    const sliderNavSettings = {
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: mainSliderRef.current,
      focusOnSelect: true,
      arrows: true,
      ref: navSliderRef
    };
  
    return (
      <div className="product-detail-slider-content my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-galler-slide">
                <div className="main">
                  <div className='mainSliderRef'>
                  <Slider {...sliderSettings} className="slider slider-for">
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <div key={index}>
                        <img src={product1} alt="Product" />
                      </div>
                    ))}
                  </Slider>
                  </div>
  
                  <div className='navSliderRef'>
                  <Slider {...sliderNavSettings} className="slider slider-nav">
                    {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
                      <div key={index}>
                        <img src={product1} alt="Thumbnail" />
                      </div>
                    ))}
                  </Slider>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="col-lg-5">
              <div className="product-description">
                <h5>Delivery Champ Magma Insulated Water Stain Repellent Food Pizza Delivery Bag</h5>
                {/* <div className="d-flex align-items-center">
                  <span className="rating-stars"><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStar}/><FontAwesomeIcon icon={faStarHalf}/></span>
                  
                </div> */}
                <div className="my-3">
                  <div className="rating d-flex align-items-center ">
                    {[...Array(Math.floor(4))].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className='star-rating' />
                    ))}
                    {.5 % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfAlt} className='star-rating'/>}
                    <span className="ms-2 rating-test d-flex align-items-center">4.7 Star Rating <pre className='mb-0'>(1,671 Users)</pre></span>  
                  </div>
                </div>
                <div className="mt-2">
                  <span className="fw-bold fs-4 Pricing"> ₹ 900</span>
                  <span className="text-decoration-line-through text-muted ms-2">₹909.00</span>
                  <span className="discount ms-2">21% OFF</span>
                </div>
                
  
                
  
                <div className="cate-text mt-3">
                  <span className="text-success fw-bold"><b className="text-dark">Availability:</b> In Stock</span>
                </div>
                <div className="cate-text mt-3">
                  <span className="text-success fw-bold"><b className="text-dark">Category:</b> Electronics Devices</span>
                </div>
  
                <hr className='my-5' />
                <div className="purchase-btns">
                  <div className="mt-4 d-flex gap-3 align-items-center justify-content-between w-100">
                    <div className="d-flex">
                      <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                      <input type="number" className="form-control text-center mx-2" style={{ width: '50px' }} value={quantity} readOnly />
                      <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                    </div>
                    <button className="btn btn-success w-50">ADD TO CART <FontAwesomeIcon icon={faCartShopping} className='ms-2'/></button>
                    <button className="btn btn-outline-dark w-50">BUY NOW</button>
                  </div>
                </div>
  
                <div className="mt-3 wishlist-sec-prodet d-flex align-items-center gap-3 justify-content-between">
                  <div className="whiashad d-flex align-items-center gap-2">
                    <label><FontAwesomeIcon icon={faHeart}/></label>
                    <input type="checkbox" className="d-none" />
                    <label>Add to Wishlist</label>
                  </div>
  
                  <div className="share-product d-flex align-items-center">
                    <p>Share product: </p>
                    <ul className="d-flex align-items-center gap-2 list-unstyled mb-0 ms-2">
                      <li><FontAwesomeIcon icon={faCopy}/></li>
                      <li><FontAwesomeIcon icon={faFacebook}/></li>
                      <li><FontAwesomeIcon icon={faXTwitter}/></li>
                      <li><FontAwesomeIcon icon={faPinterest}/></li>
                    </ul>
                  </div>
                </div>
  
                <div className="mt-3 Guarantee_Checkout border p-4 bg-light">
                  <span>100% Guarantee Safe Checkout</span>
                  <div className='paymetn-img mt-3'>
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
