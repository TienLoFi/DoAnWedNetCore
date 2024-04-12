import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import Categoryservice from "../../../services/CategoryServices";
import BrandService from "../../../services/BrandService";
import { urlImageBE } from "../../../config";
function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category_Id, setCategory_Id] = useState(0);
  const [brand_Id, setBrand_Id] = useState(0);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
   // Trạng thái để lưu trữ hình ảnh hiện tại từ cơ sở dữ liệu
  const [products, setProducts] = useState([]);


  // Lấy dữ liệu sản phẩm từ cơ sở dữ liệu
  useEffect(() => {
    // Set the current image when the component mounts
    setCurrentImage(image ? urlImageBE + "products/" + image : "");
  }, [image]);

  // xử lí nút thêm ảnh
  const handleButtonClick = () => {
     // Nếu đã có ảnh trong cơ sở dữ liệu, không yêu cầu người dùng nhập nữa
     if (currentImage) {
      return;
  }
  const fileInput = document.getElementById("image");
  fileInput.click();
  };
  useEffect(function () {
    (async function () {
      await ProductService.getAll().then(function (result) {
        setProducts(result.data);
      });
    })();
  }, []);

  async function ProductUpdate(event) {
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
    product.append("image", image);
    if (image.files.length === 0) {
      product.append("image", "");
    } else {
      product.append("image", image.files[0]);
    }
    await ProductService.update(product, id).then(function () {
      alert("Cập nhật thành công");
      navigate("/admin/product", { replace: true });
    });
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.getById(id);
        const productData = result.data;
        setName(productData.name);
        setBrand_Id(productData.brand_Id);
        setCategory_Id(productData.category_Id);
        setDetail(productData.detail);
        setDescription(productData.description);
        setPrice(productData.price);
        setQty(productData.qty);
        setStatus(productData.status);
        setCurrentImage(urlImageBE + "products/" + productData.image); // Gán giá trị của hình ảnh từ cơ sở dữ liệu
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchData();
  }, [id]);
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
  
  return (
    <main className="app-content">
      <div className="app-title">
        <ul className="app-breadcrumb breadcrumb">
          <li className="breadcrumb-item">Danh sách sản phẩm</li>
          <li className="breadcrumb-item">
            <a href="#">Chỉnh Sửa sản phẩm</a>
          </li>
        </ul>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="tile">
            <h3 className="tile-title">CHỉnh Sửa Thông Tin Sản Phẩm</h3>
            <div className="tile-body">
              <div className="row element-button">
                <div className="col-sm-2">
                  <Link
                    className="btn btn-add btn-sm"
                    to="/admin/brand/create"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <i className="fas fa-folder-plus" />Thêm Thương Hiệu
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
              <form method="post" onSubmit={ProductUpdate} className="row">
                <div className="form-group col-md-3">
                  <label className="control-label">Tên sản phẩm</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
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
                    value={qty}
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
                    <option>-- Chọn Thương Hiệu --</option>
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
                    value={price}
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
                    value={detail}
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
                    value={description}
                    id="mota"
                    defaultValue={""}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group col-md-12 ">
                  <label className="control-label">Ảnh sản phẩm</label>
           <div className="form-group col-md-12">
    <label className="control-label">Ảnh sản phẩm</label>
    <div className="mb-3">
        <label htmlFor="image">Hình</label>
        <input type="file" id="image" name="image"    value={image}className="form-control"></input>
    </div>
    <div>
        {currentImage && (
            <img
                src={currentImage}
                alt="Product Image"
                className="img-fluid"
                style={{ width: "150px", height: "auto" }}
            />
        )}
    </div>
</div>

                  <div style={{ marginTop: "20px" }}>
                    <button type="submit" className="btn btn-save mr-2">
                      Lưu lại
                    </button>
                    <Link
                      className="btn btn-cancel"
                      to="/admin/product"
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
export default ProductEdit;
