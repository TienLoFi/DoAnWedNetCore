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
    <>
      <section className="section-subscribe padding-y-lg">
        <div className="container">
          <p className="pb-2 text-center text-white">Cung cấp xu hướng sản phẩm mới nhất và tin tức ngành hàng trực tiếp vào hộp thư của bạn</p>
          <div className="row justify-content-md-center">
            <div className="col-lg-5 col-md-6">
              <form className="form-row">
                <div className="col-md-8 col-7">
                  <input className="form-control border-0" placeholder="Email của bạn" type="email" />
                </div> {/* col.// */}
                <div className="col-md-4 col-5">
                  <button type="submit" className="btn btn-block btn-warning"> <i className="fa fa-envelope" /> Đăng ký </button>
                </div> {/* col.// */}
              </form>
              <small className="form-text text-white-50">Chúng tôi sẽ không bao giờ chia sẻ địa chỉ email của bạn với bất kỳ bên thứ ba nào. </small>
            </div> {/* col-md-6.// */}
          </div>
        </div>
      </section>
      <footer className="section-footer bg-secondary">
        <div className="container">
          <section className="footer-top padding-y-lg text-white">
            <div className="row">
              <aside className="col-md col-6">
                <h6 className="title">Thương hiệu</h6>
                <ul className="list-unstyled">
                  <li> <a href="#">Adidas</a></li>
                  <li> <a href="#">Puma</a></li>
                  <li> <a href="#">Reebok</a></li>
                  <li> <a href="#">Nike</a></li>
                </ul>
              </aside>
              <aside className="col-md col-6">
                <h6 className="title">Công ty</h6>
                <ul className="list-unstyled">
                  <li> <a href="#">Về chúng tôi</a></li>
                  <li> <a href="#">Sự nghiệp</a></li>
                  <li> <a href="#">Tìm cửa hàng</a></li>
                  <li> <a href="#">Quy tắc và điều khoản</a></li>
                  <li> <a href="#">Bản đồ trang web</a></li>
                </ul>
              </aside>
              <aside className="col-md col-6">
                <h6 className="title">Trợ giúp</h6>
                <ul className="list-unstyled">
                  <li> <a href="#">Liên hệ chúng tôi</a></li>
                  <li> <a href="#">Hoàn tiền</a></li>
                  <li> <a href="#">Trạng thái đơn hàng</a></li>
                  <li> <a href="#">Thông tin vận chuyển</a></li>
                  <li> <a href="#">Mở tranh chấp</a></li>
                </ul>
              </aside>
              <aside className="col-md col-6">
                <h6 className="title">Tài khoản</h6>
                <ul className="list-unstyled">
                  <li> <a href="#">Đăng nhập</a></li>
                  <li> <a href="#">Đăng ký</a></li>
                  <li> <a href="#">Cài đặt tài khoản</a></li>
                  <li> <a href="#">Đơn hàng của tôi</a></li>
                </ul>
              </aside>
              <aside className="col-md">
                <h6 className="title">Mạng xã hội</h6>
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
            <p className="text-white">Chính sách bảo mật - Điều khoản sử dụng - Hướng dẫn về thông tin người dùng </p>
            <p className="text-muted"> © 2019 Tên công ty, Đã đăng ký Bản quyền </p>
            <br />
          </section>
        </div>{/* //container */}
      </footer>
    </>
  );
}

export default Footer;
