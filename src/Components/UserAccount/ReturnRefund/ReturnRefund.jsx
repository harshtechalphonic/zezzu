import React, { useState, useEffect } from 'react'
import './ReturnRefund.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../../Config/config.json'

export default function ReturnRefund() {
  const [returnRequests, setReturnRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchReturnRequests()
  }, [])

  const fetchReturnRequests = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      const response = await axios.get(`${config.API_URL_POST}/return-replace-order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.status === 'success') {
        setReturnRequests(response.data.data)
      } else {
        setError(response.data.message || 'Failed to fetch return requests')
      }
    } catch (err) {
      console.error('Error fetching return requests:', err)
      setError('Failed to load return requests. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pending' },
      approved: { class: 'status-approved', text: 'Approved' },
      rejected: { class: 'status-rejected', text: 'Rejected' },
      processed: { class: 'status-processed', text: 'Processed' }
    }

    const config = statusConfig[status] || { class: 'status-pending', text: status }
    return <span className={`status-badge ${config.class}`}>{config.text}</span>
  }

  const getRequestTypeBadge = (type) => {
    return (
      <span className={`request-type-badge ${type === 'return' ? 'return-badge' : 'replace-badge'}`}>
        {type === 'return' ? 'Return' : 'Replace'}
      </span>
    )
  }

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-IN', options)
  }

  const formatDateTime = (dateString) => {
    const options = { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('en-IN', options)
  }

  if (loading) {
    return (
      <div className="orders__box">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your return requests...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="orders__box">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchReturnRequests} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='orders__box return_refund'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className="page-header mb-4">
            <h2>Return & Replace Requests</h2>
            <p className="text-muted">Manage your product return and replacement requests</p>
          </div>

          {returnRequests.length === 0 ? (
            <div className="no-requests">
              <div className="no-requests-icon">📦</div>
              <h3>No return requests found</h3>
              <p>You haven't submitted any return or replacement requests yet.</p>
            </div>
          ) : (
            <div className="return-requests-list">
              {returnRequests.map((request) => (
                <div key={request.id} className="request-card card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className='request-product d-flex align-items-start gap-4'>
                          <div className='request-product-img'>
                            <img 
                              src={request.product_image ? `${config.IMAGE_URL}/${request.product_image}` : "/PersonalCare.png"} 
                              alt={request.product_name}
                              onError={(e) => {
                                e.target.src = "/PersonalCare.png"
                              }}
                            />
                          </div>
                          <div className='request-product-content flex-grow-1'>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h5 className="product-name mb-0">{request.product_name}</h5>
                              <div className="d-flex gap-2">
                                {getRequestTypeBadge(request.request_type)}
                                {getStatusBadge(request.status)}
                              </div>
                            </div>
                            
                            <p className="product-info text-muted mb-3">
                              {request.product_infromation}
                            </p>

                            <div className="request-details">
                              <div className="row">
                                <div className="col-md-6">
                                  <p className="detail-item">
                                    <span className="detail-label">Request ID:</span>
                                    <span className="detail-value">#{request.id}</span>
                                  </p>
                                  <p className="detail-item">
                                    <span className="detail-label">Order ID:</span>
                                    <span className="detail-value">#{request.order_id}</span>
                                  </p>
                                  <p className="detail-item">
                                    <span className="detail-label">Product ID:</span>
                                    <span className="detail-value">#{request.product_id}</span>
                                  </p>
                                </div>
                                <div className="col-md-6">
                                  <p className="detail-item">
                                    <span className="detail-label">Amount:</span>
                                    <span className="detail-value">₹{parseFloat(request.amount).toLocaleString()}</span>
                                  </p>
                                  <p className="detail-item">
                                    <span className="detail-label">Quantity:</span>
                                    <span className="detail-value">{request.quantity}</span>
                                  </p>
                                  <p className="detail-item">
                                    <span className="detail-label">Requested On:</span>
                                    <span className="detail-value">{formatDateTime(request.requested_at)}</span>
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="reason-section mt-3">
                              <p className="detail-item">
                                <span className="detail-label">Reason:</span>
                                <span className="detail-value">{request.reason}</span>
                              </p>
                            </div>

                            {/* Product Attributes */}
                            {request.attribute && (
                              <div className="product-attributes mt-3">
                                <h6>Product Specifications:</h6>
                                <div className="attributes-grid">
                                  {Object.entries(JSON.parse(request.attribute)).map(([key, value]) => (
                                    <div key={key} className="attribute-item">
                                      <span className="attribute-key">{key}:</span>
                                      <span className="attribute-value">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Admin Notes */}
                            {request.admin_note && (
                              <div className="admin-notes mt-3">
                                <p className="detail-item">
                                  <span className="detail-label text-warning">Admin Note:</span>
                                  <span className="detail-value">{request.admin_note}</span>
                                </p>
                              </div>
                            )}

                            {/* Timeline */}
                            <div className="request-timeline mt-4">
                              <h6>Request Timeline:</h6>
                              <div className="timeline">
                                <div className="timeline-item">
                                  <span className="timeline-date">{formatDateTime(request.requested_at)}</span>
                                  <span className="timeline-event">Request Submitted</span>
                                </div>
                                {request.processed_at && (
                                  <div className="timeline-item">
                                    <span className="timeline-date">{formatDateTime(request.processed_at)}</span>
                                    <span className="timeline-event">Request Processed</span>
                                  </div>
                                )}
                                {request.updated_at !== request.requested_at && (
                                  <div className="timeline-item">
                                    <span className="timeline-date">{formatDateTime(request.updated_at)}</span>
                                    <span className="timeline-event">Status Updated</span>
                                  </div>
                                )}
                                {request.rejected_at && (
                                  <div className="timeline-item">
                                    <span className="timeline-date">{formatDateTime(request.rejected_at)}</span>
                                    <span className="timeline-event">Request Rejected</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-lg-4">
                        <div className="request-sidebar">
                          {/* Payment Information */}
                          {request.payment_id && (
                            <div className="sidebar-section">
                              <h6>Payment Information</h6>
                              <div className="sidebar-content">
                                <p className="detail-item">
                                  <span className="detail-label">Payment ID:</span>
                                  <span className="detail-value small">{request.payment_id}</span>
                                </p>
                                {request.refund_transaction_id && (
                                  <p className="detail-item">
                                    <span className="detail-label">Refund Txn ID:</span>
                                    <span className="detail-value small">{request.refund_transaction_id}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Vendor Information */}
                          <div className="sidebar-section">
                            <h6>Vendor Information</h6>
                            <div className="sidebar-content">
                              <p className="detail-item">
                                <span className="detail-label">Vendor ID:</span>
                                <span className="detail-value">#{request.vendor_id}</span>
                              </p>
                            </div>
                          </div>

                          {/* Request Summary */}
                          <div className="sidebar-section">
                            <h6>Request Summary</h6>
                            <div className="sidebar-content">
                              <div className="summary-item">
                                <span>Type:</span>
                                <strong className={`${request.request_type === 'return' ? 'text-danger' : 'text-warning'}`}>
                                  {request.request_type === 'return' ? 'Return' : 'Replacement'}
                                </strong>
                              </div>
                              <div className="summary-item">
                                <span>Status:</span>
                                <strong className={`${
                                  request.status === 'approved' ? 'text-success' : 
                                  request.status === 'rejected' ? 'text-danger' : 
                                  'text-warning'
                                }`}>
                                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                </strong>
                              </div>
                              <div className="summary-item">
                                <span>Refund Amount:</span>
                                <strong>₹{parseFloat(request.amount).toLocaleString()}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}