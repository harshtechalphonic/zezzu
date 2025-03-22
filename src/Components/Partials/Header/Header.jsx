import { faBarsStaggered, faCartShopping, faHeart, faLocationDot, faPhoneVolume, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './Header.css'
import logo from '../../../assets/zezzu.png'
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Header() {
  const [show, setShow] = useState(false);    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className='Header'>
      <div className="infobox">
        <div className="container">
          <ul className="list-unstyled d-flex align-items-center justify-content-between mb-0">
            <li className='d-flex align-items-center flex-wrap gap-lg-5 gap-md-4 gap-2'>
              <a href="#!"><i className='me-2'><FontAwesomeIcon icon={faLocationDot}/></i> Store location</a>
              <a href="#!"><i className='me-2'><FontAwesomeIcon icon={faPhoneVolume}/></i> +91 95974 95674</a>
            </li>
            <li className='d-flex align-items-center flex-wrap gap-lg-5 gap-md-4 gap-2 text-lg-start text-end'>                            
              <a href="#!"><i className='me-2'><FontAwesomeIcon icon={faUser}/></i> My account</a>
              <a href="#!"><i className='me-2'><FontAwesomeIcon icon={faUser}/></i> Become a seller</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='container'>
        <div className='logo-serach d-flex align-items-center justify-content-between py-3'>
          <div className='brand-name'>
            <a href="#!">
              <img src={logo} alt="Logo" />
            </a>
          </div>

          <div className='searchbar-category-barr d-flex align-items-center justify-content-center w-100'>
            <button className='ms-4 touggle-btn' onClick={handleShow}>
              <FontAwesomeIcon icon={faBarsStaggered}/>
            </button>
            <button className='ms-4'>
              <FontAwesomeIcon className='me-2' icon={faBarsStaggered}/>All Categories
            </button>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="What are you looking for?" aria-label="Search" />
              <span className="input-group-text">
                <FontAwesomeIcon icon={faSearch}/>
              </span>
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

      <div className='menu-box desktop'>
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

      {/* Offcanvas Section */}
      <Offcanvas show={show} onHide={handleClose} className="mobsideMenu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
                <div className='brand-name'>
                    <a href="#!">
                        <img src={logo} alt="Logo" />
                    </a>
                </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='menu-box'>
        <ul className='d-flex flex-wrap align-items-center list-unstyled justify-content-center mb-0'>
          <li><a href="#!" className='active'>Home</a></li>
          <li><a href="#!">Kitchen</a></li>
          <li><a href="#!">Clothing</a></li>
          <li><a href="#!">Personal Care</a></li>
          <li><a href="#!">About Us</a></li>
          <li><a href="#!">Contact Us</a></li>
          <li><a href="#!">Track Order</a></li>
        </ul>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  )
}
