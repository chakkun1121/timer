let isTimerMove = false;
let timer;
let time;
let startTime;
window.onload = function () {
  changeTimerTime();
  document.getElementById("stop").disabled = true;
  document.getElementById("reset").disabled = true;
};
function changeTimerTime() {
  if (isTimerMove) {
    stopTimer();
  }
  const hour = document.getElementById("hourInput").value;
  const minute = document.getElementById("minuteInput").value;
  const second = document.getElementById("secondInput").value;
  //時間を表示(2桁表示)
  document.getElementById("hour").innerText = ("0" + hour).slice(-2);
  document.getElementById("minute").innerText = ("0" + minute).slice(-2);
  document.getElementById("second").innerText = ("0" + second).slice(-2);
}
function startTimer() {
  if (isTimerMove) {
    stopTimer();
  }
  //設定された時間を取得
  const hour = document.getElementById("hourInput").value;
  const minute = document.getElementById("minuteInput").value;
  const second = document.getElementById("secondInput").value;
  //時間をミリ秒に変換
  time = hour * 60 * 60 * 1000 + minute * 60 * 1000 + second * 1000;
  document.getElementById("start").disabled = true;
  document.getElementById("stop").disabled = false;
  document.getElementById("reset").disabled = false;
  //タイマーを開始
  startTime = new Date().getTime();
  isTimerMove = true;
}
function updateTimer() {
  if (!isTimerMove) {
    document.title = "タイマーアプリ | chakkun1121";
    return;
  }
  const nowTime = new Date().getTime();
  const diff = time - (nowTime - startTime);
  //残り時間を表示(2桁表示)
  const h = ("0" + Math.floor(diff / (1000 * 60 * 60))).slice(-2);
  const m = ("0" + Math.floor((diff / (1000 * 60)) % 60)).slice(-2);
  const s = ("0" + Math.floor((diff / 1000) % 60)).slice(-2);
  document.getElementById("hour").innerText = h;
  document.getElementById("minute").innerText = m;
  document.getElementById("second").innerText = s;
  document.getElementById("hourInput").value = h;
  document.getElementById("minuteInput").value = m;
  document.getElementById("secondInput").value = s;
  document.title = h + ":" + m + ":" + s + " - タイマー | chakkun1121";
  //時間になったらアラートを表示
  if (diff < 0) {
    alarm();
    resetTimer();
  }
}
requestAnimationFrame(function () {
  updateTimer();
  requestAnimationFrame(arguments.callee);
});
function alarm() {
  alert("時間になりました");
}
function stopTimer() {
  isTimerMove = false;
  clearInterval(timer);
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
  document.getElementById("reset").disabled = false;
}
function resetTimer() {
  isTimerMove = false;
  clearInterval(timer);
  document.getElementById("hour").innerText = 00;
  document.getElementById("minute").innerText = 03;
  document.getElementById("second").innerText = 00;
  document.getElementById("hourInput").value = 0;
  document.getElementById("minuteInput").value = 3;
  document.getElementById("secondInput").value = 0;
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
  document.getElementById("reset").disabled = true;
}
async function showPip() {
  const player = document.querySelector("main");

  // 2. ピクチャーインピクチャーのウインドウの定義
  const pipWindow = await documentPictureInPicture.requestWindow({
    width: player.clientWidth,
    height: player.clientHeight,
    copyStyleSheets: true,
  });

  // 3. ウインドウに`#player`を追加
  pipWindow.document.body.append(player);
  pipWindow.addEventListener("unload", (event) => {
    const playerContainer = document.querySelector("main");
    const pipPlayer = event.target.querySelector("body");
    playerContainer.append(pipPlayer);
  });
  // ピクチャーインピクチャーのウインドウは通常のポップアップと同様
}
