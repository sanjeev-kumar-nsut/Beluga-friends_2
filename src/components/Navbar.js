import React, { useState, useEffect } from "react";


import "../css/Navbar.css";


function Navbar(){
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light " >
        <div className="container-fluid">
          <img alt="logo" className="logoimg" src="./logo.png" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
           
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
          <li className="nav-item">
          <a className="nav-link link hover-2" style={{color:"#3D72FF"}} href="#">About Us</a>
        </li>
        <li className="nav-item">
        <a className="nav-link link hover-2" style={{color:"#3D72FF"}} href="#">Services</a>
        </li>
        <li className="nav-item">
        <a className="nav-link link hover-2" style={{color:"#3D72FF"}} href="#">Contact</a>
        </li>
            </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
}

export default Navbar;
