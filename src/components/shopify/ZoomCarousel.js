import React, {Component} from 'react';
import styled from 'styled-components';
import ReactImageMagnify from '@milosmladenovicwork/react-image-magnify';
import ReactSlick from 'react-slick';

import './react-slick.css';

const ZoomCarousel = (props) => {
  const {
    rimProps,
    rsProps,
  } = props;

  const dataSource = [];

  props.images.map((image) => (
    dataSource.push({
      imgSrc: image.originalSrc,
      alt: props.alt || '',
    })
  ));

  return (
    <CarouselContainer>
      <ReactSlick
        {...{
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        }}
        {...rsProps}
      >
        {dataSource.map((src, index) => (
          <div key={index}>
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: src.alt,
                  isFluidWidth: true,
                  src: src.imgSrc,
                  sizes: '(max-width: 400px) 400px',
                },
                largeImage: {
                  src: src.imgSrc,
                  width: 1426,
                  height: 2000,
                },
                lensStyle: {backgroundColor: 'rgba(0,0,0,.6)'},
              }}
              {...rimProps}
            />
          </div>
        ))}
      </ReactSlick>
    </CarouselContainer>
  );
};

export default ZoomCarousel;

const CarouselContainer = styled.div`
  width: 400px;
  min-width: 400px;

  @media (max-width: 700px) {
    width: 80vw;
    min-width: 80vw;
  }
`;
