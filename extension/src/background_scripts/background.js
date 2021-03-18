import axios from "axios";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message) {
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
    case "getCartDetails":
      console.log("proceeding to get cart details");
      axios
        .get("https://www.instacart.com/v3/containers/carts/1")
        .then(async (response) => {
          let { data } = response;

          let { modules } = data.container;
          let cartData = [];
          console.log(modules);
          await modules.map(async (module) => {
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
              console.log(cartItem);
              await cartData.push(cartItem);
            }
          });
          console.log(cartData);
          await sendResponse({ response: cartData });
        })
        .catch(async (err) => {
          await sendResponse({ err });
        });
      break;
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
