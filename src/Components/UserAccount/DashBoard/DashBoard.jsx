import React, { useState } from "react";
import "./DashBoard.css";
import { Link } from "react-router-dom";

export default function DashBoard({ order_status, user_details }) {
  const orderData = [
    {
      imgSrc: "/total-Order.png",
      title: "Total Orders",
      count: order_status?.total,
    },
    {
      imgSrc: "/pending_box.png",
      title: "Pending Orders",
      count: order_status?.pending,
    },
    {
      imgSrc: "/cart_box.png",
      title: "Completed Orders",
      count: order_status?.complete,
    },
  ];
  let cartCount = JSON.parse(localStorage.getItem("cart")) || [];
  return (
    <>
      <div className="dashbaord_kbox">
        <div className="row">
          <div className="col-lg-7">
            <div className="dashborad_profile d-flex align-items-center ">
              <div className="profile-box">
                {/* <span>AM</span> */}
                <img src={`https://ui-avatars.com/api/?name=${user_details?.name}&size=100&background=0D8ABC&color=fff&rounded=true`} alt="" />
              </div>
              <div className="profile-content">
                <h3>{user_details?.name}</h3>
                <p className="rmail mb-0">
                  <Link to="#!">{user_details?.email}</Link>
                </p>
                <p className="pphone mb-0">
                  <Link to="#!">{user_details?.phone}</Link>
                </p>
              </div>
              <Link to="#!" className="edit_profile">
                {" "}
                Edit Profile{" "}
              </Link>
            </div>

            <div className="ordera-boxer mt-5 ">
              {orderData.map((item, index) => (
                <div className="orderbox-one mb-3" key={index}>
                  <div className="order-iocn">
                    <img src={item.imgSrc} alt={item.title} />
                  </div>
                  <div className="order-content">
                    <h4>{item.title}</h4>
                    <p>{item.count}</p>
                  </div>
                </div>
              ))}
              <div className="orderbox-one mb-3">
                <div className="order-iocn">
                  <img src="/cart_box.png" alt="My Cart" />
                </div>
                <div className="order-content">
                  <h4>My Cart</h4>
                  <p>{cartCount.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
