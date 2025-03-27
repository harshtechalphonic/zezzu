import React, { useState } from 'react';
import './Cart.css';
import Header from '../../Components/Partials/Header/Header';
import Footer from '../../Components/Partials/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const handleIncrement = () => onQuantityChange(item.id, item.quantity + 1);
  const handleDecrement = () => item.quantity > 1 && onQuantityChange(item.id, item.quantity - 1);

  return (
    <div className="card mb-3 p-3">
      <div className="d-flex align-items-center gap-4">
        <div className='cartitem_img'>
          <img src={item.image} alt={item.name} className="img-fluid" />
        </div>
        <div className="cartitem_content">
          <h5>{item.name}</h5>
          <div className="price_ing d-flex align-items-center">
            <h5>₹{(item.price * item.quantity).toFixed(2)}</h5>
            <p className="slashPrice">₹ {item.slashPrice} </p>
          </div>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary btn-sm" onClick={handleDecrement}>-</button>
            <input className="form-control mx-2" style={{ width: '50px' }} value={item.quantity} readOnly />
            <button className="btn btn-outline-secondary btn-sm" onClick={handleIncrement}>+</button>
          </div>
        </div>
        <button className="btn btn-outline-danger remove_btn" onClick={onRemove}><FontAwesomeIcon icon={faTrashAlt}/></button>
      </div>
    </div>
  );
};

export default function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Massager A', image: '/rec-3.png', price: 234.99, slashPrice: 324.99, quantity: 1 },
    { id: 2, name: 'Massager B', image: '/rec-1.png', price: 13.99, slashPrice: 80.12, quantity: 1 },
    { id: 3, name: 'Massager C', image: '/rec-1.png', price: 1.99, slashPrice: 10.12, quantity: 1 },
  ]);

  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponMessageColor, setCouponMessageColor] = useState('');

  const handleQuantityChange = (id, newQuantity) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemove = (id) => setItems(items.filter((item) => item.id !== id));

  const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const discount = isCouponApplied ? 180 : 0;
  const tax = subTotal * 0.18;
  const total = subTotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT180') {
      setIsCouponApplied(true);
      setCouponMessage('Coupon Applied! ₹180 discount added.');
      setCouponMessageColor('green');
    } else {
      setCouponMessage('Invalid Coupon Code!');
      setCouponMessageColor('red');
    }
  };

  return (
    <>
      <Header/>
      <div className='breadcrum_box mt-2'>
        <nav aria-label="breadcrumb">
          <div className="container">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/home" className='d-flex align-items-center gap-2'>
                  <FontAwesomeIcon icon={faHouse} style={{fontSize:"14px",marginTop:"-4px"}} /> Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </div>
        </nav>
      </div>
      <section className='cart_section mt-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className="col-lg-6 col-md-8">
              <div className="Cart_sect-box">
                <h4 className='mb-3'>Cart ({items.length} items)</h4>
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={() => handleRemove(item.id)}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="Checkout_box p-4 mt-5" style={{ maxWidth: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
                <h5 className="mb-4">The total amount of</h5>
                <div className="list-box d-flex justify-content-between mb-2">
                  <span>Sub-total</span>
                  <span>₹{subTotal.toFixed(2)}</span>
                </div>
                <div className="list-box d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="list-box d-flex justify-content-between mb-2">
                  <span>Discount</span>
                  <span>₹{discount.toFixed(2)}</span>
                </div>
                <div className="list-box d-flex justify-content-between mb-3">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="list-box d-flex justify-content-between mb-4">
                  <h5>Total</h5>
                  <h5>₹{total.toFixed(2)}</h5>
                </div>
                <button className="btn btn-primary w-100 rounded-0 py-2">PROCEED TO CHECKOUT →</button>
              </div>
              <div className='discount_box'>
                <h5>Have a Coupon?</h5>
                <div className="mb-3">
                <input 
                  type="text" 
                  className='form-control mb-2' 
                  placeholder='Enter coupon code' 
                  value={coupon} 
                  onChange={(e) => setCoupon(e.target.value)} 
                />
                <span className='message_show' style={{ color: couponMessageColor }}>{couponMessage}</span>
                </div>
                <button className='btn btn-primary' onClick={applyCoupon}>Apply Coupon</button>
              </div>
            </div>
          </div>
          <div className='continueshop_btn my-5'>
            <div className='row'>
              <div className='offset-lg-1 col-lg-11 col-md-12'><Link to="/product">Continue Shopping</Link></div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
