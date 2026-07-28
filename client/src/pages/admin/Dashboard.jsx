import React, { useEffect, useState } from "react";
import UserService from "../../services/user-api-service/UserService";
import "./dashboard.css";

const Dashboard = () => {
  const userService = UserService();

  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    blockedProducts: 0,
    totalStock: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await userService.getProducts();

        setStats({
          totalProducts: products?.length || 0,
          activeProducts:
            products?.filter((p) => !p.isBlocked).length || 0,
          blockedProducts:
            products?.filter((p) => p.isBlocked).length || 0,
          totalStock:
            products?.reduce(
              (sum, p) => sum + Number(p.quantity || 0),
              0
            ) || 0,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="analytics-row">
  <div className="analytics-box">
    <span>Inventory Health</span>
    <strong>
      {stats.totalStock > 100 ? "Excellent" : "Moderate"}
    </strong>
  </div>

  <div className="analytics-box">
    <span>Active Ratio</span>
    <strong>
      {stats.totalProducts
        ? Math.round(
            (stats.activeProducts / stats.totalProducts) * 100
          )
        : 0}
      %
    </strong>
  </div>

  <div className="analytics-box">
    <span>Blocked Ratio</span>
    <strong>
      {stats.totalProducts
        ? Math.round(
            (stats.blockedProducts / stats.totalProducts) * 100
          )
        : 0}
      %
    </strong>
  </div>
</div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>

        <div className="dashboard-card">
          <h3>Active Products</h3>
          <p>{stats.activeProducts}</p>
        </div>

        <div className="dashboard-card">
          <h3>Blocked Products</h3>
          <p>{stats.blockedProducts}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Stock</h3>
          <p>{stats.totalStock}</p>
        </div>
      </div>

      <div className="dashboard-info">
        <h3>Store Status</h3>
        <p>
          Products added from the admin panel are connected to the user side
          through the shared <strong>/api/products</strong> API.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;