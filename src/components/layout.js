/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby";
import { slide as Menu } from 'react-burger-menu';

import Header from "./header";
import "./layout.css";

import Facebook from "../images/facebook.png";
import Instagram from "../images/instagram.png";
import LinkedIn from "../images/linkedin.png";

class Layout extends React.Component {

  render() {

    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    return (
      <>
        <Header siteTitle={title} />
        <div className="App">
          <Menu>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </Menu>
          {children}
          <footer>
            © {new Date().getFullYear()} | wynne the pooh
            <div className="social-media">
              <a className="facebook" href="https://www.facebook.com/it.me.wynne/" target="_blank">
                <img src={Facebook} height="30px"/>
              </a>
              <a className="instagram" href="https://www.instagram.com/wynnethepooh" target="_blank">
                <img src={Instagram} height="30px"/>
              </a>
              <a className="linkedin" href="https://www.linkedin.com/in/wynnetran" target="_blank">
                <img src={LinkedIn} width="30px"/>
              </a>
            </div>
          </footer>
        </div>
      </>
    )
  }
}

export default Layout