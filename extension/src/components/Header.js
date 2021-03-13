import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  padding: 10px;
  border-bottom: 2px solid #ececec;
`;

const ProgressLiquid = styled.div`
  background: #f4f7fb;
  border: 1px solid rgba(157, 171, 187, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 10px;
`;


function Header() {
  return (
    <HeaderContainer className="flex items-center">
      <img src="/images/logo.svg" alt="Neutrify Logo" />
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-semibold">Neutrify</h1>
        <a href="#" className="text-n-turqoise text-xs font-semibold underline">
          Learn more
        </a>
      </div>
      <ProgressLiquid className="ml-3 font-semibold text-xs flex items-center justify-center">
        0<span className="text-3xs">%</span>
      </ProgressLiquid>
      <CloseIcon src="images/close.svg" />
    </HeaderContainer>
  );
}

export default Header;
