import React, {useState, useRef, useEffect} from 'react'
import { Modal, Button } from "react-bootstrap";

import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";
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
    const [inputSearch, setInputSearch] = useState({}) //Form search

    const [product, setProduct] = useState({

        product_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        description: '',
        is_sales: '',
        error_list: []

    }); 

    const handleInputSearch = (e) => {
        setInputSearch({ ...inputSearch, [e.target.name]: e.target.value })
        console.log(inputSearch)
    }

    //Hình mặc định
    var noimg = require('../../assets/images/noimage.png')
    const [imgData, setImgData] = useState(noimg);
    //chọn hình sp khi ấn vào hình hiện tại
    const inputFileRef = useRef( null );
    const chooseImage = () => {
        inputFileRef.current.click();
    }
    const onChangePicture = (e) => {
        if (e.target.files[0]) {
          console.log("picture: ", e.target.files);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setImgData(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };
    //Hình ảnh sp
    const [productImage, setProductImage] = useState({})
    const handleImage = (e) => {
        const file = e.target.files[0];
        setProductImage({ image: file})
        onChangePicture(e)
    }
    //Xóa hình ảnh
    const removeImage = () => {
        setImgData(noimg)
        setProductImage({})
    }

    //Xóa tìm kiếm
    const handleDeleteSearch = () => {
        loadPage(1)
        setInputSearch({})
        console.log(inputSearch)
    }

    //Đóng mở modal form
    const [show, setShow] = useState(false);
    const handleClose = () => {
        resetInput()
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const handleInput = (e) => {
        setProduct({...product, [e.target.name]: e.target.value})
    }

    // RESET DATA
    const resetInput = () => {
        setProduct({
            product_id:  '',
            product_name:  '',
            product_price:  '',
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
    if(loading){
        tableHTML =  (
            <td colSpan={6}>
                <Loading />
            </td>
        )
    }
    else if(products.length > 0) {
        let numberProduct = pagination.current_page * 10;
        tableHTML = products?.map((pro, idx) => {
        let numPro = idx + 1 + numberProduct - 10 ;
        return (
            <tr key={idx}>
                <td>{numPro}</td>
                <td>{pro.product_name}</td>
                <td>{pro.description}</td>
                <td>{pro.product_price}</td>
                {/* <td>{moment(pro.created_at).format('YYYY MM DD')}</td> */}
                <td>
                    {pro.is_sales === 1 ? 
                        <span className='text-success'>Đang bán</span> :
                        <span className='text-danger'>Ngừng bán</span>
                    }
                </td>
                <td className="text-center">
                    <span className='icon_btn'>
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
                <tr ><td colSpan={6}>Không có dữ liệu</td> </tr>
            )
        }


    //Lưu mới sản phẩm
    const submitStoreProduct = (e) =>{
        e.preventDefault()

        const formData = new FormData();
        formData.append('product_name', product.product_name  );
        formData.append('product_price', product.product_price );
        formData.append('description', product.description );
        formData.append('is_sales', product.is_sales );
        formData.append('product_image', productImage.image);

        // const data = {
        //     product_name: product.product_name,
        //     product_price: product.product_price,
        //     description: product.description,
        //     is_sales: product.is_sales,
        // }

        axios.post(`/api/products`, formData).then(res => {
            if(res.data.status === 200){

                Swal.fire('Thêm mới', res.data.user, 'success')
                loadPage(numPage)
                setShow(false)
                resetInput()
            }
            else if(res.data.status === 401){

                Swal.fire('Thêm mới', res.data.message, 'success')
                loadPage(numPage)
            }
            else{

                setProduct({...product, error_list: res.data.validation_errors})
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

    // Định dạng số tiền
    // const convertNum = (num) => {
    //     return  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(num);
    // }

    //Hàm call api lấy danh sách sp
    const loadPage = (numPage, condition) => {
        setLoading(true);
        axios.get(`/api/products?page=${numPage}`, condition).then(res => {
            if(res.data.status === 200){
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
            else{
                setLoading(true);
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

                axios.delete(`api/products/${id}`).then(res => {
                    if (res.data.status === 200) {
                        Swal.fire('Xóa!', res.data.message, 'success')
                        loadPage(numPage)
                    }
                    else if (res.data.status === 404) {
                        Swal.fire('Xóa!', res.data.message, 'error')
                    }
                });

            }
        })
    }

    //call api sau khi load trang
    useEffect(() =>{
            
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
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">
                                    <input type="text" name="product_name" value={product.product_name}  onChange={handleInput}
                                     className="form-control" placeholder="Nhập tên sản phẩm" />
                                    <span className="text-alert">{product.error_list.product_name}</span>
                                </th>
                            </tr>
                            <tr>
                                <th scope="row">Giá bán</th>
                                <th scope="col">
                                    <input type="number" name="product_price" value={product.product_price}  onChange={handleInput}
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
                                <th scope="row">Trạng thái</th>
                                <th scope="col">
                                    <select className="form-select" onChange={handleInput} name="is_sales" 
                                    aria-label="Default select example">
                                        <option value="" >Chọn trạng thái</option>
                                        <option value="1" selected={product.is_sales == '1' ? 'selected' : ''}>Còn hàng</option>
                                        <option value="0" selected={product.is_sales == '0' ? 'selected' : ''}>Hết hàng</option>
                                    </select>
                                    <span className="text-alert">{product.error_list.is_sales}</span>
                                </th>
                            </tr>
                        </table>
                        </div>
                        <div className="col-md-5">
                            <h5>Hình ảnh</h5>
                            <input type="file"  accept="image/*" name="product_image" hidden onChange={handleImage}  className="mb-3" ref={inputFileRef} />
                            <div className="image-review" id="REVIEW-IMAGE">
                                <img onClick={chooseImage} src={imgData} alt="" />
                            </div>
                                <span className="text-alert">{product.error_list.product_image}</span>

                            <div className="box-upload-image mt-3">
                                <button className='btn-upload btn-primary'>Upload</button> 
                                <button className='btn-remove btn-danger' onClick={removeImage}>Xóa file</button>
                                <input type="text" placeholder='Tên file' disabled/>
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={submitStoreProduct} >
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
                                </div>
                                <div className="card-body">

                                    <div className="box-search mt-1">
                                        <div className="row p-3">
                                            <div className="col-md-3 mb-1">
                                                <label htmlFor="name">Tên sản phẩm</label>
                                                <input type="text" name="name"  className="form-control" value={inputSearch.name} onChange={handleInputSearch} placeholder='Nhập tên sản phẩm'/>   
                                            </div>
                                            <div className="col-md-3  mb-1">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select className="form-select" name="is_sales" onChange={handleInputSearch} value={inputSearch.is_sales} aria-label="Default select example">
                                                <option value="" disabled>Chọn trạng thái</option>
                                                <option value="1">Đang bán</option>
                                                <option value="0">Ngừng bán</option>
                                                </select>
                                            </div>
                                            <div className="col-md-3 col-6 mb-1">
                                                <label htmlFor="price_from">Giá bán từ</label>
                                                <input type="number" onChange={handleInputSearch} value={inputSearch.price_from}  className="form-control" name='price_from'/>   
                                            </div>
                                            <div className="col-md-3 col-6 mb-1">
                                                <label htmlFor="price_to">Giá bán đến</label>
                                                <input type="number" onChange={handleInputSearch} value={inputSearch.price_to}  className="form-control" name='price_to'/>   
                                            </div>
                                            <div className="col-md-12 col-12 mb-1 box-btn-search mt-4">
                                                <button type="button"  className="btn btn-primary btn-search  m-1" ><i className="fa-solid fa-magnifying-glass"></i></button>
                                                &nbsp;
                                                <button type="button"  className="btn btn-danger btn-search  m-1" onClick={handleDeleteSearch}><i className="fa-solid fa-x"></i> Xóa tìm</button> 
                                                &nbsp;
                                                <button className="btn-primary btn btn-search  m-1" onClick={handleShow}><i className="fa-solid fa-plus"></i> Thêm mới</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
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

export default Product;