import axios from 'axios';
import Cookies from 'universal-cookie';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const cookies = new Cookies();
    const handleLogin = async () => {
        // Kiểm tra xem username và password có được cung cấp không
        if (!username || !password) {
            alert('Vui lòng nhập đầy đủ tên người dùng và mật khẩu!');
            return;
        }
    
        try {
            const response = await axios.post(
                'https://localhost:7272/api/Users/Validate/LoginModel',
                {
                    username,
                    password,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
    
            const token = response.data.data;
    
            if (token) {
                // Sử dụng js-cookie để lưu trữ token trong cookie 
                cookies.set('jwtToken', token);
                // Chuyển hướng đến một route khác 
                navigate('/');
                alert('Đăng nhập thành công!');
                window.location.reload();
            } else {
                console.error('Token is invalid or not received from the server.');
                alert('Đăng nhập thất bại!');
            }
        } catch (error) {
            // Trích xuất thông điệp lỗi từ đối tượng error
            const errorMessage = error.response?.data?.message;
    
            // Kiểm tra xem thông điệp lỗi có chứa từ khoá "username" hoặc "password" không
            if (errorMessage && (errorMessage.toLowerCase().includes('username') || errorMessage.toLowerCase().includes('password'))) {
                alert('Tên người dùng hoặc mật khẩu không chính xác!');
            } else {
                console.error('Đăng nhập thất bại:', error);
                alert('Đăng nhập thất bại!');
            }
        }
    };
    
    
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };



    return (  
<>
  {/* ========================= SECTION CONTENT ========================= */}
  <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
    {/* ============================ COMPONENT LOGIN   ================================= */}
    <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
      <div className="card-body">
        <h4 className="card-title mb-4">Sign in</h4>
        
          <a href="#" className="btn btn-facebook btn-block mb-2">
            {" "}
            <i className="fab fa-facebook-f" /> &nbsp; Sign in with Facebook
          </a>
          <a href="#" className="btn btn-google btn-block mb-4">
            {" "}
            <i className="fab fa-google" /> &nbsp; Sign in with Google
          </a>
          <div className="form-group">
          <input
                                        type="text"
                                        placeholder="Username or Email"
                                        className="form-control"

                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group">
          <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Enter your Password"
                                        className="form-control"

                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group">
            <a href="#" className="float-right">
              Forgot password?
            </a>
            <label className="float-left custom-control custom-checkbox">
              {" "}
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked=""
              />{" "}
              <div className="custom-control-label"> Remember </div>{" "}
            </label>
          </div>{" "}
          {/* form-group form-check .// */}
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block"  onClick={handleLogin}>
              {" "}
              Login
            </button>
          </div>{" "}
          {/* form-group// */}
        
      </div>{" "}
      {/* card-body.// */}
    </div>{" "}
    {/* card .// */}
    <p className="text-center mt-4">
      Don't have account? <a href="/register" className="font-weight-bold">Sign up</a>
    </p>
    <br /> 
    <br />
    {/* ============================ COMPONENT LOGIN  END.// ================================= */}
  </section>
  {/* ========================= SECTION CONTENT END// ========================= */}
</>

    );
}



export default Login ;