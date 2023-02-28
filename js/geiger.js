let isPlaying = false;
let btn = document.getElementById("button1");
let gsound = document.getElementById('geiger-sound');
let cpm = document.getElementById("rad-count");
let uSv = document.getElementById("rad-sv");
let total = document.getElementById("totalCount");
let d = new Date();
let totalCPM = 0;

cpm.innerHTML = d.toLocaleString() + "   CPM: 0";
btn.addEventListener('click', doCount);

let timerID;

function doCount() {
	if (isPlaying == false) {
    btn.innerHTML = "Stop Counter";
    gsound.play();
    timerID = setInterval(fakeRad, 3000);
  }
  else {
    btn.innerHTML = "Start Counter";
    gsound.pause();
    clearInterval(timerID);
    cpm.innerHTML = "CPM: 0";
    uSv.innerHTML = "0.000 uSv/h";
  }
  
  isPlaying = !isPlaying;
}

function fakeRad() {
  let y = (Math.random() * 8) + 15;
  let x = y * 0.025;
  //Math.random() * 0.5;
  totalCPM += parseInt(y);
  total.innerHTML = "Total Pulses: " + totalCPM;
  cpm.innerHTML = d.toLocaleString() + "   CPM: " + y.toFixed(0);
  uSv.innerHTML = x.toFixed(3) + " uSv/h";
}
