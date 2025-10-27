import React, { useState, useEffect } from 'react'
import './Orders.css'
import axios from 'axios';
import config from '../../../Config/config.json';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeFilter, setTimeFilter] = useState('last_month');

  useEffect(() => {
    fetchOrders();
  }, [timeFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${config.API_URL_POST}/user-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          filter: timeFilter // You might need to adjust this based on your API
        }
      });

      if (response.data.status) {
        setOrders(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const calculateReturnDate = (orderDate) => {
    const returnDate = new Date(orderDate);
    returnDate.setDate(returnDate.getDate() + 30); // 30 days return policy
    return formatDate(returnDate);
  };

  const getOrderStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pending' },
      processing: { class: 'status-processing', text: 'Processing' },
      completed: { class: 'status-completed', text: 'Completed' },
      cancelled: { class: 'status-cancelled', text: 'Cancelled' },
      shipped: { class: 'status-shipped', text: 'Shipped' },
      delivered: { class: 'status-delivered', text: 'Delivered' }
    };

    const config = statusConfig[status] || { class: 'status-pending', text: status };
    return <span className={`order-status ${config.class}`}>{config.text}</span>;
  };

  const getPaymentStatusBadge = (status) => {
    return (
      <span className={`payment-status ${status === 'success' ? 'payment-success' : 'payment-failed'}`}>
        {status === 'success' ? 'Paid' : 'Failed'}
      </span>
    );
  };

  const calculateOrderTotal = (order) => {
    return order.items.reduce((total, item) => {
      return total + (parseFloat(item.sale_price) * item.quantity);
    }, 0);
  };

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
          <button onClick={fetchOrders} className="retry-btn">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className='orders__box'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='order-titel d-flex align-items-center justify-content-between mb-4'>
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
                          <p className="order-id">Order ID: {order.invoice_number}</p>
                          <p className="order-date">
                            Ordered on: {formatDate(order.created_at)}
                          </p>
                        </div>
                        <div className="order-status-info">
                          {getOrderStatusBadge(order.order_status)}
                          {getPaymentStatusBadge(order.payment_status)}
                        </div>
                      </div>

                      <div className="order-items">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="order-item d-flex align-items-center gap-4">
                            <div className='order-item-img'>
                              <img 
                                src="/PersonalCare.png" 
                                alt={item.product_name}
                                onError={(e) => {
                                  e.target.src = '/placeholder-product.png';
                                }}
                              />
                            </div>
                            <div className='order-item-content flex-grow-1'>
                              <h5 className='product-name'>{item.product_name}</h5>
                              <div className="item-details">
                                <p className="quantity">Quantity: {item.quantity}</p>
                                <p className="price">
                                  ₹{(parseFloat(item.sale_price) * item.quantity).toLocaleString()}
                                </p>
                              </div>
                              {item.product_attributes && (
                                <div className="product-attributes">
                                  {Object.entries(JSON.parse(item.product_attributes)).map(([key, value]) => (
                                    <span key={key} className="attribute-tag">
                                      {key}: {value}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-footer">
                        <div className="footer-left">
                          <p className='return-exchange-date'>
                            Return / Exchange till {calculateReturnDate(order.created_at)}
                          </p>
                          {order.coupon && (
                            <p className="coupon-info">
                              Coupon Applied: {order.coupon} (₹{parseFloat(order.coupon_amount).toLocaleString()})
                            </p>
                          )}
                        </div>
                        <div className="footer-right">
                          <p className="order-total">
                            Total: ₹{calculateOrderTotal(order).toLocaleString()}
                          </p>
                          <div className="order-actions">
                            <button className="btn btn-outline-primary btn-sm">View Details</button>
                            <button className="btn btn-outline-secondary btn-sm">Track Order</button>
                          </div>
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
  )
}