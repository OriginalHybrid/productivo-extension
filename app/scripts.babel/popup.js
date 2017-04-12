'use strict';

console.log('\'Allo \'Allo! Popup');

console.log('hi from popup');

// chrome.historyEl.search({
//   text: '',
//   maxResults: 100
// }, (histories) => {
//   console.log('histories',histories);
// });

let settings = document.getElementById('settings');
settings.addEventListener('click', () => {
  chrome.tabs.create({
    url: 'settings.html'
  })
});

let historyEl = document.getElementById('history');
historyEl.addEventListener('click', () => {
  chrome.tabs.create({
    url: 'history.html'
  })
});

let block = document.getElementById('block');
block.addEventListener('click', () => {
  chrome.tabs.create({
    url: 'block-sites.html'
  })
});