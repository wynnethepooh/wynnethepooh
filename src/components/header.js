import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import './header.css';
import ShoppingBag from "../images/shopping-bag.png";

const Header = ({ siteTitle }) => (
  <header>
    <Link to="/">
      <div className="app-title-header no-wrap">
        <div id="app-title">
          wynne the pooh
        </div>
        <h2>
          NOT WAYNE
        </h2>
      </div>
    </Link>
    <div className="shopping-cart">
      <button class="snipcart-checkout">
        <img src={ShoppingBag} height="30px" />
      </button>
      <span class="snipcart-items-count"></span>
      <span class="snipcart-total-price"></span>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
