import { createContext, useState } from "react";

export const AuthContext = createContext();

const getInitialAuth = () => {
  try {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const role = localStorage.getItem("role") || user?.role || "";
    const name = localStorage.getItem("name") || user?.name || "";
    const id = localStorage.getItem("userId") || user?._id || "";

    if (token) {
      return {
        token,
        accessToken: token,
        user: user || {},
        role,
        name,
        id,
      };
    }
  } catch (error) {
    console.error("Failed to parse initial auth:", error);
  }
  return {};
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuth);

  const loginAuth = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    if (user?.role) localStorage.setItem("role", user.role);
    if (user?.name) localStorage.setItem("name", user.name);
    if (user?._id) localStorage.setItem("userId", user._id);

    setAuth({
      token,
      accessToken: token,
      user,
      role: user?.role || "user",
      name: user?.name || "",
      id: user?._id || "",
    });
  };

  const logoutAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, loginAuth, logoutAuth }}>
      {children}
    </AuthContext.Provider>
  );
};