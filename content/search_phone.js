function checkSearchPhone(ele) {
  if (
    ele.getAttribute("data-id") == "txt_Main_AddFrd_Phone" ||
    ele.getAttribute("data-translate-inner") == "STR_SEARCH" ||
    (ele.childElementCount != 0 &&
      ele.firstChild?.getAttribute("data-translate-inner") == "STR_SEARCH")
  ) {
    let phone = getPhoneInInfo();
    let name = getNameInAddFrd();
    let uid = getUidInAddFrd();
    let avatarLink = getAvatarLinkInAddFrd();
    let friendStatus = getFriendStatusInAddFrd();
    if (!phone || !name) return;
    let activity = {
      StaffId: shop.staffId,
      ShopId: shop.id,
      Activity: "search_phone",
      ContactUid: uid,
      ContactName: name,
      ContactPhone: phone,
      ContactType: "profile",
      DateActivity: new Date().toLocaleString(),
      FriendStatus: friendStatus,
      AvatarLink: avatarLink,
    };
    sendMessageToBackground(activity);
  }
}
