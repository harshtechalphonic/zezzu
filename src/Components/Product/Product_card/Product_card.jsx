import React, { useState } from 'react';
import './Product_card.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faStar, faStarHalfAlt, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';

const products = [
  {
    id: 1,
    discount: "-20%",
    image: "/Product4.png",
    title: "Porem",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 2,
    discount: "-20%",
    image: "/Product2.png",
    title: "Fab Breeze™ Personal Air Cooler & Humidifier",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 3,
    discount: "-20%",
    image: "/PersonalCare.png",
    title: "Jorem",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 4,
    discount: "-20%",
    image: "/DealDay2.png",
    title: "Porem",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 5,
    discount: "-20%",
    image: "/rec-1.png",
    title: "Organic India Ashwagandha Ayurvedic .....",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 6,
    discount: "-20%",
    image: "/Sim-2.png",
    title: "Butterfly Mini Body Massager",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 7,
    discount: "-20%",
    image: "/rec-3.png",
    title: "Professionals Design Perfect Hair",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 8,
    discount: "-20%",
    image: "/PersonalCare.png",
    title: "Premium Posture Corrector",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 9,
    discount: "-20%",
    image: "/DealDay2.png",
    title: " Lighting",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 10,
    discount: "-20%",
    image: "/PersonalCare.png",
    title: "Colgate Maxfresh with Cooling Crystals.....",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 11,
    discount: "-20%",
    image: "/DealDay2.png",
    title: "Epitome Lighting",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  },
  {
    id: 12,
    discount: "-20%",
    image: "/PersonalCare.png",
    title: "Mini USB Chopper (Rechargeable)",
    rating: 4.5,
    reviews: 12,
    price: 212,
    slashPrice: 312,
    link: "/product-detail"
  }
];

export default function Product_card() {
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className='row Product_card'>
      {products.map((product) => (
        <div key={product.id} className='col-lg-3 col-md-6 col-sm-6 mb-3'>
          <div className="feature-card">
            <span className="disco">{product.discount}</span>
            <span className="wishicon" onClick={() => toggleWishlist(product.id)} style={{ cursor: 'pointer', fontSize: '16px' }}>
              <FontAwesomeIcon icon={wishlist[product.id] ? faSolidHeart : faRegularHeart} color={wishlist[product.id] ? "red" : "black"} />
            </span>
            <Link to={product.link}>
              <div className="card-img">
                <img src={product.image} alt={product.title} />
              </div>
            </Link>
            <div className="product-detail">
              <h3><Link to={product.link}>{product.title}</Link></h3>
              <div className="rating d-flex align-items-center">
                {[...Array(Math.floor(product.rating))].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
                {product.rating % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfAlt} />}
                <span>({product.reviews})</span>
              </div>
              <div className="Pricing d-flex align-items-center">
                <p className="price">₹ {product.price}</p>
                <p className="slashPrice">₹ {product.slashPrice}</p>
              </div>
            </div>
            <a href="/cart" className="cart-btn">Add to Cart <FontAwesomeIcon icon={faBagShopping} className="ms-2" /></a>
          </div>
        </div>
      ))}
    </div>
  );
}
