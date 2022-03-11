import React, {useState, useEffect } from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';


import "./../../../src/assets/css/admin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";
import Navigation from '../../layouts/admin/Navigation';

function Users() {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState([]);

        // const [pagination, setPagination] = useState({
    //     current_page: '',
    //     last_page: '',
    //     next_page_url: '',
    //     per_page: '',
    //     next_page_url: '',
    //     prev_page_url: '',
    //     to: '',
    //     total: '',
    //     from: ''
    // });

    const deleteHandler = (e, id) => {
        // const thisClicked = e.currentTarget;
        // thisClicked.innerHTML = <i className="fa-solid fa-user-check"></i>

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
                    if(res.status === 200){
                        Swal.fire('Xóa!',res.data.message,'success')
                        this.show_item_after_update()
                        // thisClicked.closest("tr").remove()
                    }
                    else if(res.status === 404){ 
                        Swal.fire('Xóa!',res.data.message,'error')
                        // thisClicked.innerHTML = <i className="fa-solid fa-user-check"></i>
                    }
                }); 
              
            }
            else{
                // thisClicked.innerHTML = (<i className="fa-solid fa-user-check"></i>)
            }
        })
    }


    useEffect(() =>{
            
        var num = 1;
        var url = `/api/users/?page=${num}`;
        axios.get(url).then(res => {
            if(res.status === 200){
                setUsers(res.data.users.data)
                setPagination(res.data)
            }
            else{
                setLoading = false;
            }
        }); 

    }, []);

    const unAcitveHandler = (e, id) => {
        
        const thisClicked = e.currentTarget;
        Swal.fire({
            title: 'Mở khóa tài khoản',
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
                    if(res.status === 200){
                        Swal.fire('Mở Khóa!',res.data.message,'success')
                        //  thisClicked.innerHTML = `<i className="fa-solid fa-user-check"></i>`
                    }
                    else if(res.status === 404){ 
                        Swal.fire('Mở Khóa!',res.data.message,'error')
                        // thisClicked.innerHTML = <i className="fa-solid fa-user-check"></i>
                    }
                }); 
              
            }
            else{
                // thisClicked.innerHTML = (<i className="fa-solid fa-user-check"></i>)
            }
        })
    }
    
    useEffect(() =>{
        var num = 1;
        var url = `/api/users/?page=${num}`;
        axios.get(url).then(res => {
            if(res.status === 200){
                setUsers(res.data.users.data)
                setPagination(res.data)
            }
            else{
                setLoading = false;
            }
        }); 

    }, []);

    const acitveHandler = (e, id) => {
        
        const thisClicked = e.currentTarget;
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
                    if(res.status === 200){
                        Swal.fire('Khóa!',res.data.message,'success')
                        // thisClicked.innerHTML = `<i className="fa-solid fa-user-xmark"></i>`
                    }
                    else if(res.status === 404){ 
                        Swal.fire('Khóa!',res.data.message,'error')
                    }
                }); 
              
            }
        })
    }


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
                           <i className="fa-solid fa-user-xmark"></i>
                       </span>
                       : 
                       <span className='icon_btn' onClick={(e) => acitveHandler(e, user.id)}>
                           <i className="fa-solid fa-user-check"></i>
                       </span> 
                       }
                   </td>
               </tr>
            );
        })
    
    // }


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
                                                        <th>Trạng thái</th>
                                                        <th className="text-center">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tableHTML}
                                                </tbody>
                                            </table>
                                             <Navigation Paginate={pagination} />
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