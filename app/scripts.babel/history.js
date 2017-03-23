console.log('let\'s get the history');


chrome.history.search({
  text: '',
  maxResults: 100
}, (histories) => {
  console.log('histories',histories);
});