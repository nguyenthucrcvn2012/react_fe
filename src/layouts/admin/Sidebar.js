import React, {useState} from "react";

import { Link, useNavigate, NavLink } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2'

const Sidebar = () => {

    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState()


    const LogoutSubmit = (e) => {
        
        e.preventDefault();
        axios.get(`/sanctum/csrf-cookie`).then(response => {

            axios.post(`/api/logout`).then(res => {
               
                if(res.data.status === 200)
                {
                    // Remove store data
                    localStorage.removeItem('auth_username');
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_expired_at');
                    Swal.fire(
                        'Đăng xuất',
                        'Thành công!',
                        'success'
                      )
                    navigate('/login');
                }
                else{
                    Swal.fire(
                        'Đăng xuất',
                        'Lỗi!',
                        'error'
                    )
                }
            })
        });
    }

    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <NavLink  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/admin/order-management">
                            <div className="sb-nav-link-icon"><i className="fa-brands fa-first-order"></i></div>
                            Đơn hàng
                        </NavLink>
                        <NavLink className="nav-link  " to="/admin/product-management">
                            <div className="sb-nav-link-icon"><i className="fa-brands fa-product-hunt"></i></div>
                            Sản phẩm
                        </NavLink>
                        <NavLink className="nav-link  " to="/admin/customer-management">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-users"></i></div>
                            Khách hàng
                        </NavLink>
                        <NavLink className="nav-link  " to="/admin/user-management">
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-user-gear"></i></div>
                            Người dùng
                        </NavLink>
                        <span className="nav-link logout" onClick={LogoutSubmit}>
                            <div className="sb-nav-link-icon"><i className="fa-solid fa-right-from-bracket"></i>
                            </div>
                            Đăng xuất
                        </span>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Sidebar;