import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../services/CategoryServices";

function ListCategory() {
    const [listCategory, setListCategory] = useState([]);
    useEffect(function () {
        (async function () {
            try {
                const result = await CategoryService.getAllCateMinusParentCate();
                setListCategory(result.data);
            }
            catch (error) {
                console.error(error);
            }

        })();
    }, [])
    return (
        <div class="filter-sub-area pt-sm-10 pt-xs-10">
            <h5 class="filter-sub-titel">Categories</h5>
            <div class="categori-checkbox">
                <form action="#">
                    <ul>
                        {listCategory.map(function (cat, index) {
                            return <li key={index}>
                                <input type="checkbox" name="product-categori" />
                                <Link to={"/danh-muc-san-pham/"+cat.id}>{cat.name}</Link>

                            </li>
                        })}


                    </ul>
                </form>
            </div>
        </div>
        
    );
}
export default ListCategory;
