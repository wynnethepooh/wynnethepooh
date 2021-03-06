// @flow
import React from 'react';
import styled from 'styled-components';

const Burgermenu = (props: Props) => {
  return (
    <Wrapper
      isHomePage={props.isHomePage}
      onClick={props.handleNavbar}>
      <div className={ props.navbarState ? 'open' : '' }>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>
    </Wrapper>
  );
};

type Props = {
  navbarState: bool,
  handleNavbar: () => void,
  isHomePage?: bool
};

export default Burgermenu;

const Wrapper = styled.div`
  position: relative;
  padding-top: 1.2rem;
  cursor: pointer;
  display: block;

  & span {
    background: ${(props) => (props.isHomePage ? 'white' : '#CC8E20')};
    display: block;
    position: relative;
    width: 2rem;
    height: .13rem;
    margin-bottom: .55rem;
    transition: all ease-in-out 0.2s;
  }

  .open span:nth-child(2) {
      opacity: 0;
    }

  .open span:nth-child(3) {
    transform: rotate(45deg);
    top: -11px;
    background: #CC8E20;
  }

  .open span:nth-child(1) {
    transform: rotate(-45deg);
    top: 11px;
    background: #CC8E20;
  }

`;
