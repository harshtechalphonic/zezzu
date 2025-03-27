import React, { useState } from 'react';
import './Wishlist.css';
import Header from '../../Components/Partials/Header/Header';
import Footer from '../../Components/Partials/Footer/Footer';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHouse, faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

export default function Wishlist() {
  const [products, setProducts] = useState([
    {
        id: 1,
        discount: "-20%",
        image: "/Product4.png",
        title: "Porem",
        rating: 4.5,
        reviews: 1,
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
        reviews:9,
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
        reviews: 2,
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
        reviews: 11,
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
        reviews: 13,
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
        reviews: 3,
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
        reviews: 8,
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
        reviews: 5,
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
          <div className='breadcrum_box mt-2'>
            <nav aria-label="breadcrumb">
              <div className="container">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/home" className='d-flex align-items-center gap-2'>
                      <FontAwesomeIcon icon={faHouse} style={{fontSize:"14px",marginTop:"-4px"}} /> Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">Wishlists</li>
                </ol>
              </div>
            </nav>
          </div>
      <div className='wishlist-box my-5'>
        <div className='container'>
          <div class="cart-title d-flex align-items-center justify-content-center mb-5">
              <h2>Product <span> Wishlist</span></h2>
          </div>
          <div class="wishlistTitle_btn d-flex justify-content-between mb-3">
            <h3 class="uppercase">Wishlist</h3>
          <a  href="product.php">Shop Now</a>
        </div>
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
                  <div className="product-detail">
                    <h3><Link to={product.link}>{product.title}</Link></h3>
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
                    <a href="/cart" className="cart-btn">Add to Cart <FontAwesomeIcon icon={faBagShopping} /></a>
                  </div>
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
