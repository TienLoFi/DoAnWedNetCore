import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderService from "../../../services/OrderServices";
import Categoryservice from "../../../services/CategoryServices";
import ProductService from "../../../services/ProductServices";

function OrderAll() {
  const [orders, setOrders] = useState([]); // Danh sách sản phẩm trên trang hiện tại
  const [pageData, setPageData] = useState({}); // Lưu trạng thái của từng trang
  const [limit, setLimit] = useState(1); // Giới hạn dữ liệu mỗi trang
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [showModal, setShowModal] = useState(false);  
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusdel, setStatusDel] = useState(0);
  // -------------------------------------------------------------------

  // Xử lý sự kiện click vào nút "Xem"
  const handleViewOrder = (order) => {
    setSelectedOrder(order); // Cập nhật state với thông tin Đơn Hàng được chọn
  };

  // Đóng modal chi tiết Đơn Hàng

  //--------------------------------------------------------------------
  const handleOpenModal = (id) => {
    setOrderIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(
    function () {
      (async function () {
        await OrderService.getAll().then(function (result) {
          setOrders(result.data);
        });
      })();
    },
    [statusdel]
  );

  async function OrderDelete(id) {
    await OrderService.remove(id).then(function (result) {
      alert("Xóa thành công");

      setShowModal(false);
      setStatusDel(result.data);
    });
  }



  useEffect(function () {
    (async function () {
      await OrderService.getAll().then(function (result) {
        setOrders(result.data);
      });
    })();
  }, []);

  useEffect(() => {
    if (!pageData[page]) {
      async function fetchOrdersWithPagination() {
        try {
          const result = await ProductService.getOrderAll(limit, page);
          const data = result.data;
          setOrders(data);
          setPageData((prevPageData) => ({
            ...prevPageData,
            [page]: data,
          }));
        } catch (error) {
          console.error(error);
        }
      }
      fetchOrdersWithPagination();
    } else {
      setOrders(pageData[page]);
    }
  }, [page, limit, pageData]);

  // Tính tổng số trang
  useEffect(() => {
    setTotalPages(Math.ceil(orders.length / limit));
  }, [orders, limit]);

  // Xử lý thay đổi trang
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {/* danh sach san pham  */}
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">
                <b>Danh sách Đơn Hàng</b>
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
                      <th>Mã Đơn Hàng</th>
                      <th>Mã Khách Hàng</th>
                      <th>Tên Người Đặt</th>
                      <th>Giới Tính</th>
                      <th>Số Điện Thoại </th>

                      <th>Địa Chỉ</th>
                      <th>Ghi Chú</th>
                      <th>Tổng Đơn</th>
                      <th>Ngày Tạo</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(function (order, index) {
                      return (
                        <tr key={index}>
                          <td width={10}>
                            <input
                              type="checkbox"
                              name="check1"
                              defaultValue={1}
                            />
                          </td>
                          <td style={{ width: "100  px" }}>{order.id}</td>
                          <td style={{ width: "100px" }}>{order.userId}</td>
                          <td width={10}>
                            {order.deliveryName}
                          </td>
                          <td style={{ width: "80px" }}>{order.deliveryGender}</td>
                          <td>
                        {order.deliveryPhone}
                          </td>

                          <td style={{ width: "100px" }}>
                            {order.deliveryAddress}
                          </td>
                          <td style={{ width: "100px" }}>
                            {order.note}
                          </td><td style={{ width: "100px" }}>
                            {order.total}
                          </td>
                          <td style={{ width: "100px" }}>
                            {order.createdAt}
                          </td>
                          <td style={{ width: "140px" }}>
                            <button
                              className="btn btn-primary btn-sm edit mr-2"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              data-toggle="modal"
                              data-target="#ModalUPDetail"
                              onClick={() => handleViewOrder(order)}
                            >
                              <i className="fas fa-eye" />
                            </button>

                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              title="Xóa"
                              onClick={() => handleOpenModal(order.id)}
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
                            <Link
                              to={`/admin/order/edit/${order.id}`} // Replace this with the appropriate URL
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
                <div className="row ">
                  <div className="col-md-12">
                    <ul className="pagination justify-content-end m-3">
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page - 1)}
                          disabled={page === 1}
                        >
                          Lùi{" "}
                        </button>
                      </li>
                      <li className={`page-item ${page === 1 ? "active" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(1)}
                          disabled={page === 1}
                        >
                          1
                        </button>
                      </li>
                      <li className={`page-item ${page === 2 ? "active" : ""}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(2)}
                          disabled={page === 2}
                        >
                          2
                        </button>
                      </li>
                  
                      <li className="page-item">
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(page + 1)}
                          disabled={orders.length < limit} // Disable nút khi hết sản phẩm
                        >
                      Tiếp
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* end phân trang */}
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
                    <h5> Chi Tiết Đơn Hàng </h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Mã Đơn Hàng </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedOrder ? selectedOrder.id : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Mã Khách Hàng</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedOrder ? selectedOrder.userId : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                <label className="control-label">Tên Người Đặt</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedOrder ? selectedOrder.deliveryName : ""}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label className="control-label">Tên Người Đặt</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedOrder ? selectedOrder.deliveryName : ""}
              
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Giới Tính</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedOrder ? selectedOrder.deliveryGender : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Số Điện Thoại</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedOrder ? selectedOrder.deliveryPhone : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                <label className="control-label">Địa Chỉ</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedOrder ? selectedOrder.deliveryAddress : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                 
                </div>
                <div className="form-group col-md-6">
                <label className="control-label">Ghi Chú</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedOrder ? selectedOrder.note: ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                 
                </div>
                <div className="form-group col-md-6">
                <label className="control-label">Tổng Đơn</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedOrder ? selectedOrder.total: ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                 
                </div>
                <div className="form-group col-md-6">
                <label className="control-label">Ngày Tạo</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedOrder ? selectedOrder.createdAt: ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                 
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
              Bạn có chắc chắn muốn xóa Đơn Hàng này?
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
                  onClick={() => OrderDelete(orderIdToDelete)}
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
export default OrderAll;
