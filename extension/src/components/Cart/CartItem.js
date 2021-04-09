import styled from "styled-components";

const CartItemContainer = styled.div`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const CartItemProduct = styled.div`
  border-radius: 5px 5px 0px 0px;
  background: #f4f7fb;
  border: 1px solid #dae0e8;
  border-bottom: 0px;
  padding: 3px 15px;
`;

const ItemName = styled.div`
  font-size: 11px;
  margin-left: 6px;
`;

const CartItemGHG = styled.div`
  border-radius: 0px 0px 5px 5px;
  background: #f4f7fb;
  border: 1px solid #dae0e8;
  padding: 5px 15px;
`;

const ItemDesc = styled.div`
  font-size: 8px;
  margin-left: 6px;
`;

const PerServing = styled.div`
  font-size: 9px;
  margin-left: 7px;
  color: rgba(0, 0, 0, 0.6);
`;

const ItemGHG = styled.div`
  color: #7492b6;
  font-weight: 550;
  font-size: 15px;
  margin-left: 10px;
`;

const OfCO2Expr = styled.div`
  font-weight: 550;
  font-size: 15px;
  margin-left: 5px;
`;

const ProducedExpr = styled.div`
  font-weight: 550;
  font-size: 12px;
  margin-left: 5px;
`;


function CartItem({ imageURL, title, description, serving, ghg }) {
  return (
    <CartItemContainer>
      <CartItemProduct className="flex items-center font-semibold">
        <img src={imageURL} alt={title} />
        <ItemName>{title}</ItemName>
        {typeof description !== "undefined" ? <ItemDesc>({description})</ItemDesc> : null}
        <PerServing>per {serving}</PerServing>
      </CartItemProduct>
      <CartItemGHG className="flex items-center">
        <img src="/images/c02.svg" alt="C02" />
        <ItemGHG>{ghg}kg</ItemGHG>
        <OfCO2Expr className="flex">of CO2</OfCO2Expr>
        <ProducedExpr>produced</ProducedExpr>
      </CartItemGHG>
    </CartItemContainer>
  );
}


export default CartItem;
