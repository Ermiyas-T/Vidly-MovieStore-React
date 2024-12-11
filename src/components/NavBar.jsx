import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./css/navBar.css";
export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-transparent">
      <Link className="navbar-brand">Vidly</Link>
      <div className="collapse navbar-collapse">
        <div className="nav-links">
          <NavLink className="nav-item nav-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customer">
            Customer
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            Rentals
          </NavLink>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
