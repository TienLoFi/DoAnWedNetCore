import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import { useState } from "react";

function LayoutAdmin() {

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleSubMenu = () => {
      setIsOpen(!isOpen);
    };
  return (
    <>
      <body id="page-top">
        {/*Page Wrapper*/}
        <div id="wrapper">
        <Header />
          <div id="content-wrapper" className="d-flex flex-column">
          <Menu/>
            {/*Main Content*/}
            <div id="content">
              {/*Topbar*/}
              <Outlet />

              {/*End of Topbar*/}

            
            </div>

            {/* Footer */}
            <div className="text-center" style={{ fontSize: 13 }}>
        <p>
          <b>Copyright Phần mềm quản lý bán hàng | Dev By Ngọc Tiến</b>
        </p>
      </div>
      
            {/* End of Footer */}
          </div>
          {/* End of Main Content */}
        </div>
      </body>
      
    </>
  );
}
export default LayoutAdmin;
