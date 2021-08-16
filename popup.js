let option = document.getElementById("option");

chrome.storage.sync.get("color", ({ color }) => {
  option.style.backgroundColor = color;
});