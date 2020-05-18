import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

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
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
