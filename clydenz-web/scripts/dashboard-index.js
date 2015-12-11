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
    if (document.getElementById("inputShortUrl").value.toLowerCase().match("^[a-zA-Z0-9]*$"))
        checkShortUrlValidity(document.getElementById("inputShortUrl").value.toLowerCase());
}

function checkShortUrlValidity(input) {
    //document.getElementById("status").innerHTML = document.getElementById("inputShortUrl").value;
    for (var i = 0; i < UrlMappingData.length; i++) {
        if (input == UrlMappingData[i].ShortUrl || input.length<3) {
            document.getElementById("shortUrlValidity").innerHTML = "<i class='icon icon-remove-circle' title='Not available'></i>";
            return "taken";
        }
    }
    document.getElementById("shortUrlValidity").innerHTML = "<i class='icon icon-ok-circle' title='Available'></i>";
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
        document.getElementById("inputShortUrl").value = "";
        document.getElementById("inputShortUrl").disabled = false;
        $(button).addClass("btn-primary");
    }
    else {
        button.value = "OFF";
        document.getElementById("inputShortUrl").value = generateShortUrl();
        document.getElementById("inputShortUrl").disabled = true;
        $(button).removeClass("btn-primary");
    }
}

function generateShortUrl() {
    var s = ""; var x = 6;
    while (s.length < x && x > 0) {
        var r = Math.random();
        s += (r < 0.1 ? Math.floor(r * 100) : String.fromCharCode(Math.floor(r * 26) + (r > 0.5 ? 97 : 65)));
    }
    if (checkShortUrlValidity(s.toLowerCase()) == "taken") {
        generateShortUrl();
    }
    return s.toLowerCase();
}

// validation code
// create.html

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