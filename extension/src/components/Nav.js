import styled from "styled-components";

const NavContainer = styled.div`
  background: #e4edf1;
  padding: 12px 43px;
`;

const NavIcon = styled.svg`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

function Nav({ setCurrentPage, currentPage }) {
  return (
    <NavContainer className="flex align-items-center justify-between w-full">
      <NavIcon
        onClick={() => setCurrentPage("Cart")}
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill={currentPage === "Cart" ? "#0085FF" : "#8E99A6"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.822 4.431C19.73 4.29808 19.6072 4.18943 19.464 4.11436C19.3209 4.0393 19.1616 4.00006 19 4H5.333L4.179 1.23C4.02769 0.865226 3.77147 0.553593 3.44282 0.334615C3.11418 0.115638 2.72791 -0.00082104 2.333 4.35724e-06H0V2H2.333L7.077 13.385C7.15299 13.5672 7.28118 13.7228 7.44542 13.8322C7.60967 13.9416 7.80263 14 8 14H16C16.417 14 16.79 13.741 16.937 13.352L19.937 5.352C19.9937 5.20063 20.0129 5.03776 19.9928 4.87735C19.9728 4.71695 19.9142 4.56379 19.822 4.431Z" />
        <path d="M8.5 18C9.32843 18 10 17.3284 10 16.5C10 15.6716 9.32843 15 8.5 15C7.67157 15 7 15.6716 7 16.5C7 17.3284 7.67157 18 8.5 18Z" />
        <path d="M15.5 18C16.3284 18 17 17.3284 17 16.5C17 15.6716 16.3284 15 15.5 15C14.6716 15 14 15.6716 14 16.5C14 17.3284 14.6716 18 15.5 18Z" />
      </NavIcon>
      <NavIcon
        onClick={() => setCurrentPage("Home")}
        width="19"
        height="17"
        viewBox="0 0 19 17"
        xmlns="http://www.w3.org/2000/svg"
        fill={currentPage === "Home" ? "#0085FF" : "#8E99A6"}
      >
        <path d="M17.6321 8.36072L9.45157 0.186175C9.39267 0.127158 9.32271 0.0803364 9.24569 0.0483901C9.16867 0.0164437 9.08611 0 9.00272 0C8.91934 0 8.83678 0.0164437 8.75976 0.0483901C8.68274 0.0803364 8.61278 0.127158 8.55388 0.186175L0.373376 8.36072C0.135051 8.59905 0 8.92277 0 9.2604C0 9.96147 0.569994 10.5315 1.27107 10.5315H2.13301V16.3645C2.13301 16.716 2.41701 17 2.76854 17H7.73166V12.5513H9.95603V17H15.2369C15.5884 17 15.8724 16.716 15.8724 16.3645V10.5315H16.7344C17.072 10.5315 17.3957 10.3984 17.6341 10.1581C18.1286 9.66158 18.1286 8.85723 17.6321 8.36072Z" />
      </NavIcon>
      <NavIcon
        onClick={() => setCurrentPage("Settings")}
        fill={currentPage === "Settings" ? "#0085FF" : "#8E99A6"}
        width="17"
        height="18"
        viewBox="0 0 17 18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.0232862 5.88421C0.392783 4.74329 0.999773 3.69358 1.80429 2.80421C1.87078 2.73072 1.95762 2.67866 2.05376 2.65462C2.14991 2.63058 2.25103 2.63566 2.34429 2.66921L4.26229 3.35521C4.39883 3.40397 4.54434 3.42245 4.68874 3.40938C4.83313 3.39631 4.97296 3.35199 5.09853 3.27951C5.22409 3.20702 5.33239 3.1081 5.41593 2.98959C5.49946 2.87109 5.55622 2.73584 5.58229 2.59321L5.94729 0.58721C5.96496 0.489559 6.0113 0.399377 6.08039 0.328145C6.14949 0.256913 6.23822 0.207852 6.33529 0.18721C7.50714 -0.0624034 8.71843 -0.0624034 9.89029 0.18721C9.98735 0.207852 10.0761 0.256913 10.1452 0.328145C10.2143 0.399377 10.2606 0.489559 10.2783 0.58721L10.6443 2.59321C10.6703 2.73584 10.7271 2.87109 10.8106 2.98959C10.8942 3.1081 11.0025 3.20702 11.128 3.27951C11.2536 3.35199 11.3934 3.39631 11.5378 3.40938C11.6822 3.42245 11.8277 3.40397 11.9643 3.35521L13.8833 2.66921C13.9765 2.636 14.0775 2.63119 14.1734 2.6554C14.2694 2.67961 14.356 2.73175 14.4223 2.80521C15.2263 3.69438 15.833 4.74373 16.2023 5.88421C16.2328 5.97842 16.2346 6.07955 16.2075 6.17479C16.1805 6.27004 16.1257 6.35511 16.0503 6.41921L14.4953 7.73921C14.3848 7.83309 14.2961 7.94986 14.2352 8.08143C14.1744 8.21301 14.1429 8.35624 14.1429 8.50121C14.1429 8.64618 14.1744 8.78941 14.2352 8.92099C14.2961 9.05256 14.3848 9.16933 14.4953 9.26321L16.0503 10.5832C16.1257 10.6473 16.1805 10.7324 16.2075 10.8276C16.2346 10.9229 16.2328 11.024 16.2023 11.1182C15.8331 12.259 15.2264 13.3087 14.4223 14.1982C14.3558 14.2717 14.269 14.3238 14.1728 14.3478C14.0767 14.3718 13.9755 14.3668 13.8823 14.3332L11.9643 13.6472C11.8277 13.5985 11.6822 13.58 11.5378 13.593C11.3934 13.6061 11.2536 13.6504 11.128 13.7229C11.0025 13.7954 10.8942 13.8943 10.8106 14.0128C10.7271 14.1313 10.6703 14.2666 10.6443 14.4092L10.2773 16.4162C10.2595 16.5135 10.2132 16.6034 10.1443 16.6744C10.0754 16.7455 9.98703 16.7945 9.89029 16.8152C8.71844 17.0649 7.50714 17.0649 6.33529 16.8152C6.23822 16.7946 6.14949 16.7455 6.08039 16.6743C6.0113 16.603 5.96496 16.5129 5.94729 16.4152L5.58229 14.4092C5.55622 14.2666 5.49946 14.1313 5.41593 14.0128C5.33239 13.8943 5.22409 13.7954 5.09853 13.7229C4.97296 13.6504 4.83313 13.6061 4.68874 13.593C4.54434 13.58 4.39883 13.5985 4.26229 13.6472L2.34329 14.3332C2.25007 14.3664 2.14909 14.3712 2.05314 14.347C1.95719 14.3228 1.87059 14.2707 1.80429 14.1972C1.00023 13.3081 0.393587 12.2587 0.0242863 11.1182C-0.00619753 11.024 -0.00802521 10.9229 0.019035 10.8276C0.0460952 10.7324 0.100825 10.6473 0.176286 10.5832L1.73129 9.26321C1.84175 9.16933 1.93048 9.05256 1.99134 8.92099C2.05219 8.78941 2.08371 8.64618 2.08371 8.50121C2.08371 8.35624 2.05219 8.21301 1.99134 8.08143C1.93048 7.94986 1.84175 7.83309 1.73129 7.73921L0.176286 6.41921C0.100825 6.35511 0.0460952 6.27004 0.019035 6.17479C-0.00802521 6.07955 -0.00619753 5.97842 0.0242863 5.88421H0.0232862ZM6.11329 8.50121C6.11329 9.03164 6.324 9.54035 6.69907 9.91542C7.07415 10.2905 7.58285 10.5012 8.11329 10.5012C8.64372 10.5012 9.15243 10.2905 9.5275 9.91542C9.90257 9.54035 10.1133 9.03164 10.1133 8.50121C10.1133 7.97078 9.90257 7.46207 9.5275 7.087C9.15243 6.71192 8.64372 6.50121 8.11329 6.50121C7.58285 6.50121 7.07415 6.71192 6.69907 7.087C6.324 7.46207 6.11329 7.97078 6.11329 8.50121Z" />
      </NavIcon>
    </NavContainer>
  );
}

export default Nav;
