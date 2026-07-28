import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./products.css";
import { Link } from "react-router-dom";
import UserService from "../../services/user-api-service/UserService";

// ================= IMAGE HELPER =================
const BASE_URL = "http://localhost:5000";

const getImageUrl = (path) => {
  if (!path) {
    return "https://via.placeholder.com/300x300?text=No+Image";
  }

  if (path.startsWith("http")) return path;

  const cleanPath = path.replace(/^\/+/, "");

  return `${BASE_URL}/${cleanPath}`;
};

function AdminPage() {
  const {
    deleteProducts,
    getProducts,
    toggleProductBlock,
    importProducts,
  } = UserService();

  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [showProduct, setShowProduct] = useState(null);
  const [importFile, setImportFile] = useState(null);

  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      const res = await getProducts();

      setAllProducts(res);

      const uniqueCategories = [
        ...new Set(res.map((item) => item.category)),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    try {
      await deleteProducts(id);

      toast.info("Product Deleted");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= FILTER =================
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;

    const matchesSearch = product.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ================= IMPORT =================
  const handleImport = async () => {
    if (!importFile) {
      toast.info("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", importFile);

    try {
      await importProducts(formData);

      toast.success("Products Imported Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= BLOCK / UNBLOCK =================
  const handleToggleBlock = async (productId) => {
    try {
      await toggleProductBlock(productId);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-content">
      <div className="product-card">
        {/* TOP ACTIONS */}
        <div className="top-actions">
          <div className="left-btns">
            <button className="light-btn">Export</button>

            <button
              className="light-btn"
              onClick={() =>
                document.getElementById("importFile").click()
              }
            >
              Import
            </button>

            <input
              type="file"
              id="importFile"
              accept=".xlsx,.xls,.csv"
              style={{ display: "none" }}
              onChange={(e) => setImportFile(e.target.files[0])}
            />

            <button
              className="light-btn"
              onClick={handleImport}
            >
              Upload
            </button>
          </div>

<Link to="/admin/add-product">
            <button className="add-btn">
              + Add Product
            </button>
          </Link>
        </div>

        {/* FILTERS */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* TABLE */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Sale Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.title}</td>

                    <td>{product.category}</td>

                    <td>₹ {product.price}</td>

                    <td>₹ {product.salePrice}</td>

                    <td>{product.quantity}</td>

                    <td>
                      <div className="action-btns">
                        <Link to={`/admin/edit-product/${product._id}`}>
                          <button className="edit-btn">
                            Edit
                          </button>
                        </Link>

                        <button
                          className="show-btn"
                          onClick={() => {
                            console.log(
                              "PRODUCT DATA:",
                              product
                            );
                            setShowProduct(product);
                          }}
                        >
                          Show
                        </button>

                        <button
                          className="block-btn-product"
                          onClick={() =>
                            handleToggleBlock(product._id)
                          }
                        >
                          {product.isBlocked
                            ? "Unblock"
                            : "Block"}
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="empty-text"
                  >
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ================= SHOW PRODUCT MODAL ================= */}
          {showProduct && (
            <div
              className="show-modal"
              onClick={() => setShowProduct(null)}
            >
              <div
                className="show-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
<div className="modal-image-box">
  <img
    className="modal-product-image"
    src={
      showProduct?.images?.length
        ? `http://localhost:5000/uploads/${showProduct.images[0]}`
        : "https://via.placeholder.com/600x600?text=No+Image"
    }
    alt={showProduct?.title}
    onError={(e) => {
      e.target.src =
        "https://via.placeholder.com/600x600?text=No+Image";
    }}
  />
</div>                {/* TITLE */}
                <h2>{showProduct?.title}</h2>

                {/* DETAILS */}
                <div className="modal-details">
                  <p>
                    <strong>Brand:</strong>{" "}
                    {showProduct?.brand ||
                      "Fragranzia"}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {showProduct?.category}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹
                    {showProduct?.price}
                  </p>

                  <p>
                    <strong>Sale Price:</strong> ₹
                    {showProduct?.salePrice}
                  </p>

                  <p>
                    <strong>Stock:</strong>{" "}
                    {showProduct?.quantity}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        showProduct?.isBlocked
                          ? "status-blocked"
                          : "status-active"
                      }
                    >
                      {showProduct?.isBlocked
                        ? "Blocked"
                        : "Active"}
                    </span>
                  </p>
                </div>

                {/* CLOSE */}
                <button
  className="product-close-btn"
  onClick={() => setShowProduct(null)}
>
  Close
</button>
              </div>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="pagination">
          <button className="page-btn">
            Previous
          </button>

          <p>Page 1 of 1</p>

          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;