import React, { useState } from "react";
import logo from "../../../assets/images/logo.svg";
import avatar from "../../../assets/images/image-avatar.png";
// import { Cart } from "./Cart";

export const ItemInfo = ({
  images,
  name,
  info,
  description,
  note,
  cartProductQuantity,
  setCartProductQuantity,
}) => {
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // If clicked on the backdrop
  const handleClickOutsideMenu = () => {
    document.querySelector(".menu-icon").setAttribute("aria-expanded", "false");
    document.querySelector(".navbar").dataset.visible = "false";
    document.body.style.overflow = "scroll";
    setOpenMenu(false);
  };

  // Toggle menu handler
  const handleMenuToggle = (e) => {
    const currentAttr = e.target.getAttribute("aria-expanded");
    const mobileNavbar = document.querySelector(".navbar");

    if (currentAttr === "false") {
      e.target.setAttribute("aria-expanded", "true");
      mobileNavbar.dataset.visible = "true";
      document.body.style.overflow = "hidden";
      setTimeout(() => setOpenMenu(true), 250);
    } else {
      e.target.setAttribute("aria-expanded", "false");
      mobileNavbar.dataset.visible = "false";
      document.body.style.overflow = "scroll";
      setOpenMenu(false);
    }
  };

  return (
    <>
      <header>
        <div className="container-lg flex primary-header">
          <div className="flex product-info-container">
            <div
              onClick={handleMenuToggle}
              className="menu-icon"
              aria-expanded="false"
            ></div>
            <h2 className="text-uppercase">{name}</h2>
            {/* <img src={logo} alt="Logo" className="logo" /> */}
            <nav>
              <ul
                className="product-info flex justify-content-between"
                data-visible="false"
              >
                <li>
                  <a href="/">Thông tin</a>
                </li>
                <li>
                  <a href="/">Mô tả</a>
                </li>
                <li>
                  <a href="/">Ghi chú</a>
                </li>
                <li>
                  <a href="/">Hình ảnh</a>
                </li>
                <li>
                  <a href="/">Đánh giá</a>
                </li>
              </ul>

              {openMenu && (
                <div
                  className="navbar-backdrop"
                  onClick={handleClickOutsideMenu}
                ></div>
              )}
            </nav>
          </div>
        </div>
      </header>
      <div className="container mt-3">
        <div className="row">
          {images.length > 2 && (
            <>
              <img className="col-6" src={images[0].imageURL} />
              <img className="col-6" src={images[1].imageURL} />
            </>
          )}
        </div>

        <hr></hr>

        <div>
          <span>{info}</span>
        </div>
        <hr></hr>

        <div>
          <span>{description}</span>
        </div>
        <hr></hr>

        <div>
          <span>{note}</span>
        </div>

        <div className="row">
          {images.length > 5 && (
            <>
              <img className="col-6" src={images[2].imageURL} />
              <img className="col-6" src={images[3].imageURL} />
            </>
          )}
        </div>

        <div className="row mt-3">
          {images.length > 5 && (
            <>
              <img className="col-6" src={images[4].imageURL} />
              <img className="col-6" src={images[5].imageURL} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
