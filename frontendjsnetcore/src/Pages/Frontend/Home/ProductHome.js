import "../../../index.css";
import { useState, useEffect } from "react";
import ProductService from "../../../services/ProductServices";
import Productitem from "../Product/ProductItem";

function ProductHome(props) {
    const [products, setProduct] = useState([]);
    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ProductService.getProductByCategoryParent(props.category.id, limit, page);
                setProduct(result.data);
            } catch (error) {
                setProduct([]);
            }
        };

        fetchData();
    }, [props.category.id, limit, page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (products.length !== 0) {
        return (
            <div className="container my-3" style={{ background: '#fff' }}>
                <div className="product-category">
                    <h3 className="text-bold pt-4" style={{ textTransform: 'uppercase' }}>{props.category.name}</h3>
                    <div className="row">
                        {products.map((product, index) => (
                            <Productitem product={product} key={index} />
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="pagination justify-content-center m-3">
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(1)}
                                        disabled={page === 1}
                                    >
                                        1
                                    </button>
                                </li>
                                <li className="page-item">
                                    <button className="page-link">...</button>
                                </li>
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={products.length < limit} // Disable nút khi hết sản phẩm
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Trả về một thông báo hoặc hiển thị gì đó khi không có sản phẩm
    return (
        <div className="container my-3" style={{ background: '#fff' }}>
            <div className="product-category">
                <h3 className="text-bold pt-4" style={{ textTransform: 'uppercase' }}>{props.category.name}</h3>
                <p>No products available</p>
            </div>
        </div>
    );
}

export default ProductHome;