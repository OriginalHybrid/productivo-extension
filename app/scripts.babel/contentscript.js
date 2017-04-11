// Code that runs in every page

var timeoutID;

console.log('I\'m in content script')
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
     console.log('starting the timer');
    timeoutID = window.setTimeout(goInactive, 5000);
}

function resetTimer(e) {
    console.log('clearing the timeout')
    window.clearTimeout(timeoutID);
    goActive();
}

function goInactive() {
     console.log('Im inactive now')
    chrome.runtime.sendMessage({ userActive: false }, (response) => {});
}

function goActive() {
    console.log('Im active now')
    chrome.runtime.sendMessage({ userActive: true });
    startTimer();
}