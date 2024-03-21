import Home from "../Pages/Frontend/Home";
import ProductDetail from "../Pages/Frontend/ProductsDetail";

const RouterPublic=[
    {path:'/',conponent:Home},
    {path:'/chi-tiet-san-pham/:id',conponent:ProductDetail}, 
];
export default RouterPublic;