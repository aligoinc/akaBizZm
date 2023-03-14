// create an observer instance
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    let target = mutation.target;
    let sender = getSender(target);
    if (isConvMessage(target) && sender != "Bạn:") {
      let name = getNameByConvMessage(target);
      let type = sender ? "group" : "profile";
      let uid, avatarLink;
      if (type == "profile") {
        uid = getUidByConvMessage(target);
        avatarLink = getAvatarByConvMessage(target);
      }
      let content = target.data;
      if (
        type === "profile" &&
        (content === "Ảnh đại diện nhóm đã thay đổi" ||
          content.endsWith("thêm vào nhóm") ||
          (content.includes("là sinh nhật của") &&
            content.endsWith("hãy gửi một lời chúc!")))
      )
        return;

      let activity = {
        StaffId: shop.staffId,
        ShopId: shop.id,
        Activity: "received_message",
        ContactUid: uid,
        ContactName: name,
        ContactType: type,
        AvatarLink: avatarLink,
        ContentActivity: content,
        DateActivity: new Date().toLocaleString(),
      };
      sendMessageToBackground(activity);
    }
  });
});

function isConvMessage(ele) {
  return (
    ele?.parentElement?.tagName == "SPAN" &&
    ele?.parentElement?.offsetParent?.className?.includes(
      "conv-message truncate"
    )
  );
}

function getNameByConvMessage(ele) {
  try {
    while (!ele || !ele.className?.includes("msg-item")) {
      ele = ele.parentElement;
    }
    return ele?.querySelector(".conv-item-title__name")?.textContent;
  } catch {
    return null;
  }
}

function getUidByConvMessage(ele) {
  try {
    while (!ele || !ele.className?.includes("msg-item")) {
      ele = ele.parentElement;
    }
    let link = ele?.querySelector("img")?.src;
    let uid = link.substring(link.lastIndexOf("/") + 1, link.lastIndexOf("."));
    return uid;
  } catch {
    return null;
  }
}

function getAvatarByConvMessage(ele) {
  try {
    while (!ele || !ele.className?.includes("msg-item")) {
      ele = ele.parentElement;
    }
    return ele?.querySelector("img")?.src;
  } catch {
    return null;
  }
}

function getSender(ele) {
  try {
    while (!ele || !ele.className?.includes("msg-item")) {
      ele = ele.parentElement;
    }
    return ele?.querySelector(".conv-dbname")?.textContent;
  } catch {
    return null;
  }
}
