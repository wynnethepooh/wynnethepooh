// @flow
import React, {useState} from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';
import Collapse from "@kunukn/react-collapse";

import {useSpring, animated} from 'react-spring';

const CollapseMenu = (props: Props) => {
  const {open} = useSpring({open: props.navbarState ? 0 : 1});
  const ishomepage = props.isHomePage ? 'true' : '';

  const [areSublinksOpen, setSublinksOpen] = useState(false);

  const toggleSublinks = () => {
    setSublinksOpen(!areSublinksOpen);
  }

  const shopifyCollectionLinks =
    props.shopifyCollections.map((shopifyCollection) => (
      <>
        {shopifyCollection.products &&
            shopifyCollection.products.length > 0 &&
            !shopifyCollection.title.includes("early access") &&
          <li>
            <Link
                to={`/collection/${shopifyCollection.handle}`}
                key={shopifyCollection.handle}>
              {shopifyCollection.title}
            </Link>
          </li>
        }
      </>
    ),
  );

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        ishomepage={ishomepage}
        style={{
          transform: open.interpolate({
            range: [0, 0.2, 0.3, 1],
            output: [0, -20, 0, -200],
          }).interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <NavLinks>
          <li><Link to="/" onClick={props.handleNavbar}>Home</Link></li>
          <li>
            <Link to="/shop" onClick={props.handleNavbar}>Shop</Link>
            {areSublinksOpen &&
              <MoreButton onClick={toggleSublinks}>--</MoreButton>
            }
            {!areSublinksOpen &&
              <MoreButton onClick={toggleSublinks}>+</MoreButton>
            }
          </li>
          <Collapse isOpen={areSublinksOpen}>
            <CollectionLinks>
              {shopifyCollectionLinks}
            </CollectionLinks>
          </Collapse>
          <li><Link to="/about" onClick={props.handleNavbar}>About</Link></li>
          <li>
            <Link to="/contact" onClick={props.handleNavbar}>
              Contact
            </Link>
          </li>
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

type Props = {
  navbarState: bool,
  handleNavbar: () => void,
  isHomePage?: bool,
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background: rgb(250, 246, 235, 0.97);
  position: fixed;
  padding-top: ${(props) => (props.ishomepage ? '0' : '5rem')};
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0.5rem 5vh;
  overflow-y: auto;
  max-height: 74vh;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 1.4rem;
    letter-spacing: 3px;
    line-height: 2;
    color: #CC8E20;
    text-transform: lowercase;
    font-family: 'Jost', 'Oswald', sans-serif;
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid #CC8E20;
    }
  }

  .collapse-css-transition {
    transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const CollectionLinks = styled.div`
  display: flex;
  z-index: 0;
  flex-direction: column;
  position: relative;
  left: 20px;
  z-index: 0;
  padding: 10px 0;

  li {
    padding: 7px 0;
  }

  a {
    letter-spacing: 1px;
    font-size: 1.2rem;
    line-height: 1.2rem;
  }
`;

const MoreButton = styled.button`
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  border: none;
  color: #CC8E20;
  background: none;
  font-family: 'Jost', sans-serif;
  text-transform: lowercase;
  font-size: x-large;
  margin-left: 10px;
`;