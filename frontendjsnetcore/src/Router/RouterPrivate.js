// import BannerCreate from "../pages/BackEnd/Banner/BannerCreate";
// import BannerList from "../pages/BackEnd/Banner/BannerList";


//brand
import BrandCreate from "../Pages/Backend/Brand/BrandCreate";
import BrandAll from "../Pages/Backend/Brand/BrandAll";
import BrandEdit from "../Pages/Backend/Brand/BrandEdit";

import Dashboard from "../Pages/Backend/Dasboard";
//prodduct
import ProductCreate from "../Pages/Backend/Product/ProductCreate";
import ProductAll from "../Pages/Backend/Product/ProductAll";
import ProductEdit from "../Pages/Backend/Product/ProductEdit";
//category
import CategoryCreate from "../Pages/Backend/Category/CategoryCreate";
import CategoryAll from "../Pages/Backend/Category/CategoryAll";
import CategoryEdit from "../Pages/Backend/Category/CategoryEdit";
//user
import UserAll from "../Pages/Backend/User/UserAll";
//order
import OrderAll from "../Pages/Backend/Order/OrderAll";


// import ProductCreateSale from "../pages/BackEnd/ProductSale/ProductCreateSale";
// import ProductListSale from "../pages/BackEnd/ProductSale/ProductListSale";
// import ProductShowSale from "../pages/BackEnd/ProductSale/ProductShowSale";

const RouterPrivate = [
  { path: "/admin", conponent: Dashboard },
//brand
  { path: "/admin/brand", conponent: BrandAll },
  { path: "/admin/brand/create", conponent: BrandCreate },
  { path: "/admin/brand/edit/:id", conponent: BrandEdit },
//product
  { path: "/admin/product", conponent: ProductAll },
  { path: "/admin/product/create", conponent: ProductCreate },
  { path: "/admin/product/edit/:id", conponent: ProductEdit },
//category
{ path: "/admin/category", conponent: CategoryAll },
{ path: "/admin/category/create", conponent: CategoryCreate },
{ path: "/admin/category/edit/:id", conponent: CategoryEdit },
//user
{ path: "/admin/user", conponent: UserAll },

//order
{ path: "/admin/order", conponent: OrderAll },


  // {path:'/admin/productsale',conponent:ProductListSale},
  // {path:'/admin/productsale/create',conponent:ProductCreateSale},
  // {path:'/admin/productsale/show/:id',conponent:ProductShowSale},

  // {path:'/admin/banner',conponent:BannerList},
  // {path:'/admin/banner/create',conponent:BannerCreate},
];
export default RouterPrivate;
