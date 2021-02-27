// @flow

import React, {useContext, useState, useEffect} from 'react';
import {Link, graphql, useStaticQuery} from 'gatsby';
import Image from 'gatsby-image';
import get from 'lodash/get';
import {Helmet} from 'react-helmet';
import loadable from '@loadable/component';
import styled from 'styled-components';
import Collapse from "@kunukn/react-collapse";

import StoreContext from '../context/StoreContext';
import SEO from '../components/seo';
import BackgroundTheme from '../components/BackgroundTheme';

const Layout = loadable(() => import('../components/layout'));

const Shop = (props) => {
  const {
    store: {checkout},
  } = useContext(StoreContext);

  const {allShopifyCollection, allShopifyProduct} = useStaticQuery(
      graphql`
          query {
            site {
              siteMetadata {
                title
                author
              }
            }
            allShopifyProduct {
              edges {
                node {
                  id
                  title
                  handle
                  createdAt
                  images {
                    id
                    originalSrc
                    localFile {
                      childImageSharp {
                        fluid(maxWidth: 910) {
                          ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                      }
                    }
                  }
                  options {
                    name
                    values
                  }
                  tags
                  variants {
                    price
                    compareAtPrice
                  }
                  availableForSale
                }
              }
            }
            allShopifyCollection(sort: { fields: [products___availableForSale], order: DESC }) {
              edges {
                node {
                  title
                  description
                  handle
                  products {
                    id
                    title
                    handle
                    createdAt
                    images {
                      id
                      originalSrc
                      localFile {
                        childImageSharp {
                          fluid(maxWidth: 910) {
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
                          }
                        }
                      }
                    }
                    options {
                      name
                      values
                    }
                    tags
                    variants {
                      price
                      compareAtPrice
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        `,
  );

  const getPrice = (price) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'USD',
      minimumFractionDigits: 0,
      style: 'currency',
    }).format(parseFloat(price ? price : 0));

  const hasOptions = (options) => {
    return options.length >= 1 && options[0].name !== 'Title';
  }

  const shopifyProductList = (products) =>
      products && products.length > 0 ? (
        products
            .sort((a, b) => b.availableForSale - a.availableForSale)
            .filter(
              ({
                tags
              }) => (
                !tags.includes("early") && !tags.includes("florals")
              ))
            .map(
                ({
                  id,
                  handle,
                  title,
                  images: [firstImage],
                  options,
                  variants: [firstVariant],
                  availableForSale,
                  tags
                }) => (
                  <ProductDiv key={id}>
                    {!availableForSale &&
                      <SoldOutBanner>
                        Sold out
                      </SoldOutBanner>
                    }
                    {process.env.GATSBY_SELLING_FLORALS == true && availableForSale && tags.includes('vase') &&
                      <ProductBanner>
                        florals<br/>available
                      </ProductBanner>
                    }
                    <Link to={`/product/${handle}/`}>
                      {firstImage && firstImage.localFile && (
                        <GatsbyImg
                          fluid={firstImage.localFile.childImageSharp.fluid}
                          alt={handle}
                        />
                      )}
                      {firstImage && !firstImage.localFile && (
                        <Img
                          src={firstImage.originalSrc}
                          alt={handle}
                        />
                      )}
                    </Link>
                    <ProductInformation>
                      <ProductTitle>
                        <Link style={{boxShadow: 'none'}} to={`/product/${handle}/`}>
                          {title}
                        </Link>
                      </ProductTitle>
                      <PriceFlexbox>
                        {availableForSale && firstVariant.compareAtPrice &&
                          <>
                            <strike>
                              <ProductPrice>{getPrice(firstVariant.compareAtPrice)}</ProductPrice>
                            </strike>
                            <SaleProductPrice>{getPrice(firstVariant.price)}</SaleProductPrice>
                          </>
                        }
                        {availableForSale && !firstVariant.compareAtPrice &&
                          <ProductPrice>{getPrice(firstVariant.price)}</ProductPrice>
                        }
                      </PriceFlexbox>
                      {hasOptions(options) &&
                        <ProductOptions>{options[0].values.length} {options[0].name} options available</ProductOptions>
                      }
                    </ProductInformation>
                  </ProductDiv>
                ),
            )
      ) : (
        <p>No Products found!</p>
      );

  const shopifyCollections = []

  allShopifyCollection.edges?.map(
    ({
      node: {
        title,
        handle,
        description,
        products,
      },
    }) => (
      shopifyCollections.push(
        <>
          {products && products.length > 0 &&
              handle.includes("new-arrivals") &&
            <CollectionDiv key={title}>
              <CollectionTitle>{title}</CollectionTitle>
              <CollectionDescription>{description}</CollectionDescription>
              <ProductList>
                {shopifyProductList(products)}
              </ProductList>
            </CollectionDiv>
          }
        </>
      )
    ),
  )

  allShopifyCollection.edges?.map(
    ({
      node: {
        title,
        handle,
        description,
        products,
      },
    }) => (
      shopifyCollections.push(
        <>
          {products && products.length > 0 &&
              !title.includes("early access") &&
              !handle.includes("new-arrivals") &&
            <CollectionDiv key={title}>
              <CollectionTitle>{title}</CollectionTitle>
              <CollectionDescription>{description}</CollectionDescription>
              <ProductList>
                {shopifyProductList(products)}
              </ProductList>
            </CollectionDiv>
          }
        </>
      )
    ))

  const allProductData = [];
  allShopifyProduct.edges
    .filter(
      ({
        node: {
          tags
        }
      }) => (
        !tags.includes("early") && !tags.includes("florals")
      ))
    .map(
      ({
        node: {
          id,
          handle,
          title,
          images: [firstImage],
          options,
          variants: [firstVariant],
          availableForSale,
          tags
        },
      }) => (
        allProductData.push({
          id: id,
          handle: handle,
          title: title,
          firstImage: firstImage,
          options: options,
          firstVariant: firstVariant,
          availableForSale: availableForSale,
          tags: tags
        })
      ))

  var tagSet = new Set();
  allProductData.map(node => (
    node.tags.map(tag => {
      if (tag != "vase") {
        tagSet.add(tag)
      }
    })
  ))

  const getFilterCheckboxes = () => {
    const filterCheckboxes = []
    for (let tag of tagSet) {
      filterCheckboxes.push(
        <FilterLabel>
          <span className="checkmark"></span>
          <input
            type="checkbox"
            name="available"
            onClick={(e) => handleFilter(tag, e)} />
          {tag}
        </FilterLabel>
      )
    }
    return filterCheckboxes;
  }

  const [filteredData, setFilteredData] = useState(allProductData);
  const [filteredProductCount, setFilteredProductCount] = useState(allProductData.length);

  const filteredProductList = () => {
    return (
      <ProductList>
        {filteredData.map((node) => (
          <ProductDiv key={node.id}>
            {!node.availableForSale &&
              <SoldOutBanner>
                Sold out
              </SoldOutBanner>
            }
            {process.env.GATSBY_SELLING_FLORALS == true && node.availableForSale && node.tags.includes('vase') &&
              <ProductBanner>
                florals<br/>available
              </ProductBanner>
            }
            <Link to={`/product/${node.handle}/`}>
              {node.firstImage && node.firstImage.localFile && (
                <GatsbyImg
                  fluid={node.firstImage.localFile.childImageSharp.fluid}
                  alt={node.handle}
                />
              )}
              {node.firstImage && !node.firstImage.localFile && (
                <Img
                  src={node.firstImage.originalSrc}
                  alt={node.handle}
                />
              )}
            </Link>
            <ProductInformation>
              <ProductTitle>
                <Link style={{boxShadow: 'none'}} to={`/product/${node.handle}/`}>
                  {node.title}
                </Link>
              </ProductTitle>
              <PriceFlexbox>
                {node.availableForSale && node.firstVariant.compareAtPrice &&
                  <>
                    <strike>
                      <ProductPrice>{getPrice(node.firstVariant.compareAtPrice)}</ProductPrice>
                    </strike>
                    <SaleProductPrice>{getPrice(node.firstVariant.price)}</SaleProductPrice>
                  </>
                }
                {node.availableForSale && !node.firstVariant.compareAtPrice &&
                  <ProductPrice>{getPrice(node.firstVariant.price)}</ProductPrice>
                }
              </PriceFlexbox>
              {hasOptions(node.options) &&
                <ProductOptions>{node.options[0].values.length} {node.options[0].name} options available</ProductOptions>
              }
            </ProductInformation>
          </ProductDiv>
        ))}
      </ProductList>
    )
  }

  const shopifyCollectionLinks = [];
  allShopifyCollection.edges
    .filter(({ node: { handle }}) => (
        handle.includes("new-arrivals")
      ))
    .map(
      ({
        node: {
          title,
          handle,
          products,
        },
      }) => (
        shopifyCollectionLinks.push(
          <>
            {products && products.length > 0 && !title.includes("early access") &&
              <Link
                  to={`/collection/${handle}`}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '7px 20px'
                  }}
                  key={title}>
                {title}
              </Link>
            }
          </>
        )
      ),
    )

  allShopifyCollection.edges
    .filter(({ node: { handle }}) => (
        !handle.includes("new-arrivals")
      ))
    .map(
      ({
        node: {
          title,
          handle,
          products,
        },
      }) => (
        shopifyCollectionLinks.push(
          <>
            {products && products.length > 0 && !title.includes("early access") &&
              <Link
                  to={`/collection/${handle}`}
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '7px 20px'
                  }}
                  key={title}>
                {title}
              </Link>
            }
          </>
        )
      )
    )

  const [openFilters, setOpenFilters] = useState(false);
  const [checkFilters, setCheckFilters] = useState(new Set());
  const [anyFilterChecked, setAnyFilterChecked] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(shopifyCollections);

  const toggleClick = () => {
    setOpenFilters(!openFilters)
  }

  const updateDisplayedProducts = () => {
    let anyFilters = false;
    let updatedFilteredData = allProductData;

    if (checkFilters.size > 0) {
      for (let checkFilter of checkFilters) {
        if (checkFilter == "available") {
          updatedFilteredData = [...updatedFilteredData].filter(
            ({
              availableForSale,
              tags
            }) => (
              availableForSale == true && !tags.includes("early")
            ))
        } else {
          updatedFilteredData = updatedFilteredData.filter(
            ({
              tags
            }) => (
              tags.includes(checkFilter)
            )
          )
        }
        anyFilters = true;
      }
    }

    updatedFilteredData.sort((a, b) => b.availableForSale - a.availableForSale)

    setFilteredData(updatedFilteredData);
    setFilteredProductCount(updatedFilteredData.length);
    setAnyFilterChecked(anyFilters);
  }

  useEffect(() => {
    setDisplayedProducts(anyFilterChecked ? filteredProductList() : shopifyCollections);
  }, [filteredData]);

  const handleAvailable = (event) => {
    const currentCheckFilters = checkFilters;
    if (event.target.checked) {
      currentCheckFilters.add("available");
    } else {
      currentCheckFilters.delete("available");
    }

    setCheckFilters(currentCheckFilters);
    updateDisplayedProducts();
  }

  const handleFilter = (tag, event) => {
    const currentCheckFilters = checkFilters;
    if (event.target.checked) {
      currentCheckFilters.add(tag);
    } else {
      currentCheckFilters.delete(tag);
    }

    setCheckFilters(currentCheckFilters);
    updateDisplayedProducts();
  }

  const siteTitle = get(this, 'props.data.site.siteMetadata.title');
  const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description',
  );


  return (
    <>
      <SEO title="shop"/>
      <Layout shopifyCollections={props.shopifyCollections}>
        <ShopPage>
          <ShopTitle>
            shop
          </ShopTitle>
          <CollectionLinks>
            {shopifyCollectionLinks}
          </CollectionLinks>
          <FilterDiv>
            <div>
              <FilterButton onClick={toggleClick}>
                Filter
                {openFilters &&
                  <span> --</span>
                }
                {!openFilters &&
                  <span> +</span>
                }
              </FilterButton>
              <Collapse isOpen={openFilters}>
                <FilterList>
                  <FilterLabel>
                    <span className="checkmark"></span>
                    <input
                      type="checkbox"
                      name="available"
                      onClick={handleAvailable} />
                    Available
                  </FilterLabel>
                  <FilterCategory>clays</FilterCategory>
                  {getFilterCheckboxes()}
                </FilterList>
              </Collapse>
            </div>
            <div>{filteredProductCount} results</div>
          </FilterDiv>
          {displayedProducts}
        </ShopPage>
      </Layout>
    </>
  );
};

