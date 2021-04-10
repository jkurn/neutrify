import styled from "styled-components";


const GHGContainer = styled.div`
  border-radius: 5px;
  background: #F4F7FB;
  padding: 10px 10px 10px 10px;
  height: 49px;
  width: 304px;
  margin-left: 10px;
`;

const NumValue = styled.div`
  margin-left: 10px;

  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
`;

const OfExpr = styled.div`
  margin-left: 5px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
`;

const ActionExpr = styled.div`
  font-weight: 550;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
`;

function GHGItem({ imageURL, title, valueWithUnit, fontColor, ofExpr, actionExpr}) {
  return (
    <GHGContainer className="flex">
      <div className="flex items-center">
        <img src={imageURL} alt={title} />
        <NumValue className={fontColor}>{valueWithUnit}</NumValue>
        {typeof ofExpr !== "undefined" ? <OfExpr>{ofExpr}</OfExpr> : null}
        {typeof actionExpr !== "undefined" ? <ActionExpr>{actionExpr}</ActionExpr> : null}
      </div>
    </GHGContainer>
  );
}

export default GHGItem;
