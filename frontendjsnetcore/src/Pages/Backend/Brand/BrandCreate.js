import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BrandService from "../../../services/BrandService";
import Categoryservice from "../../../services/CategoryServices";
import { urlImageBE } from "../../../config";

// ----------------------------------------------------------------

function BrandCreate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setCategory_Id] = useState(0);
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [sort_order, setSort_order] = useState("");
  const [status, setStatus] = useState(0);
  const [currentImage, setCurrentImage] = useState(""); 

  // ------------------------------------------------------
  async function BrandStore(event) {
    event.preventDefault();
    const image = document.querySelector("#image");
    var brand = new FormData();
    brand.append("name", name);
    brand.append("category_Id", id);
    brand.append("slug", slug);
    brand.append("sort_order", sort_order);
    brand.append("description", description);
    brand.append("status", status);
    brand.append("image", image.files[0]);
    BrandService.create(brand).then(function (result) {
      alert("Thêm thành công");
      navigate("/admin/brand", { replace: true });
    });
  }
  // ----------------------------------------------------------------


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
    if (brands.length > 0 && !currentImage) {
      setCurrentImage(urlImageBE + "brands/" + brands[0].image);
    }
  }, [brands, currentImage]);
  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">Danh sách Thương Hiệu</li>
          <li className="breadcrumb-item">
            <a href="#">Thêm Thương Hiệu</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">Tạo mới Thương Hiệu</h3>
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
              <form method="post" onSubmit={BrandStore} className="row">
                <div className="form-group col-md-3">
                  <label className="control-label">Tên Thương Hiệu</label>
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
                  <label className="control-label">Mô tả Thương Hiệu</label>
                  <textarea
                    className="form-control"
                    name="mota"
                    id="mota"
                    defaultValue={""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Ảnh Thương Hiệu</label>
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
                          alt="Brand Image"
                          className="img-fluid"
                          style={{ width: "150px", height: "auto" }}
                        />
                        <a className="removeimg" href="javascript:" />
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-save mr-2">
                  Lưu lại
                </button>
                <Link
                  className="btn btn-cancel"
                  to="/admin/brand"
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
export default BrandCreate;
