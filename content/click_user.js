function checkClickUser(ele) {
  while (
    ele &&
    ele.getAttribute("data-id") != "div_TabCT_FrdItem" &&
    ele.getAttribute("data-id") != "div_TabMsg_ThrdChItem" &&
    !(
      typeof ele.getAttribute("id")?.startsWith == "function" &&
      ele.getAttribute("id").startsWith("friend-item-")
    )
  ) {
    ele = ele.parentElement;
  }

  if (ele) {
    let uid = getUidInMessage();
    let avatarLink = getAvatarLinkInMessage();
    let name = getNameInMessage();
    let contactType = isGroup() ? "group" : "profile";
    let friendStatus;
    if (contactType == "profile") friendStatus = getFriendStatus();
    let contactPhone = getPhoneInSearch();
    let activityName = contactPhone ? "search_phone" : "click";

    let activity = {
      StaffId: shop.staffId,
      ShopId: shop.id,
      Activity: activityName,
      ContactUid: uid,
      ContactName: name,
      contactPhone: contactPhone,
      ContactType: contactType,
      DateActivity: new Date().toLocaleString(),
      FriendStatus: friendStatus,
      AvatarLink: avatarLink,
    };
    sendMessageToBackground(activity);
  }
}
