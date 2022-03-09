import React from "react";
import {
    Routes,
    Route,
    useNavigate,
    Navigate
} from 'react-router-dom';

import "../../assets/css/styles.css";
import "../../assets/js/scripts";

import Footer  from "./Footer";
import Navbar  from "./Navbar";
import Sidebar  from "./Sidebar";

import routes from "../../routes/routers";

const MasterLayout = () => {


    const navigate = useNavigate();

    return (
        <div className="sb-nav-fixed">
            <Navbar />

            <div id="layoutSidenav">
                <Sidebar />
            
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">  
                            <Routes>
                                {routes.map((route, idx) => {
                                    return (
                                        route.component && (
                                            <Route 
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={(props) => (
                                                    <route.component {...props} />
                                                )}
                                            />
                                        )
                                    )
                                })}
                                <Navigate from="/admin" to="/admin/dashboard" />
                            </Routes>
                        </div>
                    </main>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default MasterLayout;