type Props = {};

export default Shop;

const ShopPage = styled.div`
  padding: 2.5vh 5vh 2.5vh 5vh;

  @media (max-width: 700px) {
    padding: 2.5vh 3vh;
  }
`;

const ShopTitle = styled.h1`
  text-align: center;
  font-size: xx-large;
  padding: 50px 0 40px 0;

  @media (max-width: 550px) {
    padding: 0 0 20px 0;
  }
`;

const CollectionLinks = styled.div`
  display: flex;
  width: 92vw;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    margin-bottom: 30px;
  }

  @media (max-width: 550px) {
    margin-bottom: 20px;
    width: 100vw;
    left: -3vh;
    position: relative;
    flex-wrap: nowrap;
    justify-content: flex-start;

    overflow-x: auto;
    -ms-overflow-style: none;  /* hide scrollbar on Internet Explorer 10+ */
    scrollbar-width: none;  /* hide scrollbar on Firefox */

    ::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }
  }
`;

const ProductList = styled.div`
  position: relative;
  left: -50px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    left: 0;
    justify-content: space-between;
  }
`;

const CollectionDiv = styled.div`
  margin: 50px 0 0 0;
  width: 97vw;

  @media (max-width: 700px) {
    margin: 0 0 20px 0;
    width: auto
  }
`;

