function checkAcceptFriend(ele) {
  if (
    (ele.getAttribute("data-id") == "btn_UserProfile_Accept" &&
      ele.textContent.toLowerCase() == "đồng ý") ||
    (ele.parentNode?.getAttribute("data-id") == "btn_UserProfile_Accept" &&
      ele.textContent.toLowerCase() == "đồng ý") ||
    ele.getAttribute("data-id") == "btn_TabCT_FrdReqItemAccept" ||
    ele.parentNode?.getAttribute("data-id") == "btn_TabCT_FrdReqItemAccept" ||
    ele.getAttribute("data-id") == "btn_Chat_AcceptFrdReq" ||
    ele.parentNode?.getAttribute("data-id") == "btn_Chat_AcceptFrdReq"
  ) {
    if (!contactPhone) contactPhone = getPhoneInSearch();
    let contactName = getNameInMessage();
    let contactUid, avatarLink;
    if (!contactName || contactName == "") {
      contactName = getNameInAddFrd();
      contactUid = getUidInAddFrd();
      avatarLink = getAvatarLinkInAddFrd();
    } else {
      contactUid = getUidInMessage();
      avatarLink = getAvatarLinkInMessage();
    }
    let activity = {
      StaffId: shop.staffId,
      ShopId: shop.id,
      Activity: "acceptfriend",
      ContactUid: contactUid,
      ContactName: contactName,
      ContactPhone: contactPhone,
      ContactType: "profile",
      DateActivity: new Date().toLocaleString(),
      AvatarLink: avatarLink,
    };
    sendMessageToBackground(activity);
    return true;
  } else return false;
}
