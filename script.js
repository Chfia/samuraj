function generateReport() {
    var logInput = document.getElementById('logInput').value;
    var resultContainer = document.getElementById('result');

    var logsArray = logInput.split('\n');

    var result = 'Raport:';

    for (var i = 0; i < logsArray.length; i++) {
        var log = logsArray[i];

        var indexOfWsadzil = log.indexOf('wsadził');
        var indexOfChcialWsadzic = log.indexOf('chciał wsadzić');

        if (indexOfWsadzil !== -1 && (indexOfChcialWsadzic === -1 || indexOfWsadzil < indexOfChcialWsadzic)) {
            result += '\n' + log;
        }
    }

    var todayCount = logsArray.filter(log => log.includes('wsadził') && !log.includes('chciał wsadzić')).length;
    var todayKey = getDateKey();
    var monthlyCount = parseInt(localStorage.getItem(getMonthKey())) || 0;

    var previousTodayCount = parseInt(localStorage.getItem(todayKey)) || 0;

    localStorage.setItem(todayKey, previousTodayCount + todayCount);

    localStorage.setItem(getMonthKey(), monthlyCount + todayCount);

    result += '\n\nWsady dzisiaj: ' + (previousTodayCount + todayCount) + '\nWsady w tym miesiącu: ' + (monthlyCount + todayCount);

    resultContainer.innerText = result;

    sendLogsToServer(logsArray);

    fetchReportFromServer();

    document.getElementById('logInput').value = '';
}

function copyReport() {
    var resultContainer = document.getElementById('result');

    var textArea = document.createElement('textarea');
    textArea.value = resultContainer.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

}

function getDateKey() {
    var currentDate = new Date();
    return currentDate.toISOString().slice(0, 10);
}

function getMonthKey() {
    var currentDate = new Date();
    return currentDate.toISOString().slice(0, 7);
}

function sendLogsToServer(logsArray) {
}

function fetchReportFromServer() {
}
