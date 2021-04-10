import { useState } from "react";
import styled from "styled-components";
import { Transition } from "@headlessui/react";

const ExtensionPrompt = styled.img`
  padding: 25px 21px;
  background: #108f6e;
`;

function Prompt() {
  const [isShow, setShow] = useState(true);

  return (
    <Transition
      show={isShow}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <ExtensionPrompt
        src="/images/newLogo.svg"
        onClick={() => setShow(!isShow)}
        className="hover:opacity-80 cursor-pointer"
        alt="Neutrify Logo"
      />
    </Transition>
  );
}

export default Prompt;
