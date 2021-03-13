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
  padding: 8px;
  height: 80px;
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
    </CartContainer>

  );
}

export default Cart;
