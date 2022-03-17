import React, {useState, useEffect, useRef} from 'react'
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import Swal from "sweetalert2";

import Footer  from "./../../layouts/admin/Footer";
import Navbar  from "./../../layouts/admin/Navbar";
import Sidebar  from "./../../layouts/admin/Sidebar";
import Navigation from '../../layouts/admin/Navigation';
import Loading from '../../layouts/admin/Loading';

function Customers() {

    const [loading, setLoading] = useState(true); //Loading
    const [customers, setCustomers] = useState([]); // fetch customers
    const [pagination, setPagination] = useState({});// Phân trang
    const [titleForm, setTitleForm] = useState('Thêm mới customer') //Title form
    const [checkedStatus, setCheckedStatus] = useState(false) //Check status user form
    const [isResearch, setIsResearch] = useState(true) // kiểm tra data có phải đã được tìm kiếm hay không

    const [isEdit, setIsEdit] = useState(null);

    // var isResearch = true;

        //edit customer
    const editRowCustomer = (id, name, tel, address, email) => {
        setCustomer({
            customer_name:  name,
            email:  email,
            tel_num: tel,
            address:  address,
            customer_id:  id,
            error_list: []
        })
        setIsEdit(id)
    }

    const handleInputEditRow = (e) => {
        setCustomer({ ...customer, [e.target.name] : e.target.value })
        console.log(customer)
    }
    

    // Customer
    const [customer, setCustomer] = useState({
        customer_id: '',
        customer_name: '',
        email:  '',
        address:  '',
        tel_num:  '',
        error_list: []
    }); //form

    const [inputSearch, setInputSearch] = useState({
        customer_name:  '',
        email:  '',
        is_active: '',
        address:  '',
    }) //Form search

    //Chọn file csv
    const inputFileRef = useRef( null );
    const chooseFile = () => {
        inputFileRef.current.click();
    }

    //export CSV 
    const exportCsv = (e) => {

        const formData = new FormData();
        formData.append('customer_name', inputSearch.customer_name);
        formData.append('email', inputSearch.email);
        formData.append('address', inputSearch.address);
        formData.append('is_active', inputSearch.is_active);
        console.log(formData)
        
        axios.post(`api/customers/export/`, formData).then(res => {

            console.log(res.data)
            var csvString = res.data;

            var a = window.document.createElement('a');
            a.setAttribute('href', 'data:text/csv; charset=utf-8,' + encodeURIComponent(csvString));
            a.setAttribute('download', 'customer.csv');
            a.click();
        });
    }

    //import CSV
    const handleCsv = (e) => {
        
        // setFileCsv(e.target.files[0]);
        console.log(e.target.files[0])
        if(e.target.files[0]){
            const fileCsv = e.target.files[0];
            Swal.fire({
                title: 'Xác nhận?',
                text: "Import CSV!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Hủy',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true);

                    const formData = new FormData();
                    formData.append('file', fileCsv  );

                    axios.post(`api/customers/import/`, formData).then(res => {
                        console.log(res.data)
                        if (res.data.status === 200) {
                            console.log(res.data)
                            Swal.fire(
                                'Import',
                                res.data.message,
                                'success'
                            )
                            loadPage(numPage)
                            setLoading(false);
                        }
                        else if(res.data.status === 422){
                            Swal.fire(
                                'Import',
                                res.data.message,
                                'error'
                              )
                              setLoading(false);
                        }
                        else if(res.data.status === 401){
                            Swal.fire(
                                'Import',
                                res.data.message,
                                'error'
                              )
                              setLoading(false);
                        }
                        else {
                            Swal.fire(
                                'Import',
                                res.data.message,
                                'error'
                              )
                              setLoading(false);
                        }
                    });
                    e.target.value = ""
                }
                else{
                    e.target.value = ""
                }
            })
        }
    };

    var numPage; // Số trang hiện tại
    const callBackChildren = (num) => {
        const formData = new FormData();
        formData.append('customer_name', inputSearch.customer_name);
        formData.append('email', inputSearch.email);
        formData.append('address', inputSearch.address);
        formData.append('is_active', inputSearch.is_active);
        numPage = num
        console.log(numPage)
        loadPage(numPage, formData)
    }

    //input search
    const handleInputSearch = (e) => {
        setInputSearch({ ...inputSearch, [e.target.name]: e.target.value })
        console.log(inputSearch)
    }

    //Xóa tìm kiếm
    const handleDeleteSearch = () => {
        loadPage(1)
        setInputSearch({})
        console.log(inputSearch)
        document.getElementById("SEARCH-FORM").reset();
        // isResearch = false
        setIsResearch(false)
        
    }
    
    //Tìm kiếm
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            filterData()
          }
    }    
    const submitSearch = (e) => {
        e.preventDefault()
        filterData()
    }

    const filterData = () => {
        numPage = 1;
        const formData = new FormData();
        formData.append('customer_name', inputSearch.customer_name);
        formData.append('email', inputSearch.email);
        formData.append('address', inputSearch.address);
        formData.append('is_active', inputSearch.is_active);

        // const formData = {
        //     name: inputSearch.name,
        //     email: inputSearch.email,
        //     is_active: inputSearch.is_active,
        //     group_role: inputSearch.group_role,
        // }
        // loadPage(1, formData);
        // console.log(formData)
        setIsResearch(true)
        // isResearch = true
        loadPage(1, formData)
       
    }

    //call api filter
    const research = (numPage, formData) => {
        setLoading(true);
        axios.post(`api/customers/search?page=${numPage}`, formData).then(res => {
            if ( res.data.status === 200) {
                setCustomers(res.data.customers.data)
                setPagination({
                    current_page: res.data.customers.current_page,
                    last_page: res.data.customers.last_page,
                    to: res.data.customers.to,
                    total: res.data.customers.total,
                    from: res.data.customers.from
                })
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        });
    }

    //Call api lấy dsach
    const loadPage = (numPage, formData) => {

        if(!isResearch) {
            setLoading(true);
            axios.get(`/api/customers?page=${numPage}`).then(res => {
                if(res.data.status === 200){
                    setCustomers(res.data.customers.data)
                    setPagination({
                        current_page: res.data.customers.current_page,
                        last_page: res.data.customers.last_page,
                        to: res.data.customers.to,
                        total: res.data.customers.total,
                        from: res.data.customers.from
                    })
                    setLoading(false);
                }
                else{
                    Swal.fire('Tìm kiếm', res.data.message, 'warning')
                    setLoading(false);
                }
            }); 
        }
        else{
            research(numPage, formData)
        }
    }

    //Load data sau khi load trang
    useEffect(() =>{
        const formData = new FormData();
        loadPage(numPage, formData);

    }, []);

    //set state input
    const handleInput = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
        console.log(customer)
        console.log(checkedStatus)
    }

    //Reset input form
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

    //Đóng modal
    const handleClose = () => {
        resetInput()
        setShow(false)
        setIsEdit(null)
    };

    const handleShow = (id) => {
         // resetInput()
         if(Number.isInteger(id)) {

            axios.get(`/api/customers/${id}`).then(res => {
                console.log(res.data)
                if(res.data.status === 200){
                    setShow(true)
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


    //Thêm mới customer
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

    //Cập nhật customer
    const submitUpdateCustomer = (e) => {

        e.preventDefault()
        const data = {
            email: customer.email,
            customer_name: customer.customer_name,
            address: customer.address,
            tel_num: customer.tel_num,
            is_active: checkedStatus,
        }
        const formData = new FormData();
        formData.append('customer_name', inputSearch.customer_name);
        formData.append('email', inputSearch.email);
        formData.append('address', inputSearch.address);
        formData.append('is_active', inputSearch.is_active);

        axios.put(`/api/customers/${customer.customer_id}`, data).then(res => {
            if(res.data.status === 200){
                Swal.fire('Cập nhật', res.data.message, 'success')
                loadPage(numPage, formData)
                resetInput()
                setShow(false)
                setIsEdit(null)
            }
            else if(res.data.status === 401){
                Swal.fire('Cập nhật', res.data.message, 'success')
                loadPage(numPage, formData)
            }
            else{
                setCustomer({...customer, error_list: res.data.validation_errors})
            }
        }); 
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
     else if(customers.length > 0) {
            let numberCustomer = pagination.current_page * 10;
            tableHTML = 
            customers?.map((cus, idx) => {
                let numUser = idx + 1 + numberCustomer - 10 ;
                return (
                <tr key={idx} id={numUser}>
                    <td>{numUser}</td>
                    <td> 
                        <p>{isEdit === cus.customer_id ?  <input type="text"  name="customer_name" onChange={handleInputEditRow} value={customer.customer_name} />
                         :
                         <span>{cus.customer_name}</span> }</p>  <p className='text-danger'>{isEdit === cus.customer_id ? customer.error_list.customer_name : ''}</p>
                    </td>
                    <td> 
                        <p>{isEdit === cus.customer_id ? <input type="text" name="email" onChange={handleInputEditRow}  value={customer.email} /> 
                        :
                         <span>{cus.email}</span> }  </p>  <p className='text-danger'>{isEdit === cus.customer_id ? customer.error_list.email : ''}</p>
                    </td>
                    <td> 
                        <p>{isEdit === cus.customer_id ? <input type="text"  name="tel_num" onChange={handleInputEditRow} value={customer.tel_num} /> 
                        : 
                        <span>{cus.tel_num}</span> }  </p>  <p className='text-danger'>{isEdit === cus.customer_id ? customer.error_list.tel_num : ''}</p>
                    </td>
                    <td> 
                        <p>{isEdit === cus.customer_id ? <input type="text" name="address"  onChange={handleInputEditRow} value={customer.address} />
                         :
                          <span>{cus.address}</span> } </p>  <p className='text-danger'>{isEdit === cus.customer_id ? customer.error_list.address : ''}</p> 
                    </td>
                    <td className="text-center">
                        { isEdit === cus.customer_id ?  
                        <>
                            <span className='icon_btn' onClick={submitUpdateCustomer}>
                                <i className="fa-solid fa-check"></i>
                            </span> 
                            <span className='icon_btn' onClick={() => setIsEdit(null)}>
                                <i className="fa-solid fa-x"></i>
                            </span>
                        </>
                         : 
                        <span className='icon_btn' onClick={() => editRowCustomer(cus.customer_id, cus.customer_name, cus.tel_num, cus.address, cus.email)}>
                            <i className="fa-solid fa-pencil"></i>
                        </span>
                        }
                       
                        <span className='icon_btn' onClick={() => handleShow(cus.customer_id)}>
                            <i className="fa-solid fa-pen-fancy"></i>
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
                                <input type="text" name="customer_name" className="form-control"  value={customer.customer_name} 
                                onChange={handleInput} placeholder="Nhập họ tên" />
                                <span className="text-alert">{customer.error_list.customer_name}</span>
                            </th>
                        </tr>
                        <tr>
                            <th scope="row">Email</th>
                            <th scope="col">
                                <input type="email" name="email"  className="form-control" value={customer.email} 
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
                                        
                                        <button className="btn btn-primary btn-search" onClick={() => handleShow()}>
                                                    <i className="fa-solid fa-plus"></i> Thêm mới</button>
                                    </div>
                                    <div className="card-body">
                                        
                                <div className="box-search mt-1">
                                    <form action="" id="SEARCH-FORM">
                                        <div className="row p-3">
                                            <div className="col-md-3 mb-1">
                                                <label htmlFor="name">Tên</label>
                                                <input type="text" id="name" name="customer_name" onChange={handleInputSearch}  onKeyPress={handleKeyDown}
                                                 className="form-control" placeholder='Nhập họ tên'/>   
                                            </div>
                                            <div className="col-md-3 mb-1">
                                                <label htmlFor="email">Email</label>
                                                <input type="text" id="email" name="email"  onChange={handleInputSearch} onKeyPress={handleKeyDown}
                                                 className="form-control" placeholder='Nhập email'/>   
                                            </div>
                                            <div className="col-md-3  mb-1">
                                                <label htmlFor="status">Trạng thái</label>
                                                <select className="form-select" id="status" onChange={handleInputSearch} name="is_active" aria-label="Default select example">
                                                <option value="" >Chọn trạng thái</option>
                                                <option value="1">Đang hoạt động</option>
                                                <option value="0">Tạm khóa</option>
                                                </select>
                                            </div>
                                            <div className="col-md-3 mb-1">
                                                <label htmlFor="name">Địa chỉ</label>
                                                <input type="text" id="name" name="address" onChange={handleInputSearch} onKeyPress={handleKeyDown}
                                                 className="form-control" placeholder='Nhập địa chỉ'/>   
                                            </div>
                                            <div className="col-md-12 mb-1 box-btn-search mt-4">
                                                <button type="button" className="btn btn-primary btn-search m-1" onClick={submitSearch}>
                                                    <i className="fa-solid fa-magnifying-glass"></i></button>
                                                &nbsp;
                                                <button type="button" className="btn btn-danger btn-search m-1" onClick={handleDeleteSearch}>
                                                    <i className="fa-solid fa-x"></i> Xóa tìm</button>
                                                &nbsp;
                                                <button type="button" className="btn btn-success btn-search m-1" onClick={chooseFile}>
                                                    <i className="fa-solid fa-file-import"></i> Import CSV</button> 
                                                &nbsp;
                                                <button type="button" className="btn btn-success btn-search m-1" onClick={exportCsv}>
                                                    <i className="fa-solid fa-file-arrow-down"></i> Export CSV</button> 
                                                &nbsp;
                                            </div>
                                        </div>
                                        <input type="file" name="product_image" hidden accept={".csv"} onChange={handleCsv} className="mb-3" ref={inputFileRef} />
                                    </form>
                                    </div>
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
                                                <tbody className="box-input">
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

export default Customers;