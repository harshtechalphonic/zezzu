import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Tcpprc.css';
import Header from '../../Components/Partials/Header/Header';
import Footer from '../../Components/Partials/Footer/Footer';

export default function TermCondition() {
  const [termsContent, setTermsContent] = useState('');
  const [termsTitle, setTermsTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await axios.get('http://demotechalphonic.site/multivendor/api/static-page');
        const pagesObject = response.data;
        console.log(response)

        const pages = Object.values(pagesObject).filter(item => typeof item === 'object' && item.title);
  
        const termsPage = pages.find(page => page.title === 'Terms & Conditions');
        if (termsPage) {
          setTermsContent(termsPage.content);
          setTermsTitle(termsPage.title);
        }
      } catch (error) {
        console.error('Error fetching terms and conditions:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTerms();
  }, []);
  

  return (
    <>
      <Header />
      <div className='term-Conditons_sec my-5'>
        <div className='container'>
          <div className='term_tiles'>
            <h1>{termsTitle || 'Terms and Conditions'}</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: termsContent }} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
