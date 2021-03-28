import axios from "axios";

export default async function getProductDetails(messageData) {
  let { productId } = messageData;

  axios
    .get(`https://www.instacart.com/v3/containers/items/item_${productId}`)
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
