const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let laps = [];

function timeToString(time) {
  const diffInHrs = time / 3600000;
  const hh = Math.floor(diffInHrs);

  const diffInMin = (diffInHrs - hh) * 60;
  const mm = Math.floor(diffInMin);

  const diffInSec = (diffInMin - mm) * 60;
  const ss = Math.floor(diffInSec);

  const diffInMs = (diffInSec - ss) * 1000;
  const ms = Math.floor(diffInMs);

  const formattedHH = hh.toString().padStart(2, '0');
  const formattedMM = mm.toString().padStart(2, '0');
  const formattedSS = ss.toString().padStart(2, '0');
  const formattedMS = ms.toString().padStart(3, '0');

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
  display.textContent = txt;
}

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    isRunning = true;
    toggleButtons();
  }
}

function pause() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    toggleButtons();
  }
}

function reset() {
  clearInterval(timerInterval);
  print("00:00:00.000");
  elapsedTime = 0;
  laps = [];
  updateLaps();
  isRunning = false;
  toggleButtons();
}

function lap() {
  if (isRunning) {
    laps.push(elapsedTime);
    updateLaps();
  }
}

function updateLaps() {
  lapsContainer.innerHTML = '';
  laps.forEach((lapTime, index) => {
    const lapDiv = document.createElement('div');
    lapDiv.classList.add('lap');
    lapDiv.innerHTML = `<span>Lap ${index + 1}</span><span>${timeToString(lapTime)}</span>`;
    lapsContainer.appendChild(lapDiv);
  });
}

function toggleButtons() {
  if (isRunning) {
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = false;
    startBtn.setAttribute('aria-pressed', 'true');
  } else {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = elapsedTime === 0;
    startBtn.setAttribute('aria-pressed', 'false');
  }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initialize button states
toggleButtons();
