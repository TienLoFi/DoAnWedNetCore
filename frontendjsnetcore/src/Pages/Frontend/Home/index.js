import { useEffect, useState } from "react";
import ProductServices from "../../../services/ProductServices";
import CategoryService from "../../../services/CategoryServices";
import BrandService from "../../../services/BrandService";
import Productitem from "../Product/ProductItem";
import ProductSaleItem from "../Product/ProductSaleItem";
import { Link } from "react-router-dom";
import ProductHome from "../ProductCategory";
import { urlImageFE } from "../../../config";

function Homepage(props) {
  const [product, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(product.length / limit);
  useEffect(function () {
    (async function () {
      try {
        const result = await CategoryService.getAll();
        setListCategory(result.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  const shuffledProducts = [...product].sort(() => Math.random() - 0.5);
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
  useEffect(
    function () {
      (async function () {
        try {
          const result = await ProductServices.getAll(limit);
          setProducts(result.data);
        } catch (error) {
          console.error(error);
        }
      })();
    },
    [limit]
  );

  return (
    <>
      <>
        <div className="container">
          {/* ========================= SECTION MAIN  ========================= */}
          <section className="section-main padding-y">
            <main className="card">
              <div className="card-body">
                <div className="row">
                  <aside className="col-lg-2 special-home-right">
                    <h6
                      className=" text-center text-white mb-0 p-2"
                      style={{ backgroundColor: "#FF7632" }}
                    >
                      Danh Mục{" "}
                    </h6>
                    <div className="card-banner border-bottom">
                      <ul className="menu-category align-items-start">
                 
           
            
              {listCategory.map((category, index) => (
                          <div className=" d-flex mt-2 ">
                     

                     <Link
                    className="nav-link"
                    to={"/danh-muc-san-pham/" + category.id}
                    style={{ color: "black", textDecoration: "none" }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#FF7632"; // Thay đổi màu chữ khi hover
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "black"; // Đặt lại màu chữ mặc định khi không hover
                    }}
                  >
                    {category.name}
                  </Link>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </aside>

                  <div className="col-lg-10">
                    <div
                      id="carousel1_indicator"
                      className="slider-home-banner carousel slide"
                      data-ride="carousel"
                    >
                      <ol className="carousel-indicators">
                        <li
                          data-target="#carousel1_indicator"
                          data-slide-to={0}
                          className="active"
                        />
                        <li
                          data-target="#carousel1_indicator"
                          data-slide-to={1}
                        />
                        <li
                          data-target="#carousel1_indicator"
                          data-slide-to={2}
                        />
                      </ol>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            src="/assets/images/banners/banner0.gif"
                            alt="First slide"
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="/assets/images/banners/banner7.png"
                            alt="Second slide"
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="/assets/images/banners/banner6.png"
                            alt="Third slide"
                          />
                        </div>
                      </div>
                      <a
                        className="carousel-control-prev"
                        href="#carousel1_indicator"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous</span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#carousel1_indicator"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next</span>
                      </a>
                    </div>
                  </div>

                  {/* col.// */}

                  {/* col.// */}
                </div>{" "}
                {/* row.// */}
              </div>{" "}
              {/* card-body.// */}
            </main>{" "}
            {/* card.// */}
          </section>

          {/* <!-- =============== SECTION DEAL =============== --> */}
          <section className="padding-bottom">
            <div className="card card-deal">
              <div className="row ">
                {" "}
                <div className="col-md-3 content-body m-2">
                  <header className="section-heading">
                    <h3 className="section-title text-danger  ">Deal Hot Trong Tuần!</h3>
                    <p>Nhanh Tay Kẻo Hết</p>
                  </header>
                  {/* sect-heading */}
                  <div className="timer">
                    <div>
                      {" "}
                      <span className="num">04</span> <small>Days</small>
                    </div>
                    <div>
                      {" "}
                      <span className="num">12</span> <small>Hours</small>
                    </div>
                    <div>
                      {" "}
                      <span className="num">58</span> <small>Min</small>
                    </div>
                    <div>
                      {" "}
                      <span className="num">02</span> <small>Sec</small>
                    </div>
                  </div>
                </div>{" "}
                <div className="col-md col-9">
                  <div className="row row-sm">
                    {shuffledProducts.slice(0, 4).map((product, index) => (
                      <ProductSaleItem product={product} key={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-- =============== SECTION DEAL // END =============== --> */}

          <section className="padding-bottom-sm">
            <header className="section-heading heading-line">
              <h4 className="title-section text-uppercase">
                Sản Phẩm Mới Ra Mắt
              </h4>
            </header>

            <div className="row row-sm">
              {product.slice(0, limit).map((product, index) => (
                <Productitem product={product} key={index} />
              ))}
            </div>

            <div className="row">
              <div className="col-md-12 text-center">
                <button
                  className="btn btn-success"
                  onClick={() => setLimit(limit + 8)}
                  style={{
                    display: limit >= product.length ? "none" : "block",
                  }}
                >
                  Xem Thêm
                </button>
              </div>
            </div>
          </section>
          {/* =============== SECTION ITEMS .//END =============== */}
          {/* =============== SECTION SERVICES =============== */}
          <section className="padding-bottom">
            <header className="section-heading heading-line">
              <h4 className="title-section text-uppercase">Tin Tức</h4>
            </header>
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <article className="card card-post">
                  <img
                    src="/images/posts/tintuc1.png"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="title">Realme</h6>
                    <p className="small text-uppercase text-muted">
                      Đánh giá smartphone chip S660, RAM 8 GB, giá 6,99 triệu
                      tại Việt Nam
                    </p>
                  </div>
                </article>{" "}
                {/* card.// */}
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3 col-sm-6">
                <article className="card card-post">
                  <img
                    src="images/posts/tintuc2.png"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="title">SamSung</h6>
                    <p className="small text-uppercase text-muted">
                      Khám phá smartphone màn hình gập được đầu tiên của Samsung
                    </p>
                  </div>
                </article>{" "}
                {/* card.// */}
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3 col-sm-6">
                <article className="card card-post">
                  <img
                    src="images/posts/tintuc3.png"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="title">Apple</h6>
                    <p className="small text-uppercase text-muted">
                      Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất
                      lại iPhone X
                    </p>
                  </div>
                </article>{" "}
                {/* card.// */}
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3 col-sm-6">
                <article className="card card-post">
                  <img
                    src="images/posts/tintuc4.png"
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="title">LG</h6>
                    <p className="small text-uppercase text-muted">
                      Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera
                    </p>
                  </div>
                </article>{" "}
                {/* card.// */}
              </div>{" "}
              {/* col.// */}
            </div>{" "}
            {/* row.// */}
          </section>
          {/* =============== SECTION SERVICES .//END =============== */}
          {/* =============== SECTION REGION =============== */}
          <section className="padding-bottom">
            <header className="section-heading heading-line">
              <h4 className="title-section text-uppercase">Chọn Vùng</h4>
            </header>
            <ul className="row mt-4">
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <img
                    className="icon-flag-sm"
                    src="images/icons/flags/CN.png"
                  />{" "}
                  <span>China</span>{" "}
                </a>
              </li>
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <img
                    className="icon-flag-sm"
                    src="images/icons/flags/DE.png"
                  />{" "}
                  <span>Germany</span>{" "}
                </a>
              </li>
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <img
                    className="icon-flag-sm"
                    src="images/icons/flags/AU.png"
                  />{" "}
                  <span>Australia</span>{" "}
                </a>
              </li>
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <img
                    className="icon-flag-sm"
                    src="images/icons/flags/RU.png"
                  />{" "}
                  <span>Russia</span>{" "}
                </a>
              </li>
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <img
                    className="icon-flag-sm"
                    src="images/icons/flags/IN.png"
                  />{" "}
                  <span>India</span>{" "}
                </a>
              </li>
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <img
                    className="icon-flag-sm"
                    src="images/icons/flags/GB.png"
                  />{" "}
                  <span>England</span>{" "}
                </a>
              </li>
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <img
                    className="icon-flag-sm"
                    src="images/icons/flags/TR.png"
                  />{" "}
                  <span>Turkey</span>{" "}
                </a>
              </li>
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <img
                    className="icon-flag-sm"
                    src="images/icons/flags/UZ.png"
                  />{" "}
                  <span>Uzbekistan</span>{" "}
                </a>
              </li>
              <li className="col-md col-6">
                <a href="#" className="icontext">
                  {" "}
                  <i className="mr-3 fa fa-ellipsis-h" />{" "}
                  <span>Xem Thêm Vùng</span>{" "}
                </a>
              </li>
            </ul>
          </section>
          <a className="messenger-icon" href="https://m.me/100051061937265">
            <img
              src="images/mess.png"
              alt="mess Button"
              style={{
                width: "90px",
                height: "auto",
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: "9999",
              }}
            />
          </a>
          {/* =============== SECTION REGION .//END =============== */}
          <article className="my-4">
            <img src="images/banners/ad-sm.png" className="w-100" />
          </article>
        </div>
        {/* container end.// */}
        {/* ========================= SECTION SUBSCRIBE  ========================= */}
      </>
    </>
  );
}
export default Homepage;
