import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';

import {useSpring, animated} from 'react-spring';

const CollapseMenu = (props) => {
  const {open} = useSpring({open: props.navbarState ? 0 : 1});

  if (props.navbarState === true) {
    return (
      <CollapseWrapper style={{
        transform: open.interpolate({
          range: [0, 0.2, 0.3, 1],
          output: [0, -20, 0, -200],
        }).interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
      }}
      >
        <NavLinks>
          <li><Link to="/" onClick={props.handleNavbar}>Home</Link></li>
          <li><Link to="/shop" onClick={props.handleNavbar}>Shop</Link></li>
          <li><Link to="/about" onClick={props.handleNavbar}>About</Link></li>
          <li><Link to="/contact" onClick={props.handleNavbar}>Contact</Link></li>
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: #FAF6EB;
  position: fixed;
  top: 6rem;
  left: 0;
  right: 0;
  z-index: 9;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0.5rem 5vh;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    letter-spacing: 3px;
    line-height: 2;
    color: #CC8E20;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #E1B94E;
      border-bottom: 1px solid #CC8E20;
    }
  }
`;
