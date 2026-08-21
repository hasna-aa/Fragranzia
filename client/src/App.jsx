import { Routes, Route } from "react-router-dom";
import "./App.css";

// USER PAGES
import Signup from "./pages/user/Signup";
import Login from "./pages/user/Login";
import Home from "./pages/user/Home";
import Product from "./pages/user/Product";
import ProductDetails from "./pages/user/ProductDetails";
import Cart from "./pages/user/Cart";
import Wishlist from "./pages/user/Wishlist";
import Profile from "./pages/user/Profile/Profile";
import AddAddress from "./pages/user/AddAddress";
import EditAddress from "./pages/user/EditAddress";
import Order from "./pages/user/Order";
import About from "./pages/user/About";

// USER PROTECTED ROUTES
import UserProductRouter from "./components/protected-routes/UserProductRouter";
import PrivateRoute from "./components/protected-routes/PrivateRoute";

// ADMIN
import AdminLayout from "../src/components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import Categories from "./pages/admin/Categories";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import AdminProtectRouter from "./components/protected-routes/AdminProtectRouter";
import Customers from "./pages/admin/Customers";
import EditProduct from "./pages/admin/EditProduct";
import Orders from "./pages/admin/Orders";



function App() {
  return (
    <Routes>

      {/* ================= USER PUBLIC ROUTES ================= */}
      <Route element={<UserProductRouter />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* ================= USER PRIVATE ROUTES ================= */}
      <Route element={<PrivateRoute />}>
        <Route element={<UserProductRouter />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/addaddress" element={<AddAddress />} />
          <Route path="/editaddress/:id" element={<EditAddress />} />
          <Route path="/order" element={<Order />} />
        </Route>
      </Route>

      {/* ================= ADMIN ROUTES ================= */}
      <Route element={<AdminProtectRouter />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/edit-category/:id" element={<EditCategory />} />
          <Route path="/admin/customers" element={<Customers />} />
<Route path="/admin/orders" element={<Orders />} />        </Route>
      </Route>

    </Routes>
  );
}

export default App;