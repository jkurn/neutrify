import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  padding: 10px;
  border-bottom: 2px solid #ececec;
  background: #108F6E;
  border-radius: 0px 0px 5px 5px;
`;

//  width: 40px;
//  height: 40px;
const ProgressLiquid = styled.div`
  background: #f4f7fb;
  border: 1px solid rgba(157, 171, 187, 0.3);
  border-radius: 50%;
  width: 29.51px;
  height: 29.51px;
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 18px;
  right: 10px;
`;

function Header({ closeExtension }) {
  return (
    <HeaderContainer className="flex items-center">
      <img src="/images/newLogo.svg" alt="Neutrify Logo" width="30" />
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-semibold text-white ml-4">Neutrify</h1>
        <a
          href="https://mailchi.mp/c11c1b6d22f8/neutrify-launch"
          className="text-white text-2xs font-medium ml-4 -mt-1.5"
        >
          Learn more
        </a>
      </div>
      <ProgressLiquid className="ml-3 font-medium text-xs flex items-center justify-center">
        0<span className="text-3xs">%</span>
      </ProgressLiquid>
      <CloseIcon
        className="cursor-pointer"
        onClick={() => closeExtension()}
        src="images/closeWhite.svg"
      />
    </HeaderContainer>
  );
}

function HeaderProdDetail() {
  return (
    <HeaderContainer className="flex items-center">
      <img src="/images/newLogo.svg" alt="Neutrify Logo" width="38.57"/>
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-white ml-4">Neutrify</h1>
        <a
          href="https://mailchi.mp/c11c1b6d22f8/neutrify-launch"
          className="text-white text-xs ml-4 -mt-1 font-medium"
        >
          Learn more
        </a>
      </div>
      <CloseIcon className="cursor-pointer" onClick={() => window.close()} src="images/closeWhite.svg" />
    </HeaderContainer>
  );
}

export {Header, HeaderProdDetail};
