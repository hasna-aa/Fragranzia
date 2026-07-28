import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./style/variable.css";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

// TOASTIFY IMPORTS
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>

        <App />

        {/* TOAST CONTAINER */}
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />

      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);