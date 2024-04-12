import httpAxios from "../httpAxios";

//BackEnd
function getAll(){
    return httpAxios.get('Categories/GetCategories');
}
function getById(id){   
    return httpAxios.get(`Categories/GetCategory/${id}`)
}
function create(data){
    return httpAxios.post('Categories/PostCategory',data);

}
function getCategoryAll(limit, page){
    return httpAxios.get(`Categories/GetAllCategory/${limit}/${page}`);
}
function update(data, id){
    return httpAxios.put(`Categories/PutCategory/${id}`, data);
}
function remove(id){
    return httpAxios.delete(`Categories/DeleteCategory/${id}`);
}
// //FrontEnd
function getCategoryByParentId(parentId){
    return httpAxios.get(`Categories/GetCategoryByParentId/${parentId}`);
}

function getAllCateMinusParentCate(){
    return httpAxios.get('Categories/GetAllCategoryMinusParentCate');
}



const Categoryservice ={
    
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    getCategoryAll:getCategoryAll,
    getCategoryByParentId:getCategoryByParentId,
    getAllCateMinusParentCate:getAllCateMinusParentCate
}

export default Categoryservice;