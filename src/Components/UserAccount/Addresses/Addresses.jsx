import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addresses.css";
import { toast, ToastContainer } from "react-toastify";
import config from "../../../Config/config.json";

const axiosInstance = axios.create({
  baseURL: config.API_URL_POST,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address_type: "home",
    phone: "",
    address: "",
    state: "",
    zipcode: "",
    status: "active",
  });

  useEffect(() => {
    fetchAddresses();
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

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address_type: "home",
      phone: "",
      address: "",
      state: "",
      zipcode: "",
      status: "active",
    });
    setEditingAddress(null);
  };

  const handleOpenAddrModal = (e, address = null) => {
    e.preventDefault();
    if (address) {
      setEditingAddress(address);
      setFormData({ ...address });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseAddrModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submitData = editingAddress
        ? { address_id: editingAddress.id, ...formData }
        : formData;
      await axiosInstance.post("/add-address", submitData);
      await fetchAddresses();
      handleCloseAddrModal();
      editingAddress
        ? toast.success("Address Updated")
        : toast.success("New Address Added");
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (addressId) => {
    try {
      setLoading(true);
      await axiosInstance.post("/add-address", {
        address_id: addressId,
        status: "active",
      });
      await fetchAddresses();
      toast.success("Changed Default Adress");
    } catch (error) {
      console.error("Error setting default address:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-container">
      <ToastContainer />
      {loading && <div className="loading">Loading addresses...</div>}
      <div className="address-grid">
        <div
          className="address-card add-new"
          onClick={(e) => {
            if (addresses.length != 5) {
              return handleOpenAddrModal(e);
            }
            toast.success("You’ve already added 5 addresses.");
          }}
        >
          <div className="add-icon">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <h3>Add New Address</h3>
          <p>Create a new delivery address</p>
          <p>
            <small>Maximum 5 addresses allowed.</small>
          </p>
        </div>

        {/* Existing Address Cards */}
        {addresses.map((address) => (
          <div
            className={`address-card ${
              address.status === "active" ? "default" : ""
            }`}
            key={address.id}
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
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                )}
                <span>
                  {address.address_type.charAt(0).toUpperCase() +
                    address.address_type.slice(1)}
                </span>
              </div>
              <button
                className="edit-btn"
                onClick={(e) => handleOpenAddrModal(e, address)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
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

            <div className="card-footer">
              {address.status !== "active" ? (
                <button
                  className="set-default-btn"
                  onClick={() => setDefaultAddress(address.id)}
                >
                  Set as Default
                </button>
              ) : (
                <span className="default-badge">Default Address</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingAddress ? "Edit Address" : "Add New Address"}</h3>
              <button className="close-btn" onClick={handleCloseAddrModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitAddress}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address Type</label>
                  <select
                    name="address_type"
                    value={formData.address_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="billing">Billing</option>
                    <option value="shipping">Shipping</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1-202-555-0118"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Full Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Road No. 13/x, House no. 1320/C, Flat No. 5D"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    placeholder="120712"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseAddrModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : editingAddress
                    ? "Update Address"
                    : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
