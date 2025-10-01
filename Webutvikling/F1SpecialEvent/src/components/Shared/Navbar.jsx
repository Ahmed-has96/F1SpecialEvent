import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../App.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-danger">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src="/images/F1log.png" alt="F1 Racing Logo" height="50" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`${isOpen ? "show" : ""} collapse navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-driver">
                Add Drivers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/drivers-list">
                List of Drivers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/edit-drivers">
                Edit Driver
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search-drivers">
                Search Drivers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/delete-driver">
                Slett Driver
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/quiz-game">
                Quiz
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
