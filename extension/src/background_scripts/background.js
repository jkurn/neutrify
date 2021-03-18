import axios from "axios";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message) {
    // Check a cookie called "_instacart_logged_in" to determine if user is logged in
    case "checkLogin":
      browser.tabs
        .query({
          active: true,
          currentWindow: true,
        })
        .then(async (tabs) => {
          let cookie = await browser.cookies.get({
            url: tabs[0].url,
            name: "_instacart_logged_in",
          });
          if (cookie && cookie.value == 1) {
            await sendResponse({ response: true });
          } else {
            await sendResponse({ response: false });
          }
        });
      break;

    // Get items in cart using Instacart API endpoint (assuming they are already logged in)
    case "getCartDetails":
      axios
        .get("https://www.instacart.com/v3/containers/carts/1")
        .then(async (response) => {
          // TODO: add error handler
          let { data } = response;
          let { modules } = data.container;
          let cartData = [];

          await modules.map(async (module) => {
            // Push the item to cartData if it is an item
            if (module.id.includes("cart_item_")) {
              let moduleData = module.data;

              let cartItem = {
                id: moduleData.item.id || null,
                quantity: moduleData.qty || null,
                size: moduleData.item.size || null,
                pricing: moduleData.pricing.price || null,
                type: moduleData.item.tracking_params.aisle_name || null,
                title: moduleData.item.name || null,
              };
              // console.log(cartItem);

              await cartData.push(cartItem);
            }
          });
          // console.log(cartData);
          await sendResponse({ response: cartData });
        })
        .catch(async (err) => {
          await sendResponse({ err });
        });
      break;
    // Send message to content script to close all extensions
    case "closeExtension":
      browser.tabs
        .query({
          currentWindow: true,
          active: true,
        })
        .then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id, "closeExtension");
        })
        .catch((err) => {
          console.log(err);
        });
      break;
    default:
      break;
  }

  return true;
});
