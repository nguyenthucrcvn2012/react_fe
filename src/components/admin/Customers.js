import React, {useState, useEffect} from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import Swal from "sweetalert2";

import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";
import Navigation from '../../layouts/admin/Navigation';

function Customers() {

    // const [loading, setLoading] = useState(true); //Loading
    const [customers, setCustomers] = useState([]); // fetch customers
    const [pagination, setPagination] = useState({});// Phân trang
    const [titleForm, setTitleForm] = useState('Thêm mới customer') //Title form
    const [checkedStatus, setCheckedStatus] = useState(false) //Check status user form
    const [customer, setCustomer] = useState({
        customer_id: '',
        customer_name: '',
        email:  '',
        address:  '',
        tel_num:  '',
        error_list: []
    }); //form

    var numPage; // Số trang hiện tại
    const callBackChildren = (num) => {
        numPage = num
        console.log(numPage)
        loadPage(numPage)
    }

    const loadPage = (numPage) => {
        axios.get(`/api/customers?page=${numPage}`).then(res => {
            if(res.status === 200){
                setCustomers(res.data.customers.data)
                setPagination({
                    current_page: res.data.customers.current_page,
                    last_page: res.data.customers.last_page,
                    to: res.data.customers.to,
                    total: res.data.customers.total,
                    from: res.data.customers.from
                })
            }
            // else{
            //     setLoading = false;
            // }
        }); 
    }

    useEffect(() =>{
            
        loadPage(numPage);

    }, []);

    const handleInput = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
        console.log(customer)
        console.log(checkedStatus)
    }

    const resetInput = () => {
        setCustomer({
            customer_id: '',
            customer_name:  '',
            email:  '',
            address: '',
            tel_num: '',
            error_list: [] 
        })
        setCheckedStatus(false)
        // document.getElementById('USER_FORM').reset()
    }

    const handleClickStatus= () => setCheckedStatus(!checkedStatus)


    const [show, setShow] = useState(false);

    const handleClose = () => {
        resetInput()
        setShow(false)
    };
    const handleShow = (id) => {
         // resetInput()
         if(Number.isInteger(id)) {

            axios.get(`/api/customers/${id}`).then(res => {
                console.log(res.data)
                if(res.data.status === 200){
                    setTitleForm('Chỉnh sửa customer')
                    setCustomer({
                        customer_id: res.data.customer.customer_id,
                        customer_name: res.data.customer.customer_name,
                        email: res.data.customer.email,
                        tel_num: res.data.customer.tel_num,
                        address: res.data.customer.address,
                        error_list: []
                    })
                    setCheckedStatus(res.data.customer.is_active)
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
            setTitleForm('Thêm mới customer')
            setShow(true)
        }
    };

    const submitCustomer = (e) => {

        e.preventDefault()
        const data = {
            email: customer.email,
            customer_name: customer.customer_name,
            address: customer.address,
            tel_num: customer.tel_num,
            is_active: checkedStatus,
        }

        axios.post(`/api/customers`, data).then(res => {
            if(res.data.status === 200){
                Swal.fire('Thêm mới', res.data.message, 'success')
                loadPage(numPage)
                resetInput()
                setShow(false)
            }
            else if(res.data.status === 401){
                Swal.fire('Thêm mới', res.data.message, 'success')
                loadPage(numPage)
            }
            else{
                setCustomer({...customer, error_list: res.data.validation_errors})
            }
        }); 

    }

    const submitUpdateCustomer = (e) => {

        e.preventDefault()
        const data = {
            email: customer.email,
            customer_name: customer.customer_name,
            address: customer.address,
            tel_num: customer.tel_num,
            is_active: checkedStatus,
        }

        axios.put(`/api/customers/${customer.customer_id}`, data).then(res => {
            if(res.data.status === 200){
                Swal.fire('Cập nhật', res.data.message, 'success')
                loadPage(numPage)
                resetInput()
                setShow(false)
            }
            else if(res.data.status === 401){
                Swal.fire('Cập nhật', res.data.message, 'success')
                loadPage(numPage)
            }
            else{
                setCustomer({...customer, error_list: res.data.validation_errors})
            }
        }); 

    }

    return (        
    <div className="sb-nav-fixed">
        <form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{titleForm}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <table className="w-100">
                        <tr>
                            <th scope="col">Tên</th>
                            <th scope="col">
                                <input type="text" name="customer_name" className="form-control" value={customer.customer_name} 
                                onChange={handleInput} placeholder="Nhập họ tên" />
                                <span className="text-alert">{customer.error_list.customer_name}</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <th scope="col">
                                <input type="email" name="email" className="form-control" value={customer.email} 
                                onChange={handleInput} placeholder="Nhập địa chỉ email" />
                                <span className="text-alert">{customer.error_list.email}</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Điện thoại</th>
                            <th scope="col">
                                <input type="text" name="tel_num" onChange={handleInput} value={customer.tel_num} 
                                className="form-control" placeholder="Nhập số điện thoại" />
                                <span className="text-alert">{customer.error_list.tel_num}</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Địa chỉ</th>
                            <th scope="col">
                                <input type="text" name="address" onChange={handleInput} value={customer.address} 
                                className="form-control" placeholder="Nhập địa chỉ" />
                                <span className="text-alert">{customer.error_list.address}</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Trạng thái</th>
                            <th scope="col">
                            <input className="form-check-input" name="is_active" checked={checkedStatus} 
                            onClick={handleClickStatus} type="checkbox"  />
                            </th>
                        </tr>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={customer.customer_id !== '' ?  submitUpdateCustomer : submitCustomer}>
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
                                        Danh sách khách hàng
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
                                                        <th>Điện thoại</th>
                                                        <th>Địa chỉ</th>
                                                        <th className="text-center">Thao tác</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {tableHTML} */}
                                                    {
                                                        customers.map((customer, idx) => {
                                                            return (
                                                            <tr key={idx}>
                                                                <td>{customer.customer_id}</td>
                                                                <td>{customer.customer_name}</td>
                                                                <td>{customer.email}</td>
                                                                <td>{customer.tel_num}</td>
                                                                <td>{customer.address}</td>
                                                                <td className="text-center">
                                                                    <span className='icon_btn' onClick={() => handleShow(customer.customer_id)}>
                                                                        <i className="fa-solid fa-pencil"></i>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            );
                                                        })
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

export default Customers;