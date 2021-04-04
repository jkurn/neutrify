import styled from "styled-components";

const CartItemContainer = styled.div`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const CartItemProduct = styled.div`
  border-radius: 3.7px 3.7px 0px 0px;
  background: #f4f7fb;
  border: 1px solid #dae0e8;
  border-bottom: 0px;
  padding: 3px 15px;
`;

const ItemName = styled.div`
  margin-left: 9.5px;
  font-size: 10.01px;
  color: rgba(0, 0, 0, 0.8);
`;

const CartItemGHG = styled.div`
  border-radius: 0px 0px 3.7px 3.7px;
  background: #f4f7fb;
  border: 1px solid #dae0e8;
  padding: 5px 15px;
`;

const ItemDesc = styled.div`
  font-size: 6.67px;
  margin-left: 4px;
`;

const PerServing = styled.div`
  font-size: 8.93px;
  margin-left: 7px;
  color: rgba(0, 0, 0, 0.6);
`;

const ItemGHG = styled.div`
  color: #7492b6;
  font-weight: 600;
  font-size: 10.73px;
  margin-left: 10px;
`;

const OfCO2Expr = styled.div`
  font-weight: 600;
  font-size: 10.73px;
  margin-left: 5px;
`;

const ProducedExpr = styled.div`
  font-weight: 600;
  font-size: 7.15px;
  margin-left: 5px;
`;

function CartItem({ imageURL, title, description, serving, ghg }) {
  return (
    <CartItemContainer>
      <CartItemProduct className="flex items-center font-semibold">
        <img src={imageURL} alt={title} width="16.82"/>
        <ItemName>{title}</ItemName>
        {typeof description !== "undefined" ? <ItemDesc>({description})</ItemDesc> : null}
        <PerServing>per {serving}</PerServing>
      </CartItemProduct>
      <CartItemGHG className="flex items-center">
        <img src="/images/c02.svg" alt="C02" width="16.82"/>
        <ItemGHG>{ghg}kg</ItemGHG>
        <OfCO2Expr className="flex">of CO2</OfCO2Expr>
        <ProducedExpr>produced</ProducedExpr>
      </CartItemGHG>
    </CartItemContainer>
  );
}

export default CartItem;
