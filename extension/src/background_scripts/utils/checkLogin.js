export default function checkLogin(sendResponse) {
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
