chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case "add_activity":
      addActivity(request.data);
      break;
    case "get_zm_noti":
      getZmNoti(request.data);
      break;
    case "change_status_zm_noti":
      changeStatusZmNoti(request.data);
      break;
  }
});

function addActivity(activity) {
  let url = "http://app.akabiz.net/api/ShopContact/addActivity";

  postData(url, activity);
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function getZmNoti(shopId) {
  fetch(
    `http://app.akabiz.net/api/ZmTrigger/getZmSendNotiZalo?shopId=${shopId}`
  )
    .then((response) => response.json())
    .then((data) =>
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs.length > 0)
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "receive_zm_noti",
            data: data,
          });
      })
    )
    .catch((error) =>
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs && tabs.length > 0)
          chrome.tabs.sendMessage(tabs[0].id, {
            type: "receive_zm_noti",
            data: { status: -2, message: error },
          });
      })
    );
}

function changeStatusZmNoti(id) {
  fetch(
    `http://app.akabiz.net/api/ZmTrigger/changeStatusZmSendNotiZalo?id=${id}&status=${true}`,
    {
      method: "PATCH",
    }
  );
}
