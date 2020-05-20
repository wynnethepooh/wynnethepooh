import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import './BuyProduct.css'

var BuyProduct = React.memo(({product, images}) => {
  const [selected, setSelected] = useState(product.customFields.values[0]);
  var filteredImgs = images.filter(x => x.name == selected);
  var choosenImgSrc = filteredImgs.length > 0
    ? filteredImgs[0].src
    : images[0].src

  return (
    <div className="product-overview">
      <img src={choosenImgSrc} width="400px"></img>

      <div className="product-details">
        <div className="buy-button">
          <div className="custom-field">
            <h4 style={{ marginTop: "13px", marginRight: "10px" }}>{product.customFields.name}</h4>
            <div className="select-wrapper">
              <select
                  id={product.customFields.name}
                  onChange={(e) => setSelected(e.target.value)}
                  value={selected}
                  style={{
                      backgroundColor: "#EBE7DD",
                      border: "none",
                      borderRadius: "5px",
                      paddingRight: "30px",
                      paddingBlockStart: "13px",
                      paddingBlockEnd: "13px",
                      marginRight: "10px",
                      appearance: "none"
                  }}>
                  {product.customFields.values.map((x) => (<option key={x}>{x}</option>))}
              </select>
            </div>
          </div>

          <a
            style={{
                backgroundColor: "#D1A297",
                borderRadius: "5px",
                color: "#F5F5F5",
                fontWeight: "500",
                paddingBottom: "15px",
                paddingTop: "12px",
                paddingRight: "35px",
                paddingLeft: "35px",
                fontSize: "24",
                textAlign: "center",
                maxWidth: "140px"
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
            data-item-url={"https://wynnethepooh.com/" + product.path}>
            add to cart &nbsp;  ${product.price}
          </a>
        </div>

        <div className="product-description">
          <div dangerouslySetInnerHTML={{ __html: product.description }} />

          <div className="dimensions">
            <h4>Dimensions</h4>
            {product.dimensions.map(dimension => {
              return (
                <div key={dimension} dangerouslySetInnerHTML={{ __html: "- " + dimension}} />
              )
            })}
            <div>- Each piece is handmade so sizes may vary</div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default BuyProduct;