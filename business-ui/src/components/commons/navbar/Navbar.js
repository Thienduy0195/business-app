import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { HamburgetMenuOpen } from "./Icons";
import silva from '../../../assets/images/silva.png'

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container row">
          <div className="col-2 navbar-logo">
            <NavLink exact to="/login" className="nav-logo">
              <img src={silva} width={168} style={{ position: 'relative' }} alt="login" />
            </NavLink>
          </div>
          <div className="col-8 d-flex justify-content-center">
            <div>
              <ul className={click ? "nav-menu active" : "nav-menu"} style={{ marginBottom: "0 !important;" }}>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Trái cây sạch
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
                    Trái cây sạch
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
                    Trái cây sạch
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
                    to="/blog"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Trái cây sạch
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
          <div className="col-2">

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
