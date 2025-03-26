import React from 'react'
import Header from '../../Components/Partials/Header/Header'
import Footer from '../../Components/Partials/Footer/Footer'
import Product_card from '../../Components/Product/Product_card/Product_card'
import Product_filter from '../ProductDetail/Product_filter/Product_filter'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

export default function Product() {
  return (
    <>
        <Header/>

        <section className='All_Products'>
            <div className='container'>
                <div className='row g-5'>
                    <div className='col-lg-3'>
                        <div className='fliterbox my-5'>
                            <Product_filter/>
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        <div className='product-section my-5'>  
                            <div className='feature-product-tile d-flex align-items-center justify-content-between'>
                                <div className='title-box '>
                                    <h2><span>Deals</span>   of the day</h2>
                                </div>
                            </div>                          
                            <Product_card/>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer/>
    </>
  )
}
