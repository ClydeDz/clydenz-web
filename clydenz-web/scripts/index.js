var param;
function loadPage(param) {
    loadWebsiteHeader(param);
    loadWebsiteFooter();

    checkForShortUrl();
}
// index only logic
// check for short url string after /
// if string value is nothing or index or clyde => index.html [web.config]
// if admin => /dashboard/index.html [web.config]
// else call api function to redirect to custom location
var content;
function checkForShortUrl() {
    var url = window.location.href;
    content = url.substring(url.lastIndexOf('/') + 1, url.length);
    if(content!="index"&&content!=""&&content!="clyde"&&content!="admin")
    {
        // call api function only if the short url text isn't in web.config rules and transfer that data to fetchLongUrl function
        UrlMappings.getUrlData(fetchLongUrl);
    }
}
var urlFlag=false;
function fetchLongUrl(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        if (content == ""+data[i].ShortUrl) {
            urlFlag = true;
            window.location.href = "" + data[i].LongUrl;
            break;
        }
    }
    if (urlFlag == false) {
        window.location.href = "/lost";
    }
}


// modules to call api
var UrlMappings = (function () {
    return {
        getUrlData: function (callback) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "https://clydeapi.azurewebsites.net/api/UrlMappings",
                success: function (data) {
                    callback(data);
                }
            });
        }
    }
}());

