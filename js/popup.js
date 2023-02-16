const app = $("#app");
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  // use `url` here inside the callback because it's asynchronous!
  if (url.includes("chat.zalo.me") || url.includes("id.zalo.me")) {
    chrome.storage.local.get("isLogged").then((result) => {
      if (result.isLogged) initIndex();
      else initLogin();
    });
  }
});

$("#zalo-link").click(function () {
  chrome.tabs.create({ url: $(this).attr("href") });
});
