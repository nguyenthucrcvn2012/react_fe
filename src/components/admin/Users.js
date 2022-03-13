import React, { useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';


import "./../../../src/assets/css/admin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

import Footer from "./../../layouts/admin/Footer";
import Navbar from "./../../layouts/admin/Navbar";
import Sidebar from "./../../layouts/admin/Sidebar";
import Navigation from '../../layouts/admin/Navigation';

function Users() {

    // const [loading, setLoading] = useState(true); // loading
    const [users, setUsers] = useState([]); // fetch users
    const [pagination, setPagination] = useState({}); // paginate
    const [user, setUser] = useState([]); //form
    var numPage; // Số trang hiện tại

    const callBackChildren = (num) => {
        numPage = num
        console.log(numPage)
        loadPage(numPage)
    }
   
    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // Xóa USER
    const deleteHandler = (e, id) => {

        Swal.fire({
            title: 'Xác nhận xóa',
            text: "Bạn có chắc chắn xóa không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.delete(`api/users/${id}`).then(res => {
                    if (res.status === 200) {
                        Swal.fire('Xóa!', res.data.message, 'success')
                        loadPage(numPage)
                    }
                    else if (res.status === 404) {
                        Swal.fire('Xóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }

    // Lấy dữ liệu
    const loadPage = (numPage) => {
        var url = `/api/users/?page=${numPage}`;
        axios.get(url).then(res => {
            if (res.status === 200) {
                setUsers(res.data.users.data)
                setPagination({
                    current_page: res.data.users.current_page,
                    last_page: res.data.users.last_page,
                    to: res.data.users.to,
                    total: res.data.users.total,
                    from: res.data.users.from
                })
                console.log(res.data.users)
            }
            // else {
            //     setLoading = false;
            // }
        });
    }

    useEffect(() => {

        loadPage(numPage)

    }, []);

    // Khóa Tài khoản
    const unAcitveHandler = (e, id) => {

        Swal.fire({
            title: 'Khóa tài khoản',
            text: "Bạn có chắc chắn khóa không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.put(`api/users/active/${id}`).then(res => {
                    if (res.status === 200) {
                        Swal.fire('Khóa!', res.data.message, 'success')
                        loadPage(numPage)
                    }
                    else if (res.status === 404) {
                        Swal.fire('Khóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }

    //Mở khóa tài khoản
    const acitveHandler = (e, id) => {

        Swal.fire({
            title: 'Mở Khóa tài khoản',
            text: "Bạn có chắc chắn mở khóa không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.put(`api/users/active/${id}`).then(res => {
                    if (res.status === 200) {
                        Swal.fire('Mở Khóa!', res.data.message, 'success')
                        loadPage(numPage)
                    }
                    else if (res.status === 404) {
                        Swal.fire('Mở Khóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }


    //RENDER
    var tableHTML =
        users.map((user, idx) => {
            return (
                <tr key={idx}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.group_role}</td>
                    <td>{user.is_active === 1 ? <span className='text-success'>Hoạt động</span> :
                        <span className='text-danger'>Tạm khóa</span>}</td>
                    <td className="text-center">
                        <span className='icon_btn'>
                            <i className="fa-solid fa-pencil"></i>
                        </span>
                        <span className='icon_btn' onClick={(e) => deleteHandler(e, user.id)}>
                            <i className="fa-solid fa-trash"></i>
                        </span>
                        {user.is_active === 1 ?
                            <span className='icon_btn' onClick={(e) => unAcitveHandler(e, user.id)}>
                                <i className="fa-solid fa-user-check"></i>
                            </span>
                            :
                            <span className='icon_btn' onClick={(e) => acitveHandler(e, user.id)}>
                                <i className="fa-solid fa-user-xmark"></i>
                            </span>
                        }
                    </td>
                </tr>
            );
        })



    const submitUser = () => {
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="sb-nav-fixed">

            <form>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form action="" >
                            <table className="w-100">
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">
                                        <input type="email" className="form-control" onChange={handleInput} placeholder="Nhập họ tên" />
                                        <span className="text-alert"></span>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <th scope="col">
                                        <input type="email" name="email" onChange={handleInput} className="form-control" placeholder="Nhập email" />
                                        <span className="text-alert"></span>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row">Mật khẩu</th>
                                    <th scope="col">
                                        <input type="password" name="password" onChange={handleInput} className="form-control" placeholder="Nhập mật khẩu" />
                                        <span className="text-alert"></span>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row">Xác nhận</th>
                                    <th scope="col">
                                        <input type="password" name="password_confirm" onChange={handleInput} className="form-control" placeholder="Xác nhận nhận mật khẩu" />
                                        <span className="text-alert"></span>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row">Nhóm</th>
                                    <th scope="col">
                                        <select className="form-select" name="group_role" onChange={handleInput} aria-label="Default select example">
                                            <option value="" disabled>Chọn nhóm</option>
                                            <option value="1">Admin</option>
                                            <option value="2">Nhân viên</option>
                                            <option value="3">Quản lí</option>
                                        </select>
                                        <span className="text-alert"></span>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row">Trạng thái</th>
                                    <th scope="col">
                                        <input className="form-check-input" type="checkbox" name="is_active" onChange={handleInput} />
                                    </th>
                                </tr>
                            </table>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={submitUser}>
                                    Lưu
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Body>
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
                                                    <th>Trạng thái</th>
                                                    <th className="text-center">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableHTML}
                                            </tbody>
                                        </table>
                                        <Navigation Paginate={pagination}  childToParent={callBackChildren}/>
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