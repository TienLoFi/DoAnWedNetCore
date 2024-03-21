import RouterSite from './Router';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutSite from './Layout/LayoutSite'
//import LayoutAdmin from './layouts/LayoutAdmin';


function App() {
  return (
    <BrowserRouter>
      <Routes>  
      <Route path='/' element={<LayoutSite/>}>
          {RouterSite.RouterPublic.map(function(route,index){
            const Page=route.conponent;
            return <Route key={index} path={route.path} element={<Page/>} />
          })}
        </Route>  
        {/* <Route path="/dang-nhap" element={<Login/>}></Route> */}
        {/* <Route path="/admin" element={<LayoutAdmin />}>
          {RouterApp.RouterPrivate.map(function(route, index) {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page/>} />
          })}
7894
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
