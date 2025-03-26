import React from 'react'
import "./ReviewRating.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

export default function ReviewRating({ rating }) {

    const reviewsData = [
        {
          id: 1,
          name: 'Anonymous User',
          rating: 4,
          img:"/rec-1.png",
          date: '21 May, 2024',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis justo, venenatis vel sem non, fringilla rutrum quam. Curabitur libero sapien, consectetur et tincidunt eu, maximus id quam.'
        },
        {
          id: 2,
          name: 'Chetna',
          rating: 5,
          img:"/rec-1.png",
          date: '28 May, 2023',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis justo, venenatis vel sem non, fringilla rutrum quam. Curabitur libero sapien, consectetur et tincidunt eu, maximus id quam.'
        },
        {
          id: 3,
          name: 'Chetna',
          rating: 3,
          img:"/rec-3.png",
          date: '12 May, 2023',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis justo, venenatis vel sem non, fringilla rutrum quam. Curabitur libero sapien, consectetur et tincidunt eu, maximus id quam.'
        }
      ];
      const averageRating = (
        reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length
      ).toFixed(1);
      const StarRating = ({ rating }) => {
        return (
          <span className='rating-reviwe mb-4'>
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={index < rating ? faSolidStar : faRegularStar}
              style={{ color: index < rating ? '#FFD700' : '#FFD700', marginBottom:"8px" }}
            />
          ))}
        </span>
        );
      };

  return (
    <>
    
    <div className='reviewer-sec'>
        <div className='container'>
            <div className='reviewer-main-box'>
        <div className= ' tititle d-flex align-items-center justify-content-between p-4'>
        <h3>All Reviews ({reviewsData.length}) <span> {averageRating} <FontAwesomeIcon icon={faSolidStar}/> </span></h3>
        <a href="#!">Write a review</a>
        </div>
                {reviewsData.map((review) => (
                <div key={review.id} className="review-card">
                    <div className='d-flex align-items-top gap-4'>
                        <div className='reviewr-img'>
                            <img src={review.img} alt="" />
                            {/* <span>As</span> */}
                        </div>
                        <div className='reviewer-content'>
                            <h4>{review.name}</h4>
                            <StarRating rating={review.rating}/>
                            <p className=' revicw-date'>{review.date}</p>
                            <p>{review.comment}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    </>
  )
}
