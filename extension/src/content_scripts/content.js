import generateExtensionController from "./utils/generateExtensionController";
import getLocalStorageData from "./utils/getLocalStorageData";
import deleteAllExtensions from "./utils/deleteAllExtensions";

// Detect URL change using MutationsAPI and call main()
function websiteURLHandler() {
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
  deleteAllExtensions();
  generateExtensionController();
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

websiteURLHandler();
main();
