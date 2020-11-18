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
import loadable from '@loadable/component';

import Facebook from '../images/facebook.png';
import Instagram from '../images/instagram.png';
import LinkedIn from '../images/linkedin.png';

const Navbar = loadable(() => import('../components/navbar/Navbar'));

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
    this.state = {
      navbarOpen: false,
    };
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

        <Helmet htmlAttributes={{lang: 'en'}}>
          <meta charSet='utf-8' />
        </Helmet>

        <Content>
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
        </Content>
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

const Content = styled.div`
  text-align: center;
  background-color: #FAF6EB;
  font-family: 'Jost', sans-serif;
  margin-top: 6rem;
  height: 100vh;
`;

const Footer = styled.div`
  margin: 5vh;
  color: ${(props) => (props.isHomePage ? 'white' : '#CC8E20')};
  background: none;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  top: ${(props) => (props.isHomePage ? '-113px' : '0')};

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
