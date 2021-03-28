import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AltItemContainer = styled.div`
  border-radius: 5px;
  background: #f4f7fb;
  border: 1px solid #86bda6;
  border-collapse: separate;
  border-spacing: 15px;
  margin: 10px 0;
  padding: 8px 8px 8px 15px;
`;

const AltItemTitle = styled.div`
  margin-left: 10px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.8);
`;

const AltItemDesc = styled.div`
  font-size: 9px;
  margin-left: 3px;
`;

const AddToCartButton = styled.button`
  background-color: #26bd58;
  border-radius: 5px;
  color: white;
  font-size: 8px;
  padding: 6px 15px;
`;

function AltItem({ imageURL, title, description, productId }) {

  return (
    <AltItemContainer className="flex font-semibold justify-between items-center">
      <div className="flex items-center">
        <img src={imageURL} alt={title} />
        <AltItemTitle>{title}</AltItemTitle>
        {typeof description !== "undefined" ? <AltItemDesc>({description})</AltItemDesc> : null}
      </div>
      <AddToCartButton
        onClick={() => {
          browser.runtime.sendMessage({
            action: "background_addProductToCart",
            data: { productId },
          });
        }}
      >
        ADD TO CART
      </AddToCartButton>
    </AltItemContainer>
  );
}

export default AltItem;
