import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserService from "../../../services/UserServices";
import { urlImageBE } from "../../../config";
import Categoryservice from "../../../services/CategoryServices";
import BrandService from "../../../services/BrandService";
function Index() {
  const [users, setUsers] = useState([]);
  const [statusdel, setStatusDel] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State để lưu thông tin Người Dùng được chọn
  // -------------------------------------------------------------------

  // Xử lý sự kiện click vào nút "Xem"
  const handleViewUser = (user) => {
    setSelectedUser(user); // Cập nhật state với thông tin Người Dùng được chọn
  };

  // Đóng modal chi tiết Người Dùng

  //--------------------------------------------------------------------
  const handleOpenModal = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(
    function () {
      (async function () {
        await UserService.getAll().then(function (result) {
          setUsers(result.data);
        });
      })();
    },
    [statusdel]
  );

  async function UserDelete(id) {
    await UserService.remove(id).then(function (result) {
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

  const [brands, setBrands] = useState([]);
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
                <b>Danh sách Người Dùng</b>
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
                      <th>Mã Người Dùng</th>
                      <th>Tên Người Dùng</th>
                      <th>Mật Khẩu</th>
                      <th>Giới Tính</th>
                      <th>Email</th>
                      <th>Số Điện Thoại</th>
                      <th>Vai Trò</th>
                      <th>Ngày Tạo</th>
                     
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(function (user, index) {
                      return (
                        <tr key={index}>
                          <td width={10}>
                            <input
                              type="checkbox"
                              name="check1"
                              defaultValue={1}
                            />
                          </td>
                          <td style={{ width: "120px" }}>{user.id}</td>
                          <td style={{ width: "150px" }}>{user.userName}</td>
                          {/* <td width={10}>
                            <img
                              style={{ width: "150px" }}
                              src={urlImageBE + "users/" + user.image}
                              alt={user.image}
                            ></img>
                          </td> */}
                          <td style={{ width: "80px" }}>{user.password}</td>
                          <td>
                        {user.gender}
                          </td>
                          <td>{user.email}</td>
                          <td style={{ width: "80px" }}>
                            {user.phone}
                          </td>
                          <td style={{ width: "250px" }}>
                            {user.role}
                          </td>
                          <td style={{ width: "140px" }}>
                            <button
                              className="btn btn-primary btn-sm edit mr-2"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              data-toggle="modal"
                              data-target="#ModalUPDetail"
                              onClick={() => handleViewUser(user)}
                            >
                              <i className="fas fa-eye" />
                            </button>
                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              title="Xóa"
                              onClick={() => handleOpenModal(user.id)}
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
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
                  <span className="thong-tin-thanh-toan " >
                    <h5> Thông Tin Người Dùng </h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Mã Người Dùng </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedUser ? selectedUser.id : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tên Người Dùng</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedUser ? selectedUser.userName : ""}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Mật Khẩu</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedUser ? selectedUser.password : ""}
                    style={{ height: "150px" }} // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Giới Tính</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedUser ? selectedUser.gender : ""}
                    style={{ height: "150px" }} // Tùy chỉnh chiều cao của textarea
                  />
                </div>

                <div className="form-group  col-md-6">
                  <label className="control-label">email</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedUser ? selectedUser.email : ""}
                  />{" "}
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Số Điện Thoại</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedUser ? selectedUser.phone : ""}
                  // Tùy chỉnh chiều cao của textarea
                  />
            
            </div>
            <div className="form-group col-md-6">
                  <label className="control-label">Ngày Tạo</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedUser ? selectedUser.createdAt : ""}
             // Tùy chỉnh chiều cao của textarea
                  />
            
            </div>
            <div className="form-group col-md-6">
                  <label className="control-label">Vai Trò</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedUser ? selectedUser.role : ""}
             // Tùy chỉnh chiều cao của textarea
                  />
            
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
      </div>
      {/*
MODAL
*/}

      {showModal && (
        <div className="swal-overlay swal-overlay--show-modal" tabIndex={-1}>
          <div className="swal-modal" role="dialog" aria-modal="true">
            <div className="swal-title">Cảnh báo</div>
            <div className="swal-text">
              Bạn có chắc chắn muốn xóa Người Dùng này?
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
                  onClick={() => UserDelete(userIdToDelete)}
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
export default Index;
