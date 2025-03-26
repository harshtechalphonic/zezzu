
import React, { useState } from 'react';
import './Product_filter.css';


export default function ProductFilter() {
    const [minPrice, setMinPrice] = useState(2500);
    const [maxPrice, setMaxPrice] = useState(7500);
  
    const handleMinChange = (e) => {
      const value = Math.min(Number(e.target.value), maxPrice - 100);
      setMinPrice(value);
    };
  
    const handleMaxChange = (e) => {
      const value = Math.max(Number(e.target.value), minPrice + 100);
      setMaxPrice(value);
    };
  return (
                <div class="filter-contaienr">
                    <div class="filter-categoy my-4">
                        <div class="card categories-card mb-3">
                            <input type="text" class="form-control search-input" placeholder="Search"/>
                            <div class="categories-header">Categories</div>
                            <div class="list-group">
                            <div class="category-item active">
                                    All Products <i class="fa-solid fa-angle-right"></i>
                                </div>
                                <div class="category-item ">
                                    Silver foil medium delivery bag <i class="fa-solid fa-angle-right"></i>
                                </div>
                                <div class="category-item">
                                    Milk delivery bag <i class="fa-solid fa-angle-right"></i>
                                </div>
                                <div class="category-item">
                                    Cake delivery bag <i class="fa-solid fa-angle-right"></i>
                                </div>
                                <div class="category-item">
                                    Insulated large meal delivery bag <i class="fa-solid fa-angle-right"></i>
                                </div>
                                <div class="category-item">
                                    Insulated large meal delivery bag <i class="fa-solid fa-angle-right"></i>
                                </div>
                            </div>
                        </div>

                        <div class="card categories-card mb-3">
                            <div class="categories-header">Price Range</div>
                            <div className="d-flex filterrange_box">
                                <div className="wrapper">
                                    <div className="price-input">
                                    <div className="field">
                                        <span>Min</span>
                                        <input
                                        type="number"
                                        className="input-min"
                                        value={minPrice}
                                        onChange={handleMinChange}
                                        />
                                    </div>
                                    <div className="separator">-</div>
                                    <div className="field">
                                        <span>Max</span>
                                        <input
                                        type="number"
                                        className="input-max"
                                        value={maxPrice}
                                        onChange={handleMaxChange}
                                        />
                                    </div>
                                    </div>
                                    <div className="slider">
                                    <div
                                        className="progress"
                                        style={{ left: `${(minPrice / 10000) * 100}%`, right: `${100 - (maxPrice / 10000) * 100}%` }}
                                    ></div>
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

                        <div class="card categories-card  mb-3">
                            <div class="categories-header">Customer Ratings</div>
                            <div class="list-group">                                
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            Checked checkbox
                                        </label>
                                    </div>
                                </div>
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Default checkbox
                                        </label>
                                    </div>
                                </div>
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Default checkbox
                                        </label>
                                    </div>
                                </div>
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Default checkbox
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  );
}
