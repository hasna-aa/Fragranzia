import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const OrderService = () => {
  const axiosPrivate = useAxiosPrivate();

  // Base URL
  const BASE_URL = "http://localhost:5000";

 // Image URL Helper

const getImageUrl = (path) => {
  if (!path || path.trim() === "") return null;

  if (path.startsWith("http")) return path;

  return `${BASE_URL}/uploads/${path}`;
};
  // ================= ORDERS =================

  const createOrder = async (orderData) => {
    const res = await axiosPrivate.post("/api/orders", orderData);
    return res.data;
  };

  const getOrders = async () => {
    const res = await axiosPrivate.get("/api/orders");
    return res.data;
  };

  const getOrderById = async (orderId) => {
    const res = await axiosPrivate.get(`/api/orders/${orderId}`);
    return res.data;
  };

  const cancelOrder = async (orderId) => {
    const res = await axiosPrivate.put(`/api/orders/${orderId}/cancel`);
    return res.data;
  };

  const deleteOrder = async (orderId) => {
    const res = await axiosPrivate.delete(`/api/orders/${orderId}`);
    return res.data;
  };

  return {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder,
    deleteOrder,
    getImageUrl,
  };
};

export default OrderService;