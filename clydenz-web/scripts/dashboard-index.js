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
function checkLongUrl() {
    var checkText = document.getElementById("inputLongUrl").value;
    if (checkText != "" && /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/.test(checkText)) {
        return true;
    }
    else {
        return false;
    }
}
function checkShortUrl() {
    var checkText = document.getElementById("inputShortUrl").value;
    if (checkText != "" && /^[a-zA-Z0-9]*$/.test(checkText) && /^\w{3,6}$/.test(checkText)) {
        return true;
    }
    else {
        return false;
    }
}
function submitNewUrl() {
    if (checkShortUrl() == true && checkLongUrl() == true) {
        createNewUrlMapping(document.getElementById("inputShortUrl").value.toLowerCase(), document.getElementById("inputLongUrl").value.toLowerCase());
    }
    else
        document.getElementById("formError").innerHTML = "<p class='alert alert-danger login-form-error'>There are errors in the form. Check that you have entered a valid long url and a valid short url of length between 3 and 6 and contains only alphanumeric characters.</p>";
}
function success() {
    document.getElementById("formError").innerHTML = "<p class='alert alert-success login-form-success'>Success</p>";
    setTimeout("location.href = '/Dashboard/urls';", 1500);
}
function failure() {
    document.getElementById("formError").innerHTML = "<p class='alert alert-danger login-form-error'>There are errors in the form. Check that you have entered a valid long url and a valid short url of length between 3 and 6 and contains only alphanumeric characters.</p>";
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

function createNewUrlMapping(short,long) {
    var dataG = {
        ShortUrl: short,
        LongUrl: long
    };
    $.ajax({
        type: "POST",
        url: "https://clydeapi.azurewebsites.net/api/UrlMapping",
        dataType: "json",
        data: dataG,                
    }).done(function (data, textStatus, jqXHR) {
        success();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        failure();
    });
    //SpecialsModule.getSpecial(displayResponse);
}