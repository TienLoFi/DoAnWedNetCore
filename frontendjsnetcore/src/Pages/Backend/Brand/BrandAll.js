import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BrandService from "../../../services/BrandService";
import { urlImageBE } from "../../../config";
import Categoryservice from "../../../services/CategoryServices";

function BrandAll() {
  const [brands, setBrands] = useState([]);
  const [statusdel, setStatusDel] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [brandIdToDelete, setBrandIdToDelete] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null); // State để lưu thông tin thương hiệu được chọn
  // -------------------------------------------------------------------

  // Xử lý sự kiện click vào nút "Xem"
  const handleViewBrand = (brand) => {
    setSelectedBrand(brand); // Cập nhật state với thông tin thương hiệu được chọn
  };

  // Đóng modal chi tiết thương hiệu

  //--------------------------------------------------------------------
  const handleOpenModal = (id) => {
    setBrandIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

      setShowModal(false);
      setStatusDel(result.data);
    });
  }

  const [categories, setCategories] = useState([]);
  useEffect(function () {
    (async function () {
      await Categoryservice.getAll().then(function (result) {
        setCategories(result.data);
      });
    })();
  }, []);

  useEffect(function () {
    (async function () {
      await BrandService.getAll().then(function (result) {
        setBrands(result.data);
      });
    })();
  }, []);
  return (
    <>
      {/* danh sach san pham  */}
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">
                <b>Danh sách thương hiệu</b>
              </a>
            </li>
          </ul>

          <div id="clock" />
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <Link
                      to="/admin/brand/create" // Replace this with the appropriate URL
                      className="btn btn-add btn-sm"
                      title="Thêm"
                    >
                      <i className="fas fa-plus" />
                      Tạo mới thương hiệu
                    </Link>
                  </div>
                  <div className="col-sm-2">
                    <a
                      className="btn btn-delete btn-sm nhap-tu-file"
                      type="button"
                      title="Nhập"
                      onclick="myFunction(this)"
                    >
                      <i className="fas fa-file-upload" /> Tải từ file
                    </a>
                  </div>
                  <div className="col-sm-2">
                    <a
                      className="btn btn-delete btn-sm print-file"
                      type="button"
                      title="In"
                      onclick="myApp.printTable()"
                    >
                      <i className="fas fa-print" /> In dữ liệu
                    </a>
                  </div>
                  <div className="col-sm-2">
                    <a
                      className="btn btn-delete btn-sm print-file js-textareacopybtn"
                      type="button"
                      title="Sao chép"
                    >
                      <i className="fas fa-copy" /> Sao chép
                    </a>
                  </div>
                  <div className="col-sm-2">
                    <a className="btn btn-excel btn-sm" href="" title="In">
                      <i className="fas fa-file-excel" /> Xuất Excel
                    </a>
                  </div>
                  <div className="col-sm-2">
                    <a
                      className="btn btn-delete btn-sm pdf-file"
                      type="button"
                      title="In"
                      onclick="myFunction(this)"
                    >
                      <i className="fas fa-file-pdf" /> Xuất PDF
                    </a>
                  </div>
                  <div className="col-sm-2">
                    <a
                      className="btn btn-delete btn-sm"
                      type="button"
                      title="Xóa"
                      onclick="myFunction(this)"
                    >
                      <i className="fas fa-trash-alt" /> Xóa tất cả{" "}
                    </a>
                  </div>
                </div>

                <table
                  className="table table-hover table-bordered"
                  id="sampleTable"
                >
                  <thead>
                    <tr>
                      <th width={10}>
                        <input type="checkbox" id="all" />
                      </th>
                      <th>Mã thương hiệu</th>
                      <th>Tên thương hiệu</th>
                      <th>Ảnh</th>
                      <th>Slug</th>
                      <th>Tình trạng</th>

                      <th>Mô Tả</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map(function (brand, index) {
                      return (
                        <tr key={index}>
                          <td width={10}>
                            <input
                              type="checkbox"
                              name="check1"
                              defaultValue={1}
                            />
                          </td>
                          <td style={{ width: "120px" }}>{brand.id}</td>
                          <td style={{ width: "150px" }}>{brand.name}</td>
                          <td width={10}>
                            <img
                              style={{ width: "150px" }}
                              src={urlImageBE + "brands/" + brand.image}
                              alt={brand.image}
                            ></img>
                          </td>
                          <td style={{ width: "80px" }}>{brand.slug}</td>
                          <td>
                            <span
                              className={`badge ${
                                brand.status === 1 ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {brand.status === 1
                                ? "Đang hợp tác"
                                : "Ngưng hợp tác"}
                            </span>
                          </td>

                          <td style={{ width: "250px" }}>
                            {brand.description}
                          </td>
                          <td style={{ width: "140px" }}>
                            <button
                              className="btn btn-primary btn-sm edit mr-2"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              data-toggle="modal"
                              data-target="#ModalUPDetail"
                              onClick={() => handleViewBrand(brand)}
                            >
                              <i className="fas fa-eye" />
                            </button>

                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              title="Xóa"
                              onClick={() => handleOpenModal(brand.id)}
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
                            <Link
                              to={`/admin/brand/edit/${brand.id}`} // Replace this with the appropriate URL
                              title="Sửa"
                            >
                              <button
                                className="btn btn-primary btn-sm edit ml-2"
                                type="button"
                                title="Sửa"
                                id="show-emp"
                                data-toggle="modal"
                                data-target="#ModalUP"
                              >
                                <i className="fas fa-edit" />
                              </button>
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* phân trang------------------------ */}
                <div className="row">
                  <div className="col-sm-12 col-md-5">
                    <div
                      className="dataTables_info"
                      id="sampleTable_info"
                      role="status"
                      aria-live="polite"
                    >
                      Hiện 1 đến 7 của 7 danh mục
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-7">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="sampleTable_paginate"
                    >
                      <ul className="pagination">
                        <li
                          className="paginate_button page-item previous disabled"
                          id="sampleTable_previous"
                        >
                          <a
                            href="#"
                            aria-controls="sampleTable"
                            data-dt-idx={0}
                            tabIndex={0}
                            className="page-link"
                          >
                            Lùi
                          </a>
                        </li>
                        <li className="paginate_button page-item active">
                          <a
                            href="#"
                            aria-controls="sampleTable"
                            data-dt-idx={1}
                            tabIndex={0}
                            className="page-link"
                          >
                            1
                          </a>
                        </li>
                        <li
                          className="paginate_button page-item next disabled"
                          id="sampleTable_next"
                        >
                          <a
                            href="#"
                            aria-controls="sampleTable"
                            data-dt-idx={2}
                            tabIndex={0}
                            className="page-link"
                          >
                            Tiếp
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* end phân trang */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/*
  MODAL
*/}
      <div
        className="modal fade"
        id="ModalUPDetail"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="form-group  col-md-12">
                  <span className="thong-tin-thanh-toan ">
                    <h5> Thông Tin Sản Phẩm </h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Mã thương hiệu </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedBrand ? selectedBrand.id : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tên thương hiệu</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedBrand ? selectedBrand.name : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Trạng Thái</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedBrand ? selectedBrand.status : ""}
                  />
                </div>

                <div className="form-group col-md-12">
                  <label className="control-label">Mô Tả</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedBrand ? selectedBrand.description : ""}
                    style={{ height: "150px" }} // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ngày Thêm</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedBrand ? selectedBrand.createdAt : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Sửa Bởi</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedBrand ? selectedBrand.updateBy : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label" style={{ display: "block" }}>
                    Hình Ảnh
                  </label>
                  <div style={{ position: "relative" }}>
                    {selectedBrand && selectedBrand.image ? (
                      <img
                        src={urlImageBE + "brands/" + selectedBrand.image}
                        alt="Brand Image"
                        className="img-fluid"
                        style={{ width: "100px", height: "auto" }}
                      />
                    ) : (
                      <p>Không có hình ảnh</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <a className="btn btn-cancel" data-dismiss="modal" href="#">
              Đóng
            </a>
            <br />
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>

      {/*
MODAL
*/}

      {showModal && (
        <div className="swal-overlay swal-overlay--show-modal" tabIndex={-1}>
          <div className="swal-modal" role="dialog" aria-modal="true">
            <div className="swal-title">Cảnh báo</div>
            <div className="swal-text">
              Bạn có chắc chắn muốn xóa thương hiệu này?
            </div>
            <div className="swal-footer">
              <div className="swal-button-container">
                <button
                  className="swal-button swal-button--cancel"
                  onClick={handleCloseModal}
                >
                  Hủy bỏ
                </button>
                <div className="swal-button__loader">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
              <div className="swal-button-container">
                <button
                  className="swal-button swal-button--confirm"
                  onClick={() => BrandDelete(brandIdToDelete)}
                >
                  Đồng ý
                </button>
                <div className="swal-button__loader">
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default BrandAll;
