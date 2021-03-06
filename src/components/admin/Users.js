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
import Loading from '../../layouts/admin/Loading';

function Users() {

    const [loading, setLoading] = useState(true); // loading
    const [users, setUsers] = useState([]); // danh sách user
    const [pagination, setPagination] = useState({}); // phân trang
    const [checkedStatus, setCheckedStatus] = useState(false) //Check status user form
    const [titleForm, setTitleForm] = useState('Thêm mới user') //Tiêu đề form
    const [isResearch, setIsResearch] = useState(true) // check xem có đang tìm kiếm k
    // var isResearch = false;
    const [inputSearch, setInputSearch] = useState({
        name:  '',
        email:  '',
        group_role: '',
        is_active:  '',
    }) //Form search

    const [user, setUser] = useState({
        id: '',
        name:  '',
        email:  '',
        password: '',
        password_confirm: '',
        group_role: '',
        error_list: []
    }); //form tạo / sửa user

    //input search
    const handleInputSearch = (e) => {
        setInputSearch({ ...inputSearch, [e.target.name]: e.target.value })
    }

    //status rong form sửa /thêm user
    const handleClickStatus = () => setCheckedStatus(!checkedStatus)

    //xử lí tìm kiếm
    const submitSearch = (e) => {
        e.preventDefault()
        filterData()
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            filterData()
        }
    }
    //Xóa tìm kiếm
    const handleDeleteSearch = () => {
        setIsResearch(false)
        setInputSearch({
            name:  '',
            email:  '',
            group_role: '',
            is_active:  '',
        })
        document.getElementById("SEARCH-FORM").reset();
        reloadPage(numPage)
    }

    //Filter
    const filterData = () => {
        setIsResearch(true)
        loadPage(1)
    }

    //Phân trang 
    var numPage; // Số trang hiện tại
    const callBackChildren = (num) => {
        numPage = num
        loadPage(numPage)
    }
   
    //input form user
    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // Xóa USER
    const deleteHandler = (email, id) => {

        Swal.fire({
            title: 'Xác nhận xóa',
            text: "Bạn có chắc chắn xóa tài khoản " + email + " không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`api/users/${id}/delete`).then(res => {
                    if (res.data.status === 200) {
                        Swal.fire('Xóa!', res.data.message, 'success')
                        loadPage(numPage)
                    }
                    else if (res.data.status === 404) {
                        loadPage(numPage)
                        Swal.fire('Xóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }

    //Tìm kiếm
    const research = (numPage) => {

        const formData = new FormData();
        formData.append('name', inputSearch.name);
        formData.append('email', inputSearch.email);
        formData.append('is_active', inputSearch.is_active);
        formData.append('group_role', inputSearch.group_role);

        setLoading(true);
        axios.post(`api/users/search?page=${numPage}`, formData).then(res => {
            if (res.data.status === 200) {
                setUsers(res.data.users.data)
                setPagination({
                    current_page: res.data.users.current_page,
                    last_page: res.data.users.last_page,
                    to: res.data.users.to,
                    total: res.data.users.total,
                    from: res.data.users.from
                })
                setLoading(false);
            }
            else {
                Swal.fire('Tìm kiếm', res.data.message, 'error')
                setLoading(false);
            }
        });
    }

    const reloadPage = (numPage) => {
        setLoading(true);
        axios.get(`/api/users?page=${numPage}`).then(res => {
            if (res.data.status === 200) {
                setUsers(res.data.users.data)
                setPagination({
                    current_page: res.data.users.current_page,
                    last_page: res.data.users.last_page,
                    to: res.data.users.to,
                    total: res.data.users.total,
                    from: res.data.users.from
                })
                setLoading(false);
            }
            else {
                setLoading(true);
            }
        });
    }
    // Lấy dữ liệu
    const loadPage = (numPage) => {


        if(!isResearch) {
            reloadPage(numPage)
        }
        else{
            research(numPage)
        }
    }

    //Call api sau khi load trang
    useEffect(() => {

        loadPage(numPage)

    }, []);

    // Khóa Tài khoản
    const unAcitveHandler = (email, id) => {

        Swal.fire({
            title: 'Khóa tài khoản',
            text: "Bạn có chắc chắn khóa tài khoản " + email + " không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`api/users/${id}/active`).then(res => {
                    if (res.data.status === 200) {
                        Swal.fire('Khóa!', res.data.message, 'success')
                        loadPage(numPage)
                    }
                    else if (res.data.status === 404 || res.data.status === 500) {
                        Swal.fire('Khóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }

    //Mở khóa tài khoản
    const acitveHandler = (email, id) => {

        Swal.fire({
            title: 'Mở Khóa tài khoản',
            text: "Bạn có chắc chắn mở khóa tài khoản " + email + " không?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`api/users/${id}/active`).then(res => {
                    if (res.data.status === 200) {
                        Swal.fire('Mở Khóa!', res.data.message, 'success')
                        loadPage(numPage)
                    }
                    else if (res.data.status === 404 || res.data.status === 500) {
                        Swal.fire('Mở Khóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }

    //RENDER
    var tableHTML = ""
    if(loading){
        tableHTML =  (
            <td colSpan={6}>
                <Loading />
            </td>
        )
    }
    else{
        //Kiem tra xem có user nào k
        if(users.length > 0) {
             
            let numberUser = pagination.current_page * 10;
            tableHTML = 
             users?.map((user, idx) => {

                let numUser = idx + 1 + numberUser - 10 ;
                return (
                    <tr key={idx}>
                        <td>{numUser}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.group_role}</td>
                        <td>{user.is_active === 1 ? <span className='text-success'>Hoạt động</span> :
                            <span className='text-danger'>Tạm khóa</span>}</td>
                        <td className="text-center">
                            <span className='icon_btn' onClick={() => handleShow(user.id)}>
                                <i className="fa-solid fa-pencil"></i>
                            </span>
                            <span className='icon_btn' onClick={() => deleteHandler(user.email, user.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </span>
                            {user.is_active === 1 ?
                                <span className='icon_btn' onClick={() => unAcitveHandler(user.email, user.id)}>
                                    <i className="fa-solid fa-user-check"></i>
                                </span>
                                :
                                <span className='icon_btn' onClick={() => acitveHandler(user.email, user.id)}>
                                    <i className="fa-solid fa-user-xmark"></i>
                                </span>
                            }
                        </td>
                    </tr>
                );
               
            })
        }
        else {
            tableHTML = (
                <tr ><td colSpan={6}>Không có dữ liệu</td> </tr>
            )
        }

    }


    
    // RESET DATA
    const resetInput = () => {
        setUser({
            id:  '',
            name:  '',
            email:  '',
            password: '',
            password_confirm: '',
            group_role: '',
            error_list: [] 
        })
        setCheckedStatus(false)
        // document.getElementById('USER_FORM').reset()
    }

        //Tạo mới user
    const submitUser = (e) => {
        e.preventDefault()
        const data = {
            email: user.email,
            name: user.name,
            password: user.password,
            password_confirm: user.password_confirm,
            group_role: user.group_role,
            is_active: checkedStatus,
        }

        axios.post(`/api/users/store`, data).then(res => {
            if(res.data.status === 200){
                handleDeleteSearch()
                Swal.fire('Thêm mới', res.data.message, 'success')
                setShow(false)
            }
            else if(res.data.status === 500){

                Swal.fire('Thêm mới', res.data.message, 'success')
            }
            else{

                setUser({...user, error_list: res.data.validation_errors})
            }
        }); 

    }

    //cập nhật người dùng
    const submitUpdateUser = (e) => {

        e.preventDefault()
        const data = {
            email: user.email,
            name: user.name,
            group_role: user.group_role,
            is_active: checkedStatus,
        }
        
        axios.post(`/api/users/${user.id}/update`, data).then(res => {
            if(res.data.status === 200){
                Swal.fire('Cập nhật', res.data.message, 'success')
                resetInput()
                setShow(false)
                loadPage(numPage)
            }
            else if(res.data.status === 404 || res.data.status === 500){
                loadPage(numPage)
                setShow(false)
                Swal.fire('Cập nhật', res.data.message, 'error')
            }
            else{
                setUser({...user, error_list: res.data.validation_errors})
            }
        }); 

    }
    
    //Đóng mở modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        resetInput()
        setShow(false)
    };
    
    //show modal
    const handleShow = (id) => {
        // resetInput()
        if(Number.isInteger(id)) {
            axios.get(`/api/users/${id}`).then(res => {
                console.log(res.data)
                if(res.data.status === 200){
                    setTitleForm('Chỉnh sửa user')
                    setUser({
                        id: res.data.user.id,
                        name: res.data.user.name,
                        email: res.data.user.email,
                        password: res.data.user.password,
                        password_confirm: res.data.user.password,
                        group_role: res.data.user.group_role,
                        error_list: []
                    })
                    setCheckedStatus(res.data.user.is_active)
                    setShow(true)
                }
                else if(res.data.status === 404){
                    Swal.fire('Lỗi', res.data.message, 'warning')
                    loadPage(numPage)
                }
            }); 
        }
        else{
            resetInput()
            setTitleForm('Thêm mới user')
            setShow(true)
        }
    };

    return (
        <div className="sb-nav-fixed">

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{titleForm}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form id="USER_FORM">
                            <table className="w-100">
                                <thead></thead>
                            <tbody>
                                <tr>
                                    <td scope="row">Tên <span className='text-danger'>*</span></td>
                                    <td scope="col">
                                        <input type="text" name="name" className="form-control" value={user.name} 
                                        onChange={handleInput} placeholder="Nhập họ tên" />
                                        <span className="text-alert">{user.error_list.name}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row">Email <span className='text-danger'>*</span></td>
                                    <td scope="col">
                                        <input type="email" name="email" onChange={handleInput} value={user.email} 
                                        className="form-control" placeholder="Nhập email" />
                                        <span className="text-alert">{user.error_list.email}</span>
                                    </td>
                                </tr>
                                {/* {user.id === '' ? <RenderPassword /> : ''} */}
                                <tr>
                                    <td scope="row">Mật khẩu {user.id === '' ?  <span className='text-danger'>*</span> : '*'}</td>
                                    <td scope="col">
                                        <input type="password" disabled={user.id == '' ? '' : 'disabled'}   name="password" onChange={handleInput} value={user.password} 
                                        className="form-control" placeholder="Nhập mật khẩu" />
                                        <span className="text-alert">{user.error_list.password}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row">Mật khẩu xác nhận {user.id === '' ?  <span className='text-danger'>*</span> : '*'}</td>
                                    <td scope="col">
                                        <input type="password" disabled={user.id == '' ? '' : 'disabled'} name="password_confirm" value={user.password_confirm} 
                                        onChange={handleInput} className="form-control" placeholder="Xác nhận nhận mật khẩu" />
                                        <span className="text-alert">{user.error_list.password_confirm}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row">Nhóm <span className='text-danger'>*</span></td>
                                    <td scope="col">
                                        <select className="form-select"  name="group_role" onChange={handleInput}
                                         aria-label="Default select example">
                                            <option value="" >Chọn nhóm</option>
                                            <option value="Admin"  selected={user.group_role == 'Admin' ? 'selected' : ''}>Admin</option>
                                            <option value="Nhân viên" selected={user.group_role == 'Nhân viên' ? 'selected' : ''}>Nhân viên</option>
                                            <option value="Quản lí" selected={user.group_role == 'Quản lí' ? 'selected' : ''}>Quản lí</option>
                                        </select>
                                        <span className="text-alert">{user.error_list.group_role}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row">Trạng thái</td>
                                    <td scope="col">
                                        <input className="form-check-input" type="checkbox" checked={checkedStatus} 
                                        name="is_active" onChange={handleClickStatus} />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                                </Button>
                                <Button variant="primary" onClick={user.id === '' ?  submitUser : submitUpdateUser}>
                                    Lưu
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Body>
                </Modal>


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
                                    <button className="btn btn-primary btn-search  m-1" onClick={() => handleShow()}>
                                        <i className="fa-solid fa-plus"></i> Thêm mới
                                        </button>
                                </div>
                                <div className="card-body">

                                <div className="box-search mt-1">
                                    <form id="SEARCH-FORM">
                                        <div className="row p-3">
                                            <div className="col-md-3 mb-1">
                                                <label htmlFor="name">Tên</label>
                                                <input type="text" name="name" value={inputSearch.name}  onKeyPress={handleKeyDown}
                                                className="form-control"  onChange={handleInputSearch} placeholder='Nhập họ tên'/>   
                                            </div>
                                            <div className="col-md-3 mb-1">
                                                <label htmlFor="name">Email</label> 
                                                <input type="text"  name="email"  value={inputSearch.email}  className="form-control" 
                                                 onChange={handleInputSearch} placeholder='Nhập email' onKeyPress={handleKeyDown}/>   
                                            </div>
                                            <div className="col-md-3  mb-1">
                                                <label htmlFor="status">Nhóm</label>
                                                <select className="form-select" id="status" name="group_role" onChange={handleInputSearch}
                                                  aria-label="Default select example">
                                                <option value="" >Chọn nhóm</option>
                                                <option value="Admin">Admin</option>
                                                <option value="Nhân viên">Nhân viên</option>
                                                <option value="Quản lí">Quản lí</option>
                                                </select>
                                            </div>
                                            <div className="col-md-3  mb-1">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select className="form-select" id="status" name="is_active"  
                                                onChange={handleInputSearch}  aria-label="Default select example">
                                                <option value="" >Chọn trạng thái</option>
                                                <option value="1">Đang hoạt động</option>
                                                <option value="0">Tạm khóa</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12 mb-1 box-btn-search mt-4">
                                                <button type="button"  className="btn btn-primary btn-search  m-1" onClick={submitSearch}>
                                                    <i className="fa-solid fa-magnifying-glass"></i>
                                                    </button>
                                                &nbsp;
                                                {/* {isResearch ? <BtnClearSearch /> : ''} */}
                                                <button type="button"  className="btn btn-danger btn-search  m-1" onClick={handleDeleteSearch}>
                                                    <i className="fa-solid fa-x"></i> Xóa tìm
                                                </button>
                                                {/* &nbsp;
                                                <button className="btn btn-primary btn-search  m-1" onClick={() => handleShow()}>
                                                    <i className="fa-solid fa-plus"></i> Thêm mới
                                                    </button> */}
                                            </div>
                                        </div>

                                    </form>
                                    </div>
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
                                                { tableHTML }
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