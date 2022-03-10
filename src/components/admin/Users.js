import React, {useState} from 'react'
import { Modal, Button } from "react-bootstrap";


import "./../../../src/assets/css/admin.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";

function Users() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (        
    <div className="sb-nav-fixed">
        

        <form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm user/ Chỉnh sửa user</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <table className="w-100">
                        <tr>
                            <th scope="col">Tên</th>
                            <th scope="col">
                                <input type="email" className="form-control" placeholder="Nhập họ tên" />
                                <span className="text-alert">Nhập họ tên</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <th scope="col">
                                <input type="email" className="form-control" placeholder="Nhập email" />
                                <span className="text-alert">Nhập họ tên</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Mật khẩu</th>
                            <th scope="col">
                                <input type="email" className="form-control" placeholder="Nhập mật khẩu" />
                                <span className="text-alert">Nhập họ tên</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Xác nhận</th>
                            <th scope="col">
                                <input type="email" className="form-control" placeholder="Xác nhận nhận mật khẩu" />
                                <span className="text-alert">Nhập họ tên</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Nhóm</th>
                            <th scope="col">
                                <select className="form-select" aria-label="Default select example">
                                    <option value="DEFAULT" disabled>Chọn nhóm</option>
                                    <option value="1">One</option>
                                </select>
                                <span className="text-alert">Nhập họ tên</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Trạng thái</th>
                            <th scope="col">
                            <input className="form-check-input" type="checkbox"  />
                            </th>
                        </tr>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Lưu
                </Button>
                </Modal.Footer>
            </Modal>
        </form>


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
                                    <Button className="btn-add" onClick={handleShow}><i className="fa-solid fa-plus"></i> Thêm mới</Button>
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
                                                        <th>Last login at</th>
                                                        <th>Last login IP</th>
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
                                                        <td>61</td>
                                                        <td>2011/04/25</td>
                                                        <td className="text-center">
                                                            <span className='icon_btn'>
                                                                <i className="fa-solid fa-pencil"></i>
                                                            </span>
                                                            <span className='icon_btn'>
                                                                <i className="fa-solid fa-trash"></i>
                                                            </span>
                                                            <span className='icon_btn'>
                                                                <i className="fa-solid fa-user-check"></i>
                                                            </span>
                                                            <span className='icon_btn'>
                                                                <i className="fa-solid fa-user-xmark"></i>
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