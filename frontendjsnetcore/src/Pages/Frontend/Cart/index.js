import React, { useState, useEffect } from "react";
import { urlImageFE } from "../../../config";
import Checkout from "../Cart/Checkout";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <>
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-8">
              <div className="card ">
                {cart.length === 0 ? (
                  <p className="text-danger">Giỏ hàng của bạn đang trống.<br/>
                  Hãy chọn thêm sản phẩm để mua sắm nhé</p>
                ) : (
                  <table className="table table-borderless table-shopping-cart">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col"></th>
                        <th scope="col" width={120}>
                         Số Lượng
                        </th>
                        <th scope="col" width={120}>
                          Giá
                        </th>
                        <th scope="col" className="text-right" width={200}>
                          {" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <figure className="itemside">
                              <div className="aside">
                                <img
                                  src={urlImageFE + "products/" + item.image}
                                  alt={item.name}
                                  style={{
                                    width: "150px",
                                    height: "auto",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <figcaption className="info">
                                <a href="#" className="title text-dark">
                                 < b>{item.name}</b>
                                </a>
                                <p className="text-muted small">
                               { item.description}
                                </p>
                              </figcaption>
                            </figure>
                          </td>
                          <td>
                            <select
                              className="form-control"
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.id,
                                  parseInt(e.target.value)
                                )
                              }
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                            </select>
                          </td>
                          <td>
                            <div className="price-wrap">
                           
  <var className="price">
    đ{formatCurrency(item.price)}
  </var>


                              <small className="text-muted">
                                {" "}
                                đ315.20 each{" "}
                              </small>
                            </div>{" "}
                          </td>
                          <td className="text-right">
                            <a
                              data-original-title="Save to Wishlist"
                              title=""
                              href=""
                              className="btn btn-danger mr-2"
                              data-toggle="tooltip"
                            >
                              {" "}
                              <i className="fa fa-heart" />
                            </a>
                            <a
                              href="#"
                              className="btn btn-primary"
                              onClick={() => removeItem(item.id)}
                            >
                              {" "}
                              Xóa
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {cart.length > 0 && (
                  <div className="card-body border-top">
                    <div className="btn float-md-right">
                      <Checkout
                        cart={cart}
                        clearCart={clearCart}
                        totalAmount={cart.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )}
                      />
                    </div>
                    <Link to="/" className="btn btn-light">
                      {" "}
                      <i className="fa fa-chevron-left" /> Tiếp Tục Mua Sắm
                    </Link>
                  </div>
                )}
              </div>
              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck" /> Miễn Phí Vận Chuyển Toàn Quốc
                </p>
              </div>
            </main>
            <aside className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name=""
                          placeholder="Nhập Mã Giảm Giá"
                        />
                        <span className="input-group-append">
                          <button className="btn btn-primary mt-1">Áp Dụng</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Tổng Giá:</dt>
                    <dd className="text-right">
                      {" "}
                      đ
                      {cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt> Giảm Giá:</dt>
                    <dd className="text-right">0%</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Tổng Thanh Toán:</dt>
                    <dd className="text-right h5">
                      <strong>
                        đ
                        {cart
                          .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )
                          .toLocaleString()}
                      </strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="images/misc/payments.png" height={26} />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
