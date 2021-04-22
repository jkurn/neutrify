import axios from "axios";
import { API_ENDPOINT } from "../../config.js/global";

export default function getProductsWithCarbon (messageData, sendResponse) {
  let { rawCart } = messageData;

  console.log(rawCart);

  let promises = [];
  let finalCart = [];
  let totalGHG = 0;

  rawCart.forEach((rawCartItem) => {
    let cartItemWithGHGPromise = new Promise(async (resolve, reject) => {
      try {
        // Get id after "_" (Eg. "item_12345" => "12345")
        let rawCartItemId = await rawCartItem.id.split("_")[1];

        // Get data from db using current id
        let { data } = (
          await axios.get(`${API_ENDPOINT}/products/get/${rawCartItemId}`, {
            headers: {
              apiskey: process.env.REACT_APP_API_SECRET_KEY,
              'Access-Control-Allow-Origin' : '*',
            },
          })
        ).data;

        let { status } = data;

        // Update only if the product exists in the backend
        // TODO: Remove "Beef" type checking in the future (this is hardcoded for MVP purposes)
        if (status === true) {

          let { product:finalCartItem } = data;

          // Multiply ghg according to quantity and set it in state
          let newTotalGHG = finalCartItem.carbon * rawCartItem.quantity;
          totalGHG += newTotalGHG;

          // Push item to finalCart array
          await finalCart.push({ ...rawCartItem, ...finalCartItem });
        }
      } catch (err) {
        console.log(err);
        reject(err);
      }
      // Resolve promise
      await resolve("success");
    });

    promises.push(cartItemWithGHGPromise);
  });

  // Set loading = true once all promises are resolved
  Promise.all(promises).then(() => {
    browser.tabs
      .query({
        active: true,
        currentWindow: true,
      })
      .then(async () => {
        await sendResponse({
          response: {
            finalCart,
            totalGHG,
          },
        });
      });

    return true;
  });
};
