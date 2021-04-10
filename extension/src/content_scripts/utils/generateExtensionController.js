import deleteAllExtensions from "./deleteAllExtensions";
import deleteAllStylesheets from "./deleteAllStylesheets";

export default function generateIframeController() {
  const styles = `
    .neutrify {
        position: fixed;
        top: 200px;
        width: 315px;
        min-height: 558px;
        border: none;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        z-index: 9999;
        display: block;
        height: unset;
    }

    .neutrify-cart {
        right: 600px;
    }

    .neutrify-checkout {
        left: 60px;
    }

    .neutrify-extension-prompt {
      position: fixed;
      top: 50%;
      width: 74px;
      height: 74px;
      left: 0;
      border: none;
      z-index: 9999;
      display: block;
    }
`;

  if (window.location.host === "www.instacart.com") {
    deleteAllExtensions();
    deleteAllStylesheets();
    injectCSS(styles);
    // generateIframe("neutrify-extension-prompt", "prompt.html");

    let currentBrowserURL = window.location.href;

    if (currentBrowserURL.includes("checkout")) {
      generateIframe("neutrify neutrify-checkout");
    } else if (currentBrowserURL.includes("items")) {
      generateIframe("neutrify neutrify-item-detail", "product.html");
      let productId = currentBrowserURL.split("item_")[1];

      browser.runtime.sendMessage({ action: "background_getProductDetails", data: { productId } });
    } else {
      // Mutations Observer to check if the overlay is active (To populate extension when they view cart)
      let cartContainer = document.getElementsByClassName("cart-container")[0];
      let prevStyleState = cartContainer.style.transform;
      let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName == "style") {
            let currentStyleState = mutation.target.style.transform;
            if (prevStyleState !== currentStyleState) {
              prevStyleState = currentStyleState;

              // Delete all extensions if cart is no longer active, else instantiate extension beside cart
              if (currentStyleState === "translateX(0px)") {
                generateIframe("neutrify neutrify-cart");
                // generateIframe("neutrify-extension-prompt", "prompt.html");
              } else {
                deleteAllExtensions();
                // generateIframe("neutrify-extension-prompt", "prompt.html");
              }
            }
          }
        });
      });
      observer.observe(cartContainer, { attributes: true });
    }


    // document.getElementsByClassName('neutrify-extension-prompt')[0].addEventListener('click', function() {
    //   document.getElementsByClassName('neutrify')[0].style.display = "block";
    // })

    // document.getElementsByTagName("body")[0].appendChild(iframeExtension);
  }
}

// Generate extensions using iframe, with additional optional class
function generateIframe(extraClass, page = "popup.html") {
  let iframe;

  // // Reuse any existing extension, if applicable
  // if (typeof document.getElementsByClassName("neutrify")[0] === "undefined") {
  //   iframe = document.createElement("iframe");
  //   iframe.src = chrome.extension.getURL("popup.html");
  // } else {
  //   iframe = document.getElementsByClassName("neutrify")[0];
  // }

  iframe = document.createElement("iframe");
  iframe.src = chrome.extension.getURL(page);

  iframe.className = extraClass;

  document.getElementsByTagName("body")[0].appendChild(iframe);
}

// Inject new CSS by creating a style tag
function injectCSS(styles) {
  let styleSheet = document.createElement("style");
  styleSheet.classList.add('neutrify-style');
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
