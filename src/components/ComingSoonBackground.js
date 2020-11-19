import React from 'react';
import styled from 'styled-components';

import ComingSoonImage from '../images/terracotta-hanging-planters.jpeg';

const ComingSoonBackground = () => {

  return (
    <ComingSoonContainer>
      <Img src={ComingSoonImage} />
      <BigCircle />
      <SmallCircle />
      <Text>coming soon...</Text>
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

const BigCircle = styled.div`
  width: 100vw;
  min-width: 100vh;
  height: 100vw;
  min-height: 100vh;
  background: #CD7F5D;
  border-radius: 50%;
  position: fixed;
  z-index: 0;
  left: 30vw;
  top: 30vh;
`;

const SmallCircle = styled.div`
  min-width: 80vh;
  width: 80vw;
  min-height: 80vh;
  height: 80vw;
  background: #CC8E20;
  border-radius: 50%;
  position: fixed;
  z-index: 0;
  right: 30vw;
  top: 60vh;
`;

const Img = styled.img`
  height: 60vh;
  z-index: 1;
  position: fixed;
  vertical-align: middle;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  @media(max-width: 550px) {
    height: 70vh;
    max-width: 70vw;
    height: auto;
  }
`;

const Text = styled.h1`
  font-family: 'Jost', sans-serif;
  font-weight: 500;
  font-size: 3rem;
  letter-spacing: 3px;
  color: white;
  z-index: 3;
  position: fixed;
  bottom: 10vh;
  right: 10vw;

  @media (max-width: 700px) {
    font-size: 1.5rem;
    white-space: nowrap;
    bottom: 17vh;
  }

  @media (max-width: 320px) {
    font-size: 1.2rem;
    white-space: nowrap;
  }
`;