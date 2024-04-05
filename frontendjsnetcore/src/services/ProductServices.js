import httpAxios from "../httpAxios";

function getAll() {
  return httpAxios.get("Products");
}

function getById(id) {
  return httpAxios.get("Products/" + id);
}

function create(data) {
  return httpAxios.post("product/store", data);
}
function update(data, id) {
  return httpAxios.post("product/update/" + id, data);
}
function remove(id) {
  return httpAxios.delete("product/destroy/" + id);
}
function getProductHome(limit, category_id)
{
    return httpAxios.get(`product_list/${limit}/${category_id}`)
}
function getProductAll(limit, page=1)
{
    return httpAxios.get(`product_all/${limit}/${page}`);
}

function getProductBySlug(slug){
  return httpAxios.get(`product_detail/${slug}`);
}

function getProductSearch(key)
{
    return httpAxios.get(`product_search/${key}`);
}
function getProductByBrandId(limit, brand_id)
{
    return httpAxios.get(`product_brand/${limit}/${brand_id}`);
}
function getProductByCategoryId(limit, category_id)
{
    return httpAxios.get(`product_category/${limit}/${category_id}`);
}
const ProductServices = {
    getProductBySlug:getProductBySlug,
  getAll: getAll,
  getById: getById,
  create: create,
  update: update,
  remove: remove,
  getProductHome:getProductHome,
  getProductAll:getProductAll,
  getProductSearch:getProductSearch,
  getProductByBrandId:getProductByBrandId,
  getProductByCategoryId:getProductByCategoryId,
};

export default ProductServices;
