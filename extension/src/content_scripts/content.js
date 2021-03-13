console.log("Content script: active");

browser.runtime.sendMessage("Hello from content");

browser.runtime.onMessage.addListener((message) => {
  console.log("Received in content script: ", message);
});
