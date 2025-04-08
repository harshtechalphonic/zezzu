import React, { useEffect, useState } from 'react';
import Header from '../../Components/Partials/Header/Header';
import Footer from '../../Components/Partials/Footer/Footer';
import axios from 'axios';

export default function Privacy_policy() {
  const [privacyContent, setPrivacyContent] = useState('');
  const [privacyTitle, setPrivacyTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const response = await axios.get('http://demotechalphonic.site/multivendor/api/static-page');
        const pagesObject = response.data;
        console.log(response);

        const pages = Object.values(pagesObject).filter(item => typeof item === 'object' && item.title);

        const privacyPage = pages.find(page => page.title === 'Privacy Policy');
        if (privacyPage) {
          setPrivacyTitle(privacyPage.title);
          setPrivacyContent(privacyPage.content);
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
            <h1>{privacyTitle || 'Privacy Policy'}</h1>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: privacyContent }} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
