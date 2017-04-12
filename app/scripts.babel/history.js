// 'use strict';
// import {parseQueryString} from './util'

/* Variables */
let start;
let end;

/* Initializing the Datepicker */
flatpickr('.from-date', {});
const SHOW_FORMAT = 'YYYY/MM/DD';
const SHOW_FORMAT_SEC = 'YYYY/MM/DD HH:mm:ss';
const MAX_RESULTS = Math.pow(2, 31) - 1;

function parseQueryString() {
  let queryDict = {}
  window.location.search.substr(1).split('&').forEach((item) => {
    queryDict[item.split('=')[0]] = item.split('=')[1];
  });
  return queryDict;
}



/* Getting the history */
function getHistory(start, end) {
  console.log('let\'s get the history');
  chrome.history.search({
    text: '',
    startTime: start.valueOf(),
    endTime: end.valueOf(),
    maxResults: 100
  }, (histories) => {
    console.log('histories',histories);
    showHistory(histories)
  });

  console.log(chrome.sessions.MAX_SESSION_RESULTS);
  chrome.sessions.getRecentlyClosed((sessions)=>console.log(sessions,'sessions'));
}

function showHistory(histories) {
  var rank = $('#history-table');

  histories = _.map(histories, (history) => {
    return {
      'visitDay': moment(history.lastVisitTime).startOf('day').valueOf(),
      'title': history.title || history.url,
      'duration': 0,
      'visitCount': history.visitCount,
      'faviconUrl': history.url.match(/:\/\/(.[^/]+)/)[1]
    }
  });

  histories.forEach((visit) => {
    var row = [
      `<tr>`,
      `<td><img class='uk-preserve-width uk-border-circle' src='https://www.google.com/s2/favicons?domain=${visit.faviconUrl}' width='20' alt=''></td>`,
      `<td class='uk-table-link uk-text-truncate'><a class='uk-link-reset' href=''>${visit.title}</a></td>`,
      `<td class='uk-text-truncate'>${visit.duration} minutes</td>`,
      `<td class='uk-text-nowrap'>${visit.visitCount}</td>`,
      `</tr>`,
    ].join();
    rank.append(row);
  })

}

/* For the charts */
function initializeChartWithData() {
  var ctx = document.getElementById('myChart');

  chrome.storage.local.get('trackr', function(data) {
    console.log('data from storage for the sake of charts', data.trackr);
  });
  var data = {
    labels: [
      "Red",
      "Blue",
      "Yellow"
    ],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }]
  };


  var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: data,
    options: {}
  });
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

  let dateHeading = document.getElementById('date-heading');
  // dateHeading.innerText += ` ${moment(start).format('Dd MMM YY')} to ${moment(end).format('Dd MMM YY')}`;

  // getHistory(start, end);


  chrome.storage.local.get('trackr', function(data) {
    console.log('data from storage', data.trackr);

    var sites = data.trackr;

    var rank = $('#history-table');

    sites.forEach((visit) => {
      var row = [
        `<tr>`,
        `<td><img class='uk-preserve-width uk-border-circle' src='https://www.google.com/s2/favicons?domain=${visit.title}' width='20' alt=''></td>`,
        `<td class='uk-table-link uk-text-truncate'><a class='uk-link-reset' href=''>${visit.title}</a></td>`,
        `<td class='uk-text-truncate'>${visit.time} minutes</td>`,
        // `<td class='uk-text-nowrap'>${visit.visitCount}</td>`,
        `</tr>`,
      ].join();
      rank.append(row);
    })
  })

  initializeChartWithData();
});