const CollectionTitle = styled.h1`
  color: #CC8E20;
  padding-bottom: 5px;
`;

const CollectionDescription = styled.p`
  margin: 0 0 30px;
  color: #CC8E20;
`;

const ProductDiv = styled.div`
  padding: 5px 0 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 20px;

  @media (max-width: 700px) {
    padding: 0px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 45%;
  }
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

const SoldOutBanner = styled.div`
  text-transform: lowercase;
  position: absolute;
  top: 40px;
  right: -5px;
  background-color: #CD7F5D;
  color: white;
  padding: 3px 7px;
  z-index: 1;

  @media (max-width: 700px) {
    top: 15px;
    right: -5px;
  }
`;

const ProductBanner = styled.div`
  text-transform: lowercase;
  position: absolute;
  top: 35px;
  right: -10px;
  background-color: #CC8E20;
  color: white;
  padding: 3px 7px;
  z-index: 1;
  width: 85px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    width: 55px;
    height: 60px;
    font-size: small;
    top: 10px;
    right: -5px;
  }
`;

const ProductImage = styled.img`
  width: 250px;

  @media(max-width: 700px) {
    width: 100%;
  }
`;

const ProductTitle = styled.p`
  overflow-wrap: break-word;
  text-align: left;
  padding-right: 10px;
  text-transform: lowercase;
  margin: 10px 0 0 0;
  font-size: 1rem;

  a {
    font-weight: normal;
    color: #52504B;
  }

