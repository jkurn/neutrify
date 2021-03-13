import styled from "styled-components";

const CartContainer = styled.div`
  position: absolute;
  margin-top:80px;;
`;

const ItemName = styled.div`
  border-radius: 10px 10px 0px 0px;
  background: #F4F7FB;
  border: 2px solid #ECECEC;
  border-bottom: 0px;
  margin-left: 10px;
`;

const ItemGHG = styled.div`
  border-radius: 0px 0px 10px 10px;
  background: #F4F7FB;
  border: 2px solid #ECECEC;
  margin-bottom: 5px;
  margin-left: 10px;
`;

const TotalContainer = styled.div`
  background: #ECECEC;
  margin-top: 15px;
  padding: 8px;
`;

function Cart() {
  return (
    <CartContainer className="flex flex-col ">
        <h1 className="text-xs font-semibold text-gray-500 m-2">BASED ON YOUR CART TODAY</h1>
        <ItemName className="flex">
          <img src="/images/beef.svg" alt="Beef Logo"/>
          <h1 className="text-xs">Beef</h1>
          <h1 className="text-xs">(New York Strip Cut)</h1>
          <h1 className="text-xs">per 1 kg</h1>
        </ItemName>
        <ItemGHG className="flex">
          <img src="/images/c02.svg" alt="CO2 Logo" />
          <h1 className="text-sm text-indigo-400">60kg</h1>
          <h1 className="text-sm text-bold">of CO2</h1>
          <h1 className="text-xs">produced</h1>
        </ItemGHG>

        <ItemName className="flex">
          <img src="/images/beef.svg" alt="Beef Logo" />
          <h1 className="text-xs">Lamb</h1>
          <h1 className="text-xs">(Natural Choice)</h1>
          <h1 className="text-xs">per 1 kg</h1>
        </ItemName>
        <ItemGHG className="flex">
          <img src="/images/c02.svg" alt="CO2 Logo" />
          <h1 className="text-sm text-indigo-400">84kg</h1>
          <h1 className="text-sm text-bold">of CO2</h1>
          <h1 className="text-xs text-s">produced</h1>
        </ItemGHG>

        <TotalContainer>
          <div className="flex">
            <h1 className="text-xs text-gray-500 font-semibold">TOTAL PURCHASE EMISSIONS</h1>
            <div><a href="#" className="text-n-black text-xs font-semibold underline">SHOW BREAKDOWN</a></div>
          </div>

          <div className="flex align-center">
            <img src="/images/c02.svg" alt="CO2 Logo" />
            <h1>144kg</h1>
            <h1>of CO2</h1>
            <h1>produced</h1>
          </div>
        </TotalContainer>
    </CartContainer>

  );
}

export default Cart;
