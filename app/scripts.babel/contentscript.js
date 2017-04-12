// Code that runs in every page

var timeoutID;
var hostname;

function isYoutube() {
  let host = new URL(window.location);
  let hostname = host.hostname;
  console.log('host', hostname);
  if(hostname === 'www.youtube.com') {
    console.log('I\'m on youtube now');
    return true;
  } else {
    return false;
  }
}

function setup() {
    window.addEventListener('mousemove', resetTimer, false);
    window.addEventListener('mousedown', resetTimer, false);
    window.addEventListener('keypress', resetTimer, false);
    window.addEventListener('scroll', resetTimer, false);
    window.addEventListener('wheel', resetTimer, false);
    window.addEventListener('touchmove', resetTimer, false);
    window.addEventListener('pointermove', resetTimer, false);


    startTimer();
}

setup();

function startTimer() {
  console.log('starting timer');
  timeoutID = window.setTimeout(goInactive, 5000);
}

function resetTimer() {
  console.log('resetting timer');
  window.clearTimeout(timeoutID);
  goActive();
}

function goInactive() {
  let player =  document.getElementById('movie_player');
  if(player !== undefined && (player.classList.value.split(" ").indexOf('playing-mode') > -1)) {
    timeoutID = window.setTimeout(goInactive, 5000);
    return;
  }
  console.log('going inactive');
    chrome.runtime.sendMessage({ userActive: false }, (response) => {});
}

function goActive() {
  console.log('going active');
    chrome.runtime.sendMessage({ userActive: true });
    startTimer();
}