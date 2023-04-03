import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import CartPopup from "../cartpop/CartPop";

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const handleCartIconClick = () => {
    setShowCartPopup(!showCartPopup);
  };

  return (
    <>
      <header>
        <div className="container flex">
          <div className="logo">
            <h3>MA Organizers</h3>
          </div>
          <div className="nav">
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="button flex">
            <h4>
              {/* <span></span> My List */}
            </h4>
            <Link to="/Login">
              <button className="btn1">
                <i className="fa fa-sign-out"></i> Sign In
              </button>
            </Link>
          </div>

          <div className="toggle">
            <button onClick={() => setNavList(!navList)}>
              {navList ? (
                <i className="fa fa-times"></i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>

          <div className="cart-icon" onMouseEnter={handleCartIconClick}>
            <i className="fa fa-shopping-cart"></i>
            {showCartPopup && <CartPopup />}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
