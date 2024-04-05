import { Link, useNavigate } from "react-router-dom";
import { FaSave } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { useState, useEffect} from "react";
import BrandService from "../../../services/BrandService";
function BrandCreate(){
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [sort_order,setSort_order]=useState(0);
    const [description,setDescription]=useState('');
    const [status,setStatus]=useState(0);

    async function BrandStore(event)
    {
        event.preventDefault();
        const image =document.querySelector("#image");
        var brand=new FormData();
        brand.append("name",name);
        brand.append("sort_order",sort_order);
        brand.append("description",description);
        brand.append("status",status);
        brand.append("image",image.files[0]);
        BrandService.create(brand)
        .then(function(result){
            alert('Thêm thành công');
            navigate('/admin/brand',{replace:true});
        });     
    }

    const [brands, setBrands]=useState([]);
    useEffect(function(){
        (async function(){
            await BrandService.getAll().then(function(result){
                setBrands(result.data);
            });
        })();
    },[]);
    return(
        <form method="post" onSubmit={BrandStore}>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6">
                            <strong className="text-danger">
                                Thêm thương hiệu
                            </strong>
                        </div>
                        <div className="col-md-6 text-end">
                            <Link  to="/admin/brand" className="btn btn-info btn-success"><BiArrowBack/>Quay về danh sách</Link>
                            <button type="submit" className="btn btn-sm btn-success p-2"><FaSave/>Lưu</button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="mb-3">
                                <label htmlFor="">Tên thương hiệu</label>
                                <input type="text" name="name" onChange={(e)=>setName(e.target.value)} className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Mô tả</label>
                                <input type="text" name="description" onChange={(e)=>setDescription(e.target.value)} className="form-control" required></input>
                            </div>
                           
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <label htmlFor="">Sắp xếp</label>
                                <select name="sort_order" value={sort_order} onChange={(e)=>setSort_order(e.target.value)} 
                                className="form-control">
                                    <option value="0">None</option>
                                    {brands.map(function(br,index){
                                        return(<option key={index} value={br.sort_order+1}>Sau:{br.name}</option>);
                                    })}
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="image">Hình</label>
                                <input type="file" id="image" name="image" className="form-control" required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Trạng thái</label>
                                <select name="status" onChange={(e)=>setStatus(e.target.value)} className="form-control">
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
export default BrandCreate;