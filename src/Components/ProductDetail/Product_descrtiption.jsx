import React, { useState } from 'react';

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState('Description');

  const handleTabClick = (tab) => setActiveTab(tab);

  const tabContent = () => {
    switch (activeTab) {
      case 'Description':
      case 'Additional information':
      case 'Specification':
      case 'Review':
        return (
          <div className="asdknc-desc mt-4">
            <div className="row">
              <div className="col-lg-6">
                <div className="conte">
                  <h5>Description</h5>
                  <p>The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life. Add to that a stunning Liquid Retina XDR display, the best camera and audio ever in a Mac notebook, and all the ports you need. The first notebook of its kind, this MacBook Pro is a beast. M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users.</p>
                  <p>Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16‑core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.</p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="conte">
                  <h5>Feature</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center gap-3 mb-3"><img src="/Medal.png" alt="Medal" /> Free 1 Year Warranty</li>
                    <li className="d-flex align-items-center gap-3 mb-3"><img src="/Truck.png" alt="Truck" /> Free Shipping & Fast Delivery</li>
                    <li className="d-flex align-items-center gap-3 mb-3"><img src="/Handshake.png" alt="Handshake" /> 100% Money-back Guarantee</li>
                    <li className="d-flex align-items-center gap-3 mb-3"><img src="/Headphones.png" alt="Headphones" /> 24/7 Customer Support</li>
                    <li className="d-flex align-items-center gap-3 mb-3"><img src="/CreditCard.png" alt="Credit Card" /> Secure Payment Method</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="conte">
                  <h5>Shipping Information</h5>
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center gap-3 mb-3">Helps maintain blood sugar levels</li>
                    <li className="d-flex align-items-center gap-3 mb-3">Meets protein and fibre requirements in patients with diabetes</li>
                    <li className="d-flex align-items-center gap-3 mb-3">High in fibre and protein</li>
                    <li className="d-flex align-items-center gap-3 mb-3">Low glycemic index and fat</li>
                  </ul>
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
          {['Description', 'Additional information', 'Specification', 'Review'].map((tab) => (
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
          <p>Level up your workday with the American Tourister Valex Style 2 backpack for both Men and Women. It's sleek and spacious, letting you fit all your meeting notes, office supplies, and more. Equipped with a massive 17-inch laptop compartment, you never have to worry about securing your tech. The Valex Style 2 boasts multiple compartments to keep your essentials neatly stowed, making that morning scramble for your phone or charger a thing of the past. Backed by a 1-year global warranty across 120 countries, the Valex Style 2 is the versatile backpack that keeps up with your busy lifestyle, no matter where your workday takes you.</p>
          <div className="description-imgaas">
            {[1, 2].map((num) => (
              <div className="imgaone mb-5" key={num}>
                <img src={`/dp-${num}.png`} alt={`Product ${num}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
