const indexHtml = `<div class="row">
<div class="col-12">
    <h5 class="font-bold text-center">akaBiz Zm</h5>
    <strong>Tài khoản: </strong>
    <span id="shop-name"></span>
</div>
</div>
<div class="row">
<div id="content" class="col-12 d-flex">
    <button type="submit" id="start-pause-btn" class="btn btn-primary"><strong>Chạy</strong></button>
</div>
</div>
<div class="row">
<div class="col-6">
    <a href="http://zm.akabiz.net" target="_blank">Quản trị</a>
</div>
<div class="col-6 text-right">
    <a id="logout-btn" href="#">Đăng xuất</a>
</div>
</div>`;

let shop;
let isRunning;

function initIndex() {
  chrome.storage.local.get().then((result) => {
    shop = result.shop;
    isRunning = result.isRunning;

    sendMessageToContentScript({ shop: shop, isRunning: isRunning });

    app.html(indexHtml);

    $("#shop-name").html(shop.name);
    setStartPauseBtn();

    $("#start-pause-btn").click(function () {
      isRunning = !isRunning;
      chrome.storage.local.set({ isRunning: isRunning }).then(() => {
        setStartPauseBtn();

        sendMessageToContentScript({ shop: shop, isRunning: isRunning });
      });
    });

    $("#logout-btn").click(function () {
      chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
          console.error(error);
        }
        initLogin();

        sendMessageToContentScript({ shop: null, isRunning: false });
      });
    });
  });
}

function setStartPauseBtn() {
  let startPauseBtn = $("#start-pause-btn");
  if (isRunning) {
    startPauseBtn.html("Dừng");
    startPauseBtn.removeClass("btn-primary");
    startPauseBtn.addClass("btn-danger");
  } else {
    startPauseBtn.html("Chạy");
    startPauseBtn.removeClass("btn-danger");
    startPauseBtn.addClass("btn-primary");
  }
}

async function sendMessageToContentScript(payload) {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const response = await chrome.tabs.sendMessage(tab.id, payload);
}
