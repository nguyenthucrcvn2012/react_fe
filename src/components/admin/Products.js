import React, {useState, useRef} from 'react'
import { Modal, Button } from "react-bootstrap";

import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";


function Product() {

    const inputFileRef = useRef( null );
    const noimg = require('../../assets/images/noimage.png')
    const chooseImage = () => {
        inputFileRef.current.click();
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [productInput, setProductInput] = useState({
        description: '',
        product_name: '',
        product_price: ''
    })
    const [productImage, setProductImage] = useState({})

    const handleInput = (e) => {
        setProductInput({...productInput, [e.target.name]: e.target.value})
        console.log(productInput)
        console.log(productImage)
    }
    const handleImage = (e) => {
        setProductImage({ image: e.target.files[0]})
    }
    const submitSaveProduct = (e) =>{

        alert('ok')
    }

    return (        
    <div className="sb-nav-fixed">
        <form onSubmit={submitSaveProduct} className="form-product">
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thêm / sửa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-7">
                            <table className="w-100">
                            <tr>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">
                                    <input type="text" name="product_name" value={productInput.product_name}  onChange={handleInput}
                                     className="form-control" placeholder="Nhập tên sản phẩm" />
                                    {/* <span className="text-alert">Nhập họ tên</span> */}
                                </th>
                            </tr>
                            <tr>
                                <th scope="row">Giá bán</th>
                                <th scope="col">
                                    <input type="number"name="product_price" value={productInput.product_price}  onChange={handleInput}
                                     className="form-control" placeholder="Nhập giá bán" />
                                    {/* <span className="text-alert">Nhập họ tên</span> */}
                                </th>
                            </tr>
                            <tr>
                                <th scope="row">Mô tả</th>
                                <th scope="col">
                                    <textarea rows="6" name="description" value={productInput.description} onChange={handleInput}
                                     className="form-control" placeholder="Nhập mô tả" />
                                    {/* <span className="text-alert">Nhập họ tên</span> */}
                                </th>
                            </tr>
                            <tr>
                                <th scope="row">Trạng thái</th>
                                <th scope="col">
                                    <select className="form-select" onChange={handleInput} name="is_sales" 
                                    aria-label="Default select example">
                                        <option value="DEFAULT" disabled>Chọn trạng thái</option>
                                        <option value="1">Còn hàng</option>
                                        <option value="0">Hết hàng</option>
                                    </select>
                                    {/* <span className="text-alert">Nhập họ tên</span> */}
                                </th>
                            </tr>
                        </table>
                        </div>
                        <div className="col-md-5">
                            <h5>Hình ảnh</h5>
                            <input type="file" name="product_image" onChange={handleImage} hidden className="mb-3" ref={inputFileRef} />
                            <div className="image-review">
                                <img onClick={chooseImage} src={noimg} alt="" />
                            </div>

                            <div className="box-upload-image mt-3">
                                <button className='btn-upload btn-primary'>Upload</button> 
                                <button className='btn-remove btn-danger'>Xóa file</button>
                                <input type="text" placeholder='Tên file' disabled/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" >
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
                            
                            <div className="card mb-4 mt-4">

                                <div className="card-header">
                                    <span>
                                        <i className="fas fa-table me-1"></i>
                                        Danh sách sản phẩm
                                    </span>
                                    <Button className="btn-add" onClick={handleShow}><i className="fa-solid fa-plus"></i> Thêm mới</Button>
                                </div>
                                <div className="card-body">

                                    <div className="box-search mt-1">
                                        <div className="row p-3">
                                            <div className="col-md-3 mb-1">
                                                <label htmlFor="name">Tên sản phẩm</label>
                                                <input type="text" id="name"  className="form-control" placeholder='Nhập tên sản phẩm'/>   
                                            </div>
                                            <div className="col-md-3  mb-1">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select className="form-select" id="status" aria-label="Default select example">
                                                <option value="DEFAULT" disabled>Chọn trạng thái</option>
                                                <option value="1">Tất cả</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div className="col-md-2 col-6 mb-1">
                                                <label htmlFor="price_from">Giá bán từ</label>
                                                <input type="number"  className="form-control" id='price_from'/>   
                                            </div>
                                            <div className="col-md-2 col-6 mb-1">
                                                <label htmlFor="price_to">Giá bán đến</label>
                                                <input type="number"  className="form-control" id='price_to'/>   
                                            </div>
                                            <div className="col-md-2 col-12 mb-1 box-btn-search mt-4">
                                                <button type="button"  className="btn btn-primary btn-search" ><i className="fa-solid fa-magnifying-glass"></i></button>
                                                &nbsp;
                                                <button type="button"  className="btn btn-danger btn-search">Xóa tìm</button> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Mã sản phẩm</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th>Mô tả</th>
                                                    <th>Giá</th>
                                                    <th>Tình trạng</th>
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
                                                    <td>$320,800</td>
                                                    <td className="text-center">
                                                        <span className='icon_btn'>
                                                            <i className="fa-solid fa-pencil"></i>
                                                        </span>
                                                        <span className='icon_btn'>
                                                            <i className="fa-solid fa-trash"></i>
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

export default Product;