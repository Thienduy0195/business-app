import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import amigo from '../../assets/images/amigo.png'

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container row">
          <div className="col-3 navbar-logo mb-2">
            <NavLink exact to="/login" className="nav-logo">
              <img src={amigo} width={200} style={{ position: 'relative' }} alt="login" />
            </NavLink>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/about"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    About us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/blog"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    News
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/contact"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-3">

            <div className="nav-icon" onClick={handleClick}>
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            </div>

          </div>


        </div>
      </nav>
    </>
  );
}

export default NavBar;
