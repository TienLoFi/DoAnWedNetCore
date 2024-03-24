import { useEffect, useState } from "react";
import Categoryservice from "../../services/CategoryServices";
import Categoryitem from "./CategoryItem";

function Category() {
    const [categories, Category] = useState([]);
    useEffect(function () {
        (async function () {
            try {
                const result = await Categoryservice.getCategoryByParentId(1);
                Category(result.data);
            }
            catch (error) {
                console.error(error);
            }

        })();
    }, [])
    return (
        <>
            {/*Category Menu Start*/}
            <div className="category-menu category-menu-2">
                <div className="category-heading">
                    <h2 className="categories-toggle"><span>categories</span></h2>
                </div>
                <div id="cate-toggle" className="category-menu-list">
                    <ul>
                        {categories.map(function (category, index) {
                            return <Categoryitem key={index} category={category} />
                        })}


                    </ul>
                </div>
            </div>
            {/*Category Menu End*/}
        </>
    );
}
export default Category;