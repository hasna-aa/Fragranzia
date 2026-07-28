import React, { useState } from "react";
import { toast } from "react-toastify";
import "./addcategory.css";
import axios from "axios";
import UserService from "../../services/user-api-service/UserService";

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

    const res = await axios.post(

      API_URL,

      categoryData

    );

    console.log(res.data);

    toast.info("Category Added Successfully");

    setCategoryData({

      name: "",
      description: "",
      

    });

  } catch (error) {

    console.log(error);

    toast.info("Something went wrong");

  }

};



  return (

    <div className="add-category-page">

      <div className="add-category-card">

        <h2>Add Category</h2>

        <p className="sub-text">
          Add your category information here
        </p>

        <div className="category-form">

          <div className="form-group">

            <label>Category Name</label>

            <input
              type="text"
              name="name"
              value={categoryData.name}
              onChange={onHandleChange}
              placeholder="Enter category name"
            />

          </div>


        </div>

        <div className="description-box">

          <label>Description</label>

          <textarea
            rows="6"
            name="description"
            value={categoryData.description}
            onChange={onHandleChange}
            placeholder="Enter category description"
          />

        </div>

        <div className="submit-btn">

          <button className="cancel-btn">
            Cancel
          </button>

          <button
            className="add-category-btn"
            onClick={onHandleSubmit}
          >
            Add Category
          </button>

        </div>

      </div>

    </div>

  );

}

export default AddCategory;