import { faBarsStaggered, faCartShopping, faCodeCompare, faHeart, faLocationDot, faPhoneVolume, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Header.css'
import  logo from '../../../assets/zezzu.png'

export default function Header() {
  return (
    <section className='Header'>
            <div className="infobox">
                <div className="container">
                    <ul className="list-unstyled d-flex  align-items-center justify-content-between mb-0">
                        <li className='d-flex align-items-center flex-wrap justify-content-sm-between gap-lg-5 gap-md-4 gap-2'>
                            <a href="#!"><i className='me-2'><FontAwesomeIcon icon={faLocationDot}/></i> Store location </a>
                            <a href="#!"><i className='me-2'><FontAwesomeIcon icon={faPhoneVolume}/></i>  +91 95974 95674 </a>
                        </li>
                        <li className='d-flex align-items-center flex-wrap justify-content-sm-between gap-lg-5 gap-md-4 gap-2'>                            
                            <a href="#!"><i className='me-2'> <FontAwesomeIcon icon={faUser}/></i> My account</a>
                            <a href="#!"><i className='me-2'> <FontAwesomeIcon icon={faUser}/></i> Become a seller</a>
                        </li>
                    </ul>
                </div>
            </div>
        <div className='container'>
            <div className='logo-serach d-flex align-items-center justify-content-between py-3'>
                <div className='brand-name'>
                    <a href="#!">
                        <img src={logo} alt="" />
                    </a>
                </div>

                <div className='searchbar-category-barr d-flex align-items-center justify-content-center w-100'>
                    <button className='me-4'><FontAwesomeIcon className='me-2' icon={faBarsStaggered}/>All Categories</button>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="What are you looking for?" aria-label="What are you looking for?" aria-describedby="basic-addon2"/>
                        <span className="input-group-text" id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></span>
                    </div>
                </div>

                <div className='logo-cartbox'>
                    <ul className='list-unstyled d-flex gap-3 mb-0'>
                        <li><a href="#!"><FontAwesomeIcon icon={faHeart}/></a></li>
                        <li><a href="#!"><FontAwesomeIcon icon={faCartShopping}/></a></li>
                    </ul>
                </div>

            </div>
        </div>
        <div className='menu-box'>
            <ul className='d-flex align-items-center list-unstyled justify-content-center mb-0'>
                <li><a href="#!" className='active'>Home</a></li>
                <li><a href="#!">Kitchen</a></li>
                <li><a href="#!">Clothing</a></li>
                <li><a href="#!">Personal Care</a></li>
                <li><a href="#!">About Us</a></li>
                <li><a href="#!">Contact Us</a></li>
                <li><a href="#!">Track Order</a></li>
            </ul>
        </div>
    </section>
  )
}
