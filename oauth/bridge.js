// OAuth return page for the Dropy app's "Instagram-ı qoş" / "Facebook-u qoş".
//
// Meta only accepts https:// redirect URIs, so Meta sends the store owner
// here after they approve, with ?code=&state= (or ?error=...) appended. This
// page's only job is to hand those back to the app through its own
// endirim:// scheme — the app's in-app browser is waiting for exactly that
// URL, closes itself, and sends the code to our server, which exchanges it
// for a token. The code alone is useless without the app secret, and only
// the known OAuth parameters are forwarded.
(function () {
  var platform = document.body.getAttribute("data-platform");
  var params = new URLSearchParams(window.location.search);
  var forwarded = new URLSearchParams();
  ["code", "state", "error", "error_reason", "error_description"].forEach(function (key) {
    var value = params.get(key);
    if (value) forwarded.set(key, value);
  });

  var heading = document.getElementById("heading");
  var message = document.getElementById("message");
  var errorBox = document.getElementById("error");
  var spinner = document.getElementById("spinner");
  var back = document.getElementById("back");

  if (!forwarded.has("code") && !forwarded.has("error")) {
    spinner.hidden = true;
    heading.textContent = "Bu səhifə birbaşa açılmır";
    message.textContent = "Dropy tətbiqində mağazanızı Instagram və ya Facebook-a qoşanda avtomatik bura yönləndirilirsiniz.";
    return;
  }

  if (forwarded.has("error")) {
    spinner.hidden = true;
    heading.textContent = "Qoşulma ləğv edildi";
    message.textContent = "Tətbiqə qayıdıb yenidən cəhd edə bilərsiniz.";
    errorBox.textContent = forwarded.get("error_description") || forwarded.get("error");
    errorBox.hidden = false;
  }

  var deepLink = "endirim://" + platform + "-callback?" + forwarded.toString();
  back.href = deepLink;
  back.hidden = false;
  setTimeout(function () {
    window.location.href = deepLink;
  }, 300);
})();
