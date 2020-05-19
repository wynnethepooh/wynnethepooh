import React, { useState } from 'react';

var BuyButton = React.memo(({product, images}) => {
  const [selected, setSelected] = useState(product.customFields.values[0]);
  var filteredImgs = images.filter(x => x.name == selected);
  var choosenImgSrc = filteredImgs.length > 0
    ? filteredImgs[0].src
    : images[0].src

  return (
    <div>
        <img src={choosenImgSrc} width="400px"></img>
        <h3>{product.customFields.name}</h3>
        <select
            id={product.customFields.name}
            onChange={(e) => setSelected(e.target.value)}
            value={selected}
            style={{
                borderRadius: "5px",
                paddingRight: "20px",
                paddingBlockStart: "13px",
                paddingBlockEnd: "13px",
                marginRight: "15px"
            }}>
            {product.customFields.values.map((x) => (<option key={x}>{x}</option>))}
        </select>

        <a
        style={{
            backgroundColor: "#212121",
            borderRadius: "5px",
            color: "#F5F5F5",
            fontWeight: "bold",
            paddingBottom: "15px",
            paddingTop: "15px",
            paddingRight: "35px",
            paddingLeft: "35px",
            fontSize: "24"
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
        Buy for {product.price}$
    </a>
    </div>
  )
})

export default BuyButton;