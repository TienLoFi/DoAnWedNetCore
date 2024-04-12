import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { urlImageBE } from "../../../config";
import CategoryService from "../../../services/CategoryServices";

function BrandAll() {
  const [statusdel, setStatusDel] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [categoriesIdToDelete, setCategoriesIdToDelete] = useState(null);
  const [selectedCategory, setselectedCategory] = useState(null); 
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  // -------------------------------------------------------------------


  //--------------PHÂN TRANG--------------------------------------------------

  useEffect(function () {
    (async function () {
      try {
        const result = await CategoryService.getCategoryAll(limit, page);
        setCategories(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [limit, page]);
  

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //----------------------------------------------------------------

  const [isSearching, setIsSearching] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const result = await CategoryService.Search(keyword);
        setSearchResults(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (keyword) {
      setIsSearching(true);
      fetchSearchResults();
    } else {
      setIsSearching(false);
    }
  }, [keyword]);

  const handleInputChange = async (e) => {
    const inputKeyword = e.target.value;
    setKeyword(inputKeyword);
  };

  //----------------------------------------------------------------

  // Xử lý sự kiện click vào nút "Xem"
  const handleViewBrand = (categories) => {
    setselectedCategory(categories); // Cập nhật state với thông tin Danh Mục được chọn
  };

  // Đóng modal chi tiết Danh Mục

  //--------------------------------------------------------------------
  const handleOpenModal = (id) => {
    setCategoriesIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(
    function () {
      (async function () {
        await CategoryService.getAll().then(function (result) {
          setCategories(result.data);
        });
      })();
    },
    [statusdel]
  );

  async function CategoryDelete(id) {
    await CategoryService.remove(id).then(function (result) {
      alert("Xóa thành công");

      setShowModal(false);
      setStatusDel(result.data);
    });
  }


  useEffect(function () {
    (async function () {
      await CategoryService.getAll().then(function (result) {
        setCategories(result.data);
      });
    })();
  }, []);

  useEffect(function () {
    (async function () {
      await CategoryService.getAll().then(function (result) {
        setCategories(result.data);
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
                <b>Danh sách Danh Mục</b>
              </a>
            </li>
          </ul>
                  
                  
          <div
            className="mb-1 ml-auto"
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ced4da",
              borderRadius: "0.25rem",
              padding: "0.375rem 0.75rem",
            }}
          >
            <label
              htmlFor="searchInput"
              style={{
                marginRight: "0.5rem",
                flex: "none",
                fontWeight: "bold",
              }}
            >
              Tìm kiếm:
            </label>
            <input
              type="search"
              id="searchInput"
              className="form-control"
              placeholder=""
              value={keyword}
              onChange={handleInputChange}
              style={{ flexGrow: 1 }}
            />
          </div>

          <div id="clock" />
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="tile-body">
                <div className="row element-button">
                  <div className="col-sm-2">
                    <Link
                      to="/admin/category/create" // Replace this with the appropriate URL
                      className="btn btn-add btn-sm"
                      title="Thêm"
                    >
                      <i className="fas fa-plus" />
                      Tạo mới Danh Mục
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
                      <th>Mã Danh Mục</th>
                      <th>Tên Danh Mục</th>

                      <th>Slug</th>
                      <th>Tình trạng</th>

                      <th>Mô Tả</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                  {(isSearching ? searchResults : categories).map(
                      (category, index) => (
                        <tr key={index}>
                          <td width={10}>
                            <input
                              type="checkbox"
                              name="check1"
                              defaultValue={1}
                            />
                          </td>
                          <td style={{ width: "120px" }}>{category.id}</td>
                          <td style={{ width: "150px" }}>{category.name}</td>

                          <td style={{ width: "80px" }}>{category.slug}</td>
                          <td>
                            <span
                              className={`badge ${
                                category.status === 1
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {category.status === 1
                                ? "Đang hợp tác"
                                : "Ngưng hợp tác"}
                            </span>
                          </td>

                          <td style={{ width: "250px" }}>
                            {category.description}
                          </td>
                          <td style={{ width: "140px" }}>
                            <button
                              className="btn btn-primary btn-sm edit mr-2"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              data-toggle="modal"
                              data-target="#ModalUPDetail"
                              onClick={() => handleViewBrand(category)}
                            >
                              <i className="fas fa-eye" />
                            </button>

                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              title="Xóa"
                              onClick={() => handleOpenModal(category.id)}
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
                            <Link
                              to={`/admin/category/edit/${category.id}`} // Replace this with the appropriate URL
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
                      )
                    )}
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
                          disabled={categories.length < limit} // Disable nút khi hết sản phẩm
                        >
                          Next
                        </button>
                      </li>
                    </ul>
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
                  <label className="control-label">Mã Danh Mục </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedCategory ? selectedCategory.id : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tên Danh Mục</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedCategory ? selectedCategory.name : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Trạng Thái</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedCategory ? selectedCategory.status : ""}
                  />
                </div>

                <div className="form-group col-md-12">
                  <label className="control-label">Mô Tả</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedCategory ? selectedCategory.description : ""}
                    style={{ height: "150px" }} // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ngày Thêm</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedCategory ? selectedCategory.createdAt : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Sửa Bởi</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedCategory ? selectedCategory.updateBy : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label" style={{ display: "block" }}>
                    Hình Ảnh
                  </label>
                  <div style={{ position: "relative" }}>
                    {selectedCategory && selectedCategory.image ? (
                      <img
                        src={
                          urlImageBE + "categories/" + selectedCategory.image
                        }
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
              Bạn có chắc chắn muốn xóa Danh Mục này?
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
                  onClick={() => CategoryDelete(categoriesIdToDelete)}
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
