import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductServices";
import { urlImageFE } from "../../config";
function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  // Calculate the total quantity of products in the cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  useEffect(() => {
    // Function to check token status

    const token = Cookies.get("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userUsername = decoded.UserName;
        setUsername(userUsername);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  }, []);

  const Logout = () => {
    // Xóa token từ cookies
    Cookies.remove("jwtToken");

    // Chuyển hướng đến trang đăng nhập
    navigate("/login");
    window.location.reload();
  };
  //
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
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [keyword]);

  const handleInputChange = async (e) => {
    const inputKeyword = e.target.value;
    setKeyword(inputKeyword);
  };

  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleLogout = () => {
    // Your logout logic here
    setUsername("");
  };
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-3 col-md-12">
              <a href="/" className="brand-wrap">
                <img className="logo" src="images/logo.png" />
              </a>{" "}
              {/* brand-wrap.// */}
            </div>
            <div className="col-xl-6 col-lg-5 col-md-6">
           
               <form action="#" className="search-header">
                <div className="input-group w-100">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm"
                    value={keyword}
                    onChange={handleInputChange}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary mt-2" type="submit">
                      <i className="fa fa-search" /> Tìm kiếm
                    </button>
                  </div>
                </div>
              </form>
              {/* search-wrap .end// */}
            </div>{" "}
            {/* col.// */}
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="widgets-wrap float-md-right">
                <div className="widget-header mr-3">
                  {username ? (
                    <div
                      className="widget-view"
                      onMouseEnter={() => setIsMouseOver(true)}
                      onMouseLeave={() => setIsMouseOver(false)}
                      style={{ position: "relative" }}
                    >
                      <div className="icon-area">
                        <i class="fa fa-user"></i>
                      </div>
                      <small>
                        <b className="text "> {username}</b>
                      </small>{" "}
                      {/* Nút Logout */}
                      {isMouseOver && (
                        <div
                          className="logout-menu"
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "-25px",
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            padding: "5px",
                            zIndex: "1000",
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "100px",
                          }}
                        >
                          <Link
                            to="/change-account"
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              padding: "4px",
                              borderBottom: "1px solid #ccc",
                              width: "100px",
                              padding: "4px",
                              cursor: "pointer", // Thêm con trỏ
                              transition: "color 0.3s", // Hiệu ứng chuyển màu
                              border: "none", // Bỏ border
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "#FF5500")
                            } // Thay đổi màu khi di chuột vào
                            onMouseLeave={(e) =>
                              (e.target.style.color = "inherit")
                            }
                          >
                            Đổi Tài Khoản
                          </Link>
                          <Link
                            onClick={Logout}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              padding: "4px",
                              cursor: "pointer", // Thêm con trỏ
                              transition: "color 0.3s", // Hiệu ứng chuyển màu
                              border: "none", // Bỏ border
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "#FF5500")
                            } // Thay đổi màu khi di chuột vào
                            onMouseLeave={(e) =>
                              (e.target.style.color = "inherit")
                            } // Thay đổi màu khi di chuột ra
                          >
                           Đăng Xuất
                          </Link>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="d-flex mr-3">
                   
                   <Link to="/login">
                          <b>Đăng Nhập</b>
                        </Link>
                      

                        <button className="ml-2" style={{backgroundColor:"#FF5500",border:"none",borderRadius:"10px" }}>
                      
                          <Link to="register"> <b>Đăng Kí</b></Link>
                        </button>
                    
                    
                        
                    </div>
                  )}{" "}
                </div>

                <div className="widget-header mr-3">
                  <a href="#" className="widget-view">
                    <div className="icon-area">
                      <i className="fa fa-comment-dots" />
                      <span className="notify">1</span>
                    </div>
                    <small className="text"> Tin Nhắn</small>
                  </a>
                </div>
                <div className="widget-header mr-3">
                  <a href="#" className="widget-view">
                    <div className="icon-area">
                      <i className="fa fa-store" />
                    </div>
                    <small className="text">Đơn Hàng</small>
                  </a>
                </div>
                <div className="widget-header">
                  <Link to="/gio-hang" className="widget-view">
                    <div className="icon-area">
                      <i className="fa fa-shopping-cart" />
                    </div>
                    <span className="notify">{totalQuantity}</span>

                    <small className="text"> Giỏ Hàng </small>
                  </Link>
                </div>
              </div>{" "}
              {/* widgets-wrap.// */}
            </div>{" "}
            {/* col.// */}
          </div>{" "}
          {/* row.// */}
        </div>{" "}
        {/* container.// */}
      </section>{" "}
      {/* header-main .// */}
      <nav className="navbar navbar-main navbar-expand-lg border-bottom">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#main_nav"
            aria-controls="main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
          
                  href="#"
                >
             
                  <i className="fa fa-bars text-muted mr-2" /> Danh Mục {" "}
                </a>
             
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Ready to ship
                </a>
              </li>
              <li className="na v-item">
                <a className="nav-link" href="#">
                  Trade shows
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sell with us
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  Demo pages
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="page-index.html">
                    Main
                  </a>
                  <a className="dropdown-item" href="page-category.html">
                    All category
                  </a>
                  <a className="dropdown-item" href="page-listing-large.html">
                    Listing list
                  </a>
                  <a className="dropdown-item" href="page-listing-grid.html">
                    Listing grid
                  </a>
                  <a className="dropdown-item" href="page-shopping-cart.html">
                    Shopping cart
                  </a>
                  <a className="dropdown-item" href="page-detail-product.html">
                    Item detail
                  </a>
                  <a className="dropdown-item" href="page-content.html">
                    Info content
                  </a>
                  <a className="dropdown-item" href="page-user-login.html">
                    Page login
                  </a>
                  <a className="dropdown-item" href="page-user-register.html">
                    Page register
                  </a>
                  <a className="dropdown-item disabled text-muted" href="#">
                    More components
                  </a>
                </div>
              </li>
            </ul>
            <ul className="navbar-nav ml-md-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Get the app
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="http://example.com"
                  data-toggle="dropdown"
                >
                  English
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    Russian
                  </a>
                  <a className="dropdown-item" href="#">
                    French
                  </a>
                  <a className="dropdown-item" href="#">
                    Spanish
                  </a>
                  <a className="dropdown-item" href="#">
                    Chinese
                  </a>
                </div>
              </li>
            </ul>
          </div>{" "}
          {/* collapse .// */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
