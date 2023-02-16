function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

function isGroup() {
  try {
    let ele = getElementByXpath("//*[@data-id='btn_Grp_AddMem']");
    return ele ? true : false;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function getNameInMessage() {
  try {
    let name = getElementByXpath(
      "//*[contains(@class,'header-title')]"
    ).innerText;
    return name;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getNameInAddFrd() {
  try {
    let name = getElementByXpath(
      "//*[contains(@class,'friend-profile__display-name')]"
    )?.innerText;
    return name;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getPhoneInInfo() {
  try {
    let phone = getElementByXpath(
      "//*[@data-id='txt_Main_AddFrd_Phone']"
    )?.value?.trim();
    return phone;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getPhoneInSearch() {
  try {
    let phone = getElementByXpath(
      "//*[contains(@class,'friend_online_status')]//*[@class='txt-highlight']"
    )?.textContent?.trim();
    return phone;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getUidInMessage() {
  try {
    if (isGroup()) return "";
    let link = getElementByXpath("//*[@id='header']//img").getAttribute("src");
    let uid = link.substring(link.lastIndexOf("/") + 1, link.lastIndexOf("."));
    return uid;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getAvatarLinkInMessage() {
  try {
    if (isGroup()) return "";
    let link = getElementByXpath("//*[@id='header']//img").getAttribute("src");
    return link;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getUidInAddFrd() {
  try {
    let link = getElementByXpath(
      "//*[contains(@class,'user-profile-preview')]//img"
    )?.getAttribute("src");
    let uid = link?.substring(link.lastIndexOf("/") + 1, link.lastIndexOf("."));
    return uid;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getAvatarLinkInAddFrd() {
  try {
    let link = getElementByXpath(
      "//*[contains(@class,'user-profile-preview')]//img"
    )?.getAttribute("src");
    return link;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getContentAddFrd() {
  try {
    let content = getElementByXpath("//*[@data-id='txt_AddFrd_Msg']").innerText;
    return content;
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getFriendStatus() {
  try {
    let ele = getElementByXpath(
      "//*[@data-translate-inner='STR_PROFILE_ACCEPT']"
    );
    if (ele) return "wait_accept";
    ele = getElementByXpath(
      "//*[@data-translate-inner='STR_PROFILE_ADD_FRIEND']"
    );
    if (ele) return "not_friend";
    ele = getElementByXpath(
      "//*[@data-translate-inner='STR_PROFILE_FRIEND_REQ_SENT']"
    );
    if (ele) return "sent_request";
    return "friend";
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getFriendStatusInAddFrd() {
  try {
    let ele = getElementByXpath("//*[@data-id='btn_UserProfile_Accept']");
    if (ele) return "wait_accept";

    ele = getElementByXpath("//*[@data-id='btn_UserProfile_Delete']");
    if (ele) return "friend";

    ele = getElementByXpath("//*[@data-id='btn_UserProfile_CXLFrdReq']");
    if (ele) return "sent_request";

    return "not_friend";
  } catch (err) {
    console.log(err);
    return "";
  }
}

function getDateContactSending() {
  try {
    let timeStr = getElementByXpath(
      "//*[@data-id='div_LastReceivedMsg_Text' or @data-id='div_ReceivedMsg_GrpPhoto']//*[@class='card-send-time__sendTime']"
    )?.textContent;
    if (!timeStr || timeStr == "")
      timeStr = getElementByXpath(
        "(//*[@data-id='div_ReceivedMsg_Text' or @data-id='div_ReceivedMsg_GrpPhoto']//*[@class='card-send-time__sendTime'])[last()]"
      )?.textContent;
    var time = new Date();
    if (!timeStr) return null;
    time.setHours(timeStr.split(":")[0], timeStr.split(":")[1], 0);
    return time.toLocaleString();
  } catch (err) {
    console.log(err);
    return null;
  }
}
