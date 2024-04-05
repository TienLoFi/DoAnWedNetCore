import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { BiArrowBack } from 'react-icons/bi';
import { urlImageBE } from "../../../config";
import Categoryservice from "../../../services/CategoryServices";
import BrandService from "../../../services/BrandService";

function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProducts] = useState([]);
    useEffect(function () {
        (async function () {
            await ProductService.getById(id).then(function (result) {
                setProducts(result.data);
            });
        })();
    }, []);

    async function ProductDelete(id) {
        await ProductService.remove(id).then(function (result) {
            alert('Xóa thành công');
            navigate('/admin/product', { replace: true });
        });

    }

    const [categories, setCategories] = useState([]);
    useEffect(function () {
        (async function () {
            await Categoryservice.getAll().then(function (result) {
                setCategories(result.data);
            });
        })();
    }, []);

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
        
                <table className="table ">
                    <tbody >
                        <tr>
                            <th scope="row">Tên sản phẩm</th>
                            <td>{product.name}</td>
                        </tr>
                        <tr>
                            <th scope="row">Hình ảnh</th>
                            <td><img className='w-25 h-25' src={urlImageBE + "products/" + product.image} alt={product.image}></img></td>
                        </tr>
                        <tr>
                            <th scope="row">Thương hiệu</th>
                            {product.brand_Id !== 0 ? (
                                brands.map(function (br, index) {
                                    if (br.id === product.brand_Id) {
                                        return (
                                            <td key={index}>{br.name}</td>
                                        );
                                    }
                                    return null;
                                })
                            ) : 
                            (
                                <td>Sản phẩm chưa có thương hiệu nào</td>
                            )}
                        </tr>

                        <tr>
                            <th scope="row">Danh mục</th>
                            {product.category_Id !== 0 ? (
                                categories.map(function (cate, index) {
                                    if (cate.id === product.category_Id) {
                                        return (
                                            <td key={index}>{cate.name}</td>
                                        );
                                    }
                                    return null;
                                })
                            ) : 
                            (
                                <td>Sản phẩm chưa có danh mục</td>
                            )}
                        </tr>
                        <tr>
                            <th scope="row">Giá</th>
                            <td>{product.price}</td>
                        </tr>
                        <tr>
                            <th scope="row">Số lượng</th>
                            <td>{product.qty}</td>
                        </tr>
                        <tr>
                            <th scope="row">Mô tả</th>
                            <td>{product.description}</td>
                        </tr>
                        <tr>
                            <th scope="row">Chi tiết sản phẩm</th>
                            <td>{product.detail}</td>
                        </tr>
                        <tr>
                            <th scope="row">Ngày tạo</th>
                            <td>{product.createdAt}</td>
                        </tr>

                        <tr>
                            <th scope="row">Tình trạng</th>
                            <td>{product.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}</td>

                        </tr>

                    </tbody>
                </table>
          
     {/* /.container-fluid */}
     </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
      </>

    );
}
export default ProductDetail;