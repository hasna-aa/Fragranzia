import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../../style/login.css";
import useAuth from "../../hooks/useAuth";
import AuthService from "../../services/user-api-service/AuthService";

const Login = () => {
  const { login } = AuthService();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErr, setFormErr] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setFormErr((prev) => ({
      ...prev,
      [e.target.name]: false,
    }));
  };

  const onHandleBlur = (e) => {
    const { name, value } = e.target;

    setFormErr((prev) => ({
      ...prev,
      [name]: value.trim() === "",
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
    };

    setFormErr(errors);

    if (errors.email || errors.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await login(formData);

      console.log("LOGIN RESPONSE :", res);

      setAuth({
        accessToken: res.token,
        user: res.user,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      toast.success("Login Successful");

      if (res.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Login Failed"
      );
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

        <div className="line">
          <div className="hr-line-login"></div>

          <div className="line-text-login">
            <p>or sign in with email</p>
          </div>

          <div className="hr-line-login"></div>
        </div>

        <form onSubmit={onHandleSubmit}>

          <div className="form-group-login">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              onBlur={onHandleBlur}
            />

            {formErr.email && (
              <p className="error-login">
                Enter Email
              </p>
            )}
          </div>

          <div className="form-group-login">
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={onHandleBlur}
            />

            {formErr.password && (
              <p className="error-login">
                Enter Password
              </p>
            )}
          </div>

          <button
            type="submit"
            className="signup-btn-login"
          >
            Login
          </button>

        </form>

        <div className="signin-login">
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;