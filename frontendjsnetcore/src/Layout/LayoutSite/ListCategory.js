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
            <div class="categori-checkbox">
           
                    <ul>
                        {listCategory.map(function (cat, index) {
                            return <div key={index} style={{ listStyle: 'none' ,marginTop:"10px",marginLeft:"-40px"}}>
                                <input type="checkbox" className="mr-2"/>
                                <Link to={"/danh-muc-san-pham/"+cat.id}>{cat.name}</Link>

                            </div>
                        })}


                    </ul>
    
            </div>
        </div>
        
    );
}
export default ListCategory;