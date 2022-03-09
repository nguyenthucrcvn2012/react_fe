import React from "react";

import { Link } from "react-router-dom"

const Sidebar = () => {

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
                        <Link className="nav-link" to="/logout">
                            <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                            Đăng xuất
                        </Link>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Sidebar;