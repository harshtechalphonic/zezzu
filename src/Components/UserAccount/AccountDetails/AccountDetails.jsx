import React, { useState, useEffect } from "react";
import "./AccountDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import config from "../../../Config/config.json";
import axios from "axios";

export default function AccountDetails({ user_details }) {
  console.log("user_details", JSON.stringify(user_details));
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [preview, setPreview] = useState("http://i.pravatar.cc/500?img=7");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // Populate form with user data when component loads or user_details changes
  useEffect(() => {
    if (user_details) {
      // Split name into first and last name if available
      const nameParts = user_details.name
        ? user_details.name.split(" ")
        : ["", ""];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      setFormData({
        firstName: firstName,
        lastName: lastName,
        phone: user_details.phone || "",
        email: user_details.email || "",
      });

      // Set profile image if available
      if (user_details.image) {
        setPreview(user_details.image);
      }
    }
  }, [user_details]);

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case "password":
        setShowPassword((prev) => !prev);
        break;
      case "newPassword":
        setShowNewPassword((prev) => !prev);
        break;
      case "confirmPassword":
        setShowConfirmPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (newPassword && e.target.value !== newPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateAccountAPI = async () => {
    try {
      // Prepare the name by combining first and last name
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      // Prepare payload according to API requirements
      const payload = {
        user_id: user_details.id, // Required field
        name: fullName || user_details.name, // Use existing name if no change
        phone: formData.phone,
        email: formData.email,
        ...(currentPassword && {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      };

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${config.API_URL_POST}/profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      // Check if there are any profile changes
      const hasProfileChanges =
        formData.firstName !==
          (user_details.name ? user_details.name.split(" ")[0] : "") ||
        formData.lastName !==
          (user_details.name
            ? user_details.name.split(" ").slice(1).join(" ")
            : "") ||
        formData.phone !== (user_details.phone || "") ||
        formData.email !== (user_details.email || "") ||
        formData.address !== (user_details.address || "") ||
        formData.country !== (user_details.country || "") ||
        formData.state !== (user_details.state || "") ||
        formData.zip !== (user_details.zipcode || "");

      const hasPasswordChange =
        currentPassword && newPassword && confirmPassword && !passwordError;

      if (!hasProfileChanges && !hasPasswordChange) {
        alert("No changes to save.");
        return;
      }

      const result = await updateAccountAPI();

      if (result.status) {
        alert(result.message || "Profile updated successfully!");

        // Clear password fields after successful update
        if (hasPasswordChange) {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      } else {
        alert(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred while saving. Please try again.");
      }
    }
  };

  return (
    <div className="AccountDetails">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Your Profile</li>
            </ul>
            <div className="row">
              <div className="col-12">
                <div className="card-body px-5">
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="+1-202-555-0118"
                      />
                    </div>
                    <div className="col-lg-6 mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-control"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>

                  <div className="card mt-4">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Change Password</li>
                    </ul>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12 mb-3">
                          <label className="form-label">Current Password</label>
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control"
                              placeholder="Current Password"
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                            />
                            <span
                              className="input-group-text"
                              onClick={() =>
                                togglePasswordVisibility("password")
                              }
                            >
                              <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-12 mb-3">
                          <label className="form-label">New Password</label>
                          <div className="input-group">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              className="form-control"
                              placeholder="New Password"
                              value={newPassword}
                              onChange={handlePasswordChange}
                            />
                            <span
                              className="input-group-text"
                              onClick={() =>
                                togglePasswordVisibility("newPassword")
                              }
                            >
                              <FontAwesomeIcon
                                icon={showNewPassword ? faEyeSlash : faEye}
                              />
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-12 mb-3">
                          <label className="form-label">Confirm Password</label>
                          <div className="input-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="form-control"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={handleConfirmPasswordChange}
                            />
                            <span
                              className="input-group-text"
                              onClick={() =>
                                togglePasswordVisibility("confirmPassword")
                              }
                            >
                              <FontAwesomeIcon
                                icon={showConfirmPassword ? faEyeSlash : faEye}
                              />
                            </span>
                          </div>
                          {passwordError && (
                            <p className="text-danger">{passwordError}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 profile-save_btn">
                    <button type="button" onClick={handleSave}>
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
