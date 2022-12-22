
window.addEventListener("DOMContentLoaded", () => {
  const inputMin = document.getElementById("free-min");
  const inputSec = document.getElementById("free-sec");
  const freeStart = document.getElementById("free-start");
  const freeStop = document.getElementById("free-stop");
  const freeReset = document.getElementById("free-reset");
  freeReset.disabled = false;
  freeReset.setAttribute("style", "color: #fff;");

  freeStart.addEventListener("click", () => {
    freeStop.disabled = false;
    freeStop.setAttribute("style", "color: #fff;");
    
    let countMin = inputMin.value * 60;
    let countSec = inputSec.value;
    if (countMin == "") {
      countMin = 0;
    }
    if (countSec == "") {
      countSec = 0;
    }
    let mixValue = parseInt(countMin) + parseInt(countSec);
    
    const freeCount = () => {
      freeStop.addEventListener("click", () => {
        clearInterval(freeInterval);
      })

      mixValue -= 1
      freeMin = Math.floor(mixValue / 60);
      freeSec = Math.floor(mixValue % 60);
      
      if (freeMin < 10 ) {
        inputMin.value = `0${freeMin}`
      } else {
        inputMin.value = freeMin
      }

      if (freeSec < 10 ) {
        inputSec.value = `0${freeSec}`
      } else {
        inputSec.value = freeSec
      }

      if (mixValue < 0) { 
        alert("時間です！")
        inputMin.value = "" 
        inputSec.value = "" 
        clearInterval(freeInterval); 
      } 
    }
    freeCount(mixValue); 
    const freeInterval = setInterval(freeCount, 1000);
  });

  // resetボタンを押した際の処理
  freeReset.addEventListener("click", () => {
    inputMin.value = "";
    inputSec.value = "";
  });
});