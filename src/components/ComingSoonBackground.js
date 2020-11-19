import React from 'react';
import styled from 'styled-components';

import WavyTerracotta from '../images/wavy-terracotta.png';

const ComingSoonBackground = () => {

  return (
    <ComingSoonContainer>
      <SmallCircle />
      <BackgroundImg src={WavyTerracotta} />
      <ComingSoonText>first collection drops<br /> 11.21.20 at 10am PST</ComingSoonText>
    </ComingSoonContainer>
  );
};

export default ComingSoonBackground;

const ComingSoonContainer = styled.div`
  height: 70vh;
  position: relative;

  @media(min-width: 550px) {
    padding-top: 20vh;
  }
`;

const SmallCircle = styled.div`
  min-width: 80vh;
  width: 80vw;
  min-height: 80vh;
  height: 80vw;
  background: #E8C1B7;
  border-radius: 50%;
  position: fixed;
  z-index: 0;
  right: 40vw;
  bottom: 75vh;

  @media(max-width: 550px) {
    left: -70vw;
  }
`;

const BackgroundImg = styled.img`
  height: 60vh;
  z-index: 1;
  position: fixed;
  bottom: 0;
  right: 0;

  @media(max-width: 550px) {
    height: 50vh;
  }
`;

const ComingSoonText = styled.div`
  font-family: 'Jost', sans-serif;
  font-weight: 500;
  font-size: 3rem;
  letter-spacing: 1px;
  color: #CC8E20;
  z-index: 3;

  position: fixed;
  width: 100%;
  margin: auto;
  text-align: center;
  left: 0;
  top: 40%;
  height: 70vh;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;

  @media (max-width: 700px) {
    font-size: 1.5rem;
  }

  @media (max-width: 320px) {
    font-size: 1.2rem;
  }
`;