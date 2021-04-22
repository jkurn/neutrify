import generateExtensionController from "./utils/generateExtensionController";
import getLocalStorageData from "./utils/getLocalStorageData";
import deleteAllExtensions from "./utils/deleteAllExtensions";

// Detect URL change and call main()
function websiteURLHandler() {
  let currentUrl = window.location.href;
 
  // Listen for changes
  setInterval(function()
  {
      if (currentUrl != window.location.href)
      {
          currentUrl = window.location.href;
          main();
      }
  }, 500);

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
