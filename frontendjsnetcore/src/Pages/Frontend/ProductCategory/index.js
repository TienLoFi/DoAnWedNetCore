  import { useEffect, useState } from "react";
  import ProductService from "../../../services/ProductServices";
  import CategoryService from "../../../services/CategoryServices";
  import { useParams } from "react-router-dom";
  import ListCategory from "../../../Layout/LayoutSite/ListCategory";
import { urlImageFE } from "../../../config";

  function ProductCategory() {
    const {id} = useParams();
    const [products, setProduct] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await ProductService.getProductByCategoryParent(id);
                setProduct((result.data));
            }
            catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id])
          return (
              <>
              {/* ========================= SECTION CONTENT ========================= */}
              <section className="section-content padding-y">
                <div className="container">
                  {/* ============================  FILTER TOP  ================================= */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <ol className="breadcrumb float-left">
                        <li className="breadcrumb-item">
                          <a href="#">Home</a>
                        </li>
                        <li className="breadcrumb-item">
                          <a href="#">Category name</a>
                        </li>
                        <li className="breadcrumb-item active">Item details</li>
                      </ol>
                    </div>{" "}
                    {/* card-body .// */}
                  </div>{" "}
                  {/* card.// */}
                  {/* ============================ FILTER TOP END.// ================================= */}
                  <div className="row">
                    <aside className="col-md-2">
                      <article className="filter-group">
                    
                        <div
                          className="filter-content collapse show"
                          id="collapse_1"
                          style={{}}
                        >
                          <div className="inner">
                            <ul className="list-menu">
                          
                            <ListCategory/>
                            </ul>
                          </div>{" "}
                          {/* inner.// */}
                        </div>
                      </article>{" "}
                      {/* filter-group  .// */}
                      <article className="filter-group">
                        <h6 className="title">
                          <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="collapse"
                            data-target="#collapse_2"
                          >
                            {" "}
                            Brands{" "}
                          </a>
                        </h6>
                        <div className="filter-content collapse show" id="collapse_2">
                          <div className="inner">
                            <label className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                defaultChecked=""
                                className="custom-control-input"
                              />
                              <div className="custom-control-label">
                                Adidas
                                <b className="badge badge-pill badge-light float-right">
                                  120
                                </b>
                              </div>
                            </label>
                            <label className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                defaultChecked=""
                                className="custom-control-input"
                              />
                              <div className="custom-control-label">
                                Nike
                                <b className="badge badge-pill badge-light float-right">
                                  15
                                </b>
                              </div>
                            </label>
                            <label className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                defaultChecked=""
                                className="custom-control-input"
                              />
                              <div className="custom-control-label">
                                The Noth Face
                                <b className="badge badge-pill badge-light float-right">
                                  35
                                </b>{" "}
                              </div>
                            </label>
                            <label className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                defaultChecked=""
                                className="custom-control-input"
                              />
                              <div className="custom-control-label">
                                The cat
                                <b className="badge badge-pill badge-light float-right">
                                  89
                                </b>{" "}
                              </div>
                            </label>
                            <label className="custom-control custom-checkbox">
                              <input type="checkbox" className="custom-control-input" />
                              <div className="custom-control-label">
                                Honda
                                <b className="badge badge-pill badge-light float-right">
                                  30
                                </b>
                              </div>
                            </label>
                          </div>{" "}
                          {/* inner.// */}
                        </div>
                      </article>{" "}
                      {/* filter-group .// */}
                      <article className="filter-group">
                        <h6 className="title">
                          <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="collapse"
                            data-target="#collapse_3"
                          >
                            {" "}
                          {products.price}
                          </a>
                        </h6>
                        <div className="filter-content collapse show" id="collapse_3">
                          <div className="inner">
                            <input
                              type="range"
                              className="custom-range"
                              min={0}
                              max={100}
                              name=""
                            />
                            <div className="form-row">
                              <div className="form-group col-md-6">
                                <label>Min</label>
                                <input
                                  className="form-control"
                                  placeholder="$0"
                                  type="number"
                                />
                              </div>
                              <div className="form-group text-right col-md-6">
                                <label>Max</label>
                                <input
                                  className="form-control"
                                  placeholder="$1,0000"
                                  type="number"
                                />
                              </div>
                            </div>{" "}
                            {/* form-row.// */}
                            <button className="btn btn-block btn-primary">Apply</button>
                          </div>{" "}
                          {/* inner.// */}
                        </div>
                      </article>{" "}
                      {/* filter-group .// */}
                      <article className="filter-group">
                        <h6 className="title">
                          <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="collapse"
                            data-target="#collapse_4"
                          >
                            {" "}
                            Sizes{" "}
                          </a>
                        </h6>
                        <div className="filter-content collapse show" id="collapse_4">
                          <div className="inner">
                            <label className="checkbox-btn">
                              <input type="checkbox" />
                              <span className="btn btn-light"> XS </span>
                            </label>
                            <label className="checkbox-btn">
                              <input type="checkbox" />
                              <span className="btn btn-light"> SM </span>
                            </label>
                            <label className="checkbox-btn">
                              <input type="checkbox" />
                              <span className="btn btn-light"> LG </span>
                            </label>
                            <label className="checkbox-btn">
                              <input type="checkbox" />
                              <span className="btn btn-light"> XXL </span>
                            </label>
                          </div>{" "}
                          {/* inner.// */}
                        </div>
                      </article>{" "}
                      {/* filter-group .// */}
                      <article className="filter-group">
                        <h6 className="title">
                          <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="collapse"
                            data-target="#collapse_5"
                          >
                            {" "}
                            Condition{" "}
                          </a>
                        </h6>
                        <div className="filter-content collapse show" id="collapse_5">
                          <div className="inner">
                            <label className="custom-control custom-radio">
                              <input
                                type="radio"
                                name="myfilter_radio"
                                defaultChecked=""
                                className="custom-control-input"
                              />
                              <div className="custom-control-label">Any condition</div>
                            </label>
                            <label className="custom-control custom-radio">
                              <input
                                type="radio"
                                name="myfilter_radio"
                                className="custom-control-input"
                              />
                              <div className="custom-control-label">Brand new </div>
                            </label>
                            <label className="custom-control custom-radio">
                              <input
                                type="radio"
                                name="myfilter_radio"
                                className="custom-control-input"
                              />
                              <div className="custom-control-label">Used items</div>
                            </label>
                            <label className="custom-control custom-radio">
                              <input
                                type="radio"
                                name="myfilter_radio"
                                className="custom-control-input"
                              />
                              <div className="custom-control-label">Very old</div>
                            </label>
                          </div>{" "}
                          {/* inner.// */}
                        </div>
                      </article>{" "}
                      {/* filter-group .// */}
                    </aside>{" "}
                    {/* col.// */}
                    
                   <main className="col-md-10">
                   {/* Điều chỉnh phần header tại đây nếu cần */}
                   {products.map(function(product, index) {
                       return (
                           <article key={index} className="card card-product-list">
                               <div className="row no-gutters">
                                   <aside className="col-md-3">
                                       <a href="#" className="img-wrap">
                                           <span className="badge badge-danger">{product.name}</span>
                                           <img src={urlImageFE + "product/" + product.name} alt={product.name} />
                                       </a>
                                   </aside>{" "}
                                   {/* col.// */}
                                   <div className="col-md-6">
                                       <div className="info-main">
                                           <a href="#" className="h5 title">
                                               {/* Hiển thị tiêu đề sản phẩm tại đây */}
                                           </a>
                                           {/* Hiển thị thông tin sản phẩm và mô tả tại đây */}
                                       </div>{" "}
                                       {/* info-main.// */}
                                   </div>{" "}
                                   {/* col.// */}
                               </div>{" "}
                               {/* row.// */}
                           </article>
                       );
                   })}
                   {/* Điều chỉnh phần pagination và nút "Did you find what you were looking for?" tại đây nếu cần */}
               </main>
               
                      
                    {/* col.// */}
                  </div>
                </div>{" "}
                {/* container .//  */}
              </section>
              {/* ========================= SECTION CONTENT END// ========================= */}
              {/* ========================= SECTION SUBSCRIBE  ========================= */}
              <section className="padding-y-lg bg-light border-top">
                <div className="container">
                  <p className="pb-2 text-center">
                    Delivering the latest product trends and industry news straight to your
                    inbox
                  </p>
                  <div className="row justify-content-md-center">
                    <div className="col-lg-4 col-sm-6">
                      <form className="form-row">
                        <div className="col-8">
                          <input
                            className="form-control"
                            placeholder="Your Email"
                            type="email"
                          />
                        </div>{" "}
                        {/* col.// */}
                        <div className="col-4">
                          <button type="submit" className="btn btn-block btn-warning">
                            {" "}
                            <i className="fa fa-envelope" /> Subscribe{" "}
                          </button>
                        </div>{" "}
                        {/* col.// */}
                      </form>
                      <small className="form-text">
                        We’ll never share your email address with a third-party.{" "}
                      </small>
                    </div>{" "}
                    {/* col-md-6.// */}
                  </div>
                </div>
              </section>
              {/* ========================= SECTION SUBSCRIBE END// ========================= */}
            </>
            
            
          );
      }

  

  export default ProductCategory;

