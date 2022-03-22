import React, { useState, useRef, useEffect } from 'react'
import { Modal, Button, Tooltip } from "react-bootstrap";

import Footer from "./../../layouts/admin/Footer";
import Navbar from "./../../layouts/admin/Navbar";
import Sidebar from "./../../layouts/admin/Sidebar";
import Navigation from '../../layouts/admin/Navigation';
import Loading from '../../layouts/admin/Loading';
import axios from 'axios';
// import moment from 'moment';
import Swal from "sweetalert2";

function Product() {

    const [loading, setLoading] = useState(true); // loading
    const [products, setProducts] = useState([]); // Products
    const [pagination, setPagination] = useState({});// Phân trang
    const [titleForm, setTitleForm] = useState('Thêm mới sản phẩm') //Tiêu đề form
    const [isResearch, setIsResearch] = useState(true) // kiểm tra data có phải đã được tìm kiếm hay không
    const [productImage, setProductImage] = useState()
    const [inputSearch, setInputSearch] = useState({
        product_name: '',
        is_sales: '',
        price_to: '',
        price_from: ''
    }) //Form search

    const [product, setProduct] = useState({
        product_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        description: '',
        is_sales: '',
        error_list: []
    });


    //Tìm kiếm
    const handleInputSearch = (e) => {
        setInputSearch({ ...inputSearch, [e.target.name]: e.target.value })
        console.log(inputSearch)
    }
    const submitSearch = (e) => {
        e.preventDefault()
        filterData()
        console.log(inputSearch)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            filterData()
            console.log(inputSearch)
        }
    }
    const handleInput = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
        console.log(product)
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    //Xóa tìm kiếm
    const handleDeleteSearch = () => {
        setIsResearch(false)
        setInputSearch({
            product_name: '',
            is_sales: '',
            price_to: '',
            price_from: ''
        })
        document.getElementById("SEARCH-FORM").reset();
        reloadPage(numPage)
    }
    //Tìm kiếm
    const filterData = () => {

        setIsResearch(true)
        loadPage(1)
    }
    //Hình mặc định
    var noimg = require('../../assets/images/noimage.png')
    const [imgData, setImgData] = useState(noimg);
    //chọn hình sp khi ấn vào hình hiện tại
    const inputFileRef = useRef(null);
    const chooseImage = () => {
        inputFileRef.current.click();
    }
    const onChangePicture = (e) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    //Hình ảnh sp
    const handleImage = (e) => {
        setProductImage(e.target.files[0])
        onChangePicture(e)
    }
    //Xóa hình ảnh
    const removeImage = () => {
        setImgData(noimg)
        setProductImage()
    }
    //Đóng modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        resetInput()
        setShow(false)
    };
    //Mở modal
    const handleShow = (id) => {
        if (id) {
            axios.get(`/api/products/${id}`).then(res => {
                if (res.data.status === 200) {
                    setTitleForm('Chỉnh sửa sản phẩm')

                    setProduct({
                        product_id: res.data.product.product_id,
                        product_name: res.data.product.product_name,
                        product_image: '',
                        product_price: res.data.product.product_price,
                        description: res.data.product.description === null ? '' : res.data.product.description,
                        is_sales: res.data.product.is_sales,
                        error_list: []
                    })
                    if(res.data.product.product_image !== null) {
                        setImgData(res.data.product.product_image);
                    }
                    setShow(true)
                }
                else if (res.data.status === 404) {
                    Swal.fire('Lỗi', res.data.message, 'warning')
                    loadPage(numPage)
                }
            });
        }
        else {
            resetInput()
            setTitleForm('Thêm mới sản phẩm')
            setShow(true)
        }
    }
    // RESET DATA
    const resetInput = () => {
        setProduct({
            product_id: '',
            product_name: '',
            product_price: '',
            product_image: '',
            description: '',
            is_sales: '',
            error_list: []
        })
        removeImage()
        // document.getElementById('USER_FORM').reset()
    }

    //RENDER
    var tableHTML = ""
    if (loading) {
        tableHTML = (
            <td colSpan={6}>
                <Loading />
            </td>
        )
    }
    else if (products.length > 0) {
        let numberProduct = pagination.current_page * 10;
        tableHTML = products?.map((pro, idx) => {
            let numPro = idx + 1 + numberProduct - 10;
            return (
                <tr key={idx}>
                    <td>{numPro}</td>
                    <td >{pro.product_id}</td>
                    <td className='td-product-name'>
                        {pro.product_name}
                        <img className='display-image-product' src={pro.product_image} alt="" />
                    </td>
                    <td>{pro.description}</td>
                    <td>{formatPrice(pro.product_price)}</td>
                    {/* <td>{moment(pro.created_at).format('YYYY MM DD')}</td> */}
                    <td>
                        {pro.is_sales === 1 ?
                            <span className='text-success'>Đang bán</span> :
                            <span className='text-danger'>Ngừng bán</span>
                        }
                    </td>
                    <td className="text-center">
                        <span className='icon_btn' onClick={() => handleShow(pro.product_id)}>
                            <i className="fa-solid fa-pencil"></i>
                        </span>
                        <span className='icon_btn'>
                            <i className="fa-solid fa-trash" onClick={(e) => deleteHandler(e, pro.product_id, pro.product_name)} ></i>
                        </span>
                    </td>
                </tr>
            );
        })
    }
    else {
        tableHTML = (
            <tr ><td colSpan={7}>Không có dữ liệu</td> </tr>
        )
    }

    //Cập nhật sản phẩm
    const submitUpdateProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('product_name', product.product_name);
        formData.append('product_price', product.product_price);
        formData.append('description', product.description);
        formData.append('is_sales', product.is_sales);
        formData.append('product_image', productImage);

        axios.post(`/api/products/${product.product_id}/update`, formData).then(res => {
            if (res.data.status === 200) {
                console.log(res.data)
                Swal.fire('Cập nhật sản phẩm', res.data.message, 'success')
                loadPage(numPage)
                setShow(false)
                resetInput()
                setProduct({
                    product_id: '',
                    product_name: '',
                    product_image: '',
                    product_price: '',
                    description: '',
                    is_sales: '',
                    error_list: []
                })
            }
            else if (res.data.status === 500 || res.data.status === 404) {
                Swal.fire('Cập nhật sản phẩm', res.data.message, 'error')
                setShow(false)
                resetInput()
                loadPage(numPage)
            }
            else {

                setProduct({ ...product, error_list: res.data.validation_errors })
            }
        });
    }

    //Lưu mới sản phẩm
    const submitStoreProduct = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('product_name', product.product_name);
        formData.append('product_price', product.product_price);
        formData.append('description', product.description);
        formData.append('is_sales', product.is_sales);
        formData.append('product_image', productImage);

        console.log(formData)

        axios.post(`/api/products/store`, formData).then(res => {
            if (res.data.status === 200) {

                Swal.fire('Thêm mới', res.data.message, 'success')

                loadPage(numPage)
                setShow(false)
                resetInput()
            }
            else if (res.data.status === 401) {

                Swal.fire('Thêm mới', res.data.message, 'success')
                loadPage(numPage)
            }
            else {

                setProduct({ ...product, error_list: res.data.validation_errors })
            }
        });
    }

    // Xử lí phân trang
    var numPage; // Số trang hiện tại
    const callBackChildren = (num) => {

        numPage = num
        console.log(numPage)
        loadPage(numPage)
    }

    //Hàm call api lấy danh sách sp
    const loadPage = (numPage) => {

        if (!isResearch) {

            reloadPage(numPage)
        }
        else {
            
            research(numPage)
        }
    }

    const reloadPage = (numPage) => {
        setLoading(true);
        axios.get(`/api/products?page=${numPage}`).then(res => {
            if (res.data.status === 200) {
                console.log(res.data)
                setProducts(res.data.products.data)
                setPagination({
                    current_page: res.data.products.current_page,
                    last_page: res.data.products.last_page,
                    to: res.data.products.to,
                    total: res.data.products.total,
                    from: res.data.products.from
                })
                setLoading(false);
            }
            else {
                Swal.fire('Tìm kiếm', res.data.message, 'warning')
                setLoading(false);
            }
        });
    }

    //call api filter
    const research = (numPage) => {

        const formData = new FormData();
        formData.append('product_name', inputSearch.product_name);
        formData.append('is_sales', inputSearch.is_sales);
        formData.append('price_to', inputSearch.price_to);
        formData.append('price_from', inputSearch.price_from);

        setLoading(true);
        axios.post(`api/products/search?page=${numPage}`, formData).then(res => {
            if (res.data.status === 200) {
                console.log(res.data)
                setProducts(res.data.products.data)
                setPagination({
                    current_page: res.data.products.current_page,
                    last_page: res.data.products.last_page,
                    to: res.data.products.to,
                    total: res.data.products.total,
                    from: res.data.products.from
                })
                setLoading(false);
            }
            else {
                Swal.fire('Tìm kiếm', res.data.message, 'warning')
                setLoading(false);
            }
        });
    }

    //Xóa sản phẩm
    const deleteHandler = (e, id, name) => {
        Swal.fire({
            title: 'Xác nhận xóa',
            text: `Bạn có chắc chắn xóa sản phẩm "${name}" không?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận!',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.post(`api/products/${id}/delete`).then(res => {
                    if (res.data.status === 200) {
                        Swal.fire('Xóa!', res.data.message, 'success')
                        loadPage(numPage)
                    }
                    else if (res.data.status === 404 || res.data.status === 500) {
                        loadPage(numPage)
                        Swal.fire('Xóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }

    //call api sau khi load trang
    useEffect(() => {
        loadPage(numPage);

    }, []);

    return (
        <div className="sb-nav-fixed">
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{titleForm}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form-product" encType="multipart/form-data">
                        <div className="row">
                            <div className="col-md-7">
                                <table className="w-100">
                                    <tr>
                                        <th scope="col">Tên sản phẩm <span className='text-danger'>*</span></th>
                                        <th scope="col">
                                            <input type="text" name="product_name" value={product.product_name} onChange={handleInput}
                                                className="form-control" placeholder="Nhập tên sản phẩm" />
                                            <span className="text-alert">{product.error_list.product_name}</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Giá bán <span className='text-danger'>*</span></th>
                                        <th scope="col">
                                            <input type="number" name="product_price" value={product.product_price} onChange={handleInput}
                                                className="form-control" min="0" placeholder="Nhập giá bán" />
                                            <span className="text-alert">{product.error_list.product_price}</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Mô tả</th>
                                        <th scope="col">
                                            <textarea rows="6" name="description" value={product.description} onChange={handleInput}
                                                className="form-control" placeholder="Nhập mô tả" />
                                            <span className="text-alert">{product.error_list.description}</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row">Trạng thái <span className='text-danger'>*</span></th>
                                        <th scope="col">
                                            <select className="form-select" onChange={handleInput} name="is_sales"
                                                aria-label="Default select example">
                                                <option value="" >Chọn trạng thái</option>
                                                <option value="1" selected={product.is_sales === 1 ? 'selected' : ''}>Đang bán</option>
                                                <option value="0" selected={product.is_sales === 0 ? 'selected' : ''}>Ngừng bán</option>
                                            </select>
                                            <span className="text-alert">{product.error_list.is_sales}</span>
                                        </th>
                                    </tr>
                                </table>
                            </div>
                            <div className="col-md-5">
                                <h5>Hình ảnh</h5>
                                <input type="file" accept="image/*" name="product_image" onChange={handleImage} className="mb-3" ref={inputFileRef} />
                                <div className="image-review" id="REVIEW-IMAGE">
                                    <img onClick={chooseImage} src={imgData} alt="" />
                                </div>
                                <span className="text-alert">{product.error_list.product_image}</span>

                                <div className="box-upload-image mt-3">
                                    <button className='btn-upload btn-primary'>Upload</button>
                                    <button className='btn-remove btn-danger' onClick={removeImage}>Xóa file</button>
                                    <input type="text" placeholder='Tên file' disabled />
                                </div>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" onClick={product.product_id !== '' ? submitUpdateProduct : submitStoreProduct} >
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

                            <div className="card mb-4 mt-4">

                                <div className="card-header">
                                    <span>
                                        <i className="fas fa-table me-1"></i>
                                        Danh sách sản phẩm
                                    </span>
                                    <button className="btn-primary btn btn-search  m-1" onClick={() => handleShow()}><i className="fa-solid fa-plus"></i> Thêm mới</button>
                                </div>
                                <div className="card-body">

                                    <form action="" id="SEARCH-FORM">

                                        <div className="box-search mt-1">
                                            <div className="row p-3">
                                                <div className="col-md-3 mb-1">
                                                    <label htmlFor="name">Tên sản phẩm</label>
                                                    <input type="text" name="product_name" className="form-control"
                                                        value={inputSearch.product_name} onChange={handleInputSearch}
                                                        placeholder='Nhập tên sản phẩm' onKeyPress={handleKeyDown} />
                                                </div>
                                                <div className="col-md-3  mb-1">
                                                    <label htmlFor="status">Trạng thái</label>
                                                    <select className="form-select" name="is_sales" onChange={handleInputSearch} aria-label="Default select example">
                                                        <option value="" >Chọn trạng thái</option>
                                                        <option value="1">Đang bán</option>
                                                        <option value="0">Ngừng bán</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-3 col-6 mb-1">
                                                    <label htmlFor="price_from">Giá bán từ</label>
                                                    <input type="number" min="0" onChange={handleInputSearch} onKeyPress={handleKeyDown} value={inputSearch.price_from} className="form-control" name="price_from" />
                                                </div>
                                                <div className="col-md-3 col-6 mb-1">
                                                    <label htmlFor="price_to">Giá bán đến</label>
                                                    <input type="number" min="0" onChange={handleInputSearch} onKeyPress={handleKeyDown} value={inputSearch.price_to} className="form-control" name="price_to" />
                                                </div>
                                                <div className="col-md-12 col-12 mb-1 box-btn-search mt-4">
                                                    <button type="button" className="btn btn-primary btn-search  m-1" onClick={submitSearch}><i className="fa-solid fa-magnifying-glass"></i></button>
                                                    &nbsp;
                                                    <button type="button" className="btn btn-danger btn-search  m-1" onClick={handleDeleteSearch}><i className="fa-solid fa-x"></i> Xóa tìm</button>
                                                    &nbsp;
                                                </div>
                                            </div>
                                        </div>
                                    </form>
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
                                                {
                                                    tableHTML ? tableHTML : <tr ><td colSpan={6}>Không có dữ liệu</td> </tr>
                                                }
                                            </tbody>
                                        </table>
                                        <Navigation Paginate={pagination} childToParent={callBackChildren} />
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