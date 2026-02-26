import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userinfo"));

  const logout = () => {
    localStorage.removeItem("userinfo");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  }

  return (

    <div>

      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">

        <div className="container-fluid">

          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-4 text-warning" to="">
            <div style={{ color: "white", fontSize: "12px" }}>
              Hello,<br />
              {user.firstname}
            </div>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto">

            {/* Home */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/">
                  Home
                </Link>
              </li>

              {/* Add Employee */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/addemployee">
                  Add Employee Info
                </Link>
              </li>

              {/* View Employee */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/ViewEmployee">
                  View Employee Info
                </Link>
              </li>

              {/* About */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/about">
                  About Us
                </Link>
              </li>

              {/* Contact */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/contact">
                  Contact Us
                </Link>
              </li>

              {/* Services */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/services">
                  Service
                </Link>
              </li>
              {/* updatelive for admin */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/UpdateLeaveStatus">
                  Leaves
                </Link>
              </li>

              <li className="nav-item">
                <button onClick={logout} className="but but-denger">Logout</button>
              </li>


            </ul>

            

          </div>

        </div>

      </nav>

    </div>

  );

}
