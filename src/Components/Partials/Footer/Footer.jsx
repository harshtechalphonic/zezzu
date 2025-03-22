import React from 'react'
import './Footer.css'
import  logo from '../../../assets/zezzu.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPaperPlane, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faInstagram, faLinkedin, faTwitter, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'


export default function Footer() {
  return (
    <section className="Footer">
                <div className="container">
                    <div className='footer-content '>
                        <div className='row menubox-footer '>
                            <div className='col-lg-3'>
                                <div className='footer-brand pe-lg-5 pe-md-4 pe-0'>
                                    <div className='brand-logo mb-4'>
                                        <a href="#!">
                                            <img src={logo} alt="" />
                                        </a>
                                    </div>
                                       <h3>Let's talk</h3>
                                        <p className='mb-0'>Shoot us an email and we will get back to
                                        you within 24 business hrs</p>
                                        <p className='mb-0'>Email us at: <a href="mailto:-customercare@uppercase.co.in">customercare@uppercase.co.in</a></p>
                                        <p className='mb-0'>Phone Number: <a href="tele:-+91 8691 800 800">+91 8691 800 800</a></p>

                                        <h3 className='mt-4'>Follow our </h3>
                                        <p className='mb-0'>Get exclusive offers, a heads up on new ecopacks
                                        and a tribe of eco-influencers.</p>
                                                <div className='social-links mt-3'>
                                                    <ul className='list-unstyled d-flex gap-3'>
                                                        <li><a href="#!"><FontAwesomeIcon icon={faFacebookF}/></a></li>
                                                        <li><a href="#!"><FontAwesomeIcon icon={faInstagram}/></a></li>
                                                        <li><a href="#!"><FontAwesomeIcon icon={faXTwitter}/></a></li>
                                                        <li><a href="#!"><FontAwesomeIcon icon={faLinkedin}/></a></li>
                                                    </ul>
                                                </div>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 mt-5'>
                                <div className='menu-box'>
                                    <h4>Quick Links</h4>
                                    <ul className='list-unstyled mt-4'>
                                        <li><a href="#!">Home</a></li>
                                        <li><a href="#!">About Us</a></li>
                                        <li><a href="#!">Our Products</a></li>
                                        <li><a href="#!">Track Orders</a></li>
                                        <li><a href="#!">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 mt-5'>
                                <div className='menu-box'>
                                    <h4>Our Brand</h4>
                                    <ul className='list-unstyled mt-4'>
                                        <li><a href="#!">Apple</a></li>
                                        <li><a href="#!">Samsung</a></li>
                                        <li><a href="#!">Amazon</a></li>
                                        <li><a href="#!">Coca-Cola</a></li> 
                                        <li><a href="#!">Nike</a></li> 
                                    </ul>
                                </div>
                            </div>
                            <div className='col-lg-3 col-md-4 mt-5'>
                                <div className='menu-box'>
                                    <h4>Categories</h4>
                                    <ul className='list-unstyled mt-4'>
                                        <li><a href="#!">Personal Care </a></li>
                                        <li><a href="#!">Kitchen</a></li>
                                        <li><a href="#!">Clothing</a></li>
                                        <li><a href="#!">Electronic</a></li>
                                        <li><a href="#!">Qorem</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <div className="container">
                        <div className='d-flex justify-content-evenly'>
                                <div className='copytext'>
                                    <p className='mb-0'>Copyright © 2025 Tech Alphonic.All Rights Reserved.</p>
                                </div>
                                {/* <div className='Payemt-img'>
                                   <img src={paymetOpt} alt="" />
                                </div> */}
                        </div>
                    </div>
                </div>
        </section>
  )
}
