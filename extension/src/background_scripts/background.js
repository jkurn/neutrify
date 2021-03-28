import networkRequestHandler from './utils/networkRequestHandler';
import checkLogin from './utils/checkLogin'
import getCartDetails from './utils/getCartDetails';
import getProductDetails from './utils/getProductDetails';
import closeExtension from './utils/closeExtension';
import addProductToCart from './utils/addProductToCart';

browser.webRequest.onBeforeRequest.addListener(networkRequestHandler, { urls: ["<all_urls>"] });

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let action = message.action.split("background_")[1];

  let { data: messageData } = message || null;

  switch (action) {
    // Check a cookie called "_instacart_logged_in" to determine if user is logged in
    case "checkLogin":
      checkLogin(sendResponse);
      break;

    // Get items in cart using Instacart API endpoint (assuming they are already logged in)
    case "getCartDetails":
      getCartDetails(sendResponse);
      break;

    // Send message to content script to close all extensions
    case "closeExtension":
      closeExtension();
      break;

    // Get Product Details based on id
    case "getProductDetails":
      getProductDetails(messageData);
      break;

    // Add product to cart based on id
    case "addProductToCart":
      addProductToCart(messageData, sendResponse);
      break;

    default:
      break;
  }

  return true;
});
