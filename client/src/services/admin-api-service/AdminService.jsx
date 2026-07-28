import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AdminService = () => {
  const axiosPrivate = useAxiosPrivate();

  const BASE_URL = "http://localhost:5000";

  // Image URL Helper
  const getImageUrl = (path) => {
    if (!path) return "";
    return `${BASE_URL}/uploads/${path}`;
  };

  // Get all products
  const getProducts = async () => {
    const res = await axiosPrivate.get("/api/products");
    return res.data;
  };

  // Delete product
  const deleteProducts = async (id) => {
    const res = await axiosPrivate.delete(`/api/products/${id}`);
    return res.data;
  };

  // Block / Unblock product
  const toggleProductBlock = async (id) => {
    const res = await axiosPrivate.put(`/api/products/${id}/block`);
    return res.data;
  };

  // Import products
  const importProducts = async (formData) => {
    const res = await axiosPrivate.post(
      "/api/products/import",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  };

  return {
    getProducts,
    deleteProducts,
    toggleProductBlock,
    importProducts,
    getImageUrl,
  };
};

export default AdminService;
