import React, { useState } from 'react';
import './Wishlist.css';
import Header from '../../Components/Partials/Header/Header';
import Footer from '../../Components/Partials/Footer/Footer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function Wishlist() {
  const [products, setProducts] = useState([
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
      
  ]);

  const toggleWishlist = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <>
      <Header wishlistCount={products.length} />
      <div className='wishlist-box my-5'>
        <div className='container'>
          <h2>Wishlist</h2>
          <div className='row Product_card'>
            {products.map((product) => (
              <div key={product.id} className='col-lg-3 col-md-6 col-sm-6 mb-3'>
                <div className="feature-card">
                  <span className="disco">{product.discount}</span>
                  <span className="wishicon" onClick={() => toggleWishlist(product.id)} style={{ cursor: 'pointer' }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                  <Link to={product.link}>
                    <div className="card-img">
                      <img src={product.image} alt={product.title} />
                    </div>
                  </Link>
                  <h3><Link to={product.link}>{product.title}</Link></h3>
                  <div className="rating">
                    {[...Array(Math.floor(product.rating))].map((_, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
                    {product.rating % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfAlt} />}
                  </div>
                  <p>₹ {product.price}</p>
                  <a href="/cart" className="cart-btn">Add to Cart <FontAwesomeIcon icon={faBagShopping} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}
