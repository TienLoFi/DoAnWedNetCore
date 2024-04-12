import React from 'react';
import "../../../src/components/frontend/ProductItem.css"
import { FaShoppingCart,FaTag } from 'react-icons/fa';  
    import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

// Rest of your component code

function ProductItem(props) {
  const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="row row-sm">
      
              <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                <div href="#" className="card card-sm card-product-grid">
                  <a href="#" className="img-wrap">
                    {" "}
                    <img src="images/items/1.jpg" />{" "}
                  </a>
                  <figcaption className="info-wrap">
                    <a href="#" className="title">
                      Just another product name
                    </a>
                    <div className="price mt-1">$179.00</div>{" "}
                    {/* price-wrap.// */}
                  </figcaption>
                  </div>   </div>
              </div>
            
  );
}

export default ProductItem;