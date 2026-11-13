import React, { useState } from "react";
import "../../../style/profile.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

import ProfileInfo from "./ProfileInfo";
import AddressTab from "./AddressTab";
import OrdersTab from "./OrdersTab";

function Profile() {
  const navigate = useNavigate();
  const { logoutAuth } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    if (logoutAuth) {
      logoutAuth();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    }
    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-header-left">
          <h2>My Profile</h2>
          <p>Manage your account</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* TABS */}
      <div className="profile-tabs">
        <button
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          className={activeTab === "address" ? "active" : ""}
          onClick={() => setActiveTab("address")}
        >
          Address
        </button>

        <button
          className={activeTab === "orders" ? "active" : ""}
          onClick={() => setActiveTab("orders")}
        >
          My Orders
        </button>
      </div>

      {/* CONTENT */}
      <div className="profile-content">
        {activeTab === "profile" && <ProfileInfo />}
        {activeTab === "address" && <AddressTab />}
        {activeTab === "orders" && <OrdersTab />}
      </div>

    </div>
  );
}

export default Profile;