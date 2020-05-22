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
import { Helmet } from 'react-helmet'

import Navbar from "./navbar/Navbar";
import "./layout.css";
import GlobalStyle from '../styles/Global';

import Facebook from "../images/facebook.png";
import Instagram from "../images/instagram.png";
import LinkedIn from "../images/linkedin.png";

class Layout extends React.Component {

  state = {
    navbarOpen: false
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {

    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    return (
      <>
        <Navbar
          navbarState={this.state.navbarOpen}
          handleNavbar={this.handleNavbar}
        />
        <GlobalStyle />

        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={{ charSet: 'utf-8' }}
          link={[{
            href:"https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css",
            rel:"stylesheet",
            type:"text/css"
          }]}
          script={[{
            type: 'text/javascript',
            id: "snipcart",
            "data-api-key": "NGM1YThjMDgtZDBhNy00MzU5LWJiNGUtMjU2YTBjNTJlMWNhNjM3MjUzODE0ODI3MjM0MTEx",
            src:"https://cdn.snipcart.com/scripts/2.0/snipcart.js"
          },{
            type: 'text/javascript',
            src:"https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"
          }]}/>

        <div className="App">
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