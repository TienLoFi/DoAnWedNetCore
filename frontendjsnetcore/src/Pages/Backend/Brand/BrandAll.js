import { Link, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useState, useEffect } from "react";
import BrandService from "../../../services/BrandService";
import { FaPlus, FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { urlImageFE } from "../../../config";
function Index() {
  const [brands, setBrands] = useState([]);
  const [statusdel, setStatusDel] = useState(0);

  useEffect(
    function () {
      (async function () {
        await BrandService.getAll().then(function (result) {
          setBrands(result.data);
        });
      })();
    },
    [statusdel]
  );

  async function BrandDelete(id) {
    await BrandService.remove(id).then(function (result) {
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
                <h1 className="m-0">Tất Cả Thương Hiệu</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Thương Hiệu</a>
                  </li>
                  <li className="breadcrumb-item active">Tất Cả thương Hiệu</li>
                </ol>
              </div>
              <div className="col-md-6 text-end">
                <Link
                  className="btn btn-sm btn-success mt-2 "
                  to="/admin/brand/create"
                >
                  <FaPlus />  
                  Thêm Mới
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
                <th>Chọn Thương Hiệu</th>
                <th>Hình Ảnh</th>
                <th>Tên Thương Hiệu</th>
                <th>Slug</th>
                <th>Mô Tả</th>
                <th>Trạng Thái</th>
                <th>Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {brands.map(function (brand, index) {
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
                        src={urlImageFE + brand.image}
                        alt={brand.image}
                        style={{ width: "50%", height: "auto" }} // Set fixed size for the image
                      />
                    </td>

                    <td className="text-center">{brand.name}</td>
                    <td style={{ width: "10%" }} className="text-center">
                      {brand.slug}
                    </td>
                  
                    <td style={{ width: "20%" }} className="text-center">
                      {brand.description}
                    </td>
                    <td style={{ width: "10%" }} className="text-center">
                      {brand.status}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/admin/brand/update/${brand.id}`}
                        className="btn btn-sm btn-info me-1 m-1"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        to={`/admin/brand/show/${brand.id}`}
                        className="btn btn-sm btn-success me-1 m-1"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => BrandDelete(brand.id)}
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
