var param;
function pageLoad(param) {
    loadDashboardHeader();
    loadDashboardSidebar(param);
    if (param == "urls") {
        UrlMappings.getUrlData(loadListOfUrls);
    }
    else if(param=="create"){
        UrlMappings.getUrlData(storeUrlMappingData);
    }
}
var data;
var urlsText = "";
function loadListOfUrls(data) {
    for (var i = 0; i < data.length; i++) {
        urlsText += "<div class='row'>";
        urlsText += "<div class='col-lg-4 col-md-4 col-sm-12 col-xs-12'>";
        urlsText += "<p>" + data[i].ShortUrl + "</p></div>";
        urlsText += "<div class='col-lg-4 col-md-4 col-sm-12 col-xs-12'>";
        urlsText += "<p>" + data[i].LongUrl + "</p></div>";
        urlsText += "<div class='col-lg-4 col-md-4 col-sm-12 col-xs-12'>";
        urlsText += "<p><button  onclick=\"test('"+data[i].ID+"');\" class='btn btn-danger' >Modify</button></p></div>";
        urlsText += "</div><hr/>";
    }
    document.getElementById('urlContainer').innerHTML = urlsText;
}
function test(id) {
    alert(id);
}

/* create */
var UrlMappingData;
function storeUrlMappingData(UMD){
    UrlMappingData=UMD;
}

function whileTyping() {
    if (checkShortUrlValidity(document.getElementById("inputShortUrl").value.toLowerCase()) == "taken") {
        document.getElementById("status").innerHTML = "taken";
    }
    else {
        document.getElementById("status").innerHTML = "available";
    }
}

function checkShortUrlValidity(input) {
    //document.getElementById("status").innerHTML = document.getElementById("inputShortUrl").value;
    for (var i = 0; i < UrlMappingData.length; i++) {
        if (input == UrlMappingData[i].ShortUrl) {
            return "taken";
        }
    }
    return "available";
}

// docs
// if custom url button is ON
// present a blank text box and perform normal validation & editable
// if custom url button is OFF
// present a textbox with random generated sequence of text &|| numbers and make it uneditable
// random text above must be valid
function toggle(button) {
    if (button.value == "OFF") {
        button.value = "ON";
        document.getElementById("inputShortUrl").disabled = false;
        $(button).addClass("btn-primary");
    }
    else {
        button.value = "OFF";
        document.getElementById("inputShortUrl").disabled = true;
        $(button).removeClass("btn-primary");
    }
}

function generateShortUrl() {

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