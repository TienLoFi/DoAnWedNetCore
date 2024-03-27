import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const handleRegister = async () => {
        try {
            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const response = await axios.post(
                'https://localhost:7272/api/Users/Validate1/RegisterModel',
                {
                    username,
                    email,
                    password,
                    confirmPassword,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const token = response.data.data;

            if (token) {

                // Chuyển hướng đến một route khác 
                navigate('/login');
                alert('Đăng kí thành công!');
                window.location.reload();

            } else {
                console.error('Token is invalid or not received from the server.');
                alert('Đăng kí thất bại!');
            }

        } catch (error) {
            console.error('Đăng kí thất bại:', error);
            alert('Đăng kí thất bại!');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    return ( 
        <>
  {/* ========================= SECTION CONTENT ========================= */}
  <section className="section-content padding-y">
    {/* ============================ COMPONENT REGISTER   ================================= */}
    <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
      <article className="card-body">
        <header className="mb-4">
          <h4 className="card-title">Sign up</h4>
        </header>
       
          <div className="form-row">
            <div className="col form-group">
              <label>UserName</label>
              <input
                                        type="text"
                                        placeholder="Username"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
            </div>{" "}
            {/* form-group end.// */}
            <div className="col form-group">
              <label>Email</label>
              <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
            </div>{" "}
            {/* form-group end.// */}
          </div>{" "}
          {/* form-row end.// */}
          <div className="form-group">
            <label>Password</label>
            <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Enter your Password"
                                        className="form-control"

                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>{" "}
          {/* <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {passwordVisible ? (
                                                <i className="far fa-eye"></i>
                                            ) : (
                                                <i className="far fa-eye-slash"></i>
                                            )}
                                        </button> */}
          {/* form-group end.// */}
          <div className="form-group">
            <label>ConfirmPassword </label>
            <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Enter your Confirm Password"
                                        className="form-control"

                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
         
           
           
            {/* form-group end.// */}
          </div>{" "}
          {/* form-row.// */}
       
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block"    onClick={handleRegister}>
              Register
            </button>
          </div>{" "}
          {/* form-group// */}
          <div className="form-group">
            <label className="custom-control custom-checkbox">
              {" "}
              <input
                type="checkbox"
                className="custom-control-input"
                defaultChecked=""
              />{" "}
              <div className="custom-control-label">
                {" "}
                I am agree with <a href="#">terms and contitions</a>
              </div>{" "}
            </label>
          </div>{" "}
          {/* form-group end.// */}
      
      </article>
      {/* card-body.// */}
    </div>{" "}
    {/* card .// */}
    <p className="text-center mt-4">
      Have an account? <a href="/Login">Log In</a>
    </p>
    <br />
    <br />
    {/* ============================ COMPONENT REGISTER  END.// ================================= */}
  </section>
  {/* ========================= SECTION CONTENT END// ========================= */}
</>

     );
}

export default Register;