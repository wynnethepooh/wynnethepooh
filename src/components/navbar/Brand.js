// @flow
import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';

const Brand = (props: Props) => {
  return (
    <Link to="/">
      <TitleHeader
        isHomePage={props.isHomePage}
        className="app-title-header no-wrap">
        <Svg
          isHomePage={props.isHomePage}
          viewBox="0 -25 450 170" height="130px">
          <Curve
            id="curve"
            d="M 50,75 Q 150,-30 250,75 T 450,75" />
          <Text isHomePage={props.isHomePage} x="0">
            <textPath xlinkHref="#curve">
              wynne the pooh
            </textPath>
          </Text>
        </Svg>
      </TitleHeader>
    </Link>
  );
};

type Props = {
  isHomePage?: bool,
};

export default Brand;

const Svg = styled.svg`
  width: ${(props) => (props.isHomePage ? '90vw' : '')};
  height: ${(props) => (props.isHomePage ? '700px' : '')};

  @media (max-width: 550px) {
    width: 100%;
  }
`;

const Curve = styled.path`
  fill: transparent
`;

const Text = styled.text`
  font-family: 'Jost', sans-serif;
  font-weight: 500;
  font-size: 45px;
  letter-spacing: 11px;
  fill: ${(props) => (props.isHomePage ? 'white' : '#CC8E20')};

`;

const TitleHeader = styled.div`
  /*background-color: #FAF6EB; /* #E1B94E (mustard)*/
  display: flex;
  flex-direction: column;
  align-items: start;
  /* justify-content: center; */
  font-size: calc(5px + 1vmin);
  font-family: Helvetica, sans-serif;
  z-index: 11;
  margin: ${(props) => (props.isHomePage ? '-7px 0 0 -20px' : '5px 0 0 -20px')};
  @media (max-width: 550px) {
    width: ${(props) => (props.isHomePage ? '100%' : '43vw')};
    margin: ${(props) => (props.isHomePage ? '0px 0 0 -20px' : '-15px 0 0 -10px')};
  }
`;
