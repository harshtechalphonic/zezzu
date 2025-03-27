import React, { useState } from 'react'
import './Cart.css'

import Header from '../../Components/Partials/Header/Header'
import Footer from '../../Components/Partials/Footer/Footer'


const CartItem = ({ item, onRemove, onMoveToWishlist }) => {
    const [quantity, setQuantity] = useState(1);
  
    const handleIncrement = () => setQuantity(quantity + 1);
    const handleDecrement = () => {
      if (quantity > 1) setQuantity(quantity - 1);
    };
  
    return (
      <div className="card mb-3 p-3">
        <div className="row justify-content-between">
          <div className="col-md-3">
            <img src={item.image} alt={item.name} className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h5>{item.name}</h5>
            {item.powerConsumption && <p>Power Consumption: <button className="btn btn-outline-primary btn-sm">{item.powerConsumption}</button></p>}
            <button className="btn btn-outline-danger" onClick={onRemove}>🗑 Remove Item</button>
            <button className="btn btn-outline-secondary ms-2" onClick={onMoveToWishlist}>💖 Move To Wish List</button>
          </div>
          <div className='col-md-3 d-block justify-content-end align-items-center '>
          <div className=" d-flex align-items-center">
            <button className="btn btn-outline-secondary btn-sm" onClick={handleDecrement}>-</button>
            <input className="form-control mx-2" style={{ width: '50px' }} value={quantity} readOnly />
            <button className="btn btn-outline-secondary btn-sm" onClick={handleIncrement}>+</button>
          </div>
          <div className=" d-flex align-items-center justify-content-end">
            <h5>₹{item.price.toFixed(2)}</h5>
          </div>
          </div>
        </div>
      </div>
    );
  };

export default function Cart() {
    const items = [
        { id: 1, name: 'Clefairy Massager For Neck&Shoulder With Heat', image: '/rec-3.png', price: 170.99 },
        { id: 2, name: 'Clefairy Massager For Neck&Shoulder With Heat', image: '/rec-1.png', price: 170.99, powerConsumption: '5 W' },
      ];
    
    //   const handleRemove = (id) => alert(`Item ${id} removed`);
    //   const handleMoveToWishlist = (id) => alert(`Item ${id} moved to wishlist`);

      const subTotal = 909;
      const shipping = 0;
      const discount = 909;
      const tax = 909;
      const total = subTotal + shipping + tax - discount;
    
      return (
        <>
            <Header/>

            <section className='cart_section mt-5'>
                <div className='container'>
                    <div className='row justify-content-between'>
                        <div className="col-lg-7">
                            <div className="Cart_sect-box">
                                <h4>Cart ({items.length} items)</h4>
                                {items.map(item => (
                                    <CartItem key={item.id} item={item} onRemove={() => handleRemove(item.id)} onMoveToWishlist={() => handleMoveToWishlist(item.id)} />
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4">
                        <div className="Checkout_box p-4" style={{ maxWidth: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
                            <h5 className="mb-4">The total amount of</h5>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Sub-total</span>
                                <span>₹{subTotal}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2">
                                <span>Discount</span>
                                <span>₹{discount}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax</span>
                                <span>₹{tax}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <h5>Total</h5>
                                <h5>₹{total.toFixed(3)}</h5>
                            </div>
                            <button className="btn btn-primary w-100">PROCEED TO CHECKOUT →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            

            <Footer/>
        </>
        
      );
    };
