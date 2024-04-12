import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryServices";

function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sort_order, setSort_order] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(0);
  const [categories, setCategories] = useState([]); // Di chuyển biến này lên đây


  useEffect(() => {
    (async function () {
      await CategoryService.getAll().then(function (result) {
        setCategories(result.data);
      });
    })();
  }, []);


 
  
  async function CategoryUpdate(event)
  {

     event.preventDefault();
     var categories = new FormData();
     categories.append("name",name)
    
     categories.append("description",description)                                                                           
     categories.append("sort_order",sort_order)
     categories.append("status",status)
    
     await CategoryService.update(categories,id)
     .then(function(){
          alert('Cập nhật thành công');
         navigate('/admin/category', {replace:true});
     });
 }
  
 useEffect(function(){
  (async function(){
      await CategoryService.getById(id).then(function(result){
          const tpm = result.data;
          setName(tpm.name);
          setDescription(tpm.description);
          setSort_order(tpm.sort_order);
          setStatus(tpm.status);
         
      });
  })();
},[]);
  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">Danh sách Danh Mục</li>
          <li className="breadcrumb-item">
            <a href="#">Chỉnh Sửa Danh Mục</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Chỉnh Sửa Danh Mục</h3>
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Link
                    className="btn btn-add btn-sm"
                    to="/admin/categories/create"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <i className="fas fa-folder-plus" /> Chỉnh Sửa Danh Mục
                  </Link>
                </div>
                <div className="col-sm-2">
                  <Link
                    className="btn btn-add btn-sm"
                    to="/admin/category/create"
                    data-toggle="modal"
                    data-target="#adddanhmuc"
                  >
                    <i className="fas fa-folder-plus" /> Chỉnh Sửa danh mục
                  </Link>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-add btn-sm"
                    data-toggle="modal"
                    data-target="#addtinhtrang"
                  >
                    <i className="fas fa-folder-plus" /> Chỉnh Sửa tình trạng
                  </a>
                </div>
              </div>
              <form method="post" onSubmit={CategoryUpdate} className="row">
                <div className="form-group col-md-3">
                  <label className="control-label">Tên Danh Mục</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                  ></input>
                </div>

                <div className="form-group col-md-3 ">
                  <label htmlFor="exampleSelect1" className="control-label">
                    Tình trạng
                  </label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option>-- Chọn tình trạng --</option>
                    <option value="1">Còn Hàng</option>
                    <option value="2">Hết Hàng</option>
                  </select>
                </div>

                <div className="form-group col-md-12">
                  <label className="control-label">Thứ Tự</label>
                  <input
                    type="text"
                    name="detail"
                    value={sort_order}
                    onChange={(e) => setSort_order(e.target.value)}
                    className="form-control"
                    required
                  ></input>
                </div>

                <div className="form-group col-md-12">
                  <label className="control-label">Mô tả Danh Mục</label>
                  <textarea
                    className="form-control"
                    name="mota"
                    value={description}
                    id="mota"
                    defaultValue={""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-12 ">
                  

                  <div style={{ marginTop: "20px" }}>
                    <button type="submit" className="btn btn-save mr-2">
                      Lưu lại
                    </button>
                    <Link
                      className="btn btn-cancel"
                      to="/admin/category"
                      data-dismiss="modal"
                    >
                      Hủy Bỏ
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default CategoryEdit;
