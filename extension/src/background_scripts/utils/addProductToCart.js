import axios from "axios";
import updateCart from "./updateCart";

export default async function addProductToCart(messageData, sendResponse) {
  let { productId } = messageData;

  let otherProductId = "";

  try {
    let { data } = await axios.get(
      `https://www.instacart.com/v3/containers/items/item_${productId}`
    );
    let { modules } = data.container;

    modules.map(async (module) => {
      if (module.id.includes("item_details_item_detail_")) {
        console.log(module.id);
        let moduleData = module.data || null;
        console.log(moduleData);

        otherProductId = moduleData.item.product_id;
        console.log(otherProductId);
      }
    });
  } catch (err) {
    console.log(err);
  }

  let localStorageData = {};

  try {
    let tabs = await browser.tabs.query({
      currentWindow: true,
      active: true,
    });
    let { response } = await browser.tabs.sendMessage(tabs[0].id, {
      action: "content_getLocalStorageData",
      data: { key: "ajs_user_traits" },
    });
    console.log(response);
    localStorageData = response;
  } catch (err) {
    console.log(err);
  }

  let { zip_code, warehouse_id } = localStorageData;

  try {
    let { data } = await axios.post(
      `https://www.instacart.com/v3/landing/products/${otherProductId}/start_guest_checkout?source=mobile_web&cache_key=undefined`,
      {
        items: [
          {
            item_id: productId,
            item_tasks: [],
            quantity: 1,
            source_type: "landing",
            source_value: "landing_content",
          },
        ],
        zip_code,
        warehouse_id,
        signup_coupon_landing_end_time: Date.now(),
      }
    );
    console.log(data);

    browser.tabs
      .query({
        active: true,
        currentWindow: true,
      })
      .then(async () => {
        await sendResponse({ response: true });
      });
  } catch (err) {
    console.log(err);
    await sendResponse({ response: false });
  }

  await updateCart();

  return true;
}
