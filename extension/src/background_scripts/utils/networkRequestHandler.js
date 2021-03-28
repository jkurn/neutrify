import updateCart from "./updateCart";

export default function networkRequestHandler(requestDetails) {
  if (requestDetails.url.includes("update_items")) {
    console.log(requestDetails);
    updateCart();
  }
}
