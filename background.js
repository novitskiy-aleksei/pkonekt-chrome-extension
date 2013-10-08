function tryToPost(link)
{
    var req = new XMLHttpRequest();

    req.open('POST', 'http://pkonekt.vitalyshutko.com/post/add', true);

    var params = 'link=' + encodeURIComponent(link.srcUrl) + '&descr=';

    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Content-length", params.length);
    req.setRequestHeader("Connection", "close");

    req.send(params);

    req.onreadystatechange = function()
    {
        // If the request completed, close the extension popup
        if (req.readyState == 4)
            if (req.status == 200) window.close();
    };
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: "http://pkonekt.vitalyshutko.com"}, function(tab) {
        // Tab opened.
    });
});
chrome.contextMenus.create({title: "Запостить на pkonekt", contexts:["image", "link"], onclick: tryToPost});
