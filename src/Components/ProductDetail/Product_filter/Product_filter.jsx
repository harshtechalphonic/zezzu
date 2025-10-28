import React, { useEffect, useState } from "react";
import "./Product_filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { filtersAction } from "../../../store/Products/filtersSlice";
import AllCategoriesAPi from "../../../API/AllCategoriesAPi";
import { Link } from "react-router-dom";
import BrandApi from "../../../API/BrandApi";

export default function ProductFilter({ products }) {
  const dispatch = useDispatch();
  const allCategories = useSelector((store) => store.allCategories);
  const { data } = useSelector((store) => store.brands);
  
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [stepAmount, setStepAmount] = useState(100);

  const [fixedMinPrice, setFixedMinPrice] = useState(0);
  const [fixedMaxPrice, setFixedMaxPrice] = useState(0);

  // Calculate price range from products
  useEffect(() => {
    if (!products.status || !products.data || products.data.length === 0) return;
    
    const prices = products.data.map((product) => 
      parseFloat(product.discount_price) || parseFloat(product.sale_price) || 0
    ).filter(price => price > 0);
    
    if (prices.length > 0) {
      const calculatedMin = Math.min(...prices);
      const calculatedMax = Math.max(...prices);
      
      setMinPrice(calculatedMin);
      setMaxPrice(calculatedMax);
      setFixedMinPrice(calculatedMin);
      setFixedMaxPrice(calculatedMax);
      
      // Calculate step amount based on price range
      const range = calculatedMax - calculatedMin;
      setStepAmount(Math.max(10, Math.floor(range / 20))); // Dynamic step amount
    }
  }, [products.status, products.data]);

  // Debounced price range updates
  useEffect(() => {
    if (minPrice === 0 && maxPrice === 0) return;
    
    const timer = setTimeout(() => {
      dispatch(filtersAction.priceRangeMin(minPrice));
    }, 500);
    
    return () => clearTimeout(timer);
  }, [minPrice, dispatch]);

  useEffect(() => {
    if (minPrice === 0 && maxPrice === 0) return;
    
    const timer = setTimeout(() => {
      dispatch(filtersAction.priceRangeMax(maxPrice));
    }, 500);
    
    return () => clearTimeout(timer);
  }, [maxPrice, dispatch]);

  const handleMinChange = (e) => {
    let value = parseFloat(e.target.value) || 0;
    
    // Validate min price
    value = Math.max(fixedMinPrice, value); // Can't go below absolute min
    value = Math.min(value, maxPrice - stepAmount); // Can't go above max - step
    
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    let value = parseFloat(e.target.value) || 0;
    
    // Validate max price
    value = Math.min(fixedMaxPrice, value); // Can't go above absolute max
    value = Math.max(value, minPrice + stepAmount); // Can't go below min + step
    
    setMaxPrice(value);
  };

  const handleMinSliderChange = (e) => {
    let value = parseFloat(e.target.value);
    value = Math.min(value, maxPrice - stepAmount);
    setMinPrice(value);
  };

  const handleMaxSliderChange = (e) => {
    let value = parseFloat(e.target.value);
    value = Math.max(value, minPrice + stepAmount);
    setMaxPrice(value);
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Calculate slider progress position
  const getProgressStyle = () => {
    if (fixedMaxPrice === 0) return {};
    
    const left = ((minPrice - fixedMinPrice) / (fixedMaxPrice - fixedMinPrice)) * 100;
    const right = 100 - ((maxPrice - fixedMinPrice) / (fixedMaxPrice - fixedMinPrice)) * 100;
    
    return {
      left: `${left}%`,
      right: `${right}%`
    };
  };

  return (
    <div className="filter-categoy my-4">
      <div className="card categories-card mb-3">
        <div className="categories-header">Categories</div>
        <div className="list-group">
          <AllCategoriesAPi/>
          {allCategories.data.map((category, index) => (
            <div
              key={index}
              className={`flex-wrap category-item ${
                activeIndex === index ? "active" : ""
              }`}
            ><Link to={`/category/${category.slug}`}>
              <div
                className="accordion-header d-flex w-100 justify-content-between align-items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span>{category.name}</span>
                <FontAwesomeIcon
                  icon={activeIndex === index ? faAngleDown : faAngleRight}
                />
              </div>
              </Link>
              {activeIndex === index && category.sub_categories.length > 0 && (
                <div className="accordion-body mt-1">
                  <ul className="list-unstyled mb-0 ms-3">
                    {category.sub_categories.map((sub, subIndex) => (
                      <li key={subIndex}><Link to={`/category/${category.slug}/${sub.slug}`}>{sub.name}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
          
      <div className="card categories-card brnads mb-3">
        <div className="categories-header">Brands</div>
        <div className="list-group">
          <BrandApi/>
          <ul className="list-unstyled mb-0">
            {data.map((item, index) => (
              <li key={index}><Link to={`/product/brands/${item?.image?.slug}`}>{item.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card categories-card mb-3">
        <div className="categories-header">Price Range</div>
        <div className="list-group">
          <div className="d-flex filterrange_box">
            <div className="wrapper" style={{filter: `blur(${fixedMinPrice === 0 ? "3" : "0"}px)`}}>
              {fixedMinPrice === 0 ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                  Loading prices...
                </div>
              ) : (
                <>
                  <div className="price-input">
                    <div className="field">
                      <span style={{ whiteSpace: "nowrap" }}>Min : </span>
                      <input
                        type="number"
                        className="input-min"
                        value={Math.round(minPrice)}
                        onChange={handleMinChange}
                        min={fixedMinPrice}
                        max={fixedMaxPrice - stepAmount}
                      />
                    </div>
                    <div className="separator">-</div>
                    <div className="field">
                      <span style={{ whiteSpace: "nowrap" }}>Max : </span>
                      <input
                        type="number"
                        className="input-max"
                        value={Math.round(maxPrice)}
                        onChange={handleMaxChange}
                        min={fixedMinPrice + stepAmount}
                        max={fixedMaxPrice}
                      />
                    </div>
                  </div>
                  
                  <div className="slider">
                    <div
                      className="progress"
                      style={getProgressStyle()}
                    ></div>
                  </div>
                  
                  <div className="range-input">
                    <input
                      type="range"
                      className="range-min"
                      min={fixedMinPrice}
                      max={fixedMaxPrice}
                      value={minPrice}
                      step={stepAmount}
                      onChange={handleMinSliderChange}
                    />
                    <input
                      type="range"
                      className="range-max"
                      min={fixedMinPrice}
                      max={fixedMaxPrice}
                      value={maxPrice}
                      step={stepAmount}
                      onChange={handleMaxSliderChange}
                    />
                  </div>
                  
                  <div className="price-display text-center mt-2">
                    <small className="text-muted">
                      Range: ₹{Math.round(minPrice)} - ₹{Math.round(maxPrice)}
                    </small>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}