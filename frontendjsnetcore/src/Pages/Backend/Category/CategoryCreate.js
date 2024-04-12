import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryService from "../../../services/CategoryServices";

// ----------------------------------------------------------------

function CategoryCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setCategory_Id] = useState(0);
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [sort_order, setSort_order] = useState("");
  const [status, setStatus] = useState(0);

  // ------------------------------------------------------
  async function CategoryStore(event) {
    event.preventDefault();
    var category = new FormData();
    category.append("name", name);
    category.append("category_Id", id);
    category.append("slug", slug);
    category.append("sort_order", sort_order);
    category.append("description", description);
    category.append("status", status);
    CategoryService.create(category).then(function (result) {
      alert("Thêm thành công");
      navigate("/admin/category", { replace: true });
    });
  }
  // ----------------------------------------------------------------


  const [categories, setCategories] = useState([]);
  useEffect(function () {
    (async function () {
      await CategoryService.getAll().then(function (result) {
        setCategories(result.data);
      });
    })();
  }, []);
 
  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">Danh sách Danh Mục</li>
          <li className="breadcrumb-item">
            <a href="#">Thêm Danh Mục</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới Danh Mục</h3>
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Link
                    className="btn btn-add btn-sm"
                    to="/admin/category/create"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <i className="fas fa-folder-plus" /> Thêm Danh Mục
                  </Link>
                </div>
                <div className="col-sm-2">
                  <Link
                    className="btn btn-add btn-sm"
                    to="/admin/category/create"
                    data-toggle="modal"
                    data-target="#adddanhmuc"
                  >
                    <i className="fas fa-folder-plus" /> Thêm danh mục
                  </Link>
                </div>
                <div className="col-sm-2">
                  <a
                    className="btn btn-add btn-sm"
                    data-toggle="modal"
                    data-target="#addtinhtrang"
                  >
                    <i className="fas fa-folder-plus" /> Thêm tình trạng
                  </a>
                </div>
              </div>
              <form method="post" onSubmit={CategoryStore} className="row">
                <div className="form-group col-md-3">
                  <label className="control-label">Tên Danh Mục</label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    required
                  ></input>
                </div>
                <div className="form-group  col-md-3">
                  <label className="control-label">Số lượng</label>
                  <input
                    type="number"
                    name="qty"
                    onChange={(e) => setSlug(e.target.value)}
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
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control "
                    id="exampleSelect1"
                  >
                    <option>-- Chọn tình trạng --</option>
                    <option value="1">Đang Hợp Tác</option>
                    <option value="2">Ngưng Hợp Tác</option>
                  </select>
                </div>
               
             
           
                <div className="form-group col-md-6">
                  <label className="control-label">Thứ Tự</label>
                  <input
                    type="text"
                    name="Sort_order"
                    onChange={(e) => setSort_order(e.target.value)}
                    className="form-control"
                    required
                  ></input>
                </div>

                <div className="form-group col-md-6">
                  <label className="control-label">Mô tả Danh Mục</label>
                  <textarea
                    className="form-control"
                    name="mota"
                    id="mota"
                    defaultValue={""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
               
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default CategoryCreate;
