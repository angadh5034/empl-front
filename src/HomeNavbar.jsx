import React from 'react'
import { Link } from 'react-router-dom'

export default function HomeNavbar() {
  return (
    <div >
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">

        <div className="container-fluid">

          {/* Logo */}
          <Link className="navbar-brand fw-bold fs-4 text-warning" to="#">
            EMV
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse collapse show" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto">

            {/* Home */}
              <li className="nav-item">
                <Link className="nav-link nav-hover" to="/">
                  Home
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

               <li className="nav-item">
                <Link className="nav-link nav-hover" to="/registration">
                  login
                </Link>
              </li>


            </ul>

            

          </div>

        </div>

      </nav>
    </div>
  )
}
