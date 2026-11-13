import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "../../style/order.css";
import OrderService from "../../services/user-api-service/OrderService";
import AddressService from "../../services/user-api-service/AddressService";
import { useNavigate } from "react-router-dom";
import CartService from "../../services/user-api-service/CartService";
import PaymentService from "../../services/user-api-service/PaymentService";



function Order() {
  const {

    getAddresses,
  } = AddressService();

  const {
    createOrder,
    getImageUrl,
  } = OrderService();

  const {
    getCartItems,

  } = CartService();

  const navigate = useNavigate();

  const { createRazorpayOrder } = PaymentService();

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("gpay");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderData();
  }, []);

  const loadOrderData = async () => {
  try {
    setLoading(true);

    const cart = await getCartItems();
    const address = await getAddresses();

    const validCartItems = (cart || []).filter(
      (item) =>
        item &&
        item.product &&
        item.product._id
    );

    setCartItems(validCartItems);
    setAddresses(address || []);

    if (address?.length > 0) {
      setSelectedAddress(address[0]);
    }
  } catch (err) {
    console.log("Order loading error:", err);
    setCartItems([]);
  } finally {
    setLoading(false);
  }
};

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          }
          : item
      )
    );
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) =>
        total + (item.product?.salePrice || 0) * item.quantity,
      0
    );
  }, [cartItems]);


  const discount = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const originalPrice = item.product?.price || 0;
      const salePrice = item.product?.salePrice || originalPrice;

      return total + (originalPrice - salePrice) * item.quantity;
    }, 0);
  }, [cartItems]);

  // const deliveryCharge = subtotal > 500 ? 0 : 40;
  const deliveryCharge = subtotal > 500 ? 0 : 1;
  const totalAmount = subtotal + deliveryCharge;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.warning("Please select a delivery address");
      return;
    }

    try {

      // ================= COD =================
      if (paymentMethod === "cod") {

        const orderData = {
          addressId: selectedAddress._id,
          paymentMethod: "cod",
          items: cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          })),
          subtotal,
          discount,
          deliveryCharge,
          totalAmount,
        };

        await createOrder(orderData);

        toast.success("Order placed successfully!");

        // profile

        navigate("/profile");
        return;
      }
      // ============== ONLINE PAYMENT ==============
      const order = await createRazorpayOrder(totalAmount);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Fragranzia",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {

          const orderData = {
            addressId: selectedAddress._id,
            paymentMethod: "razorpay",
            paymentId: response.razorpay_payment_id,
            items: cartItems.map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
            })),
            subtotal,
            discount,
            deliveryCharge,
            totalAmount,
          };

          await createOrder(orderData);

          toast.success("Payment successful & order placed!");

          navigate("/profile");
        },

        prefill: {
          name: selectedAddress?.fullName,
          contact: selectedAddress?.phone,
        },

        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {

      console.log(err);

      // COD aanel error kaanikanda
      if (paymentMethod !== "cod") {
        toast.error("Payment failed. Please try again.");
      }
    }
  };

  if (loading) {
  return <div className="order-loading">Loading...</div>;
}

if (cartItems.length === 0) {
  return (
    <div className="order-empty">
      <h2>Your cart is empty 🛒</h2>

      <p>
        Please add products to your cart before placing an order.
      </p>

      <button onClick={() => navigate("/cart")}>
        Go to Cart
      </button>
    </div>
  );
}

return (
    <div className="order-page">
      <div className="order-container">

        {/* LEFT */}
        <div className="order-left">

          {cartItems.map((item) => (
            <div className="order-product-card" key={item._id}>

              <div className="order-image">
                <img
                  src={getImageUrl(item.product?.images?.[0])}
                  alt={item.product?.title || "Product"}
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                  onError={(e) => {
                    console.log("Image path:", item.product?.images?.[0]);
                    e.target.src = "/no-image.png";
                  }}
                />
              </div>

              <div className="order-info">
                <h3>{item.product?.title}</h3>
                <p className="order-brand">{item.product?.brand}</p>

                <div className="order-qty">
                  <button onClick={() => decreaseQty(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item._id)}>+</button>
                </div>

                <div className="order-price">
                  <h2>
                    ₹{(item.product?.salePrice || 0) * item.quantity}
                  </h2>

                  {item.product?.price && (
                    <del>
                      ₹{item.product.price * item.quantity}
                    </del>
                  )}
                </div>
              </div>

            </div>
          ))}

          {/* ADDRESS */}
          <div className="address-section">
            <div className="address-header">
              <h2>Personal Details</h2>
              <button onClick={() => navigate("/addaddress")}>
                Add Address +
              </button>
            </div>

            {addresses.map((address) => (
              <div
                key={address._id}
                onClick={() => setSelectedAddress(address)}
                className={
                  selectedAddress?._id === address._id
                    ? "address-card active"
                    : "address-card"
                }
              >
                <h4>{address.fullName}</h4>

                <p>{address.house}</p>
                <p>{address.city}, {address.state}</p>
                <p>{address.pincode}</p>
                <p>{address.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="order-right">

          <div className="price-card">
            <h2>Price Details</h2>

            <div className="price-row">
              <span>Price</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="price-row">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <div className="price-row">
              <span>Delivery</span>
              <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
            </div>

            <hr />

            <div className="price-total">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <div className="payment-card">
            <h2>Payment Methods</h2>

            {["gpay", "cod", "upi", "card", "netbanking"].map((method) => (
              <label key={method}>
                <input
                  type="radio"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method.toUpperCase()}
              </label>
            ))}

            {/* Payment Button */}
            <button
              className="pay-btn"
              onClick={handlePlaceOrder}
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "12px",
                background: "#0f172a",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              {paymentMethod === "cod"
                ? "Order Now"
                : "Pay Now"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Order;