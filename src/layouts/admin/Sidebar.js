import React from "react";

import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2'

const Sidebar = () => {

    const navigate = useNavigate();

    const LogoutSubmit = (e) => {
        
        e.preventDefault();
        axios.get(`/sanctum/csrf-cookie`).then(response => {

            axios.post(`/api/logout`).then(res => {
               
                if(res.data.status === 200)
                {
                    // Remove store data
                    localStorage.removeItem('auth_username', res.data.username);
                    localStorage.removeItem('auth_token', res.data.token);
                    Swal.fire(
                        'Đăng xuất',
                        'Thành công!',
                        'success'
                      )
                    navigate('/login');
                }
                else{

                }
            })
        });
    }

    if(!localStorage.getItem('auth_token '))
    {

    }
    else {

    }


    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <Link className="nav-link" to="/admin/order-management">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            Đơn hàng
                        </Link>
                        <Link className="nav-link" to="/admin/product-management">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                            Sản phẩm
                        </Link>
                        <Link className="nav-link" to="/admin/customer-management">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Khách hàng
                        </Link>
                        <Link className="nav-link" to="/admin/user-management">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Người dùng
                        </Link>
                        <span className="nav-link logout" onClick={LogoutSubmit}>
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i>
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