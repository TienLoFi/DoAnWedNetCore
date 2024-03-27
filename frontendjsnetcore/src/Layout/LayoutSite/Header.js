import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProductService from '../../services/ProductServices';
import { urlImageFE } from '../../config';
function Header() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [cartItemCount, setCartItemCount] = useState(0);

useEffect(() => {
  // Function to check token status

  const token = Cookies.get('jwtToken');
  if (token) {
      try {
          const decoded = jwtDecode(token);
          const userUsername = decoded.UserName;
          setUsername(userUsername);

      } catch (error) {
          console.error('Error decoding JWT token:', error);
      }
  }

}, []);

const Logout = () => {
  // Xóa token từ cookies
  Cookies.remove("jwtToken");
  
  // Chuyển hướng đến trang đăng nhập
  navigate('/login');
  window.location.reload();
};


  return (
    <header className="section-header">
        <section className="header-main border-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-3 col-md-12">
                <a href="/" className="brand-wrap">
                  <img className="logo" src="images/logo.png" />
                </a> {/* brand-wrap.// */}  
              </div>
              <div className="col-xl-6 col-lg-5 col-md-6">
                <form action="#" className="search-header">
                  <div className="input-group w-100">
                    <select className="custom-select border-right" name="category_name">
                      <option value>All type</option><option value="codex">Special</option>
                      <option value="comments">Only best</option>
                      <option value="content">Latest</option>
                    </select>
                    <input type="text" className="form-control" placeholder="Search" />
                    <div className="input-group-append">
                      <button className="btn btn-primary" type="submit">
                        <i className="fa fa-search" /> Search
                      </button>
                    </div>
                  </div>
                </form> {/* search-wrap .end// */}
              </div> {/* col.// */}
              <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="widgets-wrap float-md-right">
                  <div className="widget-header mr-3">
                  {username ? (
                    <a href="" className="widget-view">
                   
                      <b className="text"> {username}</b> 
                   
                    </a>
                    
                      ) : (
                        
                        <li className='pl-4'>

                            <Link to="/login">
                                <i className="fa fa-user pl-2"></i> Login
                            </Link>

                        </li>
                    )}
                  </div>
                  <button onClick={Logout} className="btn btn-sm btn-outline-secondary">Logout</button> 
                
                  <div className="widget-header mr-3">
                    <a href="#" className="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-comment-dots" />
                        <span className="notify">1</span>
                      </div>
                      <small className="text"> Message </small>
                    </a>
                  </div>
                  <div className="widget-header mr-3">
                    <a href="#" className="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-store" />
                      </div>
                      <small className="text"> Orders </small>
                    </a>
                  </div>
                  <div className="widget-header">
                    <a href="#" className="widget-view">
                      <div className="icon-area">
                        <i className="fa fa-shopping-cart" />
                      </div>
                      <small className="text"> Cart </small>
                    </a>
                  </div>
                </div> {/* widgets-wrap.// */}
              </div> {/* col.// */}
            </div> {/* row.// */}
          </div> {/* container.// */}
        </section> {/* header-main .// */}
        <nav className="navbar navbar-main navbar-expand-lg border-bottom">
          <div className="container">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main_nav" aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="main_nav">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#"> <i className="fa fa-bars text-muted mr-2" /> Categories </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">Machinery</a>
                    <a className="dropdown-item" href="#">Electronics</a>
                    <a className="dropdown-item" href="#">Home textile</a>
                    <a className="dropdown-item" href="#">Home and kitchen</a>
                    <a className="dropdown-item" href="#">Service and equipment</a>
                    <a className="dropdown-item" href="#">Healthcare items</a>
                    <a className="dropdown-item" href="#">Toys and Hobbies</a>
                  </div>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Ready to ship</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Trade shows</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Services</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Sell with us</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Demo pages</a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="page-index.html">Main</a>
                    <a className="dropdown-item" href="page-category.html">All category</a>
                    <a className="dropdown-item" href="page-listing-large.html">Listing list</a>
                    <a className="dropdown-item" href="page-listing-grid.html">Listing grid</a>
                    <a className="dropdown-item" href="page-shopping-cart.html">Shopping cart</a>
                    <a className="dropdown-item" href="page-detail-product.html">Item detail</a>
                    <a className="dropdown-item" href="page-content.html">Info content</a>
                    <a className="dropdown-item" href="page-user-login.html">Page login</a>
                    <a className="dropdown-item" href="page-user-register.html">Page register</a>
                    <a className="dropdown-item disabled text-muted" href="#">More components</a>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ml-md-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Get the app</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="http://example.com" data-toggle="dropdown">English</a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Russian</a>
                    <a className="dropdown-item" href="#">French</a>
                    <a className="dropdown-item" href="#">Spanish</a>
                    <a className="dropdown-item" href="#">Chinese</a>
                  </div>
                </li>
              </ul>
            </div> {/* collapse .// */}
          </div> 
        </nav>
      </header> 
    );
}

export default Header;
