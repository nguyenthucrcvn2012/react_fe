import React from 'react'

import "./../../../src/assets/css/admin.css";

import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";

function Product() {
    return (        
    <div className="sb-nav-fixed">
            <Navbar />

                <div id="layoutSidenav">

                <Sidebar />
            
                    <div id="layoutSidenav_content">
                        <main>
                            <div className="container-fluid px-4"> 
                                
                                <div className="card mb-4 mt-4">

                                <div className="box-search mb-3 mt-1">
                                    <div className="row p-3">
                                        <div className="col-md-3 mb-1">
                                            <label htmlFor="name">Tên sản phẩm</label>
                                         <input type="text" id="name"  className="form-control" placeholder='Nhập tên sản phẩm'/>   
                                        </div>
                                        <div className="col-md-3  mb-1">
                                            <label htmlFor="status">Trạng thái</label>
                                            <select className="form-select" id="status" aria-label="Default select example">
                                            <option selected>Chọn trạng thái</option>
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
                                            <button type="button"  className="btn btn-primary btn-search" >Tìm kiếm</button>
                                            &nbsp;
                                            <button type="button"  className="btn btn-danger btn-search">Xóa tìm</button> 
                                        </div>
                                    </div>
                                </div>

                                    <div className="card-header">
                                        <span>
                                            <i className="fas fa-table me-1"></i>
                                            Danh sách sản phẩm
                                        </span>
                                        <span className="btn-add"><i class="fa-solid fa-plus"></i> Thêm mới</span>
                                    </div>
                                    <div className="card-body">
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
                                                                <i class="fa-solid fa-pencil"></i>
                                                            </span>
                                                            <span className='icon_btn'>
                                                                <i class="fa-solid fa-trash"></i>
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