import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import { urlImageBE } from "../../../config";
import Categoryservice from "../../../services/CategoryServices";
import BrandService from "../../../services/BrandService";
function Index(props) {
  const [products, setProducts] = useState([]);
  const [statusdel, setStatusDel] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // State để lưu thông tin sản phẩm được chọn
  const [keyword, setKeyword] = useState("");
  // -------------------------------------------------------------------

  // --phân trang-----------------------------------------------------------------
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  useEffect(
    function () {
      (async function () {
        try {
          const result = await ProductService.getProductAll(limit, page);
          setProducts(result.data);
        } catch (error) {
          console.error(error);
        }
      })();
    },
    [limit, page]
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  //----------------------------------------------------------------
  // Xử lý sự kiện click vào nút "Xem"
  const handleViewProduct = (product) => {
    setSelectedProduct(product); // Cập nhật state với thông tin sản phẩm được chọn
  };

  // Đóng modal chi tiết sản phẩm

  //--------------------------------------------------------------------
  const handleOpenModal = (id) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
  // search------------------------------------------------------
  const [isSearching, setIsSearching] = useState(false);

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const result = await ProductService.Search(keyword);
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
  ///
  //   const [limit, setLimit] = useState(8);    const [page, setPage] = useState(1);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const result = await ProductService.getProductByCategoryParent(props.category.id, limit, page);
  //             setProducts(result.data);
  //         } catch (error) {
  //             setProducts([]);
  //         }
  //     };

  //     fetchData();
  // }, [props.category.id, limit, page]);

  // const handlePageChange = (newPage) => {
  //     setPage(newPage);
  // };

  return (
    <>
      {/* danh sach san pham  */}
      <main className="app-content">
        <div className="app-title">
          <ul className="app-breadcrumb breadcrumb side">
            <li className="breadcrumb-item active">
              <a href="#">
                <b>Danh sách sản phẩm</b>
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
                      to="/admin/product/create" // Replace this with the appropriate URL
                      className="btn btn-add btn-sm"
                      title="Thêm"
                    >
                      <i className="fas fa-plus" />
                      Tạo mới sản phẩm
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
                      <th>Mã sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Ảnh</th>
                      <th>Số lượng</th>
                      <th>Tình trạng</th>
                      <th>Giá tiền</th>
                      <th>Danh mục</th>
                      <th>Mô Tả</th>
                      <th>Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isSearching ? searchResults : products).map(
                      (product, index) => (
                        <tr key={index}>
                          <td width={10}>
                            <input
                              type="checkbox"
                              name="check1"
                              defaultValue={1}
                            />
                          </td>
                          <td style={{ width: "120px" }}>{product.id}</td>
                          <td style={{ width: "150px" }}>{product.name}</td>
                          <td width={10}>
                            <img
                              style={{ width: "150px" }}
                              src={urlImageBE + "products/" + product.image}
                              alt={product.image}
                            />
                          </td>
                          <td style={{ width: "80px" }}>{product.qty}</td>
                          <td>
                            <span
                              className={`badge ${
                                product.status === 1
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            >
                              {product.status === 1 ? "Còn Hàng" : "Hết Hàng"}
                            </span>
                          </td>
                          <td>{product.price} đ</td>
                          <td>
                            {product.category_Id !== 0 ? (
                              // Nếu sản phẩm đã được gán danh mục
                              categories.map((category) => {
                                if (category.id === product.category_Id) {
                                  return (
                                    <span key={category.id}>
                                      {category.name}
                                    </span>
                                  );
                                }
                                return null;
                              })
                            ) : (
                              // Nếu sản phẩm chưa được gán danh mục
                              <span>Sản phẩm chưa có Danh Mục nào</span>
                            )}
                          </td>
                          <td style={{ width: "250px" }}>
                            {product.description}
                          </td>
                          <td style={{ width: "140px" }}>
                            <button
                              className="btn btn-primary btn-sm edit mr-2"
                              type="button"
                              title="Sửa"
                              id="show-emp"
                              data-toggle="modal"
                              data-target="#ModalUPDetail"
                              onClick={() => handleViewProduct(product)}
                            >
                              <i className="fas fa-eye" />
                            </button>
                            <button
                              className="btn btn-primary btn-sm trash"
                              type="button"
                              title="Xóa"
                              onClick={() => handleOpenModal(product.id)}
                            >
                              <i className="fas fa-trash-alt" />
                            </button>
                            <Link
                              to={`/admin/product/edit/${product.id}`}
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
                          disabled={products.length < limit} // Disable nút khi hết sản phẩm
                        >
                          Next
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
                    <h5> Thông Tin Sản Phẩm </h5>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="control-label">Mã sản phẩm </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedProduct ? selectedProduct.id : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Tên sản phẩm</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedProduct ? selectedProduct.name : ""}
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Chi Tiết</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedProduct ? selectedProduct.detail : ""}
                    style={{ height: "150px" }} // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="control-label">Mô Tả</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedProduct ? selectedProduct.description : ""}
                    style={{ height: "150px" }} // Tùy chỉnh chiều cao của textarea
                  />
                </div>

                <div className="form-group  col-md-6">
                  <label className="control-label">Số lượng</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedProduct ? selectedProduct.qty : ""}
                  />{" "}
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Ngày Thêm</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedProduct ? selectedProduct.createdAt : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Sửa Bởi</label>
                  <textarea
                    className="form-control"
                    readOnly
                    value={selectedProduct ? selectedProduct.updateBy : ""}
                    // Tùy chỉnh chiều cao của textarea
                  />
                </div>
                <div className="form-group col-md-6 ">
                  <label htmlFor="exampleSelect1" className="control-label">
                    Thương Hiệu
                  </label>
                  {selectedProduct && selectedProduct.brand_Id !== 0 ? (
                    // Nếu sản phẩm đã được gán thương hiệu
                    brands.map((br, index) => {
                      if (br.id === selectedProduct.brand_Id) {
                        return (
                          <input
                            className="form-control"
                            type="text"
                            readOnly
                            value={br.name}
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    // Nếu sản phẩm chưa được gán thương hiệu
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="Sản phẩm chưa có thương hiệu nào"
                    />
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label className="control-label">Giá bán</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={selectedProduct ? selectedProduct.price : ""}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="exampleSelect1" className="control-label">
                    Danh mục
                  </label>
                  {selectedProduct && selectedProduct.category_Id !== 0 ? (
                    // Nếu sản phẩm đã được gán thương hiệu
                    categories.map((ca, index) => {
                      if (ca.id === selectedProduct.category_Id) {
                        return (
                          <input
                            className="form-control"
                            type="text"
                            readOnly
                            value={ca.name}
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    // Nếu sản phẩm chưa được gán thương hiệu
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value="Sản phẩm chưa có Danh Mục nào"
                    />
                  )}

                  <div className="form-group col-md-6">
                    <label
                      className="control-label"
                      style={{ display: "block" }}
                    >
                      Hình Ảnh
                    </label>
                    <div style={{ position: "relative" }}>
                      {selectedProduct && selectedProduct.image ? (
                        <img
                          src={urlImageBE + "products/" + selectedProduct.image}
                          alt="Product Image"
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
      </div>
      {/*
MODAL
*/}

      {showModal && (
        <div className="swal-overlay swal-overlay--show-modal" tabIndex={-1}>
          <div className="swal-modal" role="dialog" aria-modal="true">
            <div className="swal-title">Cảnh báo</div>
            <div className="swal-text">
              Bạn có chắc chắn muốn xóa sản phẩm này?
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
                  onClick={() => ProductDelete(productIdToDelete)}
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
