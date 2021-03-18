function generateExtension(extraClass) {
  let iframe;

  // if (typeof document.getElementsByClassName("neutrify")[0] === "undefined") {
  //   iframe = document.createElement("iframe");
  //   iframe.src = chrome.extension.getURL("popup.html");
  // } else {
  //   iframe = document.getElementsByClassName("neutrify")[0];
  // }

  document.querySelectorAll(".neutrify").forEach((e) => e.remove());

  iframe = document.createElement("iframe");
  iframe.src = chrome.extension.getURL("popup.html");

  iframe.className = `neutrify ${extraClass}`;

  return iframe;
}

function injectCSS(styles) {
  let styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

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

  document.querySelectorAll(".neutrify").forEach((e) => e.remove());

  if (window.location.host === "www.instacart.com") {
    injectCSS(styles);

    let iframeExtension;

    if (window.location.href.includes("checkout")) {
      iframeExtension = generateExtension("neutrify-checkout");
    } else if (window.location.href.includes("items")) {
      iframeExtension = generateExtension("neutrify-item-detail");
    } else {
      let elemToObserve = document.getElementsByClassName("store_overlay")[0];
      let prevClassState = elemToObserve.classList.contains("active");
      let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName == "class") {
            let currentClassState = mutation.target.classList.contains("active");
            if (prevClassState !== currentClassState) {
              prevClassState = currentClassState;
              if (currentClassState) {
                iframeExtension = generateExtension("neutrify-cart");
                document.getElementsByTagName("body")[0].appendChild(iframeExtension);
              } else {
                document.querySelectorAll(".neutrify").forEach((e) => e.remove());
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

browser.runtime.onMessage.addListener(request => {
  console.log(request);
  switch(request) {
    case "closeExtension":
      document.querySelectorAll(".neutrify").forEach((e) => e.remove());
      break;
    default:
      break;
  }
});

onURLChange();
main();
