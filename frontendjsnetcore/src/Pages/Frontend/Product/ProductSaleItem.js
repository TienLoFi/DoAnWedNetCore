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
      const discountAmount = props.product.price * 0.1; // Giảm 10%

      // Tính giá mới sau khi giảm
      const discountedPrice = props.product.price - discountAmount;
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3">
      <div className="card card-sm card-product-grid">
        <Link
          to={"/chi-tiet-san-pham/" + props.product.id}
          className="m-2"
          style={{ display: "inline-block", overflow: "hidden" }}
        >
          <img
            src={urlImageBE + "products/" + props.product.image}
            className="img-fluid"
            alt="hinh san pham"
            style={{
              transition: "transform 0.5s ease-in-out",
              cursor: "pointer",
              ...(isHovered && { transform: "scale(1.1)" }), // Apply scale transformation on hover
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>
        <figcaption className="info-wrap">
          <Link
            to={"/chi-tiet-san-pham/" + props.product.id}
            style={{ textDecoration: "none", color: "black",fontWeight:"700" }}
          >
            {shortenedName}
          </Link>{" "}
          <br />
          <div className="d-flex align-items-center">
              <div className="price mt-1 text-red mr-2 ml-3">
                <p style={{ fontWeight: "600" }}>{formatCurrency(discountedPrice)}</p>
              </div>{" "}
            <div
              className="price mt-1 text-red mr-2"
              style={{
                border: "1px solid red",
                borderRadius: "20px",
                padding: "3px",
                backgroundColor: "red",
              }}
            >
              <p  style={{ fontWeight: "600" }}>-10%</p>
            </div>{" "}
          </div>
          <p style={{ textDecoration: "line-through" }}>{formatCurrency(props.product.price)}</p>
          <div className="ml-auto mt-2">
            <b
              className="btn-danger"
              style={{
                borderRadius: "5px", // Adjust the border radius as needed
                fontSize: "0.75rem", // Adjust the font size to make it smaller
                padding: "0.25rem 0.5rem", // Adjust the padding as needed
              }}
            >
              Mua Giá Sốc
            </b>
          </div>
          {/* price-wrap.// */}
        </figcaption>
      </div>{" "}
    </div>
  );
}
export default Productitem;
