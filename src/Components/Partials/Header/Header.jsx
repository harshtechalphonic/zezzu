import { faBarsStaggered, faCartShopping, faHeart, faLocationDot, faPhoneVolume, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import './Header.css'
import logo from '../../../assets/zezzu.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom'

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
              <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faLocationDot}/></i> Store location</Link>
              <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faPhoneVolume}/></i> +91 95974 95674</Link>
            </li>
            <li className='d-flex align-items-center flex-wrap gap-lg-5 gap-md-4 gap-2 text-lg-start text-end'>                            
              <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faUser}/></i> My account</Link>
              <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faUser}/></i> Become a seller</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='container'>
        <div className='logo-serach d-flex align-items-center justify-content-between py-3'>
          <div className='brand-name'>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
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
              <li><Link to="#!"><FontAwesomeIcon icon={faHeart}/></Link></li>
              <li><Link to="/cart"><FontAwesomeIcon icon={faCartShopping}/></Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='menu-box desktop'>
        <ul className='d-flex align-items-center list-unstyled justify-content-center mb-0'>
          <li><Link to="/" className='active'>Home</Link></li>
          <li><Link to="/product">Kitchen</Link></li>
          <li><Link tp="/product">Clothing</Link></li>
          <li><Link to="/product">Personal Care</Link></li>
          <li><Link to="#!">About Us</Link></li>
          <li><Link to="#!">Contact Us</Link></li>
          <li><Link to="#!">Track Order</Link></li>
        </ul>
      </div>

      {/* Offcanvas Section */}
      <Offcanvas show={show} onHide={handleClose} className="mobsideMenu">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
                <div className='brand-name'>
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='menu-box'>
        <ul className='d-flex flex-wrap align-items-center list-unstyled justify-content-center mb-0'>
        <li><Link to="/" className='active'>Home</Link></li>
          <li><Link to="/product">Kitchen</Link></li>
          <li><Link tp="/product">Clothing</Link></li>
          <li><Link to="/product">Personal Care</Link></li>
          <li><Link to="#!">About Us</Link></li>
          <li><Link to="#!">Contact Us</Link></li>
          <li><Link to="#!">Track Order</Link></li>
        </ul>
      </div>
        </Offcanvas.Body>
      </Offcanvas>
    </section>
  )
}
