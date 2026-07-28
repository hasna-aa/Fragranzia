import React, { useEffect, useState } from "react";
import UserService from "../../services/user-api-service/UserService";
import "./customers.css";

const Customers = () => {
  const { getAllUsers } = UserService();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      console.log("Users:", data);
      setUsers(data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customers-page">
      <div className="customers-header">
        <h2>Customers</h2>
        <span className="customer-count">
          Total Users: {users.length}
        </span>
      </div>

      <div className="customers-table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="customer-info">
                      <div className="customer-avatar">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <div className="customer-name">
                          {user.name || "Unknown User"}
                        </div>

                        <div className="customer-id">
                          ID: {user._id?.slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="email-cell">
                    {user.email || "No email"}
                  </td>

                  <td>
                    <span
                      className={`role-badge ${user.role === "admin" || user.isAdmin
                          ? "admin"
                          : "customer"
                        }`}
                    >
                      {user.role === "admin" || user.isAdmin
                        ? "Admin"
                        : "Customer"}
                    </span>
                  </td>

                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;