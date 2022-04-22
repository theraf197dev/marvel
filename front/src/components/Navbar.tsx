import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { authTypes } from "../types/authTypes";

const Navbar = () => {
  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: authTypes.logout });
    localStorage.setItem("username", JSON.stringify(''));
    localStorage.setItem("userId", '');
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light black-background">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{color: "#fff"}}/>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                aria-current="page"
                to="/heroes"
              >
                <img className="logo" src="/assets/marvel-logo.png" />
              </NavLink>
            </li>
          </ul>
          <div className="welcome">
            <p>Welcome {localStorage.getItem("username") || ''}</p>
          </div>
          <div className="d-flex">
            <button className="btn custom-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
