import React, { useContext } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import StoreContext from '../../context/StoreContext'

const LineItem = props => {
  const { item } = props
  const {
    removeLineItem,
    store: { client, checkout },
    closeCart,
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <ProductImage
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
      onClick={closeCart}
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(
        option => (option.name === 'Title' && option.value === 'Default Title') ? '' : `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }

  return (
    <ListItem>
      {console.log(item)}
      <FlexContainer>
        <Link to={`/product/${item.variant.product.handle}/`}>
          {variantImage}
        </Link>
        <Details>
          <Title>
            {item.title}
          </Title>
          {`  `}
          <VariantTitle>
            {item.variant.title === !'default title' ? item.variant.title : ''}
          </VariantTitle>
          {selectedOptions}
          <div>
            quantity: {item.quantity}
          </div>
        </Details>
      </FlexContainer>
      <RemoveButton onClick={handleRemove}>
        remove x
      </RemoveButton>
    </ListItem>
  )
}

export default LineItem

const ListItem = styled.li`
  display: flex;
  margin-bottom: 30px;
  position: relative;
  max-width: 300px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const ProductImage = styled.img`
  width: 70px;
`;

const Content = styled.div`
  padding: 0 0 0 20px;
`;

const Title = styled.p`
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const VariantTitle = styled.div`
  font-size: smaller;
  margin-bottom: 10px;
`;

const QuantityUpdate = styled.button`
  border: none;
  background: none;
  font-size: larger;
  padding: 0;
  cursor: pointer;
`;

const Quantity = styled.span`
  margin: 0 10px 0 10px
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RemoveButton = styled.button`
  border: none;
  background: none;
  font-family: 'Jost', sans-serif;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: smaller;
  white-space: nowrap;

  @media (max-width: 420px) {
    right: 10px;
  }
`;