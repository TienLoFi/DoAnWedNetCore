import "../../../index.css";
import { Link, useParams } from "react-router-dom";
import { urlImageBE, urlImageFE } from "../../../config";
import { FiCpu, FiSmartphone, FiHardDrive } from "react-icons/fi";
import { GrMemory } from "react-icons/gr";
import { FaCartPlus, FaEye } from "react-icons/fa6";
import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductServices";
function Productitem(props) {
  const { id } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const iconStyle = {
    fontSize: "11px", // Adjust the font size as needed
    opacity: "0.8", // Adjust the opacity for a faded appearance
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ProductService.getById(id);
        setProduct(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const formatCurrency = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const shortenedName =
    props.product.name.length > 20
      ? `${props.product.name.substring(0, 20)}...`
      : props.product.name;
      const addToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = existingCart.find((item) => item.id === product.id);
    
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          const newProduct = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: quantity,
          };
          existingCart.push(newProduct);
        }
    
        localStorage.setItem("cart", JSON.stringify(existingCart));
        alert("Product added to cart!");
      };
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
      <div className="card card-sm card-product-grid">
      <Link
      to={"/chi-tiet-san-pham/" + props.product.id}
      className="m-2"
      style={{ display: 'inline-block', overflow: 'hidden' }}
    >
      <img
        src={urlImageBE + "products/" + props.product.image}
        className="img-fluid"
        alt="hinh san pham"
        style={{
          transition: "transform 0.5s ease-in-out", 
          cursor: "pointer",
          ...(isHovered && { transform: "scale(1.1)" }) // Apply scale transformation on hover
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </Link>
        <figcaption className="info-wrap">
          <Link
            to={"/chi-tiet-san-pham/" + props.product.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            {shortenedName}
          </Link>{" "}
          <br />
          <div className="cdt-product__config__param">
            <span data-title="CPU" style={iconStyle}>
              <FiCpu /> Snapdragon 8 Gen 2{" "}
            </span>
            <span data-title="Màn hình" style={iconStyle}>
              <FiSmartphone /> 6.7 inch{" "}
            </span>
            <span data-title="RAM" style={iconStyle}>
              <GrMemory /> 8 GB{" "}
            </span>{" "}
            {/* Replaced FiMemory with GrMemory */}
            <span data-title="Bộ nhớ trong" style={iconStyle}>
              <FiHardDrive /> 256 GB
            </span>{" "}
            {/* Used FiHardDrive */}
          </div>
          <div className="d-flex align-items-center">
            <div
              className="price mt-1 text-white mr-2"
              style={{
                border: "1px solid red",
                borderRadius: "30px",
                padding: "3px",
                backgroundColor: "#FF5500",
              }}
            >
              <strong>{formatCurrency(props.product.price)}</strong>
            </div>{" "}
            
            <span
              className="sale-price"
              style={{ textDecoration: "line-through" }}
            >
              -1.7000.000{" "}
            </span>{" "}
            <div className="ml-auto">
   
          
             <Link
      to={"/chi-tiet-san-pham/" + props.product.id}
      className="m-2 "
    >

        <FaEye
                className="ml-2"
                style={{
                  fontSize: "20px",
                  verticalAlign: "middle",
                  color: "green",
                  cursor:"pointer"
                }}
              /></Link>
             
            </div>
          </div>
          {/* price-wrap.// */}
        </figcaption>
      </div>{" "}
    </div>
  );
}
export default Productitem;
