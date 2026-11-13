import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../style/login.css";
import useAuth from "../../hooks/useAuth";
import AuthService from "../../services/user-api-service/AuthService";

const Login = () => {
  const { login } = AuthService();
  const { loginAuth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErr, setFormErr] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      const emailTrimmed = value.trim();
      if (!emailTrimmed) {
        error = "Email is required";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErr[name]) {
      setFormErr((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const onHandleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setFormErr((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateField("email", formData.email);
    const passErr = validateField("password", formData.password);

    if (emailErr || passErr) {
      setFormErr({
        email: emailErr,
        password: passErr,
      });
      toast.error(emailErr || passErr || "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("LOGIN RESPONSE :", res);

      if (loginAuth) {
        loginAuth(res.token, res.user);
      } else {
        setAuth({
          token: res.token,
          accessToken: res.token,
          user: res.user,
        });
        localStorage.setItem("token", res.token);
        localStorage.setItem("accessToken", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      toast.success(res.message || "Login Successful");

      if (res.user?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      let errorMsg = "Login failed. Please check your credentials.";
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.request) {
        errorMsg = "Cannot reach server. Make sure backend is running on port 5000.";
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-login">
      <div className="text-login">
        <div className="text1-login">
          <h1>Welcome Back!</h1>
          <h4>
            Glad to see you again!
            <br />
            Login to continue.
          </h4>
        </div>
      </div>

      <div className="login-login">
        <div className="logo-text-login">
          <button type="button" className="google-btn-login">
            <img src="/googlelogo.png" alt="Google" />
            <span>Google</span>
          </button>

          <button type="button" className="google-btn-login">
            <img
              src="/download-removebg-preview.png"
              alt="Facebook"
            />
            <span>Facebook</span>
          </button>
        </div>

        <div className="line-login">
          <div className="hr-line-login"></div>
          <div className="line-text-login">
            <p>or sign in with email</p>
          </div>
          <div className="hr-line-login"></div>
        </div>

        <form onSubmit={onHandleSubmit} noValidate>
          <div className="form-group-login">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={onHandleBlur}
              autoComplete="email"
            />
            {formErr.email && (
              <p className="error-login">{formErr.email}</p>
            )}
          </div>

          <div className="form-group-login">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={onHandleBlur}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="pwd-toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formErr.password && (
              <p className="error-login">{formErr.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="signup-btn-login"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="signin-login">
          <p>
            Don't have an account?{" "}
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
