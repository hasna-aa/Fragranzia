import React, { useEffect, useState } from "react";
import OrderService from "../../../services/user-api-service/OrderService";
import "../../../style/myorders.css";

function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { getOrders, getImageUrl } = OrderService();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      setOrders(res || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-card">
        <h3>My Orders</h3>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="profile-card">
      <h3>My Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">

              {/* Header */}
              <div className="order-header">
                <div>
                  <h4>Order #{order._id.slice(-6)}</h4>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`status-badge ${order.status?.toLowerCase()}`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              {/* Items */}
              <div className="order-items">
                {order.items?.map((item, index) => (
                  <div key={index} className="order-item">

<img
  src={
    item.product?.image
      ? getImageUrl(item.product.image)
      : "/no-image.png"
  }
  alt={item.product?.title || "Product"}
  className="order-item-image"
  onError={(e) => {
    e.target.src = "/no-image.png";
  }}
/>
                    <div className="order-item-info">
                      <h5>{item.product?.title || "Product"}</h5>
                      <p>Quantity: {item.quantity}</p>
                      <p>
                        Price: ₹
                        {(item.product?.price || 0) * item.quantity}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="order-footer">

                <div className="order-footer-row">
                  <span>Payment</span>
                  <strong>
                    {order.paymentMethod?.toUpperCase() || "COD"}
                  </strong>
                </div>

                <div className="order-total">
                  <span>Total Amount</span>
                  <strong>₹{order.totalAmount || 0}</strong>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="view-details-btn"
                >
                  View Details
                </button>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedOrder && (
        <div className="order-modal-overlay">
          <div className="order-modal">

            <div className="modal-header">
              <h3>Order Details</h3>

              <button
                onClick={() => setSelectedOrder(null)}
                className="close-btn"
              >
                ✕
              </button>
            </div>

            <div className="modal-info">
              <p>
                <strong>Order ID:</strong> {selectedOrder._id}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>

              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {selectedOrder.paymentMethod?.toUpperCase()}
              </p>
            </div>

            <h4>Items</h4>

            <div className="modal-items">
              {selectedOrder.items?.map((item, index) => (
                <div key={index} className="modal-item">

<img
  src={
    item.product?.image
      ? getImageUrl(item.product.image)
      : "/no-image.png"
  }
  alt={item.product?.title || "Product"}
  className="modal-item-image"
  onError={(e) => {
    e.target.src = "/no-image.png";
  }}
/>
                  <div className="modal-item-info">
                    <h5>{item.product?.title || "Product"}</h5>
                    <p>Qty: {item.quantity}</p>
                    <p>
                      ₹{(item.product?.price || 0) * item.quantity}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            <hr />

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{selectedOrder.subtotal || 0}</span>
              </div>

              <div className="price-row">
                <span>Discount</span>
                <span>-₹{selectedOrder.discount || 0}</span>
              </div>

              <div className="price-row">
                <span>Delivery</span>
                <span>₹{selectedOrder.deliveryCharge || 0}</span>
              </div>
            </div>

            <div className="modal-total">
              <span>Total</span>
              <strong>₹{selectedOrder.totalAmount || 0}</strong>
            </div>

            <hr />

            <h4>Delivery Address</h4>

            <div className="address-box">
              {selectedOrder?.addressId ? (
                <>
                  <p>
                    <strong>
                      {selectedOrder.addressId.fullName}
                    </strong>
                  </p>

                  <p>{selectedOrder.addressId.house}</p>

                  <p>
                    {selectedOrder.addressId.city},{" "}
                    {selectedOrder.addressId.state}
                  </p>

                  <p>{selectedOrder.addressId.pincode}</p>

                  <p>📞 {selectedOrder.addressId.phone}</p>
                </>
              ) : (
                <p>Address not available</p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersTab;