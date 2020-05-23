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
import styled from "styled-components";

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
          <Footer>
            © {new Date().getFullYear()} | wynne the pooh
            <SocialMedia>
              <a className="facebook" href="https://www.facebook.com/it.me.wynne/" target="_blank">
                <SocialMediaIcon src={Facebook} />
              </a>
              <a className="instagram" href="https://www.instagram.com/wynnethepooh" target="_blank">
                <SocialMediaIcon src={Instagram} />
              </a>
              <a className="linkedin" href="https://www.linkedin.com/in/wynnetran" target="_blank">
                <SocialMediaIcon src={LinkedIn} />
              </a>
            </SocialMedia>
          </Footer>
        </div>
      </>
    )
  }
}

export default Layout

const Footer = styled.div`
  margin: 5vh;
  color: #CC8E20;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 420px) {
    flex-direction: column-reverse;
    font-size: 12px;
  }
`;

const SocialMedia = styled.div`
  @media (max-width: 420px) {
    margin: 20px 0;
  }
`;

const SocialMediaIcon = styled.img`
  height: 20px;
`;