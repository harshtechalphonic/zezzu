import React from 'react'
import './Contact.css'
import Header from '../../Components/Partials/Header/Header'
import Footer from '../../Components/Partials/Footer/Footer'
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <>
        <Header/>

        <section className='contact_sec my-5'>
            <div className='container'>
                <div className='title text-center'>
                    <h2><span>Get</span> In Touch</h2>
                </div>

                <div className='row justify-content-around mt-5 pt-4'>
                    <div className='col-lg-5 mb-4'>
                        <div className='contact_form'>
                            <form action="">
                                <h3>Leave us a message</h3>
                                <div className='row'>
                                    <div className='col-lg-12 mb-3'>
                                        <label className='form-label' for="Name"> Name</label>
                                        <input type='text'  id='Name' className='form-control' placeholder=' Name' />
                                    </div>
                                    <div className='col-lg-12 mb-3'>
                                        <label className='form-label' for="Phone">Phone Number</label>
                                        <input type='text' id='Phone' className='form-control'     placeholder='Phone Number' />
                                    </div>                                    
                                    <div className="col-lg-12 mb-3">
                                        <label for="Message" className="form-label">Message</label>
                                        <textarea className="form-control" id="Message" rows="9" placeholder='Describe your requirement here..'></textarea>
                                    </div>
                                    <div className='col-lg-12 mb-3'>
                                        <input type='submit' className='form-control send_message' value="Send Message" />
                                    </div>  
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-lg-5  mb-4'>
                        <div className='contact_content pe-5 mb-5'>
                            <h1>Contact Us</h1>
                            <p>Give us a call or drop by anytime, we endeavour to answer all enquiries within 24 hours on business days. We will be happy to answer your questions.</p>
                        </div>

                        <div className="contact_box d-flex align-items-top  mb-4  ">
                            <div className='conten_img'>
                                <img src="/address-marker.png" alt="" />
                            </div> 
                            <div className='contne-rignt'>
                                <h4>Address</h4>
                                <p>203 C Block Sector 63, Noida Uttar Pradesh 201301</p>
                            </div>
                        </div>

                        <div className="contact_box d-flex align-items-top  mb-4">
                            <div className='conten_img'>
                                <img src="/t-call.png" alt="" />
                            </div> 
                            <div className='contne-rignt'>
                                <h4>Call Us</h4>
                                <p><Link to="#!">07942790587</Link></p>
                            </div>
                        </div>

                        <div className="contact_box d-flex align-items-top  mb-4">
                            <div className='conten_img'>
                                <img src="/address-marker.png" alt="" />
                            </div> 
                            <div className='contne-rignt'>
                                <h4>E-mail Us</h4>
                                <p><Link to="#!">info@zezzu.com</Link></p>
                            </div>
                        </div>


                    </div>
                </div>


            </div>
        </section>


        <Footer/>
    </>
  )
}
