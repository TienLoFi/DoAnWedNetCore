import Home from "../Pages/Frontend/Home";
import ProductDetail from "../Pages/Frontend/ProductsDetail";
import ProductCategory from "../Pages/Frontend/ProductCategory";
import Login from "../Pages/Frontend/Login";
import Register from "../Pages/Frontend/Register";
const RouterPublic=[
    {path:'/',conponent:Home},
    {path:'/login',conponent:Login},
    {path:'/Register',conponent:Register},
    {path:'/chi-tiet-san-pham/:id',conponent:ProductDetail}, 
    {path:'/danh-muc-san-pham/:id',conponent:ProductCategory},
];
export default RouterPublic;