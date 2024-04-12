import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryItem from "../../../Layout/LayoutSite/CategoryItem";
import ProductServices from "../../../services/ProductServices";
import CategoryServices from "../../../services/CategoryServices";


function ProductCategory() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(2);
    document.title = title;
    useEffect(function () {
        (async function () {
            try {
                const infocategory = await CategoryServices.getById(id);
                const catid = infocategory.data.id;
                setTitle(infocategory.data.name);
                const infoproduct = await ProductServices.getProductHome(catid,limit,page);
                setProducts(infoproduct.data);
            } catch (error) {
                setProducts([]);
            }
        })();

    }, [id,limit,page]);


    const [selectedPrices, setSelectedPrices] = useState([]);
    const productsInRows = [];
    for (let i = 0; i < products.length; i += 4) {
        productsInRows.push(products.slice(i, i + 4));
    }
    const handlePriceFilterChange = (priceRange) => {
        setSelectedPrices((prevPrices) => {
            return prevPrices.includes(priceRange)
                ? prevPrices.filter((price) => price !== priceRange)
                : [priceRange];
        });
    };

    const filterProductsByPrice = (product) => {
        if (selectedPrices.length === 0) {
            return true;
        }

        const productPrice = parseFloat(product.price);
        return selectedPrices.some(
            (priceRange) => {
                const [min, max] = priceRange.split('-');
                return productPrice >= parseFloat(min) && productPrice <= parseFloat(max);
            }
        );
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
      };


    return (
        <>
            <section className="section-content padding-y">
                <div className="container">
                    {/* ============================  FILTER TOP  ================================= */}
                    <div className="card mb-3">
                        <div className="card-body">
                            <ol className="breadcrumb float-left">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">Category name</a>
                                </li>
                                <li className="breadcrumb-item active">Item details</li>
                            </ol>
                        </div>{" "}
                        {/* card-body .// */}
                    </div>{" "}
                    {/* card.// */}
                    {/* ============================ FILTER TOP END.// ================================= */}
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
                                        Product type{" "}
                                    </a>
                                </h6>
                                <div
                                    className="filter-content collapse show"
                                    id="collapse_1"
                                    style={{}}
                                >
                                    <div className="inner">
                                        <ul className="list-menu">
                                            <li>
                                                <a href="#">Shorts</a>
                                            </li>
                                            <li>
                                                <a href="#">Trousers </a>
                                            </li>
                                            <li>
                                                <a href="#">Sweaters</a>
                                            </li>
                                            <li>
                                                <a href="#">Clothes</a>
                                            </li>
                                            <li>
                                                <a href="#">Home items </a>
                                            </li>
                                            <li>
                                                <a href="#">Jackats</a>
                                            </li>
                                            <li>
                                                <a href="#">Somethings </a>
                                            </li>
                                        </ul>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group  .// */}
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_2"
                                    >
                                        {" "}
                                        Prices{" "}
                                    </a>
                                </h6>
                                <div className="filter-content collapse show" id="collapse_2">
                                    <div className="inner">
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="size-1"
                                                onChange={() => handlePriceFilterChange("10-20")}
                                                checked={selectedPrices.includes("10-20")}
                                            />
                                            <div className="custom-control-label">
                                                10-20
                                                <b className="badge badge-pill badge-light float-right">
                                                    $
                                                </b>
                                            </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="size-2"
                                                onChange={() => handlePriceFilterChange("21-31")}
                                                checked={selectedPrices.includes("21-31")}
                                            />
                                            <div className="custom-control-label">
                                                21-31
                                                <b className="badge badge-pill badge-light float-right">$</b>
                                            </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="size-3"
                                                onChange={() => handlePriceFilterChange("32-52")}
                                                checked={selectedPrices.includes("32-52")}
                                            />
                                            <div className="custom-control-label">
                                                32-52
                                                <b className="badge badge-pill badge-light float-right">
                                                    $
                                                </b>{" "}
                                            </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id="size-4"
                                                onChange={() => handlePriceFilterChange("52-70")}
                                                checked={selectedPrices.includes("52-70")}
                                            />
                                            <div className="custom-control-label">
                                                52-70
                                                <b className="badge badge-pill badge-light float-right">
                                                    $
                                                </b>{" "}
                                            </div>
                                        </label>

                                    </div>{" "}
                                </div>

                            </article>{" "}
                            {/* filter-group .// */}
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_3"
                                    >
                                        {" "}
                                        Price range{" "}
                                    </a>
                                </h6>
                                <div className="filter-content collapse show" id="collapse_3">
                                    <div className="inner">
                                        <input
                                            type="range"
                                            className="custom-range"
                                            min={0}
                                            max={100}
                                            name=""
                                        />
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Min</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="$0"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="form-group text-right col-md-6">
                                                <label>Max</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="$1,0000"
                                                    type="number"
                                                />
                                            </div>
                                        </div>{" "}
                                        {/* form-row.// */}
                                        <button className="btn btn-block btn-primary">Apply</button>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group .// */}
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_4"
                                    >
                                        {" "}
                                        Sizes{" "}
                                    </a>
                                </h6>
                                <div className="filter-content collapse show" id="collapse_4">
                                    <div className="inner">
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light"> XS </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light"> SM </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light"> LG </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light"> XXL </span>
                                        </label>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group .// */}
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_5"
                                    >
                                        {" "}
                                        Condition{" "}
                                    </a>
                                </h6>
                                <div className="filter-content collapse show" id="collapse_5">
                                    <div className="inner">
                                        <label className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                name="myfilter_radio"
                                                defaultChecked=""
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">Any condition</div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                name="myfilter_radio"
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">Brand new </div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                name="myfilter_radio"
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">Used items</div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                name="myfilter_radio"
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">Very old</div>
                                        </label>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group .// */}
                        </aside>{" "}
                        {/* col.// */}
                        <main className="col-md-10">
                            <header className="mb-3">
                                <div className="form-inline">
                                    <strong className="mr-md-auto">32 Items found </strong>
                                    <select className="mr-2 form-control">
                                        <option>Latest items</option>
                                        <option>Trending</option>
                                        <option>Most Popular</option>
                                        <option>Cheapest</option>
                                    </select>
                                    <div className="btn-group">
                                        <a
                                            href="page-listing-grid.html"
                                            className="btn btn-light"
                                            data-toggle="tooltip"
                                            title="List view"
                                        >
                                            <i className="fa fa-bars" />
                                        </a>
                                        <a
                                            href="page-listing-large.html"
                                            className="btn btn-light active"
                                            data-toggle="tooltip"
                                            title="Grid view"
                                        >
                                            <i className="fa fa-th" />
                                        </a>
                                    </div>
                                </div>
                            </header>
                            {/* sect-heading */}


                            {/* {products.map(product => (
                                <CategoryItem key={product.id} product={product} />
                            ))} */}

                            {productsInRows.map((row, rowIndex) => (
                                <div className="row" key={rowIndex}>
                                    {row
                                        .filter(filterProductsByPrice)
                                        .map((product, index) => (
                                            <div className="col-md-12" key={index}>
                                                <CategoryItem product={product} />
                                            </div>
                                        ))}
                                </div>
                            ))}


                            {/* card-product .// */}
                            <div className="row ">
                  <div className="col-md-12">
                    <ul className="pagination justify-content-center m-3">
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
                        </main>{" "}
                        {/* col.// */}
                    </div>
                </div>{" "}
                {/* container .//  */}
            </section>

        </>
    );
}

export default ProductCategory;

