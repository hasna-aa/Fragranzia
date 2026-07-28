import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../../style/signup.css";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErr, setFormErr] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormErr({
      ...formErr,
      [e.target.name]: false,
    });
  };

  const onHandleBlur = (e) => {
    const { name, value } = e.target;

    setFormErr({
      ...formErr,
      [name]: value.trim() === "",
    });
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    let errors = {
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    };

    let valid = true;

    if (!formData.name.trim()) {
      errors.name = true;
      valid = false;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = true;
      valid = false;
    }

    if (!formData.password.trim()) {
      errors.password = true;
      valid = false;
    }

    if (
      !formData.confirmPassword.trim() ||
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = true;
      valid = false;
    }

    setFormErr(errors);

    if (!valid) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("REGISTER SUCCESS:", res.data);

      toast.success(res.data.message || "Registered Successfully");

      navigate("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="main">
      <div className="text">
        <div className="text1">
          <h1>Let's Get Started!</h1>
          <h4>
            Create your account and unlock the
            <br />
            full potential of Fragranzia.
          </h4>
        </div>
      </div>

      <div className="sign">
        <div className="logo-text">
          <button className="google-btn" type="button">
            <img src="/googlelogo.png" alt="Google" />
            <span>Google</span>
          </button>

          <button className="google-btn" type="button">
            <img
              src="/download-removebg-preview.png"
              alt="Facebook"
            />
            <span>Facebook</span>
          </button>
        </div>

        <div className="line">
          <div className="hr-line"></div>

          <div className="line-text">
            <p>or sign up with email</p>
          </div>

          <div className="hr-line"></div>
        </div>

        <form onSubmit={onHandleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={onHandleBlur}
            />
            <p className="error">
              {formErr.name && "Please enter your name"}
            </p>
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={onHandleBlur}
            />
            <p className="error">
              {formErr.email && "Enter a valid email"}
            </p>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              onBlur={onHandleBlur}
            />
            <p className="error">
              {formErr.password && "Enter password"}
            </p>
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={onHandleBlur}
            />
            <p className="error">
              {formErr.confirmPassword &&
                "Passwords do not match"}
            </p>
          </div>

          <div className="term">
            <input type="checkbox" required />
            <label>Agree with Terms & Conditions</label>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <div className="signin">
            <p>
              Already have an account?{" "}
              <Link to="/login">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;