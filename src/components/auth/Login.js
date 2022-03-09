import React, {useState} from 'react'

import "../../assets/css/auth.css";
import axios from 'axios';

function Login() {

    const [inputLogin, setLogin] = useState({
        email: '',
        password: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist()
        setLogin({...inputLogin, [e.target.name]: e.target.value})
    }

    const loginSubmit = (e) => {
        e.preventDefault()

        const data = {
            email: inputLogin.email,
            password: inputLogin.password,
        };
        axios.get(`/sanctum/csrf-cookie`).then(response => {

            axios.post(`/api/login`, data).then(res => {
                if(res.data.status === 200)
                {

                }
                else if(res.data.status === 401){

                }
                else{
                    setLogin({...inputLogin, error_list: res.data.validation_errors})
                }
            })
        });
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header text-center">
                                <h4>Đăng nhập</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="">Tài khoản</label>
                                        <input type="text" name="email" value={inputLogin.email} onChange={(e) => handleInput()} className="form-control" />
                                        <span className="text-danger">{inputLogin.error_list.email}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Mật khẩu</label>
                                        <input type="password" name="password" value={inputLogin.password}onChange={(e) => handleInput()}  className="form-control" />
                                        <span className="text-danger">{inputLogin.error_list.password}</span>
                                    </div>
                                    <div className="d-flex box-btn">
                                        <div className="form-check m-3">
                                            <input className="form-check-input" name="remember" type="checkbox" />
                                            <label className="form-check-label" >
                                                Lưu đăng nhập
                                            </label>
                                            </div>
                                        <button className="btn btn-primary m-3">Đăng nhập</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;