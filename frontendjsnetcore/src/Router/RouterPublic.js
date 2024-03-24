import Home from "../Pages/Frontend/Home";
import ProductDetail from "../Pages/Frontend/ProductsDetail";
import ProductCategory from "../Pages/Frontend/ProductCategory";
const RouterPublic=[
    {path:'/',conponent:Home},
    {path:'/chi-tiet-san-pham/:id',conponent:ProductDetail}, 
    {path:'/danh-muc-san-pham/:id',conponent:ProductCategory},
];
export default RouterPublic;