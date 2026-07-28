import axios from "axios";

const BASE_URL = "http://localhost:5000";

const UserService = () => {

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ================= PRODUCTS =================

  const getProducts = async () => {
    const res = await axios.get(`${BASE_URL}/api/products`);
    return res.data;
  };

  const getUserProducts = async () => {
    const res = await axios.get(`${BASE_URL}/api/products/user`);
    return res.data;
  };

  const getProductById = async (id) => {
    const res = await axios.get(`${BASE_URL}/api/products/${id}`);
    return res.data;
  };

  const updateProduct = async (id, formData) => {
    const res = await axios.put(
      `${BASE_URL}/api/products/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  };

  const deleteProducts = async (id) => {
    const res = await axios.delete(
      `${BASE_URL}/api/products/${id}`,
      authHeader
    );
    return res.data;
  };

  const toggleProductBlock = async (id) => {
    const res = await axios.put(
      `${BASE_URL}/api/products/block/${id}`,
      {},
      authHeader
    );
    return res.data;
  };

  const importProducts = async (formData) => {
    const res = await axios.post(
      `${BASE_URL}/api/products/import`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  };

  // ================= USERS =================

  const getAllUsers = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/users/all`,
      authHeader
    );
    return res.data;
  };

  const getProfile = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/users/profile`,
      authHeader
    );
    return res.data;
  };

  const updateProfile = async (userData) => {
    const res = await axios.put(
      `${BASE_URL}/api/users/profile`,
      userData,
      authHeader
    );
    return res.data;
  };

  // ================= ORDERS =================

  const getAllOrders = async () => {
    const res = await axios.get(
      `${BASE_URL}/api/orders`,
      authHeader
    );
    return res.data;
  };

  const updateOrderStatus = async (id, status) => {
    const res = await axios.put(
      `${BASE_URL}/api/orders/${id}`,
      { status },
      authHeader
    );
    return res.data;
  };

  // ================= IMAGE =================

  const getImageUrl = (path) => {
    if (!path) {
      return "https://via.placeholder.com/300x300?text=No+Image";
    }

    if (path.startsWith("http")) {
      return path;
    }

    const cleanPath = path.replace(/^\/+/, "");

    if (cleanPath.startsWith("uploads/")) {
      return `${BASE_URL}/${cleanPath}`;
    }

    return `${BASE_URL}/uploads/${cleanPath}`;
  };

  // ================= RETURN =================

  return {
    // Products
    getProducts,
    getUserProducts,
    getProductById,
    updateProduct,
    deleteProducts,
    toggleProductBlock,
    importProducts,

    // Users
    getAllUsers,
    getProfile,
    updateProfile,

    // Orders
    getAllOrders,
    updateOrderStatus,

    // Helper
    getImageUrl,
  };
};

export default UserService;