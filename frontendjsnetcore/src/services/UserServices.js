import httpAxios from "../httpAxios";


function getAll(){
    return httpAxios.get('Users/GetUsers');
}

function getById(id){
    return httpAxios.get(`Users/GetUser/${id}`)
}

function create(data){
    return httpAxios.post('Users/PostUser',data);

}

function update(data, id){
    return httpAxios.put(`Users/PutUser/${id}`, data);
}

function remove(id){
    return httpAxios.delete(`Users/DeleteUser/${id}`);
}

//FrontEnd
function login(data){
    return httpAxios.post('Users/Validate/LoginModel',data);
}

const UserService ={
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    login:login
}

export default UserService;