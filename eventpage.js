
var  googleAccountNumber;
var meet;
var classroom;
chrome.storage.sync.get(['googleAccountNumber', 'meet', 'classroom'], function (details) {
    googleAccountNumber = details.googleAccountNumber;
    meet = details.meet;
    classroom = details.classroom;

    if (meet) {

        chrome.webRequest.onBeforeRequest.addListener(function (tabDetails) {
            var tabUrl = tabDetails.url;
            console.log(googleAccountNumber);
            var req_url_extra = "?pli=1&authuser=" + googleAccountNumber;
            if (!tabUrl.includes(req_url_extra)) {
                if (tabUrl.includes('?')) {
                    tabUrl = tabUrl.split('?')[0];
                }
                var redirect_url = tabUrl + req_url_extra;
                return { redirectUrl: redirect_url };
            }
            else {

                return { redirectUrl: tabUrl };
            }

        }
            , {
                urls: ["https://meet.google.com/*"],
                types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
            },
            ['blocking']
        )

    }

    if (classroom) {
        chrome.webRequest.onBeforeRequest.addListener(function (tabDetails) {
            var tabUrl = tabDetails.url;
            var req_url_extra = "/u/" + googleAccountNumber+"/h";
            if (!tabUrl.includes(req_url_extra)) {
                if (tabUrl.includes('/u/')) {
                    tabUrl = tabUrl.split('com')[0];
                    tabUrl=tabUrl+"com";
                }
                var redirect_url = tabUrl+ req_url_extra;
                return { redirectUrl: redirect_url };
            }
            else {

                return { redirectUrl: tabUrl };
            }

        }
            , {
                urls: ["https://classroom.google.com/u/*/h","https://classroom.google.com/u/*/h/","https://classroom.google.com/"],
                types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
            },
            ['blocking']
        )

    }

})

