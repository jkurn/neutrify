import axios from "axios";

function logURL(requestDetails) {
  // console.log("Loading: " + requestDetails.url);
  // console.log(requestDetails);
  if (requestDetails.url.includes("update_items")) {
    console.log(requestDetails);
    setTimeout(() => {
      getCartDetails();
    }, 1000)
    
  }
}

browser.webRequest.onBeforeRequest.addListener(logURL, { urls: ["<all_urls>"] });

function checkLogin(sendResponse) {
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
}

function getCartDetails(sendResponse) {
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
      if (typeof sendResponse !== "undefined") {
        await sendResponse({ response: cartData });
      } else {
        browser.tabs
          .query({
            currentWindow: true,
            active: true,
          })
          .then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {
              action: "components_updateCart",
              response: cartData,
            });
          })
          .catch((err) => {
            console.log({ err });
          });
      }
    })
    .catch(async (err) => {
      if (typeof sendResponse !== "undefined") {
        await sendResponse({ err });
      } else {
        console.log({ err });
      }
    });
}

function closeExtension() {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { action: "content_closeExtension" });
    })
    .catch((err) => {
      console.log(err);
    });
}

function getProductDetails(itemId) {
  axios
  .get(`https://www.instacart.com/v3/containers/items/item_${itemId}`)
  .then(async (response) => {
    // TODO: add error handler
    let { data } = response;
    let { modules } = data.container;
    let cartData = [];

    await modules.map(async (module) => {
      // Push the item to cartData if it is an item
      if (module.id.includes("item_details_item_detail_")) {
        console.log(module.id);
        let moduleData = module.data;
        console.log(moduleData);

        let cartItem = {
          id: moduleData.item.id || null,
          quantity: 1 || null,
          size: moduleData.item.size || null,
          pricing: moduleData.item.pricing.price || null,
          type: moduleData.item.tracking_params.aisle_name || null,
          title: moduleData.item.name || null,
        };
        // console.log(cartItem);

        await cartData.push(cartItem);
      }
    });
    console.log(cartData);
    browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        action: "components_productDetails",
        response: cartData,
      });
    })
    .catch((err) => {
      console.log({ err });
    });
  })
  .catch(async (err) => {
    console.log({ err });
  });
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let action = message.action.split('background_')[1];

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
      getProductDetails(message.data.productId);
      break;

    default:
      break;
  }

  return true;
});
