
import React, { useState } from 'react';
import './Product_filter.css';

export default function ProductFilter() {
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
                            <div class="categories-header">Pricing</div>
                            <div class="list-group">
                            <div class="category-item active">
                                    All Products <i class="fa-solid fa-angle-right"></i>
                                </div>                               
                            </div>
                        </div>

                        <div class="card categories-card  mb-3">
                            <div class="categories-header">Customer Ratings</div>
                            <div class="list-group">                                
                                <div class="rating-check-item ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
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
