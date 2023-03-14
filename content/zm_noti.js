const zmNotiContainer = document.createElement("div");
zmNotiContainer.id = "zm-noti-container";
zmNotiContainer.className = "zl-mini-notification";
zmNotiContainer.style =
  "top: auto; bottom: 0px; left: auto; right: 18px; user-select: text;";
document.body.appendChild(zmNotiContainer);

const maxZmNoti = 5;
setInterval(() => {
  if (isRunning && zmNotiContainer.childElementCount < maxZmNoti) {
    sendMessageToBackground_GetZmNoti(shop.id);
  }
}, 10000);

function showZmNoti(zmNotis) {
  const countCanShow = maxZmNoti - zmNotiContainer.childElementCount;
  if (countCanShow <= 0) return;
  zmNotis.slice(0, countCanShow).forEach((zmNoti) => {
    const modal = createZmNoti(
      zmNoti.id,
      zmNoti.titleNoti ?? "",
      zmNoti.contentNoti
    );
    zmNotiContainer.appendChild(modal);
    chrome.runtime.sendMessage({
      type: "change_status_zm_noti",
      data: zmNoti.id,
    });
  });
}

function createZmNoti(id, title, content) {
  // Tạo modal
  var modal = document.createElement("div");
  modal.className = "snack-body";
  modal.id = `zm-noti-modal-${id}`;
  modal.innerHTML = `
        <div class="flx">
          <div class="flx flx-col flx-1">
            <div class="flx flx-1">
              <div onclick="document.getElementById('${modal.id}').remove()" icon="close f16" class="z--btn--v2 btn-tertiary-neutral medium modal-header-icon --full-rounded icon-only modal-header-icon" style="margin: -8px 16px 0 -8px;">
                <i class="fa fa-close f16 pre"></i>
              </div>
              <div class="flx flx-col flx-1 flx-center">
                <div class="snack-description" id="zm-title-noti"><b>${title}</b></div>
              </div>
            </div>
            <div class="flx flx-1">
              <i class="snack-icon"></i>
              <div class="flx flx-col flx-1 flx-center">
                <div class="snack-description" id="zm-content-noti">${content}</div>
              </div>
            </div>
          </div>
        </div>
`;

  // Hiển thị modal
  return modal;
}
