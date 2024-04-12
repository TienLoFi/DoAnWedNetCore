import { useEffect, useState } from "react";
import ProductServices from "../../../services/ProductServices";
import CategoryService from "../../../services/CategoryServices";
import Productitem from "../Product/ProductItem";
import { Link } from "react-router-dom";
import ProductHome from "../ProductCategory";

function Homepage(props) {
  const [product, setProducts] = useState([]);
  const [limit, setLimit] = useState(3);
  const [listCategory, setListCategory] = useState([]);
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
                  <aside className="col-lg col-md-3 flex-lg-grow-0">
                    <h6>DANH MỤC</h6>
                    <nav className="nav-home-aside">
                      <ul className="menu-category">
                        {listCategory.map((category, index) => (
                          <li key={index}>
                            <Link
                              className="text-decoration-none text-dark"
                              to={"/danh-muc-san-pham/" + category.id}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </aside>{" "}
                  {/* col.// */}
                  <div className="col-md-9 col-xl-7 col-lg-7">
                    {/* ================== COMPONENT SLIDER  BOOTSTRAP  ==================  */}
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
                            src="images/banners/banner1.jpg"
                            alt="First slide"
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="images/banners/banner2.jpg"
                            alt="Second slide"
                          />
                        </div>
                        <div className="carousel-item">
                          <img
                            src="images/banners/banner3.jpg"
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
                    {/* ==================  COMPONENT SLIDER BOOTSTRAP end.// ==================  .// */}
                  </div>{" "}
                  {/* col.// */}
                  <div className="col-md d-none d-lg-block flex-grow-1">
                    <aside className="special-home-right">
                      <h6 className="bg-blue text-center text-white mb-0 p-2">
THƯƠNG HIỆU                      </h6>
                      <div className="card-banner border-bottom">
                      <ul className="menu-category">
                        {listCategory.map((category, index) => (
                          <li key={index}>
                            <Link
                              className="text-decoration-none text-dark"
                              to={"/danh-muc-san-pham/" + category.id}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      </div>
                    </aside>
                  </div>{" "}
                  {/* col.// */}
                </div>{" "}
                {/* row.// */}
              </div>{" "}
              {/* card-body.// */}
            </main>{" "}
            {/* card.// */}
          </section>

          <section className="padding-bottom-sm">
            <header className="section-heading heading-line">
              <h4 className="title-section text-uppercase">
                Recommended items
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
              <h4 className="title-section text-uppercase">Trade services</h4>
            </header>
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <article className="card card-post">
                  <img src="images/posts/1.jpg" className="card-img-top" />
                  <div className="card-body">
                    <h6 className="title">Trade Assurance</h6>
                    <p className="small text-uppercase text-muted">
                      Order protection
                    </p>
                  </div>
                </article>{" "}
                {/* card.// */}
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3 col-sm-6">
                <article className="card card-post">
                  <img src="images/posts/2.jpg" className="card-img-top" />
                  <div className="card-body">
                    <h6 className="title">Pay anytime</h6>
                    <p className="small text-uppercase text-muted">
                      Finance solution
                    </p>
                  </div>
                </article>{" "}
                {/* card.// */}
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3 col-sm-6">
                <article className="card card-post">
                  <img src="images/posts/3.jpg" className="card-img-top" />
                  <div className="card-body">
                    <h6 className="title">Inspection solution</h6>
                    <p className="small text-uppercase text-muted">
                      Easy Inspection
                    </p>
                  </div>
                </article>{" "}
                {/* card.// */}
              </div>{" "}
              {/* col.// */}
              <div className="col-md-3 col-sm-6">
                <article className="card card-post">
                  <img src="images/posts/4.jpg" className="card-img-top" />
                  <div className="card-body">
                    <h6 className="title">Ocean and Air Shipping</h6>
                    <p className="small text-uppercase text-muted">
                      Logistic services
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
              <h4 className="title-section text-uppercase">Choose region</h4>
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
                  <span>More regions</span>{" "}
                </a>
              </li>
            </ul>
          </section>
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
