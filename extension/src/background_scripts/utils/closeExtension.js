export default function closeExtension() {
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
