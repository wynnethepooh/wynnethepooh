// @flow
import React, {useState} from 'react';

import styled from 'styled-components';

const BuyProduct = React.memo(({product, images}) => {
  const [selected, setSelected] = useState(product.customFields.values[0]);
  const filteredImgs = images.filter((x) => x.name == selected);
  const choosenImgSrc = filteredImgs.length > 0 ?
    filteredImgs[0].src :
    images[0].src;

  return (
    <ProductOverview>
      <ProductImage src={choosenImgSrc} />

      <ProductDetails>
        <BuyButton>
          <CustomField>
            <h4 style={{marginTop: '13px', marginRight: '10px'}}>{product.customFields.name}</h4>
            <SelectWrapper>
              <Select
                id={product.customFields.name}
                onChange={(e) => setSelected(e.target.value)}
                value={selected}
                style={{
                  backgroundColor: '#EBE7DD',
                  border: 'none',
                  borderRadius: '5px',
                  paddingRight: '30px',
                  paddingBlockStart: '13px',
                  paddingBlockEnd: '13px',
                  marginRight: '10px',
                  appearance: 'none',
                }}>
                {product.customFields.values.map((x) => (<option key={x}>{x}</option>))}
              </Select>
            </SelectWrapper>
          </CustomField>

          <a
            style={{
              backgroundColor: '#CC8E21',
              borderRadius: '5px',
              color: '#F5F5F5',
              fontWeight: '500',
              paddingBottom: '15px',
              paddingTop: '12px',
              paddingRight: '35px',
              paddingLeft: '35px',
              fontSize: '24',
              textAlign: 'center',
              maxWidth: '140px',
            }}
            id="buyButton"
            href='#'
            className='snipcart-add-item buyBtn'
            data-item-id={product.id}
            data-item-price={product.price}
            data-item-image={choosenImgSrc}
            data-item-name={product.title}
            data-item-description={product.description}
            data-item-custom1-name={product.customFields.name}
            data-item-custom1-value={selected}
            data-item-url={'https://wynnethepooh.com/' + product.path}>
            add to cart &nbsp;  ${product.price}
          </a>
        </BuyButton>

        <ProductDescription>
          <div dangerouslySetInnerHTML={{__html: product.description}} />

          <Dimensions>
            <DimensionsHeader>Dimensions</DimensionsHeader>
            {product.dimensions.map((dimension) => {
              return (
                <div key={dimension} dangerouslySetInnerHTML={{__html: '- ' + dimension}} />
              );
            })}
            <div>- Each piece is handmade so sizes may vary</div>
          </Dimensions>
        </ProductDescription>
      </ProductDetails>
    </ProductOverview>
  );
});

BuyProduct.displayName = 'BuyProduct';
export default BuyProduct;

const ProductOverview = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.img`
  width: 400px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const ProductDetails = styled.div`
  margin-left: 2.5vh;

  @media (max-width: 700px) {
    margin: 20px 0;
  }
`;

const BuyButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CustomField = styled.div`
  display: flex;
`;

const SelectWrapper = styled.div`
  overflow: hidden;
  position: relative;

  :after {
    content: "▾";
    padding: 12px 8px;
    position: absolute;
    right: 10px;
    top: 0;
    z-index: 1;
    text-align: center;
    width: 10%;
    pointer-events: none;
  }
`;

const Select = styled.select`
  border-radius: 0;
  border-color: #e0dcd1;
  padding: 15px;
  padding-right: 30px;
  margin-right: 10px;
  margin-bottom: 20px;
  -webkit-appearance: none;
  background-color: #FAF6EB;
  color: #52504B;
  font-size: 15px;
  font-family: 'Jost', sans-serif;
  text-transform: lowercase;
`;

const Dimensions = styled.div`
  margin-top: 20px;
  text-align: left;
  font-size: 14px;
`;

const DimensionsHeader = styled.h4`
  margin: 7px 0;
  font-weight: 500;
`;

const ProductDescription = styled.div`
  text-align: left;
`;
