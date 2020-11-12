// @flow
import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';
import {useSpring, animated, config} from 'react-spring';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';

import ShoppingBag from '../../images/shopping-bag.png';

const Navbar = (props: Props) => {
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

  const ishomepage = props.isHomePage ? "true" : "";

  return (
    <>
      <NavBar ishomepage={ishomepage} style={barAnimation}>
        <FlexContainer>
          {!props.isHomePage &&
            <Link to="/">
              <Brand isHomePage={props.isHomePage}/>
            </Link>
          }
          <NavLinks ishomepage={ishomepage} style={linkAnimation}>
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
              isHomePage={props.isHomePage}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
        isHomePage={props.isHomePage}
      />
    </>
  );
};

type Props = {
  isHomePage?: bool,
  navbarState: bool,
  handleNavbar: () => void
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: none;
  z-index: 10;
  font-size: 1.4rem;

  -o-transition:.3s;
  -ms-transition:.3s;
  -moz-transition:.3s;
  -webkit-transition:.3s;
  transition:.3s;

  &:hover {
    background: ${(props) => (props.ishomepage == "true" ? '#FAF6EB' : 'none')};
    color: #CC8E20;

    @media (max-width: 1020px) {
        background: none;
    }
  }

  &:hover a {
    color: #CC8E20;
  }

  img {
    filter: ${(props) => (props.ishomepage == "true" ? 'brightness(0) invert(1)' : '')};
  }

  &:hover img {
    @media (min-width: 1020px) {
      filter: none;
    }
  }

  @media (max-width: 1020px) {
    width: ${(props) => (props.ishomepage == "true" ? '65px' : '')};
    right: ${(props) => (props.ishomepage == "true" ? '0' : '')};
    left: ${(props) => (props.ishomepage == "true" ? 'auto' : '0')};
  }
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
  position: absolute;
  right: 90px;
  top: 30px;

  & a {
    color: ${(props) => (props.ishomepage == "true" ? 'white' : '#CC8E20')};
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

const ShoppingCartWrapper = styled.div`
  position: relative;
  background: none;
  display: inline;

  @media (max-width: 1020px) {
    position: absolute;
    right: 27px;
    top: -16px;
  }
`;

const ShoppingIcon = styled.img`
  height: 25px;
  margin: 19px -12px 0 0;

  @media (min-width: 1020px) {
    margin: auto auto -3px auto;
  }
`;
