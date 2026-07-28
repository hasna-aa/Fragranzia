import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./editproduct.css";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../services/user-api-service/UserService";

function EditProduct() {
  const {
    getProductById,
    updateProduct,
    getImageUrl,
  } = UserService();

  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [productData, setProductData] = useState({
    title: "",
    price: "",
    salePrice: "",
    quantity: "",
    category: "",
    offer: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const product = await getProductById(id);

      console.log(product);

      setProductData({
        title: product.title || "",
        price: product.price || "",
        salePrice: product.salePrice || "",
        quantity: product.quantity || "",
        category: product.category || "",
        offer: product.offer || "",
        description: product.description || "",
        images: product.images || [],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("title", productData.title);
      formData.append("price", productData.price);
      formData.append("salePrice", productData.salePrice);
      formData.append("quantity", productData.quantity);
      formData.append("category", productData.category);
      formData.append("offer", productData.offer);
      formData.append("description", productData.description);

      if (image) {
        formData.append("images", image);
      }

      await updateProduct(id, formData);

      toast.success("Product Updated Successfully");

      navigate("/adminpage");
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="edit-product-page">
      <div className="edit-product-card">

        <h1>Edit Product</h1>


        <div className="edit-form">

          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={productData.title}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="salePrice"
            placeholder="Sale Price"
            value={productData.salePrice}
            onChange={handleChange}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={productData.quantity}
            onChange={handleChange}
          />

          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="arabic">Arabic</option>
            <option value="luxury">Luxury</option>
            <option value="pocket">Pocket</option>
            <option value="oud">Oud</option>
            <option value="musk">Musk</option>
            <option value="floral">Floral</option>
          </select>

          <input
            type="text"
            name="offer"
            placeholder="Offer"
            value={productData.offer}
            onChange={handleChange}
          />

          <textarea
            rows="6"
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <button
            className="update-btn"
            onClick={handleUpdate}
          >
            Update Product
          </button>

        </div>
      </div>
    </div>
  );
}

export default EditProduct;