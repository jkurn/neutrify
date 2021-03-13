import styled from "styled-components";


const CartContainer = styled.div`
  position: absolute;
  margin-top:80px;;
`;

const ImageContainer = styled.img`
  margin-left: 15px;
`;

const CartItem = styled.div`
  border-radius: 5px 5px 0px 0px;
  background: #F4F7FB;
  border: 2px solid #ECECEC;
  border-bottom: 0px;
  margin-left: 10px;
  margin-right: 10px;
  width: 295px;
`;

const ItemName = styled.div`
  font-size: 11px;
  margin: 5px 5px 5px 6px;
  font-weight: 500;
`;

const ItemDesc = styled.div`
  font-size: 8px;
  margin: 6px 5px 5px 1px;
`;

const PerServing = styled.div`
  font-size: 9px;
  margin: 6px 5px 5px 5px;
  color: gray;
`;

const CartItemGHG = styled.div`
  border-radius: 0px 0px 5px 5px;
  background: #F4F7FB;
  border: 2px solid #ECECEC;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  width: 295px;
`;

const ItemGHG = styled.div`
  color: #7492B6;
  font-weight: 550;
  font-size: 15px;
  margin: 4px 5px 5px 10px;
`;

const OfCO2Expr = styled.div`
  font-weight: 550;
  font-size: 15px;
  margin: 4px 5px 5px 0px;
`;

const ProducedExpr = styled.div`
  font-weight: 550;
  font-size: 12px;
  margin: 7px 5px 5px 1px;
`;

const TotalContainer = styled.div`
  background: #ECECEC;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 8px;
  height: 80px;
`;

const AltContainer = styled.div`
  border-radius: 5px;
  background: #F4F7FB;
  border: 2px solid #86BDA6;
  border-collapse: separate;
  border-spacing: 15px;
  margin: 5px 10px 5px 10px;
  height: 34px;
`;

const AltItem = styled.div`
  margin: 5px 5px 5px 10px;
  font-size: 13px;
  font-weight: 500;
`;

const AltItemDesc = styled.div`
  font-size: 10px;
  margin: 8px 5px 5px 1px;
`;

const AddToCartButton = styled.button`
  background-color: #26BD58;
  border-radius: 3px;
  position: absolute;
  right: 0;
  color: white;
  text-align: center;
  display: inline-block;
  font-size: 8px;
  font-weight: 550;
  margin-top: 5px;
  margin-right: 19px;
  width: 90px;
  height: 20px;
`;

function Cart() {
  return (
    <CartContainer className="flex flex-col vertical-center">
        <h1 className="text-xs font-semibold text-gray-500 m-2">BASED ON YOUR CART TODAY</h1>
        <CartItem className="flex">
          <ImageContainer src="/images/beef.svg" alt="Beef Logo"/>
          <ItemName>Beef</ItemName>
          <ItemDesc>(New York Strip Cut)</ItemDesc>
          <PerServing>per 1 kg</PerServing>
        </CartItem>
        <CartItemGHG className="flex">
          <ImageContainer src="/images/c02.svg" alt="CO2 Logo" />
          <ItemGHG>60kg</ItemGHG>
          <OfCO2Expr>of CO2</OfCO2Expr>
          <ProducedExpr>produced</ProducedExpr>
        </CartItemGHG>

        <CartItem className="flex">
          <ImageContainer src="/images/lamb.svg" alt="Beef Logo" />
          <ItemName>Lamb</ItemName>
          <ItemDesc>(Natural Choice)</ItemDesc>
          <PerServing>per 1 kg</PerServing>
        </CartItem>
        <CartItemGHG className="flex">
          <ImageContainer src="/images/c02.svg" alt="CO2 Logo" />
          <ItemGHG>84kg</ItemGHG>
          <OfCO2Expr>of CO2 </OfCO2Expr>
          <ProducedExpr>produced</ProducedExpr>
        </CartItemGHG>

        <TotalContainer>
          <div className="flex">
            <h1 className="text-2xs text-gray-500 font-semibold m-1">TOTAL PURCHASE EMISSIONS</h1>
            <div><a href="#" className="text-n-black text-3xs text-xs font-medium underline ml-12">SHOW BREAKDOWN</a></div>
          </div>

          <div className="flex align-center mt-1">
            <ImageContainer src="/images/c02.svg" alt="CO2 Logo" />
            <ItemGHG>144kg</ItemGHG>
            <OfCO2Expr>of CO2</OfCO2Expr>
            <ProducedExpr>produced</ProducedExpr>
          </div>
        </TotalContainer>

        <h1 className="text-2xs font-semibold ml-2 text-n-green">SUGGESTED ALTERNATIVES</h1>
        <div className="flex">
          <img src="/images/c02.svg" alt="CO2" className="-mt-3 ml-2"/>
          <h1 className="text-sm font-medium ml-1 mb-4 text-n-aquablue">124 shoppers have shopped carbon</h1>
        </div>
        <h1 className="text-sm font-medium -mt-4 ml-2 mb-1 text-n-aquablue">conscious!</h1>
        <AltContainer className="flex">
          <ImageContainer src="/images/fish.svg" alt="fish" />
          <AltItem>Salmon</AltItem>
          <AltItemDesc>(Local)</AltItemDesc>
          <AddToCartButton>ADD TO CART</AddToCartButton>
        </AltContainer>

        <AltContainer className="flex">
          <ImageContainer src="/images/vegetable.svg" alt="vegetable"/>
          <AltItem>Beyond Meat</AltItem>
          <AddToCartButton>ADD TO CART</AddToCartButton>
        </AltContainer>

    </CartContainer>

  );
}

export default Cart;
