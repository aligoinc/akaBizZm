let isLogged;
let shop;
let isRunning;

let contactUid, contactName, contactPhone, groupName, avatarLink;

const observerConfig = { characterData: true, subtree: true };

chrome.storage.local.get().then((result) => {
  isLogged = result.isLogged;
  if (isLogged) {
    shop = result.shop;
    isRunning = result.isRunning;
  }
  execute();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == "receive_zm_noti") {
    if (request.data.status === 1) {
      showZmNoti(request.data.data);
    }
  } else {
    shop = request.shop;
    isRunning = request.isRunning;
    execute();
  }
});

function execute() {
  if (isRunning) {
    document.onclick = function (e) {
      let ele = e.target;
      setTimeout(function () {
        checkClickUser(ele);
        checkSearchPhone(ele);
      }, 1000);
      checkAddTag(ele);
      checkAcceptFriend(ele);
      checkSendMessage(ele);

      if (
        !checkAddFriend(
          ele,
          contactUid,
          contactName,
          contactPhone,
          groupName,
          avatarLink
        )
      ) {
        if (
          ele.innerText.toLowerCase() == "kết bạn" ||
          ele.parentNode?.innerText.toLowerCase() == "kết bạn"
        ) {
          setTimeout(() => {
            contactUid = getUidInAddFrd();
            avatarLink = getAvatarLinkInAddFrd();
            contactName = getNameInAddFrd();
            contactPhone = getPhoneInInfo();
            if (isGroup()) groupName = getNameInMessage();
            else groupName = null;
          }, 500);
        }
      }
    };

    document.addEventListener("keyup", docKeyup);
    observer.observe(document, observerConfig);
  } else {
    document.onclick = null;
    document.removeEventListener("keyup", docKeyup);
    observer.disconnect();
  }
}

async function sendMessageToBackground(payload) {
  const response = await chrome.runtime.sendMessage({
    type: "add_activity",
    data: payload,
  });
}

async function sendMessageToBackground_GetZmNoti(payload) {
  const response = await chrome.runtime.sendMessage({
    type: "get_zm_noti",
    data: payload,
  });
}

function docKeyup(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    let ele = event.target;
    setTimeout(function () {
      checkSearchPhone(ele);
    }, 1000);
    checkSendMessage(ele);
  }
}
