import React, { useState, useContext, useEffect, useCallback } from 'react'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import StoreContext from '../../context/StoreContext'

const ProductForm = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    openCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId, variants]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  const handleOptionChange = (optionIndex, { target }) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity);
    openCart();
  }

  /*
  Using this in conjunction with a select input for variants
  can cause a bug where the buy button is disabled, this
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways -
  at least if the have a sense for good design lol.
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  return (
    <>
      <Price>{price}</Price>
      <ProductDescription>
        <div
          dangerouslySetInnerHTML={{
            __html: product.descriptionHtml,
          }} />
      </ProductDescription>
      <VariantFlexContainer>
        {options.size > 1 &&
          options.map(({ id, name, values }, index) => (
            <React.Fragment key={id}>
              <Label htmlFor={name}>{name} </Label>
              <Select
                name={name}
                key={id}
                onChange={event => handleOptionChange(index, event)}
              >
                {values.map(value => (
                  <option
                    value={value}
                    key={`${name}-${value}`}
                    disabled={checkDisabled(name, value)}
                  >
                    {value}
                  </option>
                ))}
              </Select>
              <br />
            </React.Fragment>
        ))}
      </VariantFlexContainer>
      <FlexContainer>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
        />
        <br />
        <Button
          type="submit"
          disabled={!available || adding}
          onClick={handleAddToCart}
        >
          add to cart
        </Button>
      </FlexContainer>
      {!available && <p>This Product is out of Stock!</p>}
    </>
  )
}

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default ProductForm

const ProductDescription = styled.div`
  text-transform: lowercase;
  text-align: left;

  @media (max-width: 700px) {
    margin: 20px 0;
  }
`;

const Price = styled.h3`
  text-align: left;
  margin-top: 0;
  font-weight: normal;
`;

const FlexContainer = styled.div`
  display: flex;
  margin-top: 20px;
  text-transform: lowercase;
`;

const VariantFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  text-transform: lowercase;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 20px;
  background: #FFFDFA;
  border: none;
  border-radius: 3px;
  color: #52504B;
  width: 30px;
  text-align: center;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  background: #CD7F5D;
  color: white;
  font-family: 'Jost', sans-serif;
  padding: 10px 20px;
  font-size: 16px;
`;

const Label = styled.label`
  padding: 10px 0;
  text-align: left;
`;

const Select = styled.select`
  padding: 10px;
  text-transform: lowercase;
  border-radius: 3px;
  border: none;
  background: #FFFDFA;
  color: #52504B;
  width: fit-content;
`;