`;

const PriceFlexbox = styled.div`
  display: flex;
`;

const ProductPrice = styled.p`
  font-weight: normal;
  white-space: nowrap;
  text-align: left;
  margin: 5px 0 0 0;
  font-size: 0.85rem;
`;

const SaleProductPrice = styled.p`
  font-weight: 500;
  white-space: nowrap;
  text-align: left;
  margin: 5px 0 0 0;
  font-size: 0.85rem;
  color: #CD7F5D;
  margin-left: 10px;
`;

const ProductOptions = styled.p`
  font-style: italic;
  font-size: 14.5px;
  margin: 10px 0;
`;

const GatsbyImg = styled(Image)`
  position: relative;
  width: 250px;

  @media(max-width: 700px) {
    width: 43vw;
  }

  @media(max-width: 550px) {
    width: 41vw;
  }
`;

const Img = styled.img`
  position: relative;
  width: 250px;

  @media(max-width: 700px) {
    width: 43vw;
  }

  @media(max-width: 550px) {
    width: 41vw;
  }
`;

const ComingSoonContainer = styled.div`
  height: 70vh;
  position: relative;

  @media(min-width: 550px) {
    padding-top: 20vh;
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

const FilterDiv = styled.div`
  border-color: #CC8E20;
  border-style: solid;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-left: none;
  border-right: none;
  margin: 30px 0;
  padding: 10px 0;
  text-align: left;
  color: #CC8E20;
  display: flex;
  justify-content: space-between;

  .collapse-css-transition {
    transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const FilterButton = styled.button`
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  border: none;
  color: #CC8E20;
  background: none;
  font-family: 'Jost', sans-serif;
  text-transform: lowercase;
  font-size: medium;
  padding: 0;
`;

const FilterList = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
`;

const FilterLabel = styled.label`
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input {
    margin-right: 7px;
    top: 2px;
    position: relative;
  }
`;

const FilterCategory = styled.h4`
  font-weight: 500;
  margin-bottom: 10px;
`;

//  input {
//    position: absolute;
//    opacity: 0;
//    cursor: pointer;
//    height: 0;
//    width: 0;
//
//    :checked ~ .checkmark {
//      background-color: #2196F3;
//    }
//  }
//
//  .checkmark {
//    position: relative;
//    display: inline-block;
//    top: 2px;
//    left: 0;
//    height: 15px;
//    width: 15px;
//    background-color: #FFFCF5;
//    border-color: #CC8E20;
//    border-style: solid;
//    border-width: 1px;
//    margin-right: 10px;
//  }
//
//  /* Create the checkmark/indicator (hidden when not checked) */
//  .checkmark:after {
//    content: "";
//    position: absolute;
//    display: none;
//  }
//
//  /* Show the checkmark when checked */
//  input:checked ~ .checkmark:after {
//    display: block;
//  }
//
//  /* When the checkbox is checked, add a blue background */
//  input:checked ~ .checkmark {
//    background-color: black;
//  }
//`;