import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Checkout.css";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../../Config/config.json";

const axiosInstance = axios.create({
  baseURL: config.API_URL_POST,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function Checkout() {
  const navigate = useNavigate();
  const fetch_products = useSelector((store) => store.products);
  const [products, setProducts] = useState([]);
  const [checkCheckout, setCheckCheckout] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectAddress, setSelectAddress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [userData, setUserData] = useState(null);
  const [checkoutDetail, setCheckoutDetail] = useState({
    subtotal: 0,
    discount: 0,
    total: 0,
  });
  const { data } = useParams();
  let urlData = [];
  try {
    urlData = atob(data);
  } catch (e) {
    navigate("/product");
  }

  useEffect(() => {
    fetchAddresses();
    fetchUserData();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/add-address");
      setAddresses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axiosInstance.get("/user-profile");
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (addresses.length == 0) return;
    setSelectAddress(addresses.filter((e) => e.status == "active")[0].id);
  }, [addresses]);

  useEffect(() => {
    if (fetch_products.status && urlData) {
      const cartIds = JSON.parse(urlData);
      setCheckoutDetail({
        ...checkoutDetail,
        subtotal: cartIds.subTotal,
        discount: cartIds.discount,
        total: cartIds.total,
      });
      setProducts(
        fetch_products.data
          .filter((product) =>
            cartIds.data.some((cartItem) => cartItem.prd_id === product.prd_id)
          )
          .map((product) => {
            const cartItem = cartIds.data.find(
              (cartItem) => cartItem.prd_id === product.prd_id
            );
            let variation = cartItem.variation
              ? { variation: cartItem.variation }
              : {};
            return {
              ...product,
              quantity: cartItem ? cartItem.quantity : 1,
              ...variation,
            };
          })
      );
      setCheckCheckout(true);
    } else {
      setCheckCheckout(false);
    }
  }, [fetch_products.status, urlData]);

  // Apply Coupon Function
  const applyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }

    try {
      setCouponLoading(true);
      setCouponError("");

      const productIds = products.map((product) => product.prd_id);
      const cartAmount = checkoutDetail.total;

      const response = await axios.post(`${config.API_URL_POST}/coupen`, {
        coupon_code: couponCode,
        cart_amount: cartAmount,
        product_ids: productIds,
      });

      if (response.data.status) {
        setCouponData(response.data.data);

        // Update checkout details with coupon discount
        setCheckoutDetail((prev) => ({
          ...prev,
          total: response.data.data.final_amount,
        }));

        setCouponError("");
      } else {
        setCouponError(response.data.message || "Failed to apply coupon");
        setCouponData(null);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setCouponError(error.response?.data?.message || "Failed to apply coupon");
      setCouponData(null);
    } finally {
      setCouponLoading(false);
    }
  };

  // Remove Coupon Function
  const removeCoupon = () => {
    setCouponCode("");
    setCouponData(null);
    setCouponError("");

    // Reset checkout details to original values
    if (fetch_products.status && urlData) {
      const cartIds = JSON.parse(urlData);
      setCheckoutDetail({
        subtotal: cartIds.subTotal,
        discount: cartIds.discount,
        total: cartIds.total,
      });
    }
  };

  // Prepare order data for API
  const prepareOrderData = () => {
    const orderItems = products.map((product, index) => ({
      product_id: product.prd_id,
      order_amount: product.variation
        ? product.variation.sale_price
        : product.discount_price,
      order_quantity: product.quantity,
      vendor_id: product.vendor_id,
      variation: product.variation || {},
    }));

    const orderData = {
      address_id: selectAddress,
      payment_method: paymentMethod,
      subtotal: checkoutDetail.subtotal,
      discount: checkoutDetail.discount,
      tax: checkoutDetail.tax,
      total: checkoutDetail.total,
      order: orderItems,
    };

    // Add coupon data if applied
    if (couponData) {
      orderData.coupon_code = couponData.coupon_code;
      orderData.coupon_discount = couponData.discount;
      orderData.coupon_id = couponData.id;
    }

    return orderData;
  };

  // Razorpay Payment Function - Aapka original function
  const openRazorpay = (orderData) => {
    const selectedAddress = addresses.find((addr) => addr.id === selectAddress);

    const options = {
      key: config.RAZORPAY_KEY_ID, // Razorpay key config se

      amount: checkoutDetail.total * 100, // Amount in paise
      currency: "INR",
      name: "Your Store Name",
      handler: async (response) => {
        try {
          // Payment successful - order create karo with payment details
          const orderPayload = {
            ...orderData,
            razorpay_payment_id: response.razorpay_payment_id,
            payment_status: "success",
          };

          const res = await axiosInstance.post("/add-order", orderPayload);

          if (res.data.status) {
            console.log("Order placed successfully:", res.data);
            alert("Payment successful! Order placed.");
            navigate("/order-success", {
              state: {
                orderId: res.data.data.order_id,
                orderDetails: res.data.data,
              },
            });
          } else {
            alert(
              "Order creation failed after payment. Please contact support."
            );
          }
        } catch (error) {
          console.error("Error creating order after payment:", error);
          alert(
            "Payment successful but order creation failed. Please contact support."
          );
        }
      },
      prefill: {
        name: selectedAddress?.name || userData?.name || "",
        email: userData?.email || "",
        contact: selectedAddress?.phone || userData?.phone || "",
      },
      modal: {
        ondismiss: function () {
          console.log("Payment modal closed");
          setOrderLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectAddress) {
      alert("Please select an address");
      return;
    }

    if (products.length === 0) {
      alert("No products in cart");
      return;
    }

    try {
      setOrderLoading(true);
      setOrderError("");

      const orderData = prepareOrderData();

      console.log("Submitting order data:", orderData);

      if (paymentMethod === "razor_pay") {
        // Razorpay payment flow
        await openRazorpay(orderData);
      } else {
        // COD flow - directly place order
        const response = await axiosInstance.post("/add-order", orderData);

        if (response.data.status) {
          // Order successful
          console.log("Order placed successfully:", response.data);
          alert("Order placed successfully!");
          navigate("/order-success", {
            state: {
              orderId: response.data.data.order_id,
              orderDetails: response.data.data,
            },
          });
        } else {
          setOrderError(response.data.message || "Failed to place order");
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to place order. Please try again."
      );
    } finally {
      setOrderLoading(false);
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, []);

  console.log("products", products);

  return (
    <div className="container checkout-container my-5">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-between">
          <div className="col-md-7">
            <div className="bolling-box">
              <h4>Select Address</h4>
              <input name="address_id" type="hidden" value={selectAddress} />
              <div className="address-grid">
                {addresses.map((address) => (
                  <div
                    className={`address-card 
                      ${selectAddress == address.id ? "default" : "active"}`}
                    key={address.id}
                    onClick={(e) => setSelectAddress(address.id)}
                  >
                    <div className="card-header">
                      <div className="address-type">
                        {address.address_type === "home" ? (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        ) : (
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="2"
                              y="7"
                              width="20"
                              height="14"
                              rx="2"
                              ry="2"
                            />
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                          </svg>
                        )}
                        <span>
                          {address.address_type.charAt(0).toUpperCase() +
                            address.address_type.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="address-content">
                      <h4>{address.name}</h4>
                      <div className="address-detail">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>
                          {address.address}, {address.state} {address.zipcode}
                        </span>
                      </div>
                      <div className="address-detail">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>{address.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="payment-box">
              <h4 className="mt-4">Payment Option</h4>
              <div className="my-3 pay-opt-box">
                <ul className="list-unstyled d-flex">
                  <li>
                    <div className="form-check d-flex flex-column">
                      <label htmlFor="cod" className="form-label">
                        <img src="/paypal.png" alt="COD Icon" />
                        <p>Cash on Delivery</p>
                      </label>
                      <input
                        type="radio"
                        name="payment_method"
                        id="cod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </div>
                  </li>
                  <li>
                    <div className="form-check d-flex flex-column">
                      <label htmlFor="razor_pay" className="form-label">
                        <img src="/paypal.png" alt="RazorPay Icon" />
                        <p>RazorPay</p>
                      </label>
                      <input
                        type="radio"
                        name="payment_method"
                        id="razor_pay"
                        value="razor_pay"
                        checked={paymentMethod === "razor_pay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="discount_box mb-4">
              <h5>Have a Coupon?</h5>
              <div className="row mb-3">
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponLoading || couponData}
                  />
                </div>
                <div className="col">
                  {couponData ? (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={removeCoupon}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={applyCoupon}
                      disabled={couponLoading}
                    >
                      {couponLoading ? "Applying..." : "Apply"}
                    </button>
                  )}
                </div>
              </div>

              {/* Coupon Error Message */}
              {couponError && (
                <div className="alert alert-danger py-2" role="alert">
                  {couponError}
                </div>
              )}

              {/* Coupon Success Message */}
              {couponData && (
                <div className="alert alert-success py-2" role="alert">
                  <strong>Coupon Applied!</strong>
                  <div>Discount: ₹{couponData.discount}</div>
                  <div>Final Amount: ₹{couponData.final_amount}</div>
                </div>
              )}
            </div>

            <div className="order-summary">
              <h5>Order Summary</h5>
              <div className="summery-product">
                <ul className="list-unstyled">
                  {products.map((value, index) => (
                    <li key={index} className="d-flex gap-3 my-3">
                      <img src={value.img_url} alt={value.title} />
                      <div>
                        <h6>{value.title}</h6>
                        <div className="text-capitalize">
                          {value.variation
                            ? Object.entries(value.variation).map(([key, vl]) =>
                                key != "sale_price" &&
                                key != "reguler_price" ? (
                                  <span
                                    key={key}
                                    className="badge text-bg-dark m-1"
                                  >
                                    {key} : {vl}
                                  </span>
                                ) : (
                                  ""
                                )
                              )
                            : ""}
                        </div>
                        {value.variation ? (
                          <p>
                            {value.quantity} x{" "}
                            <span>₹{value.variation.sale_price}</span>{" "}
                            <span className="text-dark text-decoration-line-through">
                              ₹{value.variation.reguler_price}
                            </span>
                          </p>
                        ) : (
                          <p>
                            {value.quantity} x{" "}
                            <span>₹{value.discount_price}</span>{" "}
                            <span className="text-dark text-decoration-line-through">
                              ₹{value.price}
                            </span>
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <p>
                Subtotal: <strong>₹{checkoutDetail.subtotal}</strong>
              </p>
              <p>
                Shipping: <strong>Free</strong>
              </p>
              <p>
                Discount: <strong>₹{checkoutDetail.discount}</strong>
              </p>
              {couponData && (
                <p>
                  Coupon Discount: <strong>₹{couponData.discount}</strong>
                </p>
              )}
              <hr />
              <p>
                Total: <strong>₹{checkoutDetail.total}</strong>
              </p>

              {/* Order Error Message */}
              {orderError && (
                <div className="alert alert-danger py-2 mb-3" role="alert">
                  {orderError}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={orderLoading || products.length === 0}
              >
                {orderLoading
                  ? "PROCESSING..."
                  : paymentMethod === "razor_pay"
                  ? "PAY NOW"
                  : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
