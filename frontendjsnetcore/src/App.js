import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './Layout/LayoutAdmin';
import RouterSite from './Router';
import LayoutSite from './Layout/LayoutSite';
import Login from './Pages/Frontend/Login';
import Register from './Pages/Frontend/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>    
       
        <Route path='/' element={<LayoutSite/>}>
          {RouterSite.RouterPublic.map(function(route,index){
            const Page=route.conponent;
            return <Route key={index} path={route.path} element={<Page/>} />
          })}
        </Route>
        <Route path='/admin' element={<LayoutAdmin/>}>
          {RouterSite.RouterPrivate.map(function(route,index){
            const Page=route.conponent;
            return <Route key={index} path={route.path} element={<Page/>} />
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;