import httpAxios from "../httpAxios";

//BackEnd
function getAll(){
    return httpAxios.get('Products/GetProducts');
}
function getById(id){
    return httpAxios.get(`Products/GetProduct/${id}`)
}
function create(data){
    return httpAxios.post('Products/PostProduct',data);

}
function update(data, id){
    return httpAxios.put(`Products/PutProduct/${id}`, data);
}
function remove(id){
    return httpAxios.delete(`Products/DeleteProduct/${id}`);
}
//FrontEnd
// function getProductHome(categoryId){
//     return httpAxios.get(`Products/GetProductByCategory/${categoryId}`);
// }

function getProductAll(limit, page){
    return httpAxios.get(`Products/GetAllProduct/${limit}/${page}`);
}

function getOrderAll(limit, page){
    return httpAxios.get(`Products/GetAllOrder/${limit}/${page}`);
}


function getProductByCategoryParent(categoryIdParent,limit, page){
    return httpAxios.get(`Products/GetProductByCategoryParent/${categoryIdParent}/${limit}/${page}`);
}

function Search(keyWord){
    return httpAxios.get(`Products/Search/${keyWord}`);
}

function GetProductSale(){
    return httpAxios.get('Products/GetSaledProducts');
}
function getProductHome(categoryId,limit,page){
    return httpAxios.get(`Products/GetProductByCategory/category/${categoryId}/${limit}/${page}`);
}
function getProductByBrandId(brandId,limit,page){
    return httpAxios.get(`Products/GetProductByBrand/brand/${brandId}/${limit}/${page}`);
}
const ProductService ={
    
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getProductHome:getProductHome,
    getProductByBrandId:getProductByBrandId,
    getProductAll:getProductAll,
    getProductByCategoryParent:getProductByCategoryParent,
    Search:Search,
    GetProductSale:GetProductSale,
    getOrderAll:getOrderAll
}

export default ProductService;