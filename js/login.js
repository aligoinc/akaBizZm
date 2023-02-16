const loginHtml = `<div class="loginColumns animated fadeInDown">
<div class="row justify-content-md-center">
    <div class="col-md-12">
        <h5 class="font-bold text-center">akaBiz Zm</h5>
        </br>
        <div class="form-group">
            <input type="text" name="Username" id="username" class="form-control" placeholder="Username">
        </div>
        <div class="form-group">
            <input type="password" name="Password" id="password" class="form-control" placeholder="Password">
        </div>
        <button type="submit" id="login-btn" class="btn btn-primary float-right">Đăng nhập</button>
    </div>
</div>
</div>`;

function initLogin() {
  chrome.storage.local
    .set({ isLogged: false, shop: null, isRunning: false })
    .then(() => {
      app.html(loginHtml);

      $("#login-btn").click(function () {
        _url = "http://app.akabiz.net/api/Auth/loginZaloShop";
        var _obj = {
          username: $("#username").val(),
          password: $("#password").val(),
        };
        return $.ajax({
          url: _url,
          type: "GET",
          dataType: "json",
          contentType: "application/json",
          data: _obj,
          success: function (result) {
            if (result.status == 1) {
              chrome.storage.local
                .set({ isLogged: true, shop: result.data, isRunning: false })
                .then(() => {
                  initIndex();
                });
            } else {
              alert(result.message);
            }
          },
          error: function (xhr, status, error) {
            alert(xhr.responseText);
          },
        });
      });
    });
}
