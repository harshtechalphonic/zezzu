
import React, { useState } from 'react';
import './Product_filter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';


export default function ProductFilter() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(7500);
  
    const handleMinChange = (e) => {
      const value = Math.min(Number(e.target.value), maxPrice - 100);
      setMinPrice(value);
    };
  
    const handleMaxChange = (e) => {
      const value = Math.max(Number(e.target.value), minPrice + 100);
      setMaxPrice(value);
    };



    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    const categoriesData = [
        { name: 'All', subcategories: [] },
        { name: 'Kitchen', subcategories: ['Cookware', 'Utensils', 'Appliances'] },
        { name: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
        { name: 'Personal Care', subcategories: ['Skincare', 'Haircare', 'Grooming'] },
      ];
  return (
                
                    <div class="filter-categoy my-4">
                    <div className="card categories-card mb-3">
                        <div className="categories-header">Categories</div>
                            <div className="list-group">
                                {categoriesData.map((category, index) => (
                                <div key={index} className={`flex-wrap category-item ${activeIndex === index ? 'active' : ''}`}>            
                                    <div className="accordion-header d-flex w-100 justify-content-between align-items-center" onClick={() => toggleAccordion(index)}>
                                    <span>{category.name}</span>
                                    <FontAwesomeIcon icon={activeIndex === index ? faAngleDown : faAngleRight} />
                                    </div>
                                    {activeIndex === index && category.subcategories.length > 0 && (
                                    <div className="accordion-body mt-1">
                                        <ul className='list-unstyled mb-0'>
                                        {category.subcategories.map((sub, subIndex) => (
                                            <li key={subIndex}>{sub}</li>
                                        ))}
                                        </ul>
                                    </div>
                                    )}
                                </div>
                                ))}
                            </div>
                        </div>


                        <div class="card categories-card mb-3">
                            <div class="categories-header">Price Range</div>
                            <div className='list-group'>
                                <div className="d-flex filterrange_box">
                                    <div className="wrapper">
                                        <div className="price-input">
                                        <div className="field">
                                            <span style={{whiteSpace:"nowrap"}}>Min : </span>
                                            <input
                                            type="number"
                                            className="input-min"
                                            value={minPrice}
                                            onChange={handleMinChange}
                                            />
                                        </div>
                                        <div className="separator">-</div>
                                        <div className="field">
                                            <span style={{whiteSpace:"nowrap"}}>Max : </span>
                                            <input
                                            type="number"
                                            className="input-max"
                                            value={maxPrice}
                                            onChange={handleMaxChange}
                                            />
                                        </div>
                                        </div>
                                        <div className="slider">
                                            <div className="progress" style={{ left: `${(minPrice / 10000) * 100}%`, right: `${100 - (maxPrice / 10000) * 100}%` }}>
                                            </div>
                                        </div>
                                        <div className="range-input">
                                        <input
                                            type="range"
                                            className="range-min"
                                            min="0"
                                            max="10000"
                                            value={minPrice}
                                            step="100"
                                            onChange={handleMinChange}
                                        />
                                        <input
                                            type="range"
                                            className="range-max"
                                            min="0"
                                            max="10000"
                                            value={maxPrice}
                                            step="100"
                                            onChange={handleMaxChange}
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card categories-card  mb-3">
                            <div class="categories-header">Customer Ratings</div>
                            <div class="list-group">                                
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="5star" />
                                        <label class="form-check-label" for="5star">
                                        5 Star
                                        </label>
                                    </div>
                                </div>
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="4star" />
                                        <label class="form-check-label" for="4star">
                                        4 Star  & above
                                        </label>
                                    </div>
                                </div>
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="3star" />
                                        <label class="form-check-label" for="3star">
                                        3 Star & above
                                        </label>
                                    </div>
                                </div>
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="2star" />
                                        <label class="form-check-label" for="2star">
                                        2 Star & above
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  );
}
