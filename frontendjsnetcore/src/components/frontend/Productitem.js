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
<div class="col-md col-6">
<figure class="card-product-grid card-sm">
  <a href="#" class="img-wrap">
    <img src="images/items/4.jpg" />
  </a>
  <div class="text-wrap p-3">
    <a href="#" class="title">

    </a>
    <span class="badge badge-danger"> -5% </span>
  </div>
</figure>
</div>
  );
}

export default ProductItem;