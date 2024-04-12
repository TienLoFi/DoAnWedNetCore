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
      {/* ========================= SECTION CONTENT ========================= */}
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card ">
                {cart.length === 0 ? (
                  <p className="text-danger">Không Có Sản Phẩm Trong Giỏ Hàng</p>
                ) : (
                  <table className="table table-borderless table-shopping-cart">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col">Product</th>
                        <th scope="col" width={120}>
                          Quantity
                        </th>
                        <th scope="col" width={120}>
                          Price
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
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <figcaption className="info">
                                <a href="#" className="title text-dark">
                                  ${item.price.toLocaleString()}
                                </a>
                                <p className="text-muted small">
                                  Size: XL, Color: blue, <br /> Brand: Gucci
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
                                ${item.price.toLocaleString()}
                              </var>
                              <small className="text-muted">
                                {" "}
                                $315.20 each{" "}
                              </small>
                            </div>{" "}
                            {/* price-wrap .// */}
                          </td>
                          <td className="text-right">
                            <a
                              data-original-title="Save to Wishlist"
                              title=""
                              href=""
                              className="btn btn-light"
                              data-toggle="tooltip"
                            >
                              {" "}
                              <i className="fa fa-heart" />
                            </a>
                            <a
                              href="#"
                              className="btn btn-light"
                              onClick={() => removeItem(item.id)}
                            >
                              {" "}
                              Remove
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
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
              </div>{" "}
              {/* card.// */}
              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck" /> Free Delivery
                  within 1-2 weeks
                </p>
              </div>
            </main>{" "}
            {/* col.// */}
            <aside className="col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Have coupon?</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name=""
                          placeholder="Coupon code"
                        />
                        <span className="input-group-append">
                          <button className="btn btn-primary">Apply</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>{" "}
                {/* card-body.// */}
              </div>{" "}
              {/* card .// */}
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total price:</dt>
                    <dd className="text-right">
                      {" "}
                      $
                      {cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Discount:</dt>
                    <dd className="text-right">0%</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-right h5">
                      <strong>
                        $
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
                </div>{" "}
                {/* card-body.// */}
              </div>{" "}
              {/* card .// */}
            </aside>{" "}
            {/* col.// */}
          </div>
        </div>{" "}
        {/* container .//  */}
      </section>
      {/* ========================= SECTION CONTENT END// ========================= */}
      {/* ========================= SECTION  ========================= */}
      <section className="section-name border-top padding-y">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {/* container // */}
      </section>
      {/* ========================= SECTION  END// ========================= */}
    </>
  );
};

export default Cart;
