import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function SearchBar() {
  const fetch_products = useSelector((store) => store.products);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);

  const productList = fetch_products?.data || [];
  

  const filteredProducts = productList.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="position-relative sraechbar-we my-3" ref={wrapperRef} style={{margin:" 0 20px"}}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search"
        />
        <span className="input-group-text">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>

      {searchTerm && (
        <ul className='searchbarOUTPut list-unstyled d-flex flex-column'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.prd_id}>
                <Link to={product.slug}>{product.title}</Link>
              </li>
            ))
          ) : (
            <li className="mb-3 text-muted">No products found</li>
          )}
        </ul>
      )}
    </div>
  );
}
