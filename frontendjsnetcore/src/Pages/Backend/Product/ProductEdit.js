import { Link, useNavigate, useParams } from "react-router-dom";
import { FaSave } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { useState, useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import Categoryservice from "../../../services/CategoryServices";
import BrandService from "../../../services/BrandService";
function ProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category_Id, setCategory_Id] = useState(0);
    const [brand_Id, setBrand_Id] = useState(0);
    const [price, setPrice] = useState(0);
    const [qty, setQty] = useState(0);
    const [description, setDescription] = useState('');
    const [detail, setDetail] = useState('');
    const [status, setStatus] = useState(0);


    const [products, setProducts] = useState([]);
    useEffect(function () {
        (async function () {
            await ProductService.getAll().then(function (result) {
                setProducts(result.data);
            });
        })();
    }, []);

    async function ProductUpdate(event) {

        event.preventDefault();
        const image = document.querySelector("#image")
        var product = new FormData();
        product.append("name", name);
        product.append("category_Id", category_Id);
        product.append("brand_Id", brand_Id);
        product.append("price", price);
        product.append("qty", qty);
        product.append("description", description);
        product.append("detail", detail);
        product.append("status", status);
        if (image.files.length === 0) {
            product.append('image', "")
        }
        else {
            product.append("image", image.files[0])
        }
        await ProductService.update(product, id)
            .then(function () {
                alert('Cập nhật thành công');
                navigate('/admin/product', { replace: true });
            });
    }

    useEffect(function () {
        (async function () {
            await ProductService.getById(id).then(function (result) {
                const tpm = result.data;
                setName(tpm.name);
                setBrand_Id(tpm.brand_Id);
                setCategory_Id(tpm.category_Id);
                setDetail(tpm.detail);
                setDescription(tpm.description);
                setPrice(tpm.price);
                setQty(tpm.qty);
                setStatus(tpm.status);

            });
        })();
    }, []);

    const [categories, setCategories] = useState([]);
    useEffect(function () {
        (async function () {
            await Categoryservice.getCategoryByParentId(1).then(function (result) {
                setCategories(result.data);
            });
        })();
    }, []);

    const [categoriesChild, setCategoriesChild] = useState([]);
    useEffect(function () {
        (async function () {
            await Categoryservice.getAll().then(function (result) {
                setCategoriesChild(result.data);
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
        <form method="post" onSubmit={ProductUpdate}>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6">
                            <strong className="text-danger">
                                Cập nhật sản phẩm
                            </strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link to="/admin/product" className="btn btn-info btn-success"><BiArrowBack />Quay về danh sách</Link>
                            <button type="submit" className="btn btn-sm btn-success p-2"><FaSave />Lưu</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">

                                <label htmlFor="">Tên thương hiệu</label>
                                <select name="brand_Id" value={brand_Id} onChange={(e) => setBrand_Id(e.target.value)}
                                    className="form-control">
                                    {brands.map(function (br, index) {
                                        return (<option key={index} value={br.id}>{br.name}</option>);
                                    })}
                                </select>                            
                                </div>

                            <div className="mb-3">
                                <label htmlFor="">Tên danh mục</label>
                                <select
                                    name="category_Id"
                                    value={category_Id}
                                    onChange={(e) => setCategory_Id(e.target.value)}
                                    className="form-control"
                                    required
                                >
                                    {categories.map(function (cate, index) {
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
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Tên sản phẩm</label>
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Mô tả</label>
                                <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Chi tiết</label>
                                <input type="text" name="detail" value={detail} onChange={(e) => setDetail(e.target.value)} className="form-control" required></input>
                            </div>

                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="">Số lượng</label>
                                <input type="number" name="qty" value={qty} onChange={(e) => setQty(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Giá</label>
                                <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" required></input>
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
                                <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" required>
                                    <option value="1">Xuất bản</option>
                                    <option value="2">Chưa xuất bản</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
export default ProductEdit;