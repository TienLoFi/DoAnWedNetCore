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
      <>
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">

    <ul className="navbar-nav mt-2 ml-auto">
 

       
        <div className="navbar-search-block mt-2">
          <form className="form-inline">
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-navbar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
               
              </div>
            </div>
          </form>
        </div>
      {/* Messages Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-comments" />
          <span className="badge badge-danger navbar-badge">3</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img
                src="../../dist/img/user1-128x128.jpg"
                alt="User Avatar"
                className="img-size-50 mr-3 img-circle"
              />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Brad Diesel
                  <span className="float-right text-sm text-danger">
                    <i className="fas fa-star" />
                  </span>
                </h3>
                <p className="text-sm">Call me whenever you can...</p>
                <p className="text-sm text-muted">
                  <i className="far fa-clock mr-1" /> 4 Hours Ago
                </p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img
                src="../../dist/img/user8-128x128.jpg"
                alt="User Avatar"
                className="img-size-50 img-circle mr-3"
              />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  John Pierce
                  <span className="float-right text-sm text-muted">
                    <i className="fas fa-star" />
                  </span>
                </h3>
                <p className="text-sm">I got your message bro</p>
                <p className="text-sm text-muted">
                  <i className="far fa-clock mr-1" /> 4 Hours Ago
                </p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img
                src="../../dist/img/user3-128x128.jpg"
                alt="User Avatar"
                className="img-size-50 img-circle mr-3"
              />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Nora Silvester
                  <span className="float-right text-sm text-warning">
                    <i className="fas fa-star" />
                  </span>
                </h3>
                <p className="text-sm">The subject goes here</p>
                <p className="text-sm text-muted">
                  <i className="far fa-clock mr-1" /> 4 Hours Ago
                </p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item dropdown-footer">
            See All Messages
          </a>
        </div>
      </li>
      {/* Notifications Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell" />
          <span className="badge badge-warning navbar-badge">15</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">
            15 Notifications
          </span>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-envelope mr-2" /> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-users mr-2" /> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-file mr-2" /> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item dropdown-footer">
            See All Notifications
          </a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt" />
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          data-widget="control-sidebar"
          data-slide="true"
          href="#"
          role="button"
        >
          <i className="fas fa-th-large" />
        </a>
      </li>
    </ul>
  </nav>
  {/* /.navbar */}
</>

      </header> 
    );
}

export default Header;
