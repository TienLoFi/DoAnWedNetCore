import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Categoryservice from "../../services/CategoryService";


function ListCategory() {
    const [categorys, setListCategory] = useState([]);
    useEffect(function () {

        (async function () {
            try {
                const result = await Categoryservice.getAllCateMinusParentCate()
                //CategoryService.CategoryByParentId(0a)
                setListCategory(result)
            } catch (error) {
                console.error(error);
            }

        })();
    }, [])
    return (

        <>
            <h6>CATEGORIES</h6>
            <nav className="nav-home-aside">
                <ul className="menu-category">
                    {categorys.map(function (cat, index) {
                        return (
                            <li key={index}>
                                <Link
                                    to={"/danh-muc-san-pham/" + cat.id}
                                    className="category-link"
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        );
                    })}

                </ul>
            </nav>
        </>
    );
}
export default ListCategory;