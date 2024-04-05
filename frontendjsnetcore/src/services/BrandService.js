import httpAxios from "../httpAxios";


function getAll(){
    return httpAxios.get('Brands');
}

function getById(id){
    return httpAxios.get(`Brands/${id}`)
}

function create(data){
    return httpAxios.post('Brands',data);

}

function update(data, id){
    return httpAxios.put(`Brands/${id}`, data);
}

function remove(id){
    return httpAxios.delete(`Brands/${id}`);
}

const BrandService ={
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove
}

export default BrandService;