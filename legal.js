function setLang(lang) {
  document.querySelectorAll("[data-lang-content]").forEach(function (el) {
    el.hidden = el.getAttribute("data-lang-content") !== lang;
  });
  document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
  document.documentElement.lang = lang;
  try { localStorage.setItem("dropy-legal-lang", lang); } catch (e) {}
}
(function () {
  try {
    var saved = localStorage.getItem("dropy-legal-lang");
    if (saved === "en") setLang("en");
  } catch (e) {}
})();
