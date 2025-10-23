import React, { useCallback, useEffect, useState } from "react";
import "./Cart.css";
import Header from "../../Components/Partials/Header/Header";
import Footer from "../../Components/Partials/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/Products/cartSlice";
import config from "../../Config/config.json";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const [productAmount, setProductAmount] = useState(null);
  useEffect(() => {
    if (
      !item.product_inventory_details ||
      item.product_inventory_details.length === 0
    ) {
      setProductAmount(null);
      return;
    }

    try {
      const variations = JSON.parse(
        item.product_inventory_details[0].variation_json
      );

      if (item.variation && typeof item.variation === "object") {
        const match = variations.find((v) =>
          Object.entries(item.variation).every(([key, val]) => v[key] === val)
        );
        setProductAmount(match || null);
      } else {
        setProductAmount(null);
      }
    } catch (error) {
      console.error("Error parsing variation JSON:", error);
      setProductAmount(null);
    }
  }, [item]);

  const handleIncrement = () =>
    onQuantityChange(item.prd_id, item.quantity + 1);
  const handleDecrement = () =>
    item.quantity > 1 && onQuantityChange(item.prd_id, item.quantity - 1);

  return (
    <div className="card mb-3 p-3">
      <div className="d-flex align-items-center gap-4">
        <div className="cartitem_img">
          <img src={item.img_url} alt={item.title} className="img-fluid" />
        </div>
        <div className="cartitem_content">
          <h5>{item.title}</h5>
          <div className="text-capitalize">
            {item.variation && typeof item.variation === "object"
              ? Object.entries(item.variation).map(([key, value]) =>
                  key != "sale_price" && key != "reguler_price" ? (
                    <span key={key} className="badge text-bg-dark m-1">
                      {key} : {value}
                    </span>
                  ) : (
                    ""
                  )
                )
              : ""}
          </div>
          <div className="price_ing d-flex align-items-center">
            {productAmount ? (
              <>
                <h5>
                  ₹ {(productAmount.sale_price * item.quantity).toFixed(2)}
                </h5>
                <p className="slashPrice">
                  ₹ {(productAmount.reguler_price * item.quantity).toFixed(2)}
                </p>
              </>
            ) : (
              <>
                <h5>
                  ₹{((item.discount_price || 0) * item.quantity).toFixed(2)}
                </h5>
                <p className="slashPrice">
                  ₹ {((item.price || 0) * item.quantity).toFixed(2)}
                </p>
              </>
            )}
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleDecrement}
            >
              -
            </button>
            <input
              className="form-control mx-2"
              style={{ width: "50px" }}
              value={item.quantity}
              readOnly
            />
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
        <button
          className="btn btn-outline-danger remove_btn"
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default function Cart() {
  const fetch_products = useSelector((store) => store.products);
  const [products, setProducts] = useState([]);
  const [checkCart, setCheckCart] = useState(false);
  const [checkoutDetail, setCheckoutDetail] = useState({
    subTotal: 0,
    discount: 0,
    total: 0,
  });
  const [checkoutUrl, setCheckoutUrl] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetch_products.status && localStorage.getItem("cart")) {
      try {
        const cartIds = JSON.parse(localStorage.getItem("cart")) || [];

        const filteredProducts = fetch_products.data
          .filter((product) =>
            cartIds.some((cartItem) => cartItem.prd_id === product.prd_id)
          )
          .map((product) => {
            const cartItem = cartIds.find(
              (cartItem) => cartItem.prd_id === product.prd_id
            );
            let variation =
              cartItem && cartItem.variation
                ? { variation: cartItem.variation }
                : {};
            return {
              ...product,
              quantity: cartItem ? cartItem.quantity : 1,
              ...variation,
            };
          });

        setProducts(filteredProducts);
        setCheckCart(filteredProducts.length === 0);
      } catch (error) {
        console.error("Error parsing cart data:", error);
        setCheckCart(true);
      }
    } else {
      setCheckCart(true);
    }
  }, [fetch_products.status, fetch_products.data]);

  useEffect(() => {
    try {
      const cartIds = JSON.parse(localStorage.getItem("cart")) || [];
      const url = JSON.stringify({ ...checkoutDetail, data: cartIds });
      setCheckoutUrl(btoa(url));
    } catch (error) {
      console.error("Error generating checkout URL:", error);
    }
  }, [checkoutDetail]);

  const calculateTotals = useCallback(() => {
    if (products.length === 0) {
      setCheckoutDetail({ subTotal: 0, discount: 0, total: 0 });
      return;
    }

    const totals = products.reduce(
      (acc, item) => {
        let itemSubTotal = 0;
        let itemTotal = 0;

        if (
          item.product_inventory_details &&
          item.product_inventory_details.length > 0
        ) {
          try {
            const variations = JSON.parse(
              item.product_inventory_details[0].variation_json
            );

            if (item.variation && typeof item.variation === "object") {
              const match = variations.find((v) =>
                Object.entries(item.variation).every(
                  ([key, val]) => v[key] === val
                )
              );

              if (match) {
                itemSubTotal = Number(match.reguler_price) * item.quantity;
                itemTotal = Number(match.sale_price) * item.quantity;
              } else {
                // Fallback to product prices if no variation match found
                itemSubTotal = Number(item.price || 0) * item.quantity;
                itemTotal = Number(item.discount_price || 0) * item.quantity;
              }
            } else {
              // No variation data, use product prices
              itemSubTotal = Number(item.price || 0) * item.quantity;
              itemTotal = Number(item.discount_price || 0) * item.quantity;
            }
          } catch (error) {
            console.error("Error calculating variation prices:", error);
            itemSubTotal = Number(item.price || 0) * item.quantity;
            itemTotal = Number(item.discount_price || 0) * item.quantity;
          }
        } else {
          // No inventory details, use product prices
          itemSubTotal = Number(item.price || 0) * item.quantity;
          itemTotal = Number(item.discount_price || 0) * item.quantity;
        }

        const itemDiscount = itemSubTotal - itemTotal;

        return {
          subTotal: acc.subTotal + itemSubTotal,
          discount: acc.discount + itemDiscount,
          total: acc.total + itemTotal,
        };
      },
      { subTotal: 0, discount: 0, total: 0 }
    );

    setCheckoutDetail(totals);
  }, [products]);

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  const [coupon, setCoupon] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponMessageColor, setCouponMessageColor] = useState("");

  const handleQuantityChange = (id, newQuantity) => {
    setProducts((prevItems) =>
      prevItems.map((item) =>
        item.prd_id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    dispatch(cartAction.updateCart({ id, quantity: newQuantity }));
  };

  const handleRemove = (id) => {
    try {
      let cartIds = JSON.parse(localStorage.getItem("cart")) || [];
      cartIds = cartIds.filter((item) => item.prd_id !== id);
      setProducts(products.filter((item) => item.prd_id !== id));
      dispatch(cartAction.removeCart(cartIds));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const applyCoupon = () => {
    if (coupon === "DISCOUNT180") {
      setIsCouponApplied(true);
      setCouponMessage("Coupon Applied! ₹180 discount added.");
      setCouponMessageColor("green");
      // Apply discount logic here
    } else {
      setCouponMessage("Invalid Coupon Code!");
      setCouponMessageColor("red");
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
  return (
    <>
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
                Cart
              </li>
            </ol>
          </div>
        </nav>
      </div>
      <section className="cart_section mt-5">
        <div className="container">
          <div className="row justify-content-center">
            {checkCart === false && products.length === 0 ? (
              <div className="col-12 text-center">
                <div className="spinner-grow text-dark me-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-dark me-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow text-dark me-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="col-lg-6 col-md-8">
                  <div className="Cart_sect-box">
                    <h4 className="mb-3">Cart ({products.length} items)</h4>
                    {products.map((item) => (
                      <CartItem
                        key={item.prd_id}
                        item={item}
                        onRemove={() => handleRemove(item.prd_id)}
                        onQuantityChange={handleQuantityChange}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-lg-4 col-md-4">
                  <div
                    className="Checkout_box p-4 mt-5"
                    style={{
                      maxWidth: "400px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  >
                    <h5 className="mb-4">The total amount of</h5>
                    <div className="list-box d-flex justify-content-between mb-2">
                      <span>Sub-total</span>
                      <span>₹{checkoutDetail.subTotal.toFixed(2)}</span>
                    </div>
                    <div className="list-box d-flex justify-content-between mb-2">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="list-box d-flex justify-content-between mb-2">
                      <span>Discount</span>
                      <span>₹{checkoutDetail.discount.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="list-box d-flex justify-content-between mb-4">
                      <h5>Total</h5>
                      <h5>₹{(checkoutDetail.total).toFixed(2)}</h5>
                    </div>
                    {isLoggedIn ? (
                      <Link
                        to={`/checkout/${checkoutUrl}`}
                        className="btn btn-primary w-100 rounded-0 py-2"
                      >
                        PROCEED TO CHECKOUT →
                      </Link>
                    ) : (
                      <Link
                        to={`/login/`}
                        className="btn btn-primary w-100 rounded-0 py-2"
                      >
                        LOGIN FOR CHECKOUT →
                      </Link>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <h2 className="text-center">Your cart is empty..!</h2>
            )}
          </div>
          <div className="continueshop_btn my-5">
            <div className="row">
              <div className="offset-lg-1 col-lg-11 col-md-12">
                <Link to="/product">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
