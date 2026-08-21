import React from 'react'
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { MdManageAccounts } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import "../admin/adminside.css";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {

  const navigate = useNavigate();
  
  return (
    <div className="dashtar">

      <h3>Dashtar</h3>

      <div className="dashtar-list">

        <div className="dashtar-list1">
          <NavLink to="/admin/dashboard">
            <MdOutlineDashboard />
            Dashboard
          </NavLink>
        </div>

        <div className="dashtar-list1">
          <NavLink to="/admin/products">
            <AiOutlineProduct />
            Products
          </NavLink>
        </div>

        <div className="dashtar-list1">
          <NavLink to="/admin/categories">
            <MdCategory />
            Categories
          </NavLink>
        </div>

        <div className="dashtar-list1">
          <NavLink to="/admin/customers">
            <MdManageAccounts />
            Customers
          </NavLink>
        </div>

        <div className="dashtar-list1">
          <NavLink to="/admin/orders">
            <FiShoppingCart />
            Orders
          </NavLink>
        </div>

      </div>

   <div className="logout-btn-admin">
  <button
    onClick={() => {
      console.log("LOGOUT CLICKED");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login");
    }}
  >
    Log Out
  </button>
</div>

    </div>
  )
}

export default AdminSidebar