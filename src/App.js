import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import axios from 'axios';

import MasterLayout from './layouts/admin/MasterLayout';  
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Customers from './components/admin/Customers';
import Users from './components/admin/Users';
import Login from './components/auth/Login';


axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* <Route path="/admin" name="Admin" render={(props) => <MasterLayout {...props} />} /> */}
          <Route path="/login" name="Login" element={<Login />} />

          <Route path="/admin" name="Admin" element={<MasterLayout />} />
          <Route path="/admin/dashboard" name="Dashboard" element={<Dashboard />} />
          <Route path="/admin/product-management" name="Products" element={<Products />} />
          <Route path="/admin/customer-management" name="Customers" element={<Customers />} />
          <Route path="/admin/user-management" name="Users" element={<Users />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
