import React, { useEffect, useState } from 'react';
import Header from '../../Components/Partials/Header/Header';
import Footer from '../../Components/Partials/Footer/Footer';
import axios from 'axios';


export default function Return_policy() {
    const [returnContent, setreturnContent] = useState('');
    const [returnTitle, setreturnTitle] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPrivacy = async () => {
        try {
          const response = await axios.get(`${config.API_URL}/static-page`);
          const pagesObject = response.data;
          console.log(response);
  
          const pages = Object.values(pagesObject).filter(item => typeof item === 'object' && item.title);
  
          const privacyPage = pages.find(page => page.title === 'Return Policy');
          if (privacyPage) {
            setreturnTitle(privacyPage.title);
            setreturnContent(privacyPage.content);
          }
        } catch (error) {
          console.error('Error fetching privacy policy:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPrivacy();
    }, []);

  return (
    <>
          <Header />
          <div className='term-Conditons_sec my-5'>
            <div className='container'>
              <div className='term_tiles'>
                <h1>{returnTitle || 'Privacy Policy'}</h1>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: returnContent }} />
                )}
              </div>
            </div>
          </div>
          <Footer />
        </>
  )
}
