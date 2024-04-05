import { Link, useNavigate } from "react-router-dom";
import { FaSave } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { useState, useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import BrandService from "../../../services/BrandService";
// import Categoryservice from "../../../services/CategoryServices";
// import BrandService from "../../../services/BrandServices";
function ProductCreate() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [id, setCategory_Id] = useState(0);
    const [brand_Id, setBrand_Id] = useState(0);
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState(0);

    async function ProductStore(event) {
        event.preventDefault();
        const image = document.querySelector("#image");
        var product = new FormData();
        product.append("name", name);
        product.append("category_Id", id);
        product.append("brand_Id", brand_Id);
        product.append("price", price);
        product.append("qty", qty);
        product.append("description", description);
        product.append("detail", detail);
        product.append("status", status);
        product.append("image", image.files[0]);
        ProductService.create(product)
            .then(function (result) {
                alert('Thêm thành công');
                navigate('/admin/product', { replace: true });
            });
    }

    // const [categories, setCategories] = useState([]);
    // useEffect(function () {
    //     (async function () {
    //         await Categoryservice.getCategoryByParentId(1).then(function (result) {
    //             setCategories(result.data);
    //         });
    //     })();
    // }, []);

    // const [categoriesChild, setCategoriesChild] = useState([]);
    // useEffect(function () {
    //     (async function () {
    //         await Categoryservice.getAll().then(function (result) {
    //             setCategoriesChild(result.data);
    //         });
    //     })();
    // }, []);

    const [brands, setBrands] = useState([]);
    useEffect(function () {
        (async function () {
            await BrandService.getAll().then(function (result) {
                setBrands(result.data);
            });
        })();
    }, []);

    return (

    
        <>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">  <Link to="/admin/product" className="btn btn-info btn-success"><BiArrowBack />Quay Về </Link></h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard v1</li>
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}
          <section className="content">
            
        <form method="post" onSubmit={ProductStore}>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6">
                            <strong className="text-danger">
                                Thêm sản phẩm
                            </strong>
                        </div>
                     
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label htmlFor="">Tên thương hiệu</label>
                                <select name="brand_Id" value={brand_Id} onChange={(e)=>setBrand_Id(e.target.value)} 
                                className="form-control">                                  
                                    {brands.map(function(br,index){
                                        return(<option key={index} value={br.id}>{br.name}</option>);
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Tên danh mục</label>
                                <select
                                    name="category_Id"
                                    value={id}
                                    onChange={(e) => setCategory_Id(e.target.value)}
                                    className="form-control"
                                    required
                                >
                                    {/* {categories.map(function (cate, index) {
                                        return (
                                            <optgroup key={index} label={cate.name}>
                                                {categoriesChild.map(function (cateChild, indexChild) {
                                                        if (cateChild.parent_Id === cate.id) {
                                                            return (
                                                                <option key={indexChild} value={cateChild.id}>
                                                                    {cateChild.name}
                                                                </option>
                                                            );
                                                        }

                                                    })}
                                            </optgroup>
                                        );
                                    })} */}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="">Tên sản phẩm</label>
                                <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Mô tả</label>
                                <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Chi tiết</label>
                                <input type="text" name="detail" onChange={(e) => setDetail(e.target.value)} className="form-control" required></input>
                            </div>

                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="">Số lượng</label>
                                <input type="number" name="qty" onChange={(e) => setQty(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Giá</label>
                                <input type="number" name="price" onChange={(e) => setPrice(e.target.value)} className="form-control" required></input>
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="">Sắp xếp</label>
                                <select name="sort_order" value={sort_order} onChange={(e)=>setSort_order(e.target.value)} 
                                className="form-control">
                                    <option value="0">None</option>
                                    {products.map(function(br,index){
                                        return(<option key={index} value={br.sort_order+1}>Sau:{br.name}</option>);
                                    })}
                                </select>
                            </div>
                             */}
                            <div className="mb-3">
                                <label htmlFor="image">Hình</label>
                                <input type="file" id="image" name="image" className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Trạng thái</label>
                                <select name="status" onChange={(e) => setStatus(e.target.value)} className="form-control">
                                    <option value="1">Xuất bản</option>
                                    <option value="2">Chưa xuất bản</option>
                                </select>
                            </div>
                       
                          
                    
                   
                        </div>
                        <button type="submit" className="btn btn-sm btn-success p-2 w-100 "><FaSave /> Thêm</button>    
                    </div>
                </div>
            </div>
        </form>
            {/* /.container-fluid */}
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
      </>

    );
}
export default ProductCreate;