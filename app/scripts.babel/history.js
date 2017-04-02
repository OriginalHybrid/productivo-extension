// 'use strict';
import {parseQueryString} from './util'

/* Variables */
let start;
let end;

/* Initializing the Datepicker */
flatpickr('.from-date', {});




/* Getting the history */
function getHistory(start, end) {
  console.log('let\'s get the history');
  chrome.history.search({
    text: '',
    startTime: start,
    endTime: end,
    maxResults: 100
  }, (histories) => {
    console.log('histories',histories);
  });

  console.log(chrome.sessions.MAX_SESSION_RESULTS);
  chrome.sessions.getRecentlyClosed((sessions)=>console.log(sessions,'sessions'));
}


$(function () {
  let queryObj = parseQueryString();

  if('start' in queryObj && 'end' in queryObj) {
    start = moment(queryObj.start, SHOW_FORMAT)
    end = moment(queryObj.end, SHOW_FORMAT)
  } else {
    start = moment().subtract('1','days')
    end = moment()
  }

  getHistory(start, end)
});