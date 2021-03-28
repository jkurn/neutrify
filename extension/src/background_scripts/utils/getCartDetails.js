import axios from "axios";

export default function getCartDetails(sendResponse) {
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
