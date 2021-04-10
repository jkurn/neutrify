import styled from "styled-components";
import { useState } from "react";

import {HeaderProdDetail} from "../components/Header";
import GHGItem from "../components/GHGItem";

const ProductDetailContainer = styled.div`
  width: 323px;
  height: 280px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: white;
`;

function ProductDetails() {
  //const [currentPage, setCurrentPage] = useState("ProductDetails");

  return (
    <ProductDetailContainer className="flex flex-col justify-between relative h-full">
      <HeaderProdDetail />
      <h1 className="text-2xs text-n-lightGrey ml-2 mt-1">
        BASED ON YOUR CART TODAY
      </h1>
      <GHGItem  imageURL="/images/c02.svg"
                title="Co2 Logo"
                valueWithUnit="40kg"
                fontColor="text-n-cloudBlue"
                ofExpr = "of CO2"
                actionExpr = "produced"
      />
      <GHGItem  imageURL="/images/car.svg"
                title="Car Logo"
                valueWithUnit="300km"
                fontColor="text-n-carPurple"
                ofExpr = "of miles"
                actionExpr = "driven"
      />
      <GHGItem  imageURL="/images/heart.svg"
                title="Heart Logo"
                valueWithUnit="1 portion"
                fontColor="text-n-heartPink"
                actionExpr = "closer to heart disease"
      />
      <div className="mb-2"/>
    </ProductDetailContainer>
  );
}

export default ProductDetails;
