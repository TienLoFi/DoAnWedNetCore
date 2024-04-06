import { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeItem, setActiveItem] = useState("");
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <aside className="app-sidebar">
    <div className="app-sidebar__user">
      <img
        className="app-sidebar__user-avatar"
        src="./MixiGamingLogo.png"
        width="100%"
        alt="User Image"
      />
      <div>
        <p className="app-sidebar__user-name">
          <b>Ngọc Tiến</b>
        </p>
        <p className="app-sidebar__user-designation">Chào mừng bạn trở lại</p>
      </div>
    </div>
    <hr />
    <ul className="app-menu">
      <li>
        <a className="app-menu__item haha" href="phan-mem-ban-hang.html">
          <i className="app-menu__icon bx bx-cart-alt" />
          <span className="app-menu__label">POS Bán Hàng</span>
        </a>
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
        <a className="app-menu__item" href="#">
          <i className="app-menu__icon bx bx-user-voice" />
          <span className="app-menu__label">Quản lý khách hàng</span>
        </a>
      </li>
      <li>
        <Link className="app-menu__item" to="/admin/product">
          <i className="app-menu__icon bx bx-purchase-tag-alt" />
          <span className="app-menu__label">Quản lý sản phẩm</span>
        </Link>
      </li>
      <li>
        <a className="app-menu__item" href="table-data-oder.html">
          <i className="app-menu__icon bx bx-task" />
          <span className="app-menu__label">Quản lý đơn hàng</span>
        </a>
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
