import { useEffect, useState } from "react";
import axios from "axios";
import ProductServices from "../../../services/ProductServices";
import { Link } from "react-router-dom";
import Productitem from "../Product/ProductItem";
function Homepage(props) {
    const [product, setProducts] = useState([])
    useEffect(function () {
        (async function () {
            try{
                const result = await  ProductServices.getAll();
                setProducts(result.data);
            }
            catch(error){
                console.error(error);
            }
            
        })();
    }, [])
    
    return <>
        <>
            <div className="container">
                {/* ========================= SECTION MAIN  ========================= */}
                <section className="section-main padding-y">
                    <main className="card">
                        <div className="card-body">
                            <div className="row">
                                <aside className="col-lg col-md-3 flex-lg-grow-0">
                                    <h6>MY MARKETS</h6>
                                    <nav className="nav-home-aside">
                                        <ul className="menu-category">
                                            <li>
                                                <a href="#">Fashion and clothes</a>
                                            </li>
                                            <li>
                                                <a href="#">Automobile and motors</a>
                                            </li>
                                            <li>
                                                <a href="#">Gardening and agriculture</a>
                                            </li>
                                            <li>
                                                <a href="#">Electronics and tech</a>
                                            </li>
                                            <li>
                                                <a href="#">Packaginf and printing</a>
                                            </li>
                                            <li>
                                                <a href="#">Home and kitchen</a>
                                            </li>
                                            <li>
                                                <a href="#">Digital goods</a>
                                            </li>
                                            <li className="has-submenu">
                                                <a href="#">More items</a>
                                                <ul className="submenu">
                                                    <li>
                                                        <a href="#">Submenu name</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Great submenu</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Another menu</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Some others</a>
                                                    </li>
                                                </ul>
                                            </li>
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
                                            <li data-target="#carousel1_indicator" data-slide-to={1} />
                                            <li data-target="#carousel1_indicator" data-slide-to={2} />
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src="images/banners/slide1.jpg" alt="First slide" />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="images/banners/slide2.jpg" alt="Second slide" />
                                            </div>
                                            <div className="carousel-item">
                                                <img src="images/banners/slide3.jpg" alt="Third slide" />
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
                                            Popular category
                                        </h6>
                                        <div className="card-banner border-bottom">
                                            <div className="py-3" style={{ width: "80%" }}>
                                                <h6 className="card-title">Men clothing</h6>
                                                <a href="#" className="btn btn-secondary btn-sm">
                                                    {" "}
                                                    Source now{" "}
                                                </a>
                                            </div>
                                            <img
                                                src="images/items/1.jpg"
                                                height={80}
                                                className="img-bg"
                                            />
                                        </div>
                                        <div className="card-banner border-bottom">
                                            <div className="py-3" style={{ width: "80%" }}>
                                                <h6 className="card-title">Winter clothing </h6>
                                                <a href="#" className="btn btn-secondary btn-sm">
                                                    {" "}
                                                    Source now{" "}
                                                </a>
                                            </div>
                                            <img
                                                src="images/items/2.jpg"
                                                height={80}
                                                className="img-bg"
                                            />
                                        </div>
                                        <div className="card-banner border-bottom">
                                            <div className="py-3" style={{ width: "80%" }}>
                                                <h6 className="card-title">Home inventory</h6>
                                                <a href="#" className="btn btn-secondary btn-sm">
                                                    {" "}
                                                    Source now{" "}
                                                </a>
                                            </div>
                                            <img
                                                src="images/items/6.jpg"
                                                height={80}
                                                className="img-bg"
                                            />
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
                {/* ========================= SECTION MAIN END// ========================= */}
                {/* =============== SECTION DEAL =============== */}
                <section className="padding-bottom">
                    <div className="card card-deal">
                        <div className="col-heading content-body">
                            <header className="section-heading">
                                <h3 className="section-title">Deals and offers</h3>
                                <p>Hygiene equipments</p>
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
                        {/* col.// */}
                        <div className="row no-gutters items-wrap">
                      
                        {product.map((product, index) => (
                            <Productitem product={product} key={index} />
                        ))}

                        </div>
                    </div>
                </section>
                {/* =============== SECTION DEAL // END =============== */}
                {/* =============== SECTION 1 =============== */}
                <section className="padding-bottom">
                    <header className="section-heading heading-line">
                        <h4 className="title-section text-uppercase">Apparel</h4>
                    </header>
                    <div className="card card-home-category">
                        <div className="row no-gutters">
                            <div className="col-md-3">
                                <div className="home-category-banner bg-light-orange">
                                    <h5 className="title">Best trending clothes only for summer</h5>
                                    <p>
                                        Consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua.{" "}
                                    </p>
                                    <a href="#" className="btn btn-outline-primary rounded-pill">
                                        Source now
                                    </a>
                                    <img src="images/items/2.jpg" className="img-bg" />
                                </div>
                            </div>{" "}
                            {/* col.// */}
                            <div className="col-md-9">
                                <ul className="row no-gutters bordered-cols">
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Well made women clothes with trending collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/1.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Guanjou, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Great clothes with trending collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/2.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Beijing, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Demo clothes with sample collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/3.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Tokyo, Japan
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/4.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Tashkent, Uzb
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/5.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> London, Britain
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/6.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Guanjou, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Well made clothes with trending collection{" "}
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/7.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Hong Kong, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen interior stuff collection{" "}
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/6.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Guanjou, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>{" "}
                            {/* col.// */}
                        </div>{" "}
                        {/* row.// */}
                    </div>{" "}
                    {/* card.// */}
                </section>
                {/* =============== SECTION 1 END =============== */}
                {/* =============== SECTION 2 =============== */}
                <section className="padding-bottom">
                    <header className="section-heading heading-line">
                        <h4 className="title-section text-uppercase">Electronics</h4>
                    </header>
                    <div className="card card-home-category">
                        <div className="row no-gutters">
                            <div className="col-md-3">
                                <div className="home-category-banner bg-light-orange">
                                    <h5 className="title">Machinery items for manufacturers</h5>
                                    <p>
                                        Consectetur adipisicing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua.{" "}
                                    </p>
                                    <a href="#" className="btn btn-outline-primary rounded-pill">
                                        Source now
                                    </a>
                                    <img src="images/items/14.jpg" className="img-bg" />
                                </div>
                            </div>{" "}
                            {/* col.// */}
                            <div className="col-md-9">
                                <ul className="row no-gutters bordered-cols">
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Well made electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/7.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Tokyo, Japan
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Another demo text for item stuff goes here
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/8.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Hong Kong, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/9.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Tashkent, Uzb
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Group of electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/10.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Guanjou, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/11.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Guanjou, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/12.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Guanjou, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/1.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Guanjou, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="col-6 col-lg-3 col-md-4">
                                        <a href="#" className="item">
                                            <div className="card-body">
                                                <h6 className="title">
                                                    Home and kitchen electronic stuff collection
                                                </h6>
                                                <img
                                                    className="img-sm float-right"
                                                    src="images/items/2.jpg"
                                                />
                                                <p className="text-muted">
                                                    <i className="fa fa-map-marker-alt" /> Guanjou, China
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>{" "}
                            {/* col.// */}
                        </div>{" "}
                        {/* row.// */}
                    </div>{" "}
                    {/* card.// */}
                </section>
                {/* =============== SECTION 2 END =============== */}
                {/* =============== SECTION REQUEST =============== */}
                <section className="padding-bottom">
                    <header className="section-heading heading-line">
                        <h4 className="title-section text-uppercase">Request for Quotation</h4>
                    </header>
                    <div className="row">
                        <div className="col-md-8">
                            <div
                                className="card-banner banner-quote overlay-gradient"
                                style={{ backgroundImage: 'url("images/banners/banner9.jpg")' }}
                            >
                                <div className="card-img-overlay white">
                                    <h3 className="card-title">
                                        An easy way to send request to suppliers
                                    </h3>
                                    <p className="card-text" style={{ maxWidth: 400 }}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                        eiusmod tempor incididunt.
                                    </p>
                                    <a href="" className="btn btn-primary rounded-pill">
                                        Learn more
                                    </a>
                                </div>
                            </div>
                        </div>{" "}
                        {/* col // */}
                        <div className="col-md-4">
                            <div className="card card-body">
                                <h4 className="title py-3">One Request, Multiple Quotes</h4>
                                <form>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            name=""
                                            placeholder="What are you looking for?"
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                placeholder="Quantity"
                                                name=""
                                                type="text"
                                            />
                                            <select className="custom-select form-control">
                                                <option>Pieces</option>
                                                <option>Litres</option>
                                                <option>Tons</option>
                                                <option>Gramms</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group text-muted">
                                        <p>Select template type:</p>
                                        <label className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue="option1"
                                            />
                                            <div className="form-check-label">Request price</div>
                                        </label>
                                        <label className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue="option2"
                                            />
                                            <div className="form-check-label">Request a sample</div>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-warning">Request for quote</button>
                                    </div>
                                </form>
                            </div>
                        </div>{" "}
                        {/* col // */}
                    </div>{" "}
                    {/* row // */}
                </section>
                {/* =============== SECTION REQUEST .//END =============== */}
                {/* =============== SECTION ITEMS =============== */}
                <section className="padding-bottom-sm">
                    <header className="section-heading heading-line">
                        <h4 className="title-section text-uppercase">Recommended items</h4>
                    </header>
                    <div className="row row-sm">
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/1.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Just another product name
                                    </a>
                                    <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/2.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Some item name here
                                    </a>
                                    <div className="price mt-1">$280.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/3.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Great product name here
                                    </a>
                                    <div className="price mt-1">$56.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/4.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Just another product name
                                    </a>
                                    <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/5.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Just another product name
                                    </a>
                                    <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/6.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Some item name here
                                    </a>
                                    <div className="price mt-1">$280.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/7.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Great product name here
                                    </a>
                                    <div className="price mt-1">$56.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/9.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Just another product name
                                    </a>
                                    <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/4.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Just another product name
                                    </a>
                                    <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/5.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Just another product name
                                    </a>
                                    <div className="price mt-1">$179.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/6.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Some item name here
                                    </a>
                                    <div className="price mt-1">$280.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                            <div href="#" className="card card-sm card-product-grid">
                                <a href="#" className="img-wrap">
                                    {" "}
                                    <img src="images/items/7.jpg" />{" "}
                                </a>
                                <figcaption className="info-wrap">
                                    <a href="#" className="title">
                                        Great product name here
                                    </a>
                                    <div className="price mt-1">$56.00</div> {/* price-wrap.// */}
                                </figcaption>
                            </div>
                        </div>{" "}
                        {/* col.// */}
                    </div>{" "}
                    {/* row.// */}
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
                                    <p className="small text-uppercase text-muted">Easy Inspection</p>
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
                                <i className="mr-3 fa fa-ellipsis-h" /> <span>More regions</span>{" "}
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
            <section className="section-subscribe padding-y-lg">
                <div className="container">
                    <p className="pb-2 text-center text-white">
                        Delivering the latest product trends and industry news straight to your
                        inbox
                    </p>
                    <div className="row justify-content-md-center">
                        <div className="col-lg-5 col-md-6">
                            <form className="form-row">
                                <div className="col-md-8 col-7">
                                    <input
                                        className="form-control border-0"
                                        placeholder="Your Email"
                                        type="email"
                                    />
                                </div>{" "}
                                {/* col.// */}
                                <div className="col-md-4 col-5">
                                    <button type="submit" className="btn btn-block btn-warning">
                                        {" "}
                                        <i className="fa fa-envelope" /> Subscribe{" "}
                                    </button>
                                </div>{" "}
                                {/* col.// */}
                            </form>
                            <small className="form-text text-white-50">
                                We’ll never share your email address with a third-party.{" "}
                            </small>
                        </div>{" "}
                        {/* col-md-6.// */}
                    </div>
                </div>
            </section>
        </>
    </>
}
export default Homepage;