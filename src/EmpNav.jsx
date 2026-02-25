import React from 'react'
import "./Navbar.css";
import { Link, useNavigate} from "react-router-dom";

export default function EmpNav() {
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
          <Link className="navbar-brand fw-bold fs-4 text-warning" to="/">
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-outline-success">
              <li className="nav-item">
                <Link className="nav-link active nav-hover" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/dashboard">
                  ViewEmployeeinfo
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/about">
                  About us
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/contact">
                  Contact us
                </Link>
              </li>

              {/* services */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/services">
                  service
                </Link>
              </li>

              {/* Leave form */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/leaveform">
                  Leave
                </Link>
              </li>

              {/* my Leave form */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/myleave">
                  MyLeave
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
  )
}
