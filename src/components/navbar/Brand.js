import React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';

const Brand = (props) => {
  return (
    <Link to="/">
      {!props.isHomePage &&
        <TitleHeader className="app-title-header no-wrap">
          <Svg viewBox="0 -25 450 170" height="130px">
            <Curve
              id="curve"
              d="M 50,75 Q 150,-30 250,75 T 450,75" />
            <Text x="0">
              <textPath xlinkHref="#curve">
                wynne the pooh
              </textPath>
            </Text>
          </Svg>
        </TitleHeader>
      }
      {props.isHomePage &&
        <HomepageTitleHeader className="app-title-header no-wrap">
          <Svg viewBox="0 -25 450 170" height="150px">
            <Curve
              id="curve"
              d="M 50,75 Q 150,-30 250,75 T 450,75" />
            <Text x="0">
              <textPath xlinkHref="#curve">
                wynne the pooh
              </textPath>
            </Text>
          </Svg>
        </HomepageTitleHeader>
      }
    </Link>
  );
};

export default Brand;

const Svg = styled.svg`
  @media (max-width: 550px) {
    width: 100%;
  }
`;

const Curve = styled.path`
  fill: transparent
`;

const Text = styled.text`
  font-family: 'Jost', sans-serif;
  font-size: 45px;
  letter-spacing: 11px;
  fill: #CC8E20;

`;

const TitleHeader = styled.div`
  /*background-color: #FAF6EB; /* #E1B94E (mustard)*/
  display: flex;
  flex-direction: column;
  align-items: start;
  /* justify-content: center; */
  font-size: calc(5px + 1vmin);
  font-family: Helvetica, sans-serif;
  color: #CC8E20;
  z-index: 11;
  margin: 5px 0 0 -20px;
  @media (max-width: 550px) {
    width: 43vw;
    margin: -15px 0 0 -10px;
  }
`;

const HomepageTitleHeader = styled.div`
  /*background-color: #FAF6EB; /* #E1B94E (mustard)*/
  display: flex;
  flex-direction: column;
  align-items: start;
  /* justify-content: center; */
  font-size: calc(5px + 1vmin);
  font-family: Helvetica, sans-serif;
  color: #CC8E20;
  z-index: 11;
  margin: -7px 0 0 -20px;
  @media (max-width: 550px) {
    width: 75vw;
    margin: 0px 0 0 -20px;
  }
`;

const Title = styled.div`
  font-size: calc(47px + 1vmin);
  font-family: PalmCanyonDrive;
  font-weight: normal;
  margin: 0;
  padding: 0 5px;
  z-index: 11;
`;

const Subtitle = styled.h2`
  letter-spacing: 3px;
  font-size: calc(5px + 1vmin);
  font-family: 'Oswald', sans-serif;
  /* font-family: 'Fjalla One', sans-serif; */
  padding: 0;
  margin: -7px 0 0 -63px;
  color: #CC8E20;
`;
