import logo from '../../logo.svg';
<>
  {/* jQuery */}
  {/* Bootstrap4 files*/}
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
  {/* Font awesome 5 */}
  <link
    href="fonts/fontawesome/css/all.min.css"
    type="text/css"
    rel="stylesheet"
  />
  {/* custom style */}
  <link href="css/ui.css" rel="stylesheet" type="text/css" />
  <link href="css/responsive.css" rel="stylesheet" type="text/css" />
  {/* custom javascript */}
</>


function Footer() {
  return (
    <><section className="section-subscribe padding-y-lg">
          <div className="container">
              <p className="pb-2 text-center text-white">Delivering the latest product trends and industry news straight to your inbox</p>
              <div className="row justify-content-md-center">
                  <div className="col-lg-5 col-md-6">
                      <form className="form-row">
                          <div className="col-md-8 col-7">
                              <input className="form-control border-0" placeholder="Your Email" type="email" />
                          </div> {/* col.// */}
                          <div className="col-md-4 col-5">
                              <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope" /> Subscribe </button>
                          </div> {/* col.// */}
                      </form>
                      <small className="form-text text-white-50">We’ll never share your email address with a third-party. </small>
                  </div> {/* col-md-6.// */}
              </div>
          </div>
      </section><footer className="section-footer bg-secondary">
              <div className="container">
                  <section className="footer-top padding-y-lg text-white">
                      <div className="row">
                          <aside className="col-md col-6">
                              <h6 className="title">Brands</h6>
                              <ul className="list-unstyled">
                                  <li> <a href="#">Adidas</a></li>
                                  <li> <a href="#">Puma</a></li>
                                  <li> <a href="#">Reebok</a></li>
                                  <li> <a href="#">Nike</a></li>
                              </ul>
                          </aside>
                          <aside className="col-md col-6">
                              <h6 className="title">Company</h6>
                              <ul className="list-unstyled">
                                  <li> <a href="#">About us</a></li>
                                  <li> <a href="#">Career</a></li>
                                  <li> <a href="#">Find a store</a></li>
                                  <li> <a href="#">Rules and terms</a></li>
                                  <li> <a href="#">Sitemap</a></li>
                              </ul>
                          </aside>
                          <aside className="col-md col-6">
                              <h6 className="title">Help</h6>
                              <ul className="list-unstyled">
                                  <li> <a href="#">Contact us</a></li>
                                  <li> <a href="#">Money refund</a></li>
                                  <li> <a href="#">Order status</a></li>
                                  <li> <a href="#">Shipping info</a></li>
                                  <li> <a href="#">Open dispute</a></li>
                              </ul>
                          </aside>
                          <aside className="col-md col-6">
                              <h6 className="title">Account</h6>
                              <ul className="list-unstyled">
                                  <li> <a href="#"> User Login </a></li>
                                  <li> <a href="#"> User register </a></li>
                                  <li> <a href="#"> Account Setting </a></li>
                                  <li> <a href="#"> My Orders </a></li>
                              </ul>
                          </aside>
                          <aside className="col-md">
                              <h6 className="title">Social</h6>
                              <ul className="list-unstyled">
                                  <li><a href="#"> <i className="fab fa-facebook" /> Facebook </a></li>
                                  <li><a href="#"> <i className="fab fa-twitter" /> Twitter </a></li>
                                  <li><a href="#"> <i className="fab fa-instagram" /> Instagram </a></li>
                                  <li><a href="#"> <i className="fab fa-youtube" /> Youtube </a></li>
                              </ul>
                          </aside>
                      </div> {/* row.// */}
                  </section>	{/* footer-top.// */}
                  <section className="footer-bottom text-center">
                      <p className="text-white">Privacy Policy - Terms of Use - User Information Legal Enquiry Guide</p>
                      <p className="text-muted"> © 2019 Company name, All rights reserved </p>
                      <br />
                  </section>
              </div>{/* //container */}
          </footer></>
    );
  }


export default Footer;
