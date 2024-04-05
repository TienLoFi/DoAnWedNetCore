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
            <footer className="main-footer">
              <strong>
                Copyright © 2014-2021{" "}
                <a href="https://adminlte.io">AdminLTE.io</a>.
              </strong>
              All rights reserved.
              <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.1.0
              </div>
              
            </footer>
            {/* End of Footer */}
          </div>
          {/* End of Main Content */}
        </div>
      </body>
      
    </>
  );
}
export default LayoutAdmin;
