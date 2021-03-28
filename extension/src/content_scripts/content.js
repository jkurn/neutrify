// Find all extensions and delete them
function deleteAllExtensions() {
  document.querySelectorAll(".neutrify").forEach((e) => e.remove());
}

// Generate extensions using iframe, with additional optional class
function generateExtension(extraClass, page = "popup.html") {
  let iframe;

  // // Reuse any existing extension, if applicable
  // if (typeof document.getElementsByClassName("neutrify")[0] === "undefined") {
  //   iframe = document.createElement("iframe");
  //   iframe.src = chrome.extension.getURL("popup.html");
  // } else {
  //   iframe = document.getElementsByClassName("neutrify")[0];
  // }

  deleteAllExtensions();

  iframe = document.createElement("iframe");
  iframe.src = chrome.extension.getURL(page);

  iframe.className = `neutrify ${extraClass}`;

  return iframe;
}

// Inject new CSS by creating a style tag
function injectCSS(styles) {
  let styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// Detect URL change using MutationsAPI and call main()
function onURLChange() {
  let oldHref = document.location.href;

  let bodyList = document.querySelector("body"),
    observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          main();
        }
      });
    });

  let config = {
    childList: true,
    subtree: true,
  };

  observer.observe(bodyList, config);
}

// Main function to instantiate extension based on URL
function main() {
  const styles = `
    .neutrify {
        position: fixed;
        top: 200px;
        width: 315px;
        height: 558px;
        border: none;
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        z-index: 9999;
        display: block;
    }

    .neutrify-cart {
        right: 600px;
    }

    .neutrify-checkout {
        left: 60px;
        display: block;
    }
`;

  deleteAllExtensions();

  if (window.location.host === "www.instacart.com") {
    injectCSS(styles);

    let iframeExtension;
    let currentBrowserURL = window.location.href;

    if (currentBrowserURL.includes("checkout")) {
      iframeExtension = generateExtension("neutrify-checkout");
    } else if (currentBrowserURL.includes("items")) {
      iframeExtension = generateExtension("neutrify-item-detail", "product.html");

      let productId = currentBrowserURL.split("item_")[1];

      browser.runtime.sendMessage({ action: "background_getProductDetails", data: { productId } });
    } else {
      // Mutations Observer to check if the overlay is active (To populate extension when they view cart)
      let elemToObserve = document.getElementsByClassName("store_overlay")[0];
      let prevClassState = elemToObserve.classList.contains("active");
      let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName == "class") {
            let currentClassState = mutation.target.classList.contains("active");
            if (prevClassState !== currentClassState) {
              prevClassState = currentClassState;

              // Delete all extensions if cart is no longer active, else instantiate extension beside cart
              if (currentClassState) {
                iframeExtension = generateExtension("neutrify-cart");
                document.getElementsByTagName("body")[0].appendChild(iframeExtension);
              } else {
                deleteAllExtensions();
              }
            }
          }
        });
      });
      observer.observe(elemToObserve, { attributes: true });
    }

    document.getElementsByTagName("body")[0].appendChild(iframeExtension);
  }
}

function getLocalStorageData(data, sendResponse) {
  let { key } = data;
  console.log(JSON.parse(localStorage.getItem(key)));
  sendResponse({ response: JSON.parse(localStorage.getItem(key)) });
}

// Message listener
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let action = request.action.split("content_")[1];
  let { data } = request || null;

  switch (action) {
    case "closeExtension":
      deleteAllExtensions();
      break;

    case "getLocalStorageData":
      getLocalStorageData(data, sendResponse);
      break;

    default:
      break;
  }

  return true;
});

onURLChange();
main();
