import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../Product/ProductItem";
import ProductServices from "../../../services/ProductServices";
import CategoryServices from "../../../services/CategoryServices";
import ListCategory from "../../../Layout/LayoutSite/ListCategory";
import BrandService from "../../../services/BrandService";
import { urlImageFE } from "../../../config";
import Productitem from "../Product/ProductItem";
import ProductCategoryitem from "../Product/ProductCategoryItem";
function ProductCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(40000000);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const infocategory = await CategoryServices.getById(id);
        const catid = infocategory.data.id;
        setTitle(infocategory.data.name);
        const infoproduct = await ProductServices.getProductHome(
          catid,
          limit,
          page
        );
        setProducts(infoproduct.data);
      } catch (error) {
        setProducts([]);
      }
    };

    fetchData();
  }, [id, limit, page]);

  function formatCurrency(amount) {
    // Định dạng số tiền thành VNĐ với dấu chấm ngăn cách hàng nghìn
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }
  useEffect(() => {
    const filteredProducts = products.filter(filterProductsByPrice);
    setDisplayedProducts(filteredProducts);
  }, [minPrice, maxPrice, products, selectedPrices]);

  const handlePriceFilterChange = (priceRange) => {
    setSelectedPrices((prevPrices) => {
        return prevPrices.includes(priceRange)
            ? prevPrices.filter((price) => price !== priceRange)
            : [...prevPrices, priceRange];
    });
};
 const filterProductsByPrice = (product) => {
        if (selectedPrices.length === 0) {
            return true;
        }

        const productPrice = parseFloat(product.price);
        return selectedPrices.some((priceCriteria) => {
            if (priceCriteria.startsWith(">")) {
                const minPrice = parseFloat(priceCriteria.slice(1));
                return productPrice > minPrice;
            } else {
                const [min, max] = priceCriteria.split("-");
                return productPrice >= parseFloat(min) && productPrice <= parseFloat(max);
            }
        });
    };


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleMinPriceChange = (e) => {
    setMinPrice(parseFloat(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseFloat(e.target.value));
  };

  const [viewMode, setViewMode] = useState("grid");

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };
  //brand
  useEffect(function () {
    (async function () {
      try {
        const result = await BrandService.getAll();
        setListBrand(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return (
    <>
      <section className="section-content padding-y">
        <div className="container">
          <div className="card mb-3">
            <ol className="breadcrumb float-left">
              <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="breadcrumb-item">
                <a href="#">danh mục</a>
              </li>
              <li className="breadcrumb-item active">Chi tiết mặt hàng</li>
            </ol>
          </div>
          <div className="row">
            <aside className="col-md-2">
              <article className="filter-group">
                <h6 className="title">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#collapse_1"
                  >
                    {" "}
                    Loại sản phẩm{" "}
                  </a>
                </h6>
                <div className="filter-content collapse show" id="collapse_1">
                  <ListCategory />
                </div>
              </article>
              <article className="filter-group" style={{ listStyle: 'none' ,marginTop:"10px",marginLeft:"-40px"}}>
                <h6 className=" text-center text-white mb-0 " style={{ listStyle: 'none' ,marginTop:"10px",marginLeft:"-40px"}}>
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#collapse_1"
                  >
                    {" "}
                    Thương Hiệu{" "}
                  </a>
                </h6>
                <div className="card-banner border-bottom">
                  <ul className="menu-category align-items-start">
                
                    {listBrand.map((brand, index) => (
                        <Link
                        to={"/thuong-hieu-san-pham/" + brand.id}
                        className="text-truncate"
                      >
                      <div className=" d-flex mt-2 ">
                        <img
                          width="70"
                          src={urlImageFE + "brands/" + brand.image}
                          className="img-wrap ml-5"
                          alt="img"
                          style={{ transition: "transform 0.2s" }} // Thêm transition vào đây
                          onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.1)"; // Khi hover, phóng to hình ảnh
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)"; // Khi rời chuột, hình ảnh trở lại kích thước ban đầu
                          }}
                        />

                    
                          {" "}
                          {/* Sử dụng lớp text-truncate của Bootstrap */}
                         
                    
                      </div>
                      </Link>
                    ))}
                       
                  </ul>
                </div>
              </article>
              <article className="filter-group">
                <h6 className="title">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#collapse_2"
                  >
                    {" "}
                    Giá{" "}
                  </a>
                </h6>
                <div className="filter-content collapse show" id="collapse_2">
                  <div className="inner">
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-1"
                        onChange={() =>
                          handlePriceFilterChange("5000000-10000000")
                        }
                        checked={selectedPrices.includes("5000000-10000000")}
                      />
                      <div className="custom-control-label">
                        5 Triệu - 10 Triệu
                        <b className="badge badge-pill badge-light float-right"></b>
                      </div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-2"
                        onChange={() =>
                          handlePriceFilterChange("10000000-15000000")
                        }
                        checked={selectedPrices.includes("10000000-15000000")}
                      />
                      <div className="custom-control-label">
                        10 Triệu - 15 Triệu
                      </div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-3"
                        onChange={() =>
                          handlePriceFilterChange("20000000-30000000")
                        }
                        checked={selectedPrices.includes("20000000-30000000")}
                      />
                      <div className="custom-control-label">
                        20 Triệu - 30 Triệu
                      </div>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-4"
                        onChange={() => handlePriceFilterChange("> 30000000")}
                        checked={selectedPrices.includes("> 30000000")}
                      />
                      <div className="custom-control-label">Trên 30 Triệu</div>
                    </label>
                  </div>
                </div>
              </article>
              <article className="filter-group">
                <h6 className="title">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="collapse"
                    data-target="#collapse_3"
                  >
                    {" "}
                    Khoảng giá{" "}
                  </a>
                </h6>
                <div className="filter-content collapse show" id="collapse_3">
                  <div className="inner">
                    <input
                      type="range"
                      min={0}
                      max={40000000}
                      value={minPrice}
                      onChange={handleMinPriceChange}
                    />{" "}
                    <br />
                    <span>Giá Từ: {formatCurrency(minPrice)}</span>
                    <br />
                    <input
                      type="range"
                      min={0}
                      max={40000000}
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                    />
                    <span>Đến: {formatCurrency(maxPrice)}</span>
                    <div className="form-row"></div>
                  </div>
                </div>
              </article>
            </aside>
            <main className="col-md-10">
              <header className="mb-3">
                <div className="form-inline">
                  <strong className="mr-md-auto">
                    {displayedProducts.length} Mặt hàng được tìm thấy{" "}
                  </strong>
                  <select className="mr-2 form-control">
                    <option>Mặt hàng mới nhất</option>
                    <option>Đang thịnh hành</option>
                    <option>Phổ biến nhất</option>
                    <option>Rẻ nhất</option>
                  </select>
                  <div className="btn-group">
                    <a
                      className={`btn btn-light ${
                        viewMode === "list" ? "" : "active"
                      }`}
                      onClick={toggleViewMode}
                      data-toggle="tooltip"
                      title="Xem danh sách"
                    >
                      <i className="fa fa-bars" />
                    </a>
                    <a
                      className={`btn btn-light ${
                        viewMode === "grid" ? "" : "active"
                      }`}
                      onClick={toggleViewMode}
                      data-toggle="tooltip"
                      title="Xem lưới"
                    >
                      <i className="fa fa-th" />
                    </a>
                  </div>
                </div>
              </header>
              <div className="col-md col-9">
     
              <div className="row row-sm">
              {displayedProducts.slice(0, limit).map((product, index) => (
                <ProductCategoryitem product={product} key={index} />
              ))}
            </div>
                </div>
              <div className="row">
                <div className="col-md-12">
                  <ul className="pagination justify-content-center m-3">
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                      >
                        Lùi
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
                        disabled={products.length < limit}
                      >
                        Tiếp
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductCategory;
