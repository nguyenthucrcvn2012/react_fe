
import Products from '../components/admin/Products';
import Customers from '../components/admin/Customers';
import Users from '../components/admin/Users';

const routes = [ 
    { path: '/admin', exact: true, name: 'Admin'},
    { path: '/admin/product-management', exact: true, name: 'Products', component: Products},
    { path: '/admin/customer-management', exact: true, name: 'Customers', component: Customers},
    { path: '/admin/user-management', exact: true, name: 'Users', component: Users}
];

export default routes;