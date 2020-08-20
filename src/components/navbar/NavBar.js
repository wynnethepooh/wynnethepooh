import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';
import {useSpring, animated, config} from 'react-spring';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';

import ShoppingBag from '../../images/shopping-bag.png';

const Navbar = (props) => {
  const barAnimation = useSpring({
    from: {transform: 'translate3d(0, -10rem, 0)'},
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
    from: {transform: 'translate3d(0, 30px, 0)', opacity: 0},
    to: {transform: 'translate3d(0, 0, 0)', opacity: 1},
    delay: 800,
    config: config.wobbly,
  });

  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand isHomePage={props.isHomePage}/>
          <NavLinks style={linkAnimation}>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <ShoppingCartWrapper>
              <button
                className="snipcart-checkout"
                style={{
                  WebkitAppearance: 'none',
                  border: 'none',
                  background: 'none',
                  marginLeft: '0.5rem',
                }}>
                <img src={ShoppingBag} height="25px" />
              </button>
              <span className="snipcart-items-count"></span>
              <span className="snipcart-total-price"></span>
            </ShoppingCartWrapper>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
    </>
  );
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #FAF6EB;
  z-index: 10;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 6rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #CC8E20;
    text-transform: lowercase;
    font-family: 'Jost', 'Oswald', sans-serif;
    font-weight: 400;
    letter-spacing: 3px;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid #CC8E20;
    }

    @media (max-width: 1020px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;
  position: absolute;
  right: 1rem;
  top: 1rem;

  @media (min-width: 1020px) {
    display: none;
  }
`;

const ShoppingCartWrapper = styled.span`
  position: relative;

  @media (max-width: 1020px) {
    position: absolute;
    right: 27px;
    top: -16px;
  }
`;
