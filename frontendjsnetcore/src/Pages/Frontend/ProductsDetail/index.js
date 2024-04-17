import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import { urlImageFE } from "../../../config";
function ProductDetail(props) {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);

  // Function to format currency...
  const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.getById(id);
        setProduct(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      const newProduct = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: quantity,
      };
      existingCart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Product added to cart!");
  };
  return (
    <>
      <section className="py-3 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Home</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Category name</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Sub category</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Items
            </li>
          </ol>
        </div>
      </section>
      {/* ========================= SECTION CONTENT ========================= */}
      <section className="section-content bg-white padding-y">
        <div className="container">
          {/* ============================ ITEM DETAIL ======================== */}
          <div className="row">
            <aside className="col-md-6">
              <div className="card">
                <article className="gallery-wrap">
                  <div className="img-big-wrap">
                    <div>
                      {" "}
                      <a href="#">
                        <img
                          src={urlImageFE + "products/" + product.image}
                          className="img-fluid"
                          alt="hinh san pham"
                        />
                      </a>
                    </div>
                  </div>{" "}
                  {/* slider-product.// */}
                  <div className="thumbs-wrap">
                    <a href="#" className="item-thumb">
                      {" "}
                      <img src="../../../../public/imagesitems/15.jpg" />
                    </a>
                    <a href="#" className="item-thumb">
                      {" "}
                      <img src="../../../../public/imagesitems/15-1.jpg" />
                    </a>
                    <a href="#" className="item-thumb">
                      {" "}
                      <img src="../../../../public/imagesitems/15-2.jpg" />
                    </a>
                    <a href="#" className="item-thumb">
                      {" "}
                      <img src="../../../../public/imagesitems/15-1.jpg" />
                    </a>
                  </div>{" "}
                  {/* slider-nav.// */}
                </article>{" "}
                {/* gallery-wrap .end// */}
              </div>{" "}
              {/* card.// */}
            </aside>
            <main className="col-md-6">
              <article className="product-info-aside">
                <h2 className="title mt-3">{product.name} </h2>
                <div className="rating-wrap my-3">
                  <ul className="rating-stars">
                    <li style={{ width: "80%" }} className="stars-active">
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
                  <small className="label-rating text-muted">132 reviews</small>
                  <small className="label-rating text-success">
                    {" "}
                    <i className="fa fa-clipboard-check" /> 154 orders{" "}
                  </small>
                </div>{" "}
                {/* rating-wrap.// */}
                <div className="mb-3">
                  <var className="price h4">
                    {" "}
                    {formatCurrency(product.price)}
                  </var>
                </div>{" "}
                {/* price-detail-wrap .// */}
                <dl className="row">
                  <dt className="col-sm-3">Manufacturer</dt>
                  <dd className="col-sm-9">
                    <a href="#">Great textile Ltd.</a>
                  </dd>
                  <dt className="col-sm-3">Article number</dt>
                  <dd className="col-sm-9">596 065</dd>
                  <dt className="col-sm-3">Guarantee</dt>
                  <dd className="col-sm-9">2 year</dd>
                  <dt className="col-sm-3">Delivery time</dt>
                  <dd className="col-sm-9">3-4 days</dd>
                  <dt className="col-sm-3">Availabilty</dt>
                  <dd className="col-sm-9">in Stock</dd>
                </dl>
                <div className="form-row mt-4">
  <div className="form-group col-md-3">
    <div className="input-group mb-2 input-spinner">
      <div className="input-group-prepend">
        <button
          className="btn btn-light"
          type="button"
          id="button-plus"
          onClick={() => setQuantity(Math.max(quantity + 1, 1))}
        >
          +
        </button>
      </div>
      <input
        type="text"
        className="form-control"
        value={quantity}
        readOnly
      />
      <div className="input-group-append">
        <button
          className="btn btn-light"
          type="button"
          id="button-minus"
          onClick={() => setQuantity(Math.max(quantity - 1, 1))}
        >
          −
        </button>
      </div>
    </div>
  </div>
  <div className="form-group col-md d-flex justify-content-between align-items-center">
    <a href="#" className="btn btn-primary" onClick={addToCart}>
      <i className="fas fa-shopping-cart" />{" "}
      <span className="text">Add to cart</span>
    </a>
   
  </div>
</div>

                {/* row.// */}
              </article>{" "}
              {/* product-info-aside .// */}
            </main>{" "}
            {/* col.// */}
          </div>{" "}
          {/* row.// */}
          {/* ================ ITEM DETAIL END .// ================= */}
        </div>{" "}
        {/* container .//  */}
      </section>
      {/* ========================= SECTION CONTENT END// ========================= */}
      {/* ========================= SECTION  ========================= */}
      <section className="section-name padding-y bg">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h5 className="title-description">Mô Tả Sản Phẩm</h5>
              <p>{product.description}</p>
              <ul className="list-check">
                <li>Material: Stainless steel</li>
                <li>Weight: 82kg</li>
                <li>built-in drip tray</li>
                <li>Open base for pots and pans</li>
                <li>On request available in propane execution</li>
              </ul>
              <h5 className="title-description">Thông số kỹ thuật</h5>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    {" "}
                    <th colSpan={2}>Thông số cơ bản</th>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Loại năng lượng</td>
                    <td>Đá lửa</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Số khu vực</td>
                    <td>2</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Kết nối tự động </td>{" "}
                    <td>
                      {" "}
                      <i className="fa fa-check text-success" /> Có{" "}
                    </td>
                  </tr>
                  <tr>
                    {" "}
                    <th colSpan={2}>Kích thước</th>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Rộng</td>
                    <td>500mm</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Sâu</td>
                    <td>400mm</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Cao </td>
                    <td>700mm</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <th colSpan={2}>Chất liệu</th>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Bề ngoài</td>
                    <td>Thép không gỉ</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Bên trong</td>
                    <td>Sắt</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <th colSpan={2}>Kết nối</th>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Loại nhiên liệu</td>
                    <td>Gas</td>{" "}
                  </tr>
                  <tr>
                    {" "}
                    <td>Công suất gas kết nối</td>
                    <td>15 Kw</td>{" "}
                  </tr>
                </tbody>
              </table>
            </div>{" "}
            {/* col.// */}
            <aside className="col-md-4">
              <div className="box">
                <h5 className="title-description">Mô Tả Chi Tiết </h5>
                <p>{product.detail}</p>

                <article className="media mb-3"></article>
              </div>{" "}
              {/* box.// */}
            </aside>{" "}
            {/* col.// */}
          </div>{" "}
          {/* row.// */}
        </div>{" "}
        {/* container .//  */}
      </section>
      {/* ========================= SECTION CONTENT END// ========================= */}
      {/* ========================= SECTION SUBSCRIBE  ========================= */}
    </>
  );
}
export default ProductDetail;
