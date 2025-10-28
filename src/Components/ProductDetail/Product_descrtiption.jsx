import React, { useState } from 'react';

export default function ProductDescription({singleProduct}) {
  console.log(singleProduct)
  const [activeTab, setActiveTab] = useState('Description');

  const handleTabClick = (tab) => setActiveTab(tab);

  const tabContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <div className="asdknc-desc mt-4">
            <div className="row">
              <div className="col-12">
                <div className="conte">
                  {/* <h5>Description</h5> */}
                  <div dangerouslySetInnerHTML={{ __html: singleProduct.description}} />
                </div>
              </div>
            </div>
          </div>
        );
      case 'Additional information':
        return (
          <div className="asdknc-desc mt-4">
            <div className="row">
              <div className="col-12">
                <div className="conte">
                  {/* <h5>Description</h5> */}
                  <div dangerouslySetInnerHTML={{ __html: singleProduct.additional_information
}} />
                </div>
              </div>
              
            </div>
          </div>
        );
      case 'Specification':
        return (
          <div className="asdknc-desc mt-4">
            <div className="row">
              <div className="col-12">
                <div className="conte">
                <div dangerouslySetInnerHTML={{ __html: singleProduct.specification}} />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="product-description my-5">
      <div className="container mb-5">
        <ul className="nav nav-tabs" role="tablist">
          {['Description', 'Additional information', 'Specification'].map((tab) => (
            <li className="nav-item" key={tab} role="presentation">
              <button
                className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                onClick={() => handleTabClick(tab)}
                type="button"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
        <div className="tab-content mt-4">{tabContent()}</div>
      </div>
      <div className="container mt-4">
        <div className="descipt-box">
          <h4>Product Description</h4>
          <div dangerouslySetInnerHTML={{ __html: singleProduct.product_description}} />
        </div>
      </div>
    </div>
  );
}
