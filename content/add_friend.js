function checkAddFriend(
  ele,
  contactUid,
  contactName,
  contactPhone,
  groupName,
  avatarLink
) {
  if (
    ele.getAttribute("data-id") == "btn_AddFrd_Add" ||
    ele.parentNode?.getAttribute("data-id") == "btn_AddFrd_Add"
  ) {
    if (!contactPhone) contactPhone = getPhoneInSearch();
    let activity = {
      StaffId: shop.staffId,
      ShopId: shop.id,
      Activity: "addfriend",
      ContactUid: contactUid,
      ContactName: contactName,
      ContactPhone: contactPhone,
      ContactType: "profile",
      DateActivity: new Date().toLocaleString(),
      GroupName: groupName,
      AvatarLink: avatarLink,
    };
    sendMessageToBackground(activity);
    return true;
  } else return false;
}
