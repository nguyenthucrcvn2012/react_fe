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
    const [users, setUsers] = useState([]); // fetch users
    const [pagination, setPagination] = useState({}); // paginate
    const [checkedStatus, setCheckedStatus] = useState(false) //Check status user form
    const [titleForm, setTitleForm] = useState('Thêm mới user') //Tiêu đề form
    const [isResearch, setIsResearch] = useState(true)

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
    }); //form

    //input search
    const handleInputSearch = (e) => {
        setInputSearch({ ...inputSearch, [e.target.name]: e.target.value })
        
        var formData = new FormData();
        formData.append('name', inputSearch.name);
        formData.append('email', inputSearch.email);
        formData.append('is_active', inputSearch.is_active);
        formData.append('group_role', inputSearch.group_role);
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

    const filterData = () => {
        numPage = 1;
        // const formData = new FormData();
        // formData.append('name', inputSearch.name);
        // formData.append('email', inputSearch.email);
        // formData.append('is_active', inputSearch.is_active);
        // formData.append('group_role', inputSearch.group_role);

        const formData = {
            name: inputSearch.name,
            email: inputSearch.email,
            is_active: inputSearch.is_active,
            group_role: inputSearch.group_role,
        }
        // loadPage(1, formData);
        // console.log(formData)
        setIsResearch(true)
        loadPage(1, formData)
       
    }

    //Phân trang 
    var numPage; // Số trang hiện tại
    const callBackChildren = (num) => {
        numPage = num
        const formData = new FormData();
        formData.append('name', inputSearch.name);
        formData.append('email', inputSearch.email);
        formData.append('is_active', inputSearch.is_active);
        formData.append('group_role', inputSearch.group_role);
        loadPage(numPage, formData)
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
                        const formData = new FormData();
                        formData.append('name', inputSearch.name);
                        formData.append('email', inputSearch.email);
                        formData.append('is_active', inputSearch.is_active);
                        formData.append('group_role', inputSearch.group_role);
                        loadPage(numPage, formData)
                    }
                    else if (res.status === 404) {
                        Swal.fire('Xóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }

    const research = (numPage, formData) => {
        setLoading(true);
        axios.post(`api/users/search/?page=${numPage}`, formData).then(res => {
            if (res.status === 200) {
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
    const loadPage = (numPage, formData) => {

        if(!isResearch) {
            setLoading(true);
            axios.get(`/api/users/?page=${numPage}`).then(res => {
                if (res.status === 200) {
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
        else{

            research(numPage, formData)
        }
    }

    //Call api sau khi load trang
    useEffect(() => {

        const formData = new FormData();
        loadPage(numPage, formData)

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
                        const formData = new FormData();
                        formData.append('name', inputSearch.name);
                        formData.append('email', inputSearch.email);
                        formData.append('is_active', inputSearch.is_active);
                        formData.append('group_role', inputSearch.group_role);
                        loadPage(numPage, formData)
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
                        const formData = new FormData();
                        formData.append('name', inputSearch.name);
                        formData.append('email', inputSearch.email);
                        formData.append('is_active', inputSearch.is_active);
                        formData.append('group_role', inputSearch.group_role);
                        loadPage(numPage, formData)
                    }
                    else if (res.status === 404) {
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
        tableHTML = 
                users?.map((user, idx) => {
                    return (
                        <tr key={idx}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.group_role}</td>
                            <td>{user.is_active === 1 ? <span className='text-success'>Hoạt động</span> :
                                <span className='text-danger'>Tạm khóa</span>}</td>
                            <td className="text-center">
                                <span className='icon_btn' onClick={() => handleShow(user.id)}>
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

    }

    //Xóa tìm kiếm
    const handleDeleteSearch = () => {
        setInputSearch({
            name:  '',
            email:  '',
            group_role: '',
            is_active:  '',
        })
        loadPage(1)
        document.getElementById("SEARCH-FORM").reset();
        console.log(inputSearch)
        setIsResearch(false)
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

        axios.post(`/api/users`, data).then(res => {
            if(res.data.status === 200){

                Swal.fire('Thêm mới', res.data.user, 'success')
                const formData = new FormData();
                formData.append('name', inputSearch.name);
                formData.append('email', inputSearch.email);
                formData.append('is_active', inputSearch.is_active);
                formData.append('group_role', inputSearch.group_role);
                loadPage(numPage, formData)
                resetInput()
                setShow(false)
            }
            else if(res.data.status === 401){

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

        axios.put(`/api/users/${user.id}`, data).then(res => {
            if(res.data.status === 200){
                Swal.fire('Cập nhật', res.data.message, 'success')
                const formData = new FormData();
                formData.append('name', inputSearch.name);
                formData.append('email', inputSearch.email);
                formData.append('is_active', inputSearch.is_active);
                formData.append('group_role', inputSearch.group_role);
                loadPage(numPage, formData)
                resetInput()
                setShow(false)
            }
            else if(res.data.status === 401){
                Swal.fire('Cập nhật', res.data.message, 'success')
            }
            else{
                setUser({...user, error_list: res.data.validation_errors})
            }
        }); 

    }
    
    const BtnClearSearch = () => {
        return (
            <>
                <button type="button"  className="btn btn-danger btn-search  m-1" onClick={handleDeleteSearch}>
                    <i class="fa-solid fa-x"></i> Xóa tìm
                </button>
                &nbsp;
            </>
        )
    }

    //component password, password_confirm
    const RenderPassword = () => {
        return (
            <>
                <tr>
                    <th scope="row">Mật khẩu</th>
                    <th scope="col">
                        <input type="password" name="password" onChange={handleInput} value={user.password} 
                        className="form-control" placeholder="Nhập mật khẩu" />
                        <span className="text-alert">{user.error_list.password}</span>
                    </th>
                </tr>
                <tr>
                    <th scope="row">Mật khẩu xác nhận</th>
                    <th scope="col">
                        <input type="password" name="password_confirm" value={user.password_confirm} 
                        onChange={handleInput} className="form-control" placeholder="Xác nhận nhận mật khẩu" />
                        <span className="text-alert">{user.error_list.password_confirm}</span>
                    </th>
                </tr>
            </>
        )
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
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">
                                        <input type="text" name="name" className="form-control" value={user.name} 
                                        onChange={handleInput} placeholder="Nhập họ tên" />
                                        <span className="text-alert">{user.error_list.name}</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <th scope="col">
                                        <input type="email" name="email" onChange={handleInput} value={user.email} 
                                        className="form-control" placeholder="Nhập email" />
                                        <span className="text-alert">{user.error_list.email}</span>
                                    </th>
                                </tr>
                                {user.id === '' ? <RenderPassword /> : ''}
                                <tr>
                                    <th scope="row">Nhóm</th>
                                    <th scope="col">
                                        <select className="form-select" name="group_role" onChange={handleInput}
                                         aria-label="Default select example">
                                            <option value="" >Chọn nhóm</option>
                                            <option value="Admin"  selected={user.group_role == 'Admin' ? 'selected' : ''}>Admin</option>
                                            <option value="Nhân viên" selected={user.group_role == 'Nhân viên' ? 'selected' : ''}>Nhân viên</option>
                                            <option value="Quản lí" selected={user.group_role == 'Quản lí' ? 'selected' : ''}>Quản lí</option>
                                        </select>
                                        <span className="text-alert">{user.error_list.group_role}</span>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row">Trạng thái</th>
                                    <th scope="col">
                                        <input className="form-check-input" type="checkbox" checked={checkedStatus} 
                                        name="is_active" onClick={handleClickStatus} />
                                    </th>
                                </tr>
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
                                                    <i class="fa-solid fa-x"></i> Xóa tìm
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
                                                { 
                                                   tableHTML ? tableHTML : <tr ><td colSpan={6}>Không có dữ liệu</td> </tr>
                                                    }
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