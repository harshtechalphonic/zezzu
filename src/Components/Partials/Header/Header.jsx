import { faBarsStaggered, faCartShopping, faCog, faEnvelope, faHeart, faLocationDot, faPhoneVolume, faQuestionCircle, faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import logo from '../../../assets/zezzu.png';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

export default function Header({ wishlistCount }) {
  const [show, setShow] = useState(false);    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
  
    const toggleDropdown = () => setShowDropdown(!showDropdown);
  
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


    // pop up  code is here  start

    const [Advshow, setAdvShow] = useState(false);
      let timer;
    
      const AdvClose = () => setAdvShow(false);
      const AdvShow = () => setAdvShow(true);
    
      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(AdvShow, 8000);
      };
    
      useEffect(() => {
        const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    
        const eventHandler = () => resetTimer();
        events.forEach(event => window.addEventListener(event, eventHandler));
    
        resetTimer();
    
        return () => {
          events.forEach(event => window.removeEventListener(event, eventHandler));
          clearTimeout(timer);
        };
      }, []);
    // pop up  code is here  end



    // all category code here start 

    const [showCategoriesDropdown, setshowCategoriesDropdown] = useState(false);
    const dropdownCategoriesRef = useRef(null);
  
    const toggleCategoriesDropdown = () => setshowCategoriesDropdown(!showCategoriesDropdown);
  
    const handleCategoriesClickOutside = (e) => {
      if (dropdownCategoriesRef.current && !dropdownCategoriesRef.current.contains(e.target)) {
        setshowCategoriesDropdown(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleCategoriesClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleCategoriesClickOutside);
      };
    }, []);

       // all category code here end 
  return (
    <>
    <section className='Header'>
      <div className="infobox">
        <div className="container">
          <ul className="list-unstyled d-flex align-items-center justify-content-between mb-0">
            <li className='d-flex align-items-center flex-wrap gap-lg-5 gap-md-4 gap-2'>
              <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faLocationDot}/></i> Store location</Link>
              <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faPhoneVolume}/></i> +91 95974 95674</Link>
            </li>
            <li className='d-flex align-items-center flex-wrap gap-lg-5 gap-md-4 gap-2 text-lg-start text-end'>                            
              {/* <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faUser}/></i> My account</Link> */}
              <div className='account-dropdown position-relative ' ref={dropdownRef}>
                <Link to="#!" onClick={toggleDropdown}><i className='me-2'><FontAwesomeIcon icon={faUser}/></i> My account</Link>
                {showDropdown && (
                  <div className="dropdown-menu show position-absolute custom-dropdown ">
                    <ul className='list-unstyled'>
                      <li><Link to="/login"><FontAwesomeIcon icon={faUser}/> Login</Link></li>
                      <li><Link to="/profile"><FontAwesomeIcon icon={faUser}/> Profile</Link></li>
                      <li><Link to="/inbox"><FontAwesomeIcon icon={faEnvelope}/> Inbox</Link></li>
                      <li><Link to="/settings"><FontAwesomeIcon icon={faCog}/> Settings</Link></li>
                      <li><Link to="/help"><FontAwesomeIcon icon={faQuestionCircle}/> Help</Link></li>
                      <li><Link to="/logout"><FontAwesomeIcon icon={faSignOutAlt}/> Sign Out</Link></li>
                    </ul>
                  </div>
                )}
              </div>
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
           <div className=' position-relative'>
           <button className='ms-4' onClick={toggleCategoriesDropdown}>
              <FontAwesomeIcon className='me-2' icon={faBarsStaggered}/>All Categories
            </button>
            {showCategoriesDropdown && (
              <div className='dropdown-menu show position-absolute custom-dropdown' ref={dropdownCategoriesRef}>
                <ul className='list-unstyled'>
                  <li>Phoenix Baker</li>
                  <li>Olivia Rhye</li>
                  <li>Lana Steiner</li>
                  <li>Demi Wilkinson</li>
                  <li>Candice Wu</li>
                  <li>Natali Craig</li>
                </ul>
              </div>
            )}
           </div>
            <div className="input-group">
              <input type="text" className="form-control" placeholder="What are you looking for?" aria-label="Search" />
              <span className="input-group-text">
                <FontAwesomeIcon icon={faSearch}/>
              </span>
            </div>
          </div>

          <div className='logo-cartbox'>
            <ul className='list-unstyled d-flex gap-3 mb-0'>
              <li>
                <Link to="/wishlist">
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
                  {wishlistCount > 0 && <span className="wishlist-count">{wishlistCount}</span>}
              </li>
              <li><Link to="/cart"><FontAwesomeIcon icon={faCartShopping}/></Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='menu-box desktop'>
        <ul className='d-flex align-items-center list-unstyled justify-content-center mb-0'>
          <li><Link to="/" className='active'>Home</Link></li>
          <li><Link to="/product">Kitchen</Link></li>
          <li><Link to="/product">Clothing</Link></li>
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
              <li><Link to="/product">Clothing</Link></li>
              <li><Link to="/product">Personal Care</Link></li>
              <li><Link to="#!">About Us</Link></li>
              <li><Link to="#!">Contact Us</Link></li>
              <li><Link to="#!">Track Order</Link></li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </section>
     {/* pop up  code is here  start */}
    <div className={`modal ${Advshow ? 'd-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Advertisement Banner</h5>
              <button type="button" className="btn-close" onClick={AdvClose}></button>
            </div>
            <div className="modal-body">
              <p>You have been inactive for 8 seconds! when we don't perform and event</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={AdvClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {Advshow && <div className="modal-backdrop fade show">
        </div>}
         {/* pop up  code is here  end */}
    </>
  )
}
