import React, {useState, useEffect} from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';



import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";
import Navigation from '../../layouts/admin/Navigation';

function Customers() {

    const [loading, setLoading] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [datas, setDatas] = useState([]);

    useEffect(() =>{
            
        axios.get(`/api/customers`).then(res => {
            if(res.status === 200){
                setCustomers(res.data.customers)
                setDatas(res.data)
                console.log(res.data.customers)

            }
            else{
                setLoading = false;
            }
        }); 

    }, []);

    var tableHTML = 
        customers.map((customer, idx) => {
            return (
               <tr key={idx}>
                   <td>{customer.customer_id}</td>
                   <td>{customer.customer_name}</td>
                   <td>{customer.email}</td>
                   <td>{customer.tel_num}</td>
                   <td>{customer.address}</td>
                   <td className="text-center">
                       <span className='icon_btn'>
                           <i className="fa-solid fa-pencil"></i>
                       </span>
                   </td>
               </tr>
            );
        })



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (        
    <div className="sb-nav-fixed">
        <form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm khách hàng</Modal.Title>
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
                                                                    <span className='icon_btn'>
                                                                        <i className="fa-solid fa-pencil"></i>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                             <Navigation Paginate={datas}/>
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