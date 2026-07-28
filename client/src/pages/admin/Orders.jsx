import React, { useEffect, useState } from "react";
import UserService from "../../services/user-api-service/UserService";
import "./orders.css";

const Orders = () => {

  const {
    getAllOrders,
    updateOrderStatus
  } = UserService();

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="orders-page">

      <h2>Orders</h2>

      <table>

        <thead>

          <tr>

            <th>Customer</th>

            <th>Amount</th>

            <th>Payment</th>

            <th>Status</th>

            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order._id}>

              <td>{order.userId?.name}</td>

              <td>₹ {order.totalAmount}</td>

              <td>{order.paymentMethod}</td>

              <td>

                <select
                  value={order.status}
                  onChange={(e) =>
                    changeStatus(order._id, e.target.value)
                  }
                >

                  <option value="Pending">Pending</option>

                  <option value="Shipped">Shipped</option>

                  <option value="Completed">Completed</option>

                </select>

              </td>

              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Orders;