// const Flatpickr = require('flatpickr');

// For the datepicker
// let fromDate = document.getElementById('fromDate');
// new Flatpickr(fromDate, {});

flatpickr('.from-date', {});
// $('.from-date').flatpickr({});
console.log('let\'s get the history');


chrome.history.search({
  text: '',
  maxResults: 100
}, (histories) => {
  console.log('histories',histories);
});
console.log(chrome.sessions.MAX_SESSION_RESULTS);
chrome.sessions.getRecentlyClosed((sessions)=>console.log(sessions,'sessions'));

$(function () {
  let queryObj = parseQueryString();

  if('start' in queryObj && 'end' in queryObj) {
    var start = moment(queryObj.start, SHOW_FORMAT)
    var end = moment(queryObj.end, SHOW_FORMAT)
  } else {
    var start = moment().subtract('1','days')
    var end = moment()
  }
});