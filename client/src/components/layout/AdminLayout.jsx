import { Outlet } from "react-router-dom";
import AdminNavbar from "../admin/AdminNavbar";
import AdminSidebar from "../admin/AdminSidebar";


const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <AdminSidebar />

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;