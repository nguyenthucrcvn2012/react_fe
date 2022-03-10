import React from "react";
// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     useNavigate,
//     Navigate
// } from 'react-router-dom';

// import "../../assets/css/styles.css";
// import "../../assets/js/scripts";

import Footer  from "./Footer";
import Navbar  from "./Navbar";
import Sidebar  from "./Sidebar";

// import routes from "../../routes/routers";


// import Products from '../../components/admin/Products';
// import Customers from '../../components/admin/Customers';
// import Users from '../../components/admin/Users';
// import Orders from '../../components/admin/Orders';

const MasterLayout = () => {


    // const navigate = useNavigate();

    return (
        <div className="sb-nav-fixed">
            <Navbar />

            <div id="layoutSidenav">
                <Sidebar />
            
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">  
                            {/* <Routes> */}
                                {/* {routes.map((route, idx) => {
                                    return (
                                        route.component && (
                                            <Route 
                                                key={idx}
                                                path={route.path}
                                                name={route.name}
                                                render={(props) => (
                                                    <route.component {...props} />
                                                )}
                                            />
                                        )
                                    )
                                })} */}
                                {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
                                {/* <Route path="/admin/customers" element={<Customers />} />
                                <Route path="/admin/products" element={<Products />} />
                                <Route path="/admin/users" element={<Users />} />
                                <Route path="/admin" element={<Navigate replace to="/admin/dashboard" />} /> */}
                            {/* </Routes> */}

                        </div>
                    </main>

                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default MasterLayout;