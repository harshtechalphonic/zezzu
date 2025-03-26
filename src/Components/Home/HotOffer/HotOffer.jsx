import React from 'react'
import "./HotOffer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function HotOffer() {
  return (
    <section className='Hot_offers'>
        <div className='container'>
            <div className='row justify-content-between align-items-center'>
                <div className='col-lg-5'>
                    <div className='Hot_offer-Content'>
                        <span>Todays Hot Offer</span>
                        <h2>Unlock 50% Off on 
                        Kitchen </h2>
                        <p>Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem.
                        </p>
                        <div className='button-dark mt-4'>
                                    <Link to="/product">SHOP NOW  <FontAwesomeIcon icon={faArrowRightLong    }/></Link>
                        </div>
                    </div>
                </div>
                <div className='col-lg-5'>
                    <div className='Hot_offer-image'>
                        <img src="/Hot_offer.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
