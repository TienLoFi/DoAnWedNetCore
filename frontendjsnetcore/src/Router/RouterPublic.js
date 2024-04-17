import Home from "../Pages/Frontend/Home";
import ProductDetail from "../Pages/Frontend/ProductsDetail";
import ProductCategory from "../Pages/Frontend/ProductCategory";
import ProductBrand from "../Pages/Frontend/ProductBrand";
import Login from "../Pages/Frontend/Login";
import Register from "../Pages/Frontend/Register";
import Cart from "../Pages/Frontend/Cart";
const RouterPublic=[
    {path:'/',conponent:Home},
    {path:'/login',conponent:Login},
    {path:'/Register',conponent:Register},
    {path:'/chi-tiet-san-pham/:id',conponent:ProductDetail}, 
    {path:'/danh-muc-san-pham/:id',conponent:ProductCategory},
    {path:'/thuong-hieu-san-pham/:id',conponent:ProductBrand},
    {path:'/gio-hang',conponent:Cart},

];
export default RouterPublic;