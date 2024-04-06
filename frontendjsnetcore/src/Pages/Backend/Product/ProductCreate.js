import { Link, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useState, useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import BrandService from "../../../services/BrandService";
import Categoryservice from "../../../services/CategoryServices";
// import Categoryservice from "../../../services/CategoryServices";
// import BrandService from "../../../services/BrandServices";
function ProductCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setCategory_Id] = useState(0);
  const [brand_Id, setBrand_Id] = useState(0);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState(0);

  async function ProductStore(event) {
    event.preventDefault();
    const image = document.querySelector("#image");
    var product = new FormData();
    product.append("name", name);
    product.append("category_Id", id);
    product.append("brand_Id", brand_Id);
    product.append("price", price);
    product.append("qty", qty);
    product.append("description", description);
    product.append("detail", detail);
    product.append("status", status);
    product.append("image", image.files[0]);
    ProductService.create(product).then(function (result) {
      alert("Thêm thành công");
      navigate("/admin/product", { replace: true });
    });
  }
  const [categories, setCategories] = useState([]);
  useEffect(function () {
    (async function () {
      await Categoryservice.getCategoryByParentId(1).then(function (result) {
        setCategories(result.data);
      });
    })();
  }, []);

  const [categoriesChild, setCategoriesChild] = useState([]);
  useEffect(function () {
    (async function () {
      await Categoryservice.getAll().then(function (result) {
        setCategoriesChild(result.data);
      });
    })();
  }, []);

  const [brands, setBrands] = useState([]);
  useEffect(function () {
    (async function () {
      await BrandService.getAll().then(function (result) {
        setBrands(result.data);
      });
    })();
  }, []);

  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">Danh sách sản phẩm</li>
          <li className="breadcrumb-item">
            <a href="#">Thêm sản phẩm</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới sản phẩm</h3>
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Link
                    className="btn btn-add btn-sm"
                    to="/admin/brand/create"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <i className="fas fa-folder-plus" /> Thêm Thương Hiệu
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
              <form method="post" onSubmit={ProductStore} className="row">
                <div className="form-group col-md-3">
                  <label className="control-label">Tên sản phẩm</label>
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
                    onChange={(e) => setQty(e.target.value)}
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
                    <option value="1">Còn Hàng</option>
                    <option value="2">Hết Hàng</option>
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="exampleSelect1" className="control-label">
                    Danh mục
                  </label>
                  <select
                    name="category_Id"
                    value={id}
                    onChange={(e) => setCategory_Id(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option>-- Chọn danh mục --</option>
                    {categories.map(function (cate, index) {
                      return (
                        <optgroup key={index} label={cate.name}>
                          {categoriesChild.map(function (
                            cateChild,
                            indexChild
                          ) {
                            if (cateChild.parent_Id === cate.id) {
                              return (
                                <option key={indexChild} value={cateChild.id}>
                                  {cateChild.name}
                                </option>
                              );
                            }
                          })}
                        </optgroup>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group col-md-3 ">
                  <label htmlFor="exampleSelect1" className="control-label">
                    Thương Hiệu
                  </label>

                  <select
                    name="brand_Id"
                    value={brand_Id}
                    onChange={(e) => setBrand_Id(e.target.value)}
                    className="form-control"
                  >
                    <option>-- Chọn nhà cung cấp --</option>
                    {brands.map(function (br, index) {
                      return (
                        <option key={index} value={br.id}>
                          {br.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group col-md-3">
                  <label className="control-label">Giá bán</label>
                  <input
                    type="number"
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-control"
                    required
                  ></input>
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Chi Tiết</label>
                  <input
                    type="text"
                    name="detail"
                    onChange={(e) => setDetail(e.target.value)}
                    className="form-control"
                    required
                  ></input>
                </div>

                <div className="form-group col-md-12">
                  <label className="control-label">Mô tả sản phẩm</label>
                  <textarea
                    className="form-control"
                    name="mota"
                    id="mota"
                    defaultValue={""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Ảnh sản phẩm</label>
                  <div id="myfileupload">
                  <input type="file" id="image" name="image" className="form-control" required></input>
                  </div>
                  <div id="thumbbox">
                    <img
                      height={450}
                      width={400}
                      alt="Thumb image"
                      id="thumbimage"
                      style={{ display: "none" }}
                    />
                    <a className="removeimg" href="javascript:" />
                  </div>
                  <div id="boxchoice ">
                    <a href="javascript:" className="Choicefile">
                      <i className="fas fa-cloud-upload-alt " /> Chọn ảnh
                    </a>
                    <p style={{ clear: "both" }} />
                  </div>
                </div>
                <button type="submit" className="btn btn-save">
              Lưu lại
            </button>
            <Link
              className="btn btn-cancel"
              to="/admin/product"
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
export default ProductCreate;
