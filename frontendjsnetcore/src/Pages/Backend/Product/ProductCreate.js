import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import BrandService from "../../../services/BrandService";
import Categoryservice from "../../../services/CategoryServices";
import { urlImageBE } from "../../../config";

// ----------------------------------------------------------------

function ProductCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category_Id, setCategory_Id] = useState(0);
  const [brand_Id, setBrand_Id] = useState(0);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState(0);
  const [products, setProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(""); 

  // ------------------------------------------------------
  async function ProductStore(event) {
    event.preventDefault();
    const image = document.querySelector("#image");
    var product = new FormData();
    product.append("name", name);
    product.append("category_Id", category_Id);
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
  // ----------------------------------------------------------------

  const [categories, setCategories] = useState([]);
  useEffect(function () {
    (async function () {
      await Categoryservice.getAll().then(function (result) {
        setCategories(result.data);
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
  //-----------------Xử Lí Nút Thêm Ảnh--------------------
  // xử lí nút thêm ảnh
  const handleButtonClick = () => {
    const fileInput = document.getElementById("image");
    fileInput.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentImage(reader.result); // Cập nhật trạng thái hình ảnh hiện tại với hình ảnh mới
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (products.length > 0 && !currentImage) {
      setCurrentImage(urlImageBE + "products/" + products[0].image);
    }
  }, [products, currentImage]);
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
                    value={category_Id}
                    onChange={(e) => setCategory_Id(e.target.value)}
                    className="form-control"
                  >
                    <option>-- Chọn nhà cung cấp --</option>
                    {categories.map(function (ca, index) {
                      return (
                        <option key={index} value={ca.id}>
                          {ca.name}
                        </option>
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
                  <div
                    id="myfileupload"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      width: "150px",
                    }}
                  >
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control"
                      onChange={handleFileChange}
                      required
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "100%",
                        height: "100%",
                        opacity: "0",
                        cursor: "pointer",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-dark"
                      style={{ position: "relative", zIndex: "1" }}
                      onClick={handleButtonClick}
                    >
                      <i className="fas fa-cloud-upload-alt " /> Chọn ảnh{" "}
                    </button>
                  </div>

                  <div id="thumbbox">
                    {currentImage && (
                      <div>
                        <img
                          src={currentImage} // Sử dụng đường dẫn hình ảnh hiện tại từ trạng thái
                          alt="Product Image"
                          className="img-fluid"
                          style={{ width: "150px", height: "auto" }}
                        />
                        <a className="removeimg" href="javascript:" />
                      </div>
                    )}
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
