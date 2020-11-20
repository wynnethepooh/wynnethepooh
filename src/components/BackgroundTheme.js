import React from 'react';
import styled from 'styled-components';

import WavyTerracotta from '../images/wavy-terracotta.png';

const BackgroundTheme = (props) => {

  return (
    <>
      <SmallCircle isHomePage={props.isHomePage} />
      <BackgroundImg src={WavyTerracotta} />
    </>
  );
};

export default BackgroundTheme;

const SmallCircle = styled.div`
  min-width: 70vh;
  width: 70vw;
  min-height: 70vh;
  height: 70vw;
  background: ${(props) => (props.isHomePage ? '#CC8E20' : '#E8C1B7')};
  border-radius: 50%;
  position: fixed;
  z-index: 0;
  right: 45vw;
  bottom: 70vh;

  @media(max-width: 550px) {
    left: -70vw;
  }
`;

const BackgroundImg = styled.img`
  height: 60vh;
  z-index: 0;
  position: fixed;
  bottom: 0;
  right: 0;

  @media(max-width: 550px) {
    height: 50vh;
  }
`;