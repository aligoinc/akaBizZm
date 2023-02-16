function checkAddTag(ele) {
  if (
    ele.className.includes("zmenu-item") ||
    ele.parentNode?.className.includes("zmenu-item")
  ) {
    let parent;
    if (ele.className.includes("zmenu-item")) parent = ele;
    else parent = ele.parentNode;

    let uid = getUidInMessage();
    let avatarLink = getAvatarLinkInMessage();
    let name = getNameInMessage();
    let contactType = isGroup() ? "group" : "profile";
    let tagName = parent.querySelector(".truncate.flx-1")?.innerText;
    let friendStatus;
    if (contactType == "profile") friendStatus = getFriendStatus();

    let activity = {
      StaffId: shop.staffId,
      ShopId: shop.id,
      Activity: "addtag",
      ContactUid: uid,
      ContactName: name,
      ContactType: contactType,
      ContentActivity: tagName,
      DateActivity: new Date().toLocaleString(),
      FriendStatus: friendStatus,
      AvatarLink: avatarLink,
    };
    sendMessageToBackground(activity);
  }
}
