import { faBarsStaggered, faCartShopping, faCog, faEnvelope, faHeart, faLocationDot, faPhoneVolume, faQuestionCircle, faSearch, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import './Header.css';
import logo from '../../../assets/zezzu.png';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import ProductsApi from "../../../API/ProductsApi";
import WishlistMenu from './WishlistMenu';
import CartMenu from './CartMenu';
import AllCatergory_Filter from './AllCatergory_Filter';


export default function Header() {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  
  let detactWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  useEffect(() => {
    if(localStorage.getItem("wishlist")){
      setWishlistCount(detactWishlist.length);
    }
  }, [detactWishlist]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token); 
}, []);





    // pop up  code is here  start

    const [Advshow, setAdvShow] = useState(false);
      let timer;
    
      const AdvClose = () => setAdvShow(false);
      const AdvShow = () => setAdvShow(true);
    
      const resetTimer = () => {
        clearTimeout(timer);
        timer = setTimeout(AdvShow, 8000000);
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


  // Sticky header functionality
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      };

       useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  return (
    <>
    <section className={`Header ${isSticky ? 'sticky' : ''}`}>
      <ProductsApi />
      <div className="infobox">
        <div className="container">
          <ul className="list-unstyled d-flex align-items-center justify-content-between mb-0">
            <li className='d-flex align-items-center flex-wrap gap-lg-5 gap-md-4 gap-2'>
              <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faLocationDot}/></i> Store location</Link>
              <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faPhoneVolume}/></i> +91 95974 95674</Link>
            </li>
            <li className='d-flex align-items-center flex-wrap gap-lg-5 gap-md-4 gap-2 text-lg-start text-end'>                            
              {/* <Link to="#!"><i className='me-2'><FontAwesomeIcon icon={faUser}/></i> My account</Link> */}
              <div className='account-dropdown position-relative'>
                {isLoggedIn ? (
                  <Link to="/user-account"><i className='me-2'><FontAwesomeIcon icon={faUser} /></i> User Account</Link>
                ) : (
                  <Link to="/login"><i className='me-2'><FontAwesomeIcon icon={faUser} /></i> Login/Register</Link>
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
           <AllCatergory_Filter/>
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
              <WishlistMenu/>
              <CartMenu/>
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
          <li><Link to="/contact-us">Contact Us</Link></li>
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
              <li><Link to="/contact-us">Contact Us</Link></li>
              <li><Link to="#!">Track Order</Link></li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </section>




     {/* pop up  code is here  start */}
    <div className={`modal ${Advshow ? 'd-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
              <button type="button" className="btn-close adv_btn" onClick={AdvClose}></button>
           <img src="/advBanner.png" alt="" />
            
          </div>
        </div>
      </div>
      {Advshow && <div className="modal-backdrop fade show">
        </div>}
         {/* pop up  code is here  end */}
    </>
  )
}
