import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ProductService from '../../services/ProductServices';
function Menu() {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);
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

  return (
    <aside className="app-sidebar">
<div className="app-sidebar__user">

  <div>
    <p className="app-sidebar__user-name">
    {username ? (
                    <a href="" className="widget-view">
                      <b className="text-white"> {username}</b>
                    </a>
                  ) : (
                    <li className="pl-4">
                      <Link to="/login">
                        <i className="fa fa-user pl-2"></i> Login
                      </Link>
                    </li>
                  )}
    </p>
    <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
  </div>
</div>

    <hr />
    <ul className="app-menu">
      <li>
        <Link className="app-menu__item haha" to="/">
          <i className="app-menu__icon bx bx-cart-alt" />
          <span className="app-menu__label">POS Bán Hàng</span>
        </Link>
      </li>
      <li>
        <Link className="app-menu__item " to="/admin">
          <i className="app-menu__icon bx bx-tachometer" />
          <span className="app-menu__label">Bảng điều khiển</span>
        </Link>
      </li>
      <li>
        <a className="app-menu__item " href="table-data-table.html">
          <i className="app-menu__icon bx bx-id-card" />{" "}
          <span className="app-menu__label">Quản lý nhân viên</span>
        </a>
      </li>
      <li>
        <Link className="app-menu__item" to="/admin/brand">
          <i className="app-menu__icon bx bx-store" />
          <span className="app-menu__label">Quản lý Thương Hiệu</span>
        </Link>
      </li>
      <li>
        <Link className="app-menu__item" to="/admin/user">
          <i className="app-menu__icon bx bx-user" />
          <span className="app-menu__label">Quản lý Người Dùng</span>
        </Link>
      </li>
      <li>
        <Link className="app-menu__item" to="/admin/category">
          <i className="app-menu__icon bx bx-category" />
          <span className="app-menu__label">Quản lý Danh Mục</span>
        </Link>
      </li>
      <li>
        <Link className="app-menu__item" to="/admin/product">
          <i className="app-menu__icon bx bx-purchase-tag-alt" />
          <span className="app-menu__label">Quản lý sản phẩm</span>
        </Link>
      </li>
      <li>
        <Link className="app-menu__item" to="/admin/order">
          <i className="app-menu__icon bx bx-task" />
          <span className="app-menu__label">Quản lý đơn hàng</span>
        </Link>
      </li>
      <li>
        <a className="app-menu__item" href="table-data-banned.html">
          <i className="app-menu__icon bx bx-run" />
          <span className="app-menu__label">Quản lý nội bộ</span>
        </a>
      </li>
      <li>
        <a className="app-menu__item" href="table-data-money.html">
          <i className="app-menu__icon bx bx-dollar" />
          <span className="app-menu__label">Bảng kê lương</span>
        </a>
      </li>
      <li>
        <a className="app-menu__item" href="quan-ly-bao-cao.html">
          <i className="app-menu__icon bx bx-pie-chart-alt-2" />
          <span className="app-menu__label">Báo cáo doanh thu</span>
        </a>
      </li>
      <li>
        <a className="app-menu__item" href="page-calendar.html">
          <i className="app-menu__icon bx bx-calendar-check" />
          <span className="app-menu__label">Lịch công tác </span>
        </a>
      </li>
      <li>
        <a className="app-menu__item" href="#">
          <i className="app-menu__icon bx bx-cog" />
          <span className="app-menu__label">Cài đặt hệ thống</span>
        </a>
      </li>
    </ul>
  </aside>
  
  );
}
export default Menu;
