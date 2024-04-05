// import BannerCreate from "../pages/BackEnd/Banner/BannerCreate";
// import BannerList from "../pages/BackEnd/Banner/BannerList";
import BrandCreate from "../Pages/Backend/Brand/BrandCreate";
import BrandAll from "../Pages/Backend/Brand/BrandAll";
// import BrandShow from "../pages/BackEnd/Brand/BrandShow";
// import BrandUpdate from "../pages/BackEnd/Brand/BrandUpdate";
import Dashboard from "../Pages/Backend/Dasboard";
import ProductCreate from "../Pages/Backend/Product/ProductCreate";
import ProductAll from "../Pages/Backend/Product/ProductAll";
import ProductDetail from "../Pages/Backend/Product/ProductDetail";
import ProductEdit from "../Pages/Backend/Product/ProductEdit";
// import ProductCreateSale from "../pages/BackEnd/ProductSale/ProductCreateSale";
// import ProductListSale from "../pages/BackEnd/ProductSale/ProductListSale";
// import ProductShowSale from "../pages/BackEnd/ProductSale/ProductShowSale";

const RouterPrivate=[
    {path:'/admin',conponent:Dashboard},

    {path:'/admin/brand',conponent:BrandAll},
    {path:'/admin/brand/create',conponent:BrandCreate},
    // {path:'/admin/brand/update/:id',conponent:BrandUpdate},
    // {path:'/admin/brand/show/:id',conponent:BrandShow},  

    {path:'/admin/product',conponent:ProductAll},
    {path:'/admin/product/create',conponent:ProductCreate},
    {path:'/admin/product/update/:id',conponent:ProductEdit},
    {path:'/admin/product/show/:id',conponent:ProductDetail},  

    // {path:'/admin/productsale',conponent:ProductListSale},
    // {path:'/admin/productsale/create',conponent:ProductCreateSale},
    // {path:'/admin/productsale/show/:id',conponent:ProductShowSale},

    // {path:'/admin/banner',conponent:BannerList},
    // {path:'/admin/banner/create',conponent:BannerCreate},
];
export default RouterPrivate;