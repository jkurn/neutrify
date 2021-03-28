export default function getLocalStorageData(data, sendResponse) {
  let { key } = data;
  console.log(JSON.parse(localStorage.getItem(key)));
  sendResponse({ response: JSON.parse(localStorage.getItem(key)) });
}
