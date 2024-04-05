import { Link, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useState, useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { urlImageBE } from "../../../config";
function Index() {
  const [products, setProducts] = useState([]);
  const [statusdel, setStatusDel] = useState(0);

  useEffect(
    function () {
      (async function () {
        await ProductService.getAll().then(function (result) {
          setProducts(result.data);
        });
      })();
    },
    [statusdel]
  );

  async function ProductDelete(id) {
    await ProductService.remove(id).then(function (result) {
      alert("Xóa thành công");
      setStatusDel(result.data);
    });
  }

  
  return (
    <>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Tất Cả Sản Phẩm</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Sản Phẩm</a>
                  </li>
                  <li className="breadcrumb-item active">Tất Cả Sản Phẩm</li>
                </ol>
              </div>
              <div className="col-md-6 text-end">
                <Link
                  className="btn btn-sm btn-success mt-2 "
                  to="/admin/product/create"
                >
                  <FaPlus />  
                  Thêm
                </Link>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <table id="example2" className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>Chọn Sản Phẩm</th>
                <th>Hình Ảnh</th>
                <th>Tên Sản Phẩm</th>
                <th>Giá Bán</th>
                <th>Số Lượng Tổng </th>
                <th>Thông Số Chi Tiết</th>
                <th>Mô Tả</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {products.map(function (product, index) {
                return (
                  <tr>
                    <td
                      style={{ width: "5%", textAlign: "center" }}
                      className="text-center"
                    >
                      <input type="checkbox"></input>
                    </td>
                    <td style={{ width: "15%", textAlign: "center" }}>
                      {" "}
                      {/* Set a fixed width for the table cell */}
                      <img
                        className="w-50"
                        src={urlImageBE + product.image}
                        alt={product.image}
                        style={{ width: "50%", height: "auto" }} // Set fixed size for the image
                      />
                    </td>

                    <td className="text-center">{product.name}</td>
                    <td style={{ width: "10%" }} className="text-center">
                      {product.price}
                    </td>
                    <td style={{ width: "5%" }} className="text-center">
                      {product.qty}
                    </td>
                    <td style={{ width: "20%" }} className="text-center">
                      {product.detail}
                    </td>
                    <td style={{ width: "10%" }} className="text-center">
                      {product.description}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/admin/product/update/${product.id}`}
                        className="btn btn-sm btn-info me-1 m-1"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        to={`/admin/product/show/${product.id}`}
                        className="btn btn-sm btn-success me-1 m-1"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => ProductDelete(product.id)}
                        className="btn btn-sm btn-danger m-1"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}
    </>
  );
}
export default Index;
