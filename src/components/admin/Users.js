import React from 'react'

import "./../../../src/assets/css/admin.css";

import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";

function Users() {
    return (        
    <div className="sb-nav-fixed">
            <Navbar />

                <div id="layoutSidenav">

                <Sidebar />
            
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4"> 
                            <div className="card mb-4  mt-4">
                                    <div className="card-header">
                                        <span>
                                        <i className="fas fa-table me-1"></i>
                                        Danh sách người dùng
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Họ tên</th>
                                                        <th>Email</th>
                                                        <th>Nhóm</th>
                                                        <th>Trạng thái</th>
                                                        <th className="text-center">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>System Architect</td>
                                                        <td>Edinburgh</td>
                                                        <td>61</td>
                                                        <td>2011/04/25</td>
                                                        <td className="text-center">
                                                            <span className='icon_btn'>
                                                                <i class="fa-solid fa-pencil"></i>
                                                            </span>
                                                            <span className='icon_btn'>
                                                                <i class="fa-solid fa-trash"></i>
                                                            </span>
                                                            <span className='icon_btn'>
                                                                <i class="fa-solid fa-user-check"></i>
                                                            </span>
                                                            <span className='icon_btn'>
                                                                <i class="fa-solid fa-user-xmark"></i>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>                       
                            </div>
                        </main>
                        <Footer />
                    </div>
            </div>
        </div>
    );
}

export default Users;