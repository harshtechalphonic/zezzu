import React from 'react'
import './MultiBanners.css'
import { Link } from 'react-router-dom'
export default function MultiBanners() {
  return (
    <section className='multibanner '>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-7'>
                    <Link to="/product">
                        <div className='banner-left'>
                            <div className='row align-items-center'>
                                <div className='col-lg-7 col-md-7'>
                                        <div className='banner-left-content'>
                                            <span>20% OFF</span>
                                            <h2>Brown Printed Cotton 
                                            Kurta and Skirt Set</h2>
                                            <p>Norem ipsum dolor sit amet,Norem ipsum dolor sit amet,Norem ipsum dolor sit amet,</p>
                                            <div className="Pricing ">
                                                <p className="slashPrice">₹478.00 </p>
                                                <p className="price">₹378.00 </p>
                                                </div>
                                        </div>
                                </div>
                                <div className='col-lg-5  col-md-5 '>
                                    <div className='banner-left-img'>
                                        <img src="/multibannerbig.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-5'>
                    <div className='banners-right'>
                        <div className='banner-right-one'>
                            <Link to="/product">
                                <div className='row align-items-center'>
                                    <div className='col-lg-7  col-md-7'>
                                        <div className='banner-right-content'>
                                            <span>20% OFF</span>
                                            <h3>Jorem ipsum dolor </h3>
                                            <div className="Pricing ">
                                                <p className="slashPrice">₹478.00 </p>
                                                <p className="price">₹378.00 </p>
                                                </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-5  col-md-5'>
                                        <div className='banner-right-img'>
                                            <img src="/multibanner1.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='banner-right-one'>
                            <Link to="/product">
                                <div className='row align-items-center'>
                                    <div className='col-lg-7  col-md-7'>
                                        <div className='banner-right-content'>
                                            <span>20% OFF</span>
                                            <h3>Fancy Super Absorbent Floor Mat </h3>
                                            <div className="Pricing ">
                                                <p className="slashPrice">₹478.00 </p>
                                                <p className="price">₹378.00 </p>
                                                </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-5  col-md-5'>
                                        <div className='banner-right-img'>
                                            <img src="/multibanner2.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
