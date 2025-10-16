import React, { useState, useEffect } from "react";
import "./UserAccount.css";
import Header from "../../Components/Partials/Header/Header";
import Footer from "../../Components/Partials/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faHeart,
  faHouse,
  faShoppingCart,
  faSignOutAlt,
  faTachometerAlt,
  faUndo,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Tabs, Tab } from "react-bootstrap";
import DashBoard from "../../Components/UserAccount/DashBoard/DashBoard";
import Orders from "../../Components/UserAccount/Orders/Orders";
import Addresses from "../../Components/UserAccount/Addresses/Addresses";
import ReturnRefund from "../../Components/UserAccount/ReturnRefund/ReturnRefund";
// import Wishlist from '../../Components/UserAccount/Wishlist/Wishlist';
import AccountDetails from "../../Components/UserAccount/AccountDetails/AccountDetails";
import ScrollToTop from "../ScrollToTop";
import axios from "axios";
import config from "../../Config/config.json";
export default function UserAccount() {
  const navigate = useNavigate();
  const [userResponse, setUserResponse] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${config.API_URL_POST}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setUserResponse(response.data);
      })
      .catch(function (error) {
        console.log("Error:", error);
        console.log("Error response:", error.response);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/home");
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="breadcrum_box mt-2">
        <nav aria-label="breadcrumb">
          <div className="container">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/home" className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon
                    icon={faHouse}
                    style={{ fontSize: "14px", marginTop: "-4px" }}
                  />{" "}
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                User Account
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="User_dashboard my-5">
        <div className="container">
          <div className="user_tabBoard d-flex">
            <Tabs
              defaultActiveKey="DashBoard"
              id="justify-tab-Dashboard"
              className="mb-3"
              onSelect={(key) => {
                if (key === "Log_out") {
                  handleLogout();
                }
              }}
            >
              <Tab
                eventKey="DashBoard"
                title={
                  <>
                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                    Dashboard
                  </>
                }
              >
                <DashBoard order_status={userResponse.order_status} />
              </Tab>
              <Tab
                eventKey="Order"
                title={
                  <>
                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />{" "}
                    Order
                  </>
                }
              >
                <Orders />
              </Tab>
              <Tab
                eventKey="Addresses"
                title={
                  <>
                    <FontAwesomeIcon icon={faAddressBook} className="me-2" />{" "}
                    Addresses
                  </>
                }
              >
                <Addresses />
              </Tab>
              <Tab
                eventKey="Return_Refund"
                title={
                  <>
                    <FontAwesomeIcon icon={faUndo} className="me-2" />{" "}
                    Return/Refund
                  </>
                }
              >
                <ReturnRefund />
              </Tab>
              <Tab
                eventKey="Account_details"
                title={
                  <>
                    <FontAwesomeIcon icon={faUser} className="me-2" /> Account
                    details
                  </>
                }
              >
                <AccountDetails />
              </Tab>
              <Tab
                eventKey="Log_out"
                title={
                  <>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                    Log-out
                  </>
                }
              >
                {/* No content needed as logout is handled on tab change */}
              </Tab>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
