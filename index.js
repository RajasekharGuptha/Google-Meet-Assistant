function refresh() {
    chrome.storage.sync.get(['googleAccountNumber','meet','classroom'], function (details) {
        document.getElementById('googleAccountNumber').value = details.googleAccountNumber;
        document.getElementById('meet').checked = details.meet;
        document.getElementById('classroom').checked = details.classroom;
    })
}

refresh();
document.getElementById('save_btn').addEventListener('click', function () {

    console.log("clicked");
    var googleAccountNumber_set = document.getElementById('googleAccountNumber').value;
    var classroom_set = document.getElementById('classroom').checked;
    var meet_set = document.getElementById('meet').checked;
    chrome.storage.sync.set({ 'googleAccountNumber': googleAccountNumber_set,'classroom': classroom_set,'meet': meet_set },function(){
        refresh();
        chrome.runtime.reload();
    });

});