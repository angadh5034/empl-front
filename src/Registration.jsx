import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {

  // toggle between login and registration
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 
  
const app=process.env.REACT_APP_SERVER_IP;

  // registration state
  const [regData, setRegData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    contactno: "",
    username: "",
    password: "",
    confirmpassword: "",
    empid: "",
    role:""
  });

  // login state
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });


  // ================= HANDLE REGISTRATION CHANGE =================

  const handleRegChange = (e) => {

    const { name, value } = e.target;

    setRegData({
      ...regData,
      [name]: value
    });

  };


  // ================= HANDLE LOGIN CHANGE =================

  const handleLoginChange = (e) => {

    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value
    });

  };


  // ================= REGISTER =================

  const handleRegister = (e) => {

    e.preventDefault();

    if (regData.password !== regData.confirmpassword) {

      alert("Passwords do not match");
      return;

    }

    axios.post(`${app}/new/register`, regData)

      .then((res) => {

        alert("Registration Successful");
        setIsLogin(true);

      })

      .catch(() => {

        alert("Registration Failed");

      });

  };


  // ================= LOGIN =================

  const handleLogin = (e) => {

    e.preventDefault();

    axios.post(`${app}/login`, loginData)

      .then((res) => {

        if (res.data)
        {
            alert("login succseful...")
            let user=res.data;
            console.log(res.data);
            localStorage.setItem("isLoggedIn","true");
            localStorage.setItem("userinfo",JSON.stringify(user));




      if(user.role === "Admin")
      {
        navigate("/Navbar");
      }
      else if(user.role === "Employee")
      {
        navigate("/EmpNav");
      }
        }

      })

      .catch(() => {

        alert("Invalid Username or Password");

      });

  };


  // ================= UI =================

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-body">

              <h3 className="text-center mb-4">

                {isLogin ? "Login" : "Registration"}

              </h3>


              {/* ================= LOGIN FORM ================= */}

              {isLogin ? (

                <form onSubmit={handleLogin}>

                  <div className="mb-3">

                    <label>Username</label>

                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      onChange={handleLoginChange}
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label>Password</label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleLoginChange}
                      required
                    />

                  </div>


                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>


                  <button
                    type="button"
                    className="btn btn-link w-100 mt-2"
                    onClick={() => setIsLogin(false)}
                  >
                    New Registration
                  </button>

                </form>

              ) : (


              /* ================= REGISTRATION FORM ================= */

                <form onSubmit={handleRegister}>

                  <div className="row">

                    {/* <div className="col-md-6 mb-3">

            

                    </div> */}


                    <div className="col-md-6 mb-3">

                      <label>Employee ID</label>

                      <input
                        type="number"
                        name="empid"
                        className="form-control"
                        onChange={handleRegChange}
                        required
                      />

                    </div>

                  </div>


                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label>First Name</label>

                      <input
                        type="text"
                        name="firstname"
                        className="form-control"
                        onChange={handleRegChange}
                        required
                      />

                    </div>


                    <div className="col-md-6 mb-3">

                      <label>Last Name</label>

                      <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        onChange={handleRegChange}
                        required
                      />

                    </div>

                  </div>


                  <div className="mb-3">

                    <label>Email</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={handleRegChange}
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label>Gender</label>

                    <select
                      name="gender"
                      className="form-control"
                      onChange={handleRegChange}
                      required
                    >

                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>

                    </select>

                  </div>


                  <div className="mb-3">

                    <label>Contact Number</label>

                    <input
                      type="number"
                      name="contactno"
                      className="form-control"
                      onChange={handleRegChange}
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label>Username</label>

                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      onChange={handleRegChange}
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label>Password</label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={handleRegChange}
                      required
                    />

                  </div>


                  <div className="mb-3">

                    <label>Confirm Password</label>

                    <input
                      type="password"
                      name="confirmpassword"
                      className="form-control"
                      onChange={handleRegChange}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label>Role</label>

                    <select
                      name="role"
                      className="form-control"
                      onChange={handleRegChange}
                      required
                    >

                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Employee">Employee</option>

                    </select>

                  </div>
                  


                  <button
                    type="submit"
                    className="btn btn-success w-100"
                  >
                    Register
                  </button>


                  <button
                    type="button"
                    className="btn btn-link w-100 mt-2"
                    onClick={() => setIsLogin(true)}
                  >
                    Already Registered? Login
                  </button>

                </form>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}
