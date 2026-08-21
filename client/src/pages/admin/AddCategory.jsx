import React, { useState } from "react";
import { toast } from "react-toastify";
import "./addcategory.css";
import axios from "axios";
import { FaFolderPlus, FaSave, FaTimes } from "react-icons/fa";

const API_URL = "http://localhost:5000/api/categories";

function AddCategory() {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const onHandleChange = (e) => {
    setCategoryData({
      ...categoryData,
      [e.target.name]: e.target.value,
    });
  };

  const onHandleSubmit = async () => {
    try {
      const res = await axios.post(API_URL, categoryData);

      console.log(res.data);

      toast.success("Category Added Successfully");

      setCategoryData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.log("Add category error:", error);

      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="add-category-page">
      <div className="add-category-card">

        {/* PAGE TITLE */}
        <div className="page-title">
          <div className="title-icon">
            <FaFolderPlus />
          </div>

          <div>
            <h2>Add Category</h2>
            <p className="sub-text">
              Create a new category for your products
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="category-form">

          <div className="form-group">
            <label>
              Category Name <span className="required">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={onHandleChange}
              placeholder="Enter category name"
            />
          </div>

        </div>

        {/* DESCRIPTION */}
        <div className="description-box">
          <label>Description</label>

          <textarea
            rows="6"
            name="description"
            value={categoryData.description}
            onChange={onHandleChange}
            placeholder="Enter category description..."
          />
        </div>

        {/* BUTTONS */}
        <div className="submit-btn">

          <button
            className="cancel-btn"
            type="button"
            onClick={() => window.history.back()}
          >
            <FaTimes />
            Cancel
          </button>

          <button
            className="add-category-btn"
            type="button"
            onClick={onHandleSubmit}
          >
            <FaSave />
            Add Category
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddCategory;