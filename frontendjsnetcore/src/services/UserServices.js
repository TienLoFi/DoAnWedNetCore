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

function googlelogin(data){
    return httpAxios.get('Users/GoogleLogin/GoogleLogin');
}
function GoogleResponse(data){
    return httpAxios.get('Users/GoogleResponse/GoogleResponse');
}
const UserService ={
    getAll:getAll,
    getById:getById,
    create:create,
    update:update,
    remove:remove,
    login:login,
    googlelogin:googlelogin,
    GoogleResponse:GoogleResponse
}

export default UserService;