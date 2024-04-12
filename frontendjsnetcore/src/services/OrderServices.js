import httpAxios from "../httpAxios";


function getAll(){
    return httpAxios.get('Orders');
}

function getById(id){
    return httpAxios.get(`Orders/${id}`)
}

function create(data){
    return httpAxios.post('Orders',data);

}

function update(data, id){
    return httpAxios.put(`Orders/${id}`, data);
}

function remove(id){
    return httpAxios.delete(`Orders/${id}`);
}

const OrderService ={
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove
}

export default OrderService;