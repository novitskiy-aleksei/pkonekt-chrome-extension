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
        if (req.readyState == 4){
            if (req.status == 200) {
                var m = JSON.parse(req.responseText).message;

                if (typeof m != 'undefined'){
                    alert('Pkonekt сказал: \n' + JSON.parse(req.responseText).message)
                }
            }else{
                alert('Возникла непредвиденная ошибка или pkonekt опять лежит. Обратитесь к Шутку')
            }
        }
    };
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({url: "http://pkonekt.vitalyshutko.com"}, function(tab) {});
});
chrome.contextMenus.create({title: "Запостить на pkonekt", contexts:["image", "link"], onclick: tryToPost});