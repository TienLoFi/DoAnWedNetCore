import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Categoryservice from "../../services/CategoryServices";

function CategoryItem(props) {
    const rowCategory = props.category;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(function () {
        (async function () {
            try {
                const result = await Categoryservice.getCategoryByParentId(rowCategory.id);
                setCategories(result.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);

            }
        })();
    }, [rowCategory.id]);

    if (loading) {
        return <p>Loading...</p>;
    } else if (categories.length === 0) {
        return (
            <li className="nav-item">
                <Link className="nav-link text-dark" to={`/danh-muc-san-pham/${rowCategory.id}`}>
                    {rowCategory.name}
                </Link>
            </li>
        );
    } else {
        return (
            <li className="nav-item dropdown">
                <Link
                    className="nav-link dropdown-toggle text-dark"
                    to={`/danh-muc-san-pham/${rowCategory.id}`}
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {rowCategory.name}
                </Link>
                <ul className="dropdown-menu">
                    {/* Subcategories */}
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link className="dropdown-item" to={`/danh-muc-san-pham/${rowCategory.id}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>

        );
    }
}

export default CategoryItem;