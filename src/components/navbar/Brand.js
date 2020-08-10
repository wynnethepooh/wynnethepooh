import React from 'react'
import { Link } from "gatsby"
import styled from "styled-components";

const Brand = () => {
  return (
    <Link to="/">
      <TitleHeader className="app-title-header no-wrap">
        <svg viewBox="0 -25 450 170" height="95px">
          <Path
            id="curve"
            d="M 50,75 Q 150,-30 250,75 T 450,75" />
          <Text x="0">
            <textPath xlinkHref="#curve">
              wynne the pooh
            </textPath>
          </Text>
        </svg>
      </TitleHeader>
    </Link>
  )
}

export default Brand

const Path = styled.path`
  fill: transparent
`;

const Text = styled.text`
  font-family: 'Jost', sans-serif;
  font-size: 45px;
  letter-spacing: 11px;
  fill: #CC8E20;

`;

const TitleHeader = styled.div`
  background-color: #FAF6EB; /* #E1B94E (mustard)*/
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  font-size: calc(5px + 1vmin);
  font-family: Helvetica, sans-serif;
  color: #CC8E20;
  z-index: 11;
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