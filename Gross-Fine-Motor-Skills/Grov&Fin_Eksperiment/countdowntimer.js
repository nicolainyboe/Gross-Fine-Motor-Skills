var minutter = document.getElementById("minutter");
var sekunder = document.getElementById("sekunder");
var antalSekunder = 30;

let timer;
function callTimer() {
  timer = setInterval(startTid, 1000);
}
function startTid() {
  --antalSekunder;
  sekunder.innerHTML = tid(antalSekunder % 60);
  minutter.innerHTML = tid(parseInt(antalSekunder / 60));
  if (antalSekunder < 1) {
    console.log("next page");
    clearInterval(timer);
    window.location.href = "order.html";
  }
}

function tid(val) {
  var tidStr = val + "";
  if (tidStr.length < 2) {
    return "0" + tidStr;
  } else {
    return tidStr;
  }
}
