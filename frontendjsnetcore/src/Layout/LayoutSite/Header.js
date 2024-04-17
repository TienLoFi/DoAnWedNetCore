import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductServices";
import CategoryService from "../../services/CategoryServices";

import { urlImageFE } from "../../config";
import BrandService from "../../services/BrandService";
function Header() {
  const navigate = useNavigate();
  const [listCategory, setListCategory] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [username, setUsername] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [keyword, setKeyword] = useState("");

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

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
  //Listcategory
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

  // Handle input change in search box
  const handleInputChange = (e) => {
    const inputKeyword = e.target.value;
    setKeyword(inputKeyword);
    setShowSearchResults(inputKeyword !== "");
  };

  // Handle click on product link
  const handleProductClick = () => {
    setShowSearchResults(false);
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
                <img className="logo" src="/logo.jpg" />
              </a>{" "}
              {/* brand-wrap.// */}
            </div>
            <div className="col-xl-6 col-lg-5 col-md-6">
              <form action="#" className="search-header">
                <div className="input-group w-100">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập Từ Khóa Cần Tìm"
                    value={keyword}
                    onChange={handleInputChange}
                  />  

                  <div className="input-group-append">
                    <button className="btn btn-primary mt-2" type="submit">
                      <i className="fa fa-search" /> Tìm kiếm
                    </button>
                  </div>
                </div>
             
  {showSearchResults && searchResults.length > 0 && (
    <ul className="list-group position-absolute mt-1 w-100" style={{ zIndex: 1000 }}>
      {searchResults.map((result) => (
        <li key={result.id} className="list-group-item">
          <Link
            to={`/thuong-hieu-san-pham/${result.brand_Id}`}
            className="text-decoration-none text-dark"
            onClick={handleProductClick}
          >
            {result.name}
          </Link>
        </li>
      ))}
    </ul>                )}
                
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

                      <button
                        className="ml-2"
                        style={{
                          backgroundColor: "#FF5500",
                          border: "none",
                          borderRadius: "10px",
                        }}
                      >
                        <Link to="register">
                          {" "}
                          <b>Đăng Kí</b>
                        </Link>
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
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav">
              <li>
                <a className="nav-link text-dark mt-2" href="#">
                  <i /> <b>Thương Hiệu</b>
                </a>
              </li>
              {listBrand.map((brand, index) => (
                <li className="nav-item" key={index}>
           
           <Link
                              to={"/thuong-hieu-san-pham/" + brand.id}
                              className="text-truncate"
                              style={{ cursor: "pointer" }} // Thêm vào đây
                            >
                              
                                   <img
                              width="70"
                              src={urlImageFE + "brands/" + brand.image}
                              className="img-wrap mr-2"
                              alt="img"
                              style={{ transition: "transform 0.2s" }} // Thêm transition vào đây
                              onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.1)"; // Khi hover, phóng to hình ảnh
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)"; // Khi rời chuột, hình ảnh trở lại kích thước ban đầu
                              }}
                            />
                            </Link>
                </li>
              ))}
            </ul>
          
          </div>{" "}
          {/* collapse .// */}
        </div>
      </nav>
    </header>
  );
}

export default Header;
