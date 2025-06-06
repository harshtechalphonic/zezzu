import React from 'react'
import Header from '../../Components/Partials/Header/Header'
import Footer from '../../Components/Partials/Footer/Footer'
import TcpprcApi from '../../API/TcpprcApi'
import { useSelector } from 'react-redux';
import ScrollToTop from '../ScrollToTop';

export default function TermCondition_vendor() {
    const tcpprc = useSelector((store) => store.Tcpprc); 
  return (
    <>
    <ScrollToTop/>
        <Header/>
        <TcpprcApi/>

        <div className='term-Conditons_sec my-5'>
        <div className='container'>
          <div className='term_tiles'>            
            {!tcpprc.status ? (
                <div>
                <div className="placeholder-glow">
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-8"></span>
                  <span className="placeholder col-5"></span>
                </div>
              </div>
            ) : (
                <>
                    <h1>{ tcpprc.data.terms_condition_vendor.title || 'Terms and Conditions'}</h1>
                    <div dangerouslySetInnerHTML={{ __html: tcpprc.data.terms_condition_vendor.content }} />
                </>
          )}
          </div>
        </div>
      </div>

        <Footer/>
    </>
  )
}
