import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../style/signup.css";
import AuthService from "../../services/user-api-service/AuthService";

const Signup = () => {
  const navigate = useNavigate();
  const { register } = AuthService();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formErr, setFormErr] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateField = (name, value, currentFormData = formData) => {
    let error = "";
    if (name === "name") {
      const trimmed = value.trim();
      if (!trimmed) {
        error = "Name is required";
      } else if (trimmed.length < 2) {
        error = "Name must be at least 2 characters long";
      }
    } else if (name === "email") {
      const emailTrimmed = value.trim();
      if (!emailTrimmed) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
        error = "Please enter a valid email address";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long";
      }
    } else if (name === "confirmPassword") {
      if (!value) {
        error = "Please confirm your password";
      } else if (value !== currentFormData.password) {
        error = "Passwords do not match";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "password" && prev.confirmPassword) {
        const confirmErr = updated.password !== updated.confirmPassword ? "Passwords do not match" : "";
        setFormErr((prevErr) => ({ ...prevErr, confirmPassword: confirmErr }));
      }
      return updated;
    });

    if (formErr[name]) {
      setFormErr((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const onHandleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, formData);
    setFormErr((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateField("name", formData.name);
    const emailErr = validateField("email", formData.email);
    const passErr = validateField("password", formData.password);
    const confirmErr = validateField("confirmPassword", formData.confirmPassword);

    const errors = {
      name: nameErr,
      email: emailErr,
      password: passErr,
      confirmPassword: confirmErr,
    };

    setFormErr(errors);

    if (nameErr || emailErr || passErr || confirmErr) {
      toast.error(nameErr || emailErr || passErr || confirmErr || "Please fill all required fields");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      const res = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("REGISTER SUCCESS:", res);
      toast.success(res.message || "Registered successfully! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      let errorMsg = "Registration failed. Please try again.";
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
    <div className="main-signup">
      <div className="text-signup">
        <div className="text1-signup">
          <h1>Let's Get Started!</h1>
          <h4>
            Create your account and unlock the
            <br />
            full potential of Fragranzia.
          </h4>
        </div>
      </div>

      <div className="sign-signup">
        <div className="logo-text-signup">
          <button className="google-btn-signup" type="button">
            <img src="/googlelogo.png" alt="Google" />
            <span>Google</span>
          </button>

          <button className="google-btn-signup" type="button">
            <img
              src="/download-removebg-preview.png"
              alt="Facebook"
            />
            <span>Facebook</span>
          </button>
        </div>

        <div className="line-signup">
          <div className="hr-line-signup"></div>
          <div className="line-text-signup">
            <p>or sign up with email</p>
          </div>
          <div className="hr-line-signup"></div>
        </div>

        <form onSubmit={onHandleSubmit} noValidate>
          <div className="form-group-signup">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={onHandleBlur}
              autoComplete="name"
            />
            {formErr.name && <p className="error-signup">{formErr.name}</p>}
          </div>

          <div className="form-group-signup">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              onBlur={onHandleBlur}
              autoComplete="email"
            />
            {formErr.email && <p className="error-signup">{formErr.email}</p>}
          </div>

          <div className="form-group-signup">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              onBlur={onHandleBlur}
              autoComplete="new-password"
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
              <p className="error-signup">{formErr.password}</p>
            )}
          </div>

          <div className="form-group-signup">
            <FaLock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={onHandleBlur}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="pwd-toggle-btn"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {formErr.confirmPassword && (
              <p className="error-signup">{formErr.confirmPassword}</p>
            )}
          </div>

          <label className="term-signup">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span>Agree with Terms & Conditions</span>
          </label>

          <button
            type="submit"
            className="signup-btn-signup"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <div className="signin-signup">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
