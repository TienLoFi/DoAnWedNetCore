import "../../../index.css"
import { Link } from 'react-router-dom';
import { urlImageFE } from '../../../config';
function Productitem(props) {
    const shortenedName = props.product.name.length > 20 ? `${props.product.name.substring(0, 20)}...` : props.product.name;
    return (    
       
            <div className="col-md-3 pt-4 pb-4">
                <div className="product-item border" style={{ borderTopRightRadius: '15px', background:'white' }}>
                    <Link to={"/chi-tiet-san-pham/"+props.product.id}>
                        <img src={urlImageFE+ props.product.image} className="img-fluid" alt="hinh san pham"/>
                    </Link>
                    <Link to={"/chi-tiet-san-pham/"+props.product.id} style={{textDecoration:'none', color:"black"}}>
                   
                    <h3 className="fs-5 p-2 text-center product-name">{shortenedName}</h3>
                    </Link>
                    <div className="product-price p-2">
                        <div className="row">
                            {/* <div className="col-md-6">
                                <strong className="text-danger fs-4 my-text">{props.product.price_sale.toLocaleString()}&#x20ab;</strong>
                            </div> */}
                            <div className="col-md-6 fs-6 pt-2 float-end">
                                <strong>${props.product.price.toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
    );

}
export default Productitem;