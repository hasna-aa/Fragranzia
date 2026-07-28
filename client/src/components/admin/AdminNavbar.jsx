import React from 'react'
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "../admin/adminnav.css";


function AdminNavbar() {
  return (
    
        <div className="main-admin">
                <div className="control-panel">
                    <h3>Admin Control Panel</h3>
                    <div className="panel-icons">
                    <div className="noti-icon">
                        <button> <IoMdNotifications /></button>
                        </div>
                        <div className="profile-icon">
                        <button> <CgProfile /></button>
                        <h5>Admin User</h5>
                        </div>
                        </div>
                        
                    

                </div>
                </div>
      
    
  )
}

export default AdminNavbar
