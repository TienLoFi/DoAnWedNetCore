import React from "react";
import { Link } from "react-router-dom";
import { urlImageFE } from "../../config";

function CategoryItem(props) {
    const product = props.product;

    return (
        <>
            <article className="card card-product-list">
                <div className="row no-gutters">
                    <aside className="col-md-3">
                        <Link to={"/chi-tiet-san-pham/" + product.id} className="img-wrap">
                            <span className="badge badge-danger"> MỚI </span>
                            <img src={urlImageFE + "products/" + product.image} alt="" />
                        </Link>
                    </aside>{" "}
                    {/* col.// */}
                    <div className="col-md-6">
                        <div className="info-main">
                            <Link to={"/chi-tiet-san-pham/" + product.id} className="h5 title">
                                {product.name}
                            </Link>
                            <div className="rating-wrap mb-2">
                                <ul className="rating-stars">
                                    <li style={{ width: "100%" }} className="stars-active">
                                        <i className="fa fa-star" /> <i className="fa fa-star" />
                                        <i className="fa fa-star" /> <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </li>
                                    <li>
                                        <i className="fa fa-star" /> <i className="fa fa-star" />
                                        <i className="fa fa-star" /> <i className="fa fa-star" />
                                        <i className="fa fa-star" />
                                    </li>
                                </ul>
                                <div className="label-rating">9/10</div>
                            </div>{" "}
                            {/* rating-wrap.// */}
                            <p className="mb-3">
                                <span className="tag">
                                    {" "}
                                    <i className="fa fa-check" /> Xác nhận
                                </span>
                                <span className="tag"> 5 Năm </span>
                                <span className="tag"> 112 đánh giá </span>
                               
                            </p>
                            <p>
                                {" "}
                                {product.description}
                            </p>
                        </div>{" "}
                        {/* info-main.// */}
                    </div>{" "}
                    {/* col.// */}
                    <aside className="col-sm-3">
                        <div className="info-aside">
                            <div className="price-wrap">
                                <span className="h5 price">${product.price}</span>
                                <small className="text-muted">/mỗi sản phẩm</small>
                            </div>{" "}
                            {/* price-wrap.// */}
                            <small className="text-warning">Vận chuyển trả phí</small>
                            <p className="text-muted mt-3">Công ty vải Grand</p>
                            <p className="mt-3">
                                <a href="#" className="btn btn-outline-primary">
                                    {" "}
                                    <i className="fa fa-envelope" /> Liên hệ nhà cung cấp{" "}
                                </a>
                                <a href="#" className="btn btn-light">
                                    <i className="fa fa-heart" /> Lưu{" "}
                                </a>
                            </p>
                            <label className="custom-control mt-3 custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label">Thêm vào so sánh</div>
                            </label>
                        </div>{" "}
                        {/* info-aside.// */}
                    </aside>{" "}
                    {/* col.// */}
                </div>{" "}
                {/* row.// */}
            </article>{" "}
        </>
    );
}

export default CategoryItem;
