// @flow

/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from 'react';
import {Helmet} from 'react-helmet';
import styled from 'styled-components';

import Navbar from './navbar/Navbar';
import './layout.css';
import GlobalStyle from '../styles/Global';

import Facebook from '../images/facebook.png';
import Instagram from '../images/instagram.png';
import LinkedIn from '../images/linkedin.png';

/**
 * Layout class.
 */
class Layout extends React.Component<Props, State> {
  /**
   * Constructor.
   * @param {object} props
   */
  constructor(props: Props) {
    super(props);
    this.state = {navbarOpen: false};
  }

  /**
   * Handles state of nav bar.
   */
  handleNavbar = () => {
    this.setState((state) => ({
      navbarOpen: !state.navbarOpen,
    }));
  }

  /**
   * Renders layout object.
   * @return {object} layout object
   */
  render() {
    const {children} = this.props;

    return (
      <>
        <Navbar
          navbarState={this.state.navbarOpen}
          handleNavbar={this.handleNavbar}
          isHomePage={this.props.isHomePage}
        />
        <GlobalStyle />

        <Helmet
          htmlAttributes={{lang: 'en'}}
          link={[{
            href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css',
            rel: 'stylesheet',
            type: 'text/css',
          }]}
          script={[{
            'type': 'text/javascript',
            'id': 'snipcart',
            'data-api-key':
                'NGM1YThjMDgtZDBhNy00MzU5LWJiNGUtMjU2YTBjNTJlMWNhNjM3MjUzODE0ODI3MjM0MTEx',
            'src': 'https://cdn.snipcart.com/scripts/2.0/snipcart.js',
          }, {
            type: 'text/javascript',
            src: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
          }]}>
          <meta charSet='utf-8' />
        </Helmet>

        <div className='App'>
          {children}
          <Footer isHomePage={this.props.isHomePage}>
            © {new Date().getFullYear()} | wynne the pooh
            <SocialMedia>
              <a className='facebook'
                href='https://www.facebook.com/it.me.wynne/'
                target='_blank'
                rel="noreferrer">
                <SocialMediaIcon
                  src={Facebook}
                  isHomePage={this.props.isHomePage} />
              </a>
              <a className='instagram'
                href='https://www.instagram.com/wynnethepooh.pot'
                target='_blank'
                rel="noreferrer">
                <SocialMediaIcon
                  src={Instagram}
                  isHomePage={this.props.isHomePage} />
              </a>
              <a className='linkedin'
                href='https://www.linkedin.com/in/wynnetran'
                target='_blank'
                rel="noreferrer">
                <SocialMediaIcon
                  src={LinkedIn}
                  isHomePage={this.props.isHomePage} />
              </a>
            </SocialMedia>
          </Footer>
        </div>
      </>
    );
  }
}

type State = {
  navbarOpen: bool
}

type Props = {
  children: any,
  isHomePage?: bool,
};

export default Layout;

const Footer = styled.div`
  margin: 5vh;
  color: ${(props) => (props.isHomePage ? 'white' : '#CC8E20')};
  background: none;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: ${(props) => (props.isHomePage ? '-6rem' : '0')};

  @media (max-width: 420px) {
    flex-direction: column-reverse;
    font-size: 12px;
    top: ${(props) => (props.isHomePage ? '-10rem' : '0')};
  }
`;

const SocialMedia = styled.div`
  @media (max-width: 420px) {
    margin: 20px 0;
  }
`;

const SocialMediaIcon = styled.img`
  height: 20px;
  filter: ${(props) => (props.isHomePage ? 'brightness(0) invert(1)' : '')};
`;
