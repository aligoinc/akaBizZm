function checkSendMessage(ele) {
  if (
    ele.tagName == "BODY" ||
    ele.id == "richInput" ||
    ele.innerText.toLowerCase() == "gửi"
  ) {
    setTimeout(() => {
      let uid = getUidInMessage();
      let avatarLink = getAvatarLinkInMessage();
      let name = getNameInMessage();
      let contactType = isGroup() ? "group" : "profile";
      let contentEle = getElementByXpath(
        "//*[@data-id='div_LastSentMsg_Text']//span-15"
      );
      let content = contentEle?.innerText;
      let fileLink = getElementByXpath(
        "//*[@data-id='div_LastSentMsg_Photo']//img"
      )?.getAttribute("src");
      if (fileLink == null || fileLink == "")
        fileLink = getElementByXpath(
          "//*[@data-id='div_LastSentMsg_File']//*[@class='file-message__content-title']"
        )?.textContent;
      while (
        contentEle != null &&
        !contentEle.className.includes("chat-content")
      ) {
        contentEle = contentEle.parentElement;
      }
      let dateContactSending;
      if (contentEle && contentEle.childElementCount == 1) {
        dateContactSending = getDateContactSending();
      }
      let friendStatus;
      if (contactType == "profile") friendStatus = getFriendStatus();

      let activity = {
        StaffId: shop.staffId,
        ShopId: shop.id,
        Activity: "sendmessage",
        ContactUid: uid,
        ContactName: name,
        ContactType: contactType,
        ContentActivity: content,
        DateActivity: new Date().toLocaleString(),
        FriendStatus: friendStatus,
        DateContactSending: dateContactSending,
        FileLinks: fileLink,
        AvatarLink: avatarLink,
      };
      sendMessageToBackground(activity);
    }, 1000);
  }
}
