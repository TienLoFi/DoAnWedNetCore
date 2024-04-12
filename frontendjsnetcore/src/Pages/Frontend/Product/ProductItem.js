import "../../../index.css"
import { Link } from 'react-router-dom';
import { urlImageBE, urlImageFE } from '../../../config';
function Productitem(props) {

    const formatCurrency = (price) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);
    };
    const shortenedName = props.product.name.length > 20 ? `${props.product.name.substring(0, 20)}...` : props.product.name;
    return (    
       
        <div className="col-xl-2 col-lg-3 col-md-4 col-6">
        <div href="#" className="card card-sm card-product-grid">
        <Link to={"/chi-tiet-san-pham/"+props.product.id}>
                            <img src={urlImageBE+ "products/" + props.product.image} className="img-fluid" alt="hinh san pham"/>
                        </Link>
          <figcaption className="info-wrap">
          <Link to={"/chi-tiet-san-pham/"+props.product.id} style={{textDecoration:'none', color:"black"}}>
    
          {shortenedName}
          </Link>
            <div className="price mt-1"><strong>    {formatCurrency(props.product.price)}</strong></div>{" "}
            {/* price-wrap.// */}
          </figcaption>
          </div>   </div>
   
    );

}
export default Productitem;