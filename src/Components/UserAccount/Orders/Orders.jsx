import React, { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import config from "../../../Config/config.json";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeFilter, setTimeFilter] = useState("last_month");
  const [processingRequest, setProcessingRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    orderId: null,
    productId: null,
    requestType: "",
    productName: "",
  });
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [cancellingOrder, setCancellingOrder] = useState(null); // Track which order is being cancelled

  useEffect(() => {
    fetchOrders();
  }, [timeFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.get(`${config.API_URL_POST}/user-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          filter: timeFilter,
        },
      });

      if (response.data.status) {
        setOrders(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cancel Single Product
  const cancelSingleProduct = async (orderId, productId, productName) => {
    try {
      setCancellingOrder(`${orderId}-${productId}`);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${config.API_URL_POST}/cancil-order`,
        {
          cancel_type: "product",
          order_id: orderId,
          product_id: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        alert(`Product "${productName}" cancelled successfully!`);
        fetchOrders(); // Refresh orders
      } else {
        alert(response.data.message || "Failed to cancel product");
      }
    } catch (err) {
      console.error("Error cancelling product:", err);
      alert("Failed to cancel product. Please try again.");
    } finally {
      setCancellingOrder(null);
    }
  };

  // Cancel Entire Order
  const cancelEntireOrder = async (orderId, invoiceNumber) => {
    if (
      !window.confirm(
        `Are you sure you want to cancel entire order ${invoiceNumber}? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      setCancellingOrder(`order-${orderId}`);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${config.API_URL_POST}/cancil-order`,
        {
          cancel_type: "order",
          order_id: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        alert(`Order ${invoiceNumber} cancelled successfully!`);
        fetchOrders(); // Refresh orders
      } else {
        alert(response.data.message || "Failed to cancel order");
      }
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setCancellingOrder(null);
    }
  };

  const openModal = (orderId, productId, requestType, productName) => {
    setModalData({
      orderId,
      productId,
      requestType,
      productName,
    });
    setSelectedReason("");
    setCustomReason("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({
      orderId: null,
      productId: null,
      requestType: "",
      productName: "",
    });
    setSelectedReason("");
    setCustomReason("");
  };

  const handleReturnRequest = (orderId, productId, productName) => {
    openModal(orderId, productId, "return", productName);
  };

  const handleReplaceRequest = (orderId, productId, productName) => {
    openModal(orderId, productId, "replace", productName);
  };

  const submitRequest = async () => {
    try {
      const { orderId, productId, requestType } = modalData;

      if (!selectedReason) {
        alert("Please select a reason");
        return;
      }

      if (selectedReason === "other" && !customReason.trim()) {
        alert("Please provide a reason");
        return;
      }

      const requestKey = `${orderId}-${productId}-${requestType}`;
      setProcessingRequest(requestKey);

      const token = localStorage.getItem("token");
      const finalReason =
        selectedReason === "other" ? customReason : selectedReason;

      const response = await axios.post(
        `${config.API_URL_POST}/return-replace`,
        {
          order_id: orderId,
          product_id: productId,
          request_type: requestType,
          reason: finalReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        alert(`Product ${requestType} request submitted successfully!`);
        closeModal();
        fetchOrders();
      } else {
        alert(
          response.data.message || `Failed to submit ${requestType} request`
        );
      }
    } catch (err) {
      console.error(`Error submitting request:`, err);
      alert(`Failed to submit request. Please try again.`);
    } finally {
      setProcessingRequest(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const calculateReturnDate = (orderDate) => {
    const returnDate = new Date(orderDate);
    returnDate.setDate(returnDate.getDate() + 30);
    return formatDate(returnDate);
  };

  const getOrderStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: "status-pending", text: "Pending" },
      processing: { class: "status-processing", text: "Processing" },
      completed: { class: "status-completed", text: "Completed" },
      cancelled: { class: "status-cancelled", text: "Cancelled" },
      shipped: { class: "status-shipped", text: "Shipped" },
      delivered: { class: "status-delivered", text: "Delivered" },
    };

    const config = statusConfig[status] || {
      class: "status-pending",
      text: status,
    };
    return (
      <span className={`order-status ${config.class}`}>{config.text}</span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    return (
      <span
        className={`payment-status ${
          status === "success" ? "payment-success" : "payment-failed"
        }`}
      >
        {status === "success" ? "Paid" : "Failed"}
      </span>
    );
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => {
      if (item.order_status !== "cancelled") {
        return total + parseFloat(item.sale_price) * item.quantity;
      }
      return total; // Return current total for cancelled items
    }, 0);
  };

  const isReturnReplaceAllowed = (orderDate, orderStatus) => {
    const orderDateObj = new Date(orderDate);
    const currentDate = new Date();
    const daysDifference = (currentDate - orderDateObj) / (1000 * 60 * 60 * 24);

    return orderStatus === "delivered" && daysDifference <= 30;
  };

  // Check if order can be cancelled (only pending or processing orders)
  const isOrderCancellable = (orderStatus) => {
    return ["pending", "processing"].includes(orderStatus);
  };

  // Check if product can be cancelled (only pending or processing orders)
  const isProductCancellable = (orderStatus) => {
    return ["pending", "processing"].includes(orderStatus);
  };

  // Reason options for the modal
  const reasonOptions = [
    "Received damaged item",
    "Wrong item received",
    "Item not as described",
    "Quality issues",
    "Size/fit issues",
    "Changed my mind",
    "other",
  ];

  if (loading) {
    return (
      <div className="orders__box">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders__box">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchOrders} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="orders__box">
        <div className="row">
          <div className="col-lg-12">
            <div className="order-titel d-flex align-items-center justify-content-between mb-4">
              <h2>My Orders</h2>
              <select
                className="form-select time-filter"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="today">Today's</option>
                <option value="last_week">Last Week</option>
                <option value="last_month">Last Month</option>
                <option value="last_6_months">Last 6 Months</option>
                <option value="all">All Orders</option>
              </select>
            </div>

            {orders.length === 0 ? (
              <div className="no-orders">
                <div className="no-orders-icon">📦</div>
                <h3>No orders found</h3>
                <p>You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((invoiceGroup, index) => (
                  <div key={index} className="invoice-group">
                    <div className="invoice-header">
                      <h4>Invoice: {invoiceGroup.invoice_generate}</h4>
                    </div>

                    {invoiceGroup.orders.map((order) => (
                      <div key={order.id} className="order-card">
                        <div className="order-header">
                          <div className="order-info">
                            <p className="order-id">
                              Order ID: {order.invoice_number}
                            </p>
                            <p className="order-date">
                              Ordered on: {formatDate(order.created_at)}
                            </p>
                          </div>
                          <div className="order-status-info">
                            <span className={`order-status bg-dark text-white`}>
                              Order Status : {order.order_status}
                            </span>
                            <span className={`payment-status bg-light`}>
                              Payment Status : {order.payment_status}
                            </span>
                            {/* Cancel Entire Order Button */}
                            {isOrderCancellable(order.order_status) && (
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm ms-2"
                                onClick={() =>
                                  cancelEntireOrder(
                                    order.id,
                                    order.invoice_number
                                  )
                                }
                                disabled={
                                  cancellingOrder === `order-${order.id}`
                                }
                              >
                                {cancellingOrder === `order-${order.id}` ? (
                                  <>
                                    <span
                                      className="spinner-border spinner-border-sm me-2"
                                      role="status"
                                    ></span>
                                    Cancelling...
                                  </>
                                ) : (
                                  "Cancel Entire Order"
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="order-items">
                          {order.items.map((item, itemIndex) => {
                            const isAllowed = isReturnReplaceAllowed(
                              order.created_at,
                              order.order_status
                            );
                            const returnRequestKey = `${order.id}-${item.product_id}-return`;
                            const replaceRequestKey = `${order.id}-${item.product_id}-replace`;
                            const cancelRequestKey = `${order.id}-${item.product_id}`;

                            return (
                              <div
                                key={itemIndex}
                                className="order-item d-flex align-items-center gap-4"
                                style={{
                                  opacity:
                                    item.order_status == "cancelled" ? 0.7 : 1,
                                }}
                              >
                                <div className="order-item-img">
                                  <img
                                    src="/PersonalCare.png"
                                    alt={item.product_name}
                                    onError={(e) => {
                                      e.target.src = "/placeholder-product.png";
                                    }}
                                  />
                                </div>
                                <div className="order-item-content flex-grow-1">
                                  <h5 className="product-name">
                                    {item.product_name}
                                  </h5>
                                  <div className="item-details">
                                    <p className="quantity">
                                      Quantity: {item.quantity}
                                    </p>
                                    <p className="price">
                                      ₹
                                      {(
                                        parseFloat(item.sale_price) *
                                        item.quantity
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  {item.product_attributes && (
                                    <div className="product-attributes">
                                      {Object.entries(
                                        JSON.parse(item.product_attributes)
                                      ).map(([key, value]) => (
                                        <span
                                          key={key}
                                          className="attribute-tag"
                                        >
                                          {key}: {value}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {/* Return, Replace and Cancel Buttons */}
                                  <div className="product-actions mt-3">
                                    {isProductCancellable(
                                      order.order_status
                                    ) ? (
                                      <div className="btn-group" role="group">
                                        {item.order_status == "cancelled" ? (
                                          <button
                                            type="button"
                                            className="btn btn-outline-dark disabled btn-sm"
                                          >
                                            Cancelled
                                          </button>
                                        ) : (
                                          <button
                                            type="button"
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() =>
                                              cancelSingleProduct(
                                                order.id,
                                                item.product_id,
                                                item.product_name
                                              )
                                            }
                                            disabled={
                                              cancellingOrder ===
                                              cancelRequestKey
                                            }
                                          >
                                            {cancellingOrder ===
                                            cancelRequestKey ? (
                                              <>
                                                <span
                                                  className="spinner-border spinner-border-sm me-2"
                                                  role="status"
                                                  aria-hidden="true"
                                                ></span>
                                                Cancelling...
                                              </>
                                            ) : (
                                              "Cancel Product"
                                            )}
                                          </button>
                                        )}
                                        {isAllowed && (
                                          <>
                                            <button
                                              type="button"
                                              className="btn btn-outline-warning btn-sm"
                                              onClick={() =>
                                                handleReturnRequest(
                                                  order.id,
                                                  item.product_id,
                                                  item.product_name
                                                )
                                              }
                                              disabled={
                                                processingRequest ===
                                                returnRequestKey
                                              }
                                            >
                                              {processingRequest ===
                                              returnRequestKey ? (
                                                <>
                                                  <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                  ></span>
                                                  Processing...
                                                </>
                                              ) : (
                                                "Return"
                                              )}
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-outline-info btn-sm"
                                              onClick={() =>
                                                handleReplaceRequest(
                                                  order.id,
                                                  item.product_id,
                                                  item.product_name
                                                )
                                              }
                                              disabled={
                                                processingRequest ===
                                                replaceRequestKey
                                              }
                                            >
                                              {processingRequest ===
                                              replaceRequestKey ? (
                                                <>
                                                  <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                  ></span>
                                                  Processing...
                                                </>
                                              ) : (
                                                "Replace"
                                              )}
                                            </button>
                                          </>
                                        )}
                                      </div>
                                    ) : isAllowed ? (
                                      <div className="btn-group" role="group">
                                        <button
                                          type="button"
                                          className="btn btn-outline-warning btn-sm"
                                          onClick={() =>
                                            handleReturnRequest(
                                              order.id,
                                              item.product_id,
                                              item.product_name
                                            )
                                          }
                                          disabled={
                                            processingRequest ===
                                            returnRequestKey
                                          }
                                        >
                                          {processingRequest ===
                                          returnRequestKey ? (
                                            <>
                                              <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                              ></span>
                                              Processing...
                                            </>
                                          ) : (
                                            "Return"
                                          )}
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-outline-info btn-sm"
                                          onClick={() =>
                                            handleReplaceRequest(
                                              order.id,
                                              item.product_id,
                                              item.product_name
                                            )
                                          }
                                          disabled={
                                            processingRequest ===
                                            replaceRequestKey
                                          }
                                        >
                                          {processingRequest ===
                                          replaceRequestKey ? (
                                            <>
                                              <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                              ></span>
                                              Processing...
                                            </>
                                          ) : (
                                            "Replace"
                                          )}
                                        </button>
                                      </div>
                                    ) : (
                                      <p className="text-muted small">
                                        Return/Replace not available
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="order-footer">
                          <div className="footer-left">
                            <p className="return-exchange-date">
                              Return / Exchange till{" "}
                              {calculateReturnDate(order.created_at)}
                            </p>
                            {order.coupon && (
                              <p className="coupon-info">
                                Coupon Applied: {order.coupon} (₹
                                {parseFloat(
                                  order.coupon_amount
                                ).toLocaleString()}
                                )
                              </p>
                            )}
                          </div>
                          <div className="footer-right">
                            <p className="order-total">
                              Total: ₹
                              {calculateOrderTotal(order).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Return/Replace Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Request{" "}
                  {modalData.requestType === "return" ? "Return" : "Replace"} -{" "}
                  {modalData.productName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  disabled={processingRequest}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">Select Reason:</label>
                  {reasonOptions.map((reason, index) => (
                    <div key={index} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="reasonRadio"
                        id={`reason-${index}`}
                        value={reason}
                        checked={selectedReason === reason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        disabled={processingRequest}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`reason-${index}`}
                      >
                        {reason === "other" ? "Other" : reason}
                      </label>
                    </div>
                  ))}
                </div>

                {selectedReason === "other" && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Please specify reason:
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter your reason here..."
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      disabled={processingRequest}
                    ></textarea>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                  disabled={processingRequest}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitRequest}
                  disabled={
                    processingRequest ||
                    !selectedReason ||
                    (selectedReason === "other" && !customReason.trim())
                  }
                >
                  {processingRequest ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Submitting...
                    </>
                  ) : (
                    `Submit ${
                      modalData.requestType === "return" ? "Return" : "Replace"
                    } Request`
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
