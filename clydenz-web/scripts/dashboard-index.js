// docs
// pageLoad loads the appropriate function on the basis of which page called it
// loads header and sidebar menu of the dashboard website
// Based on which page has called this function, it loads the database values and calls the following function
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
    else if (param == "profile") {
        Users.getUsersData(displayProfileInformation);
    }
}
/* *************************************************URL listing************************************************* */
var data;
var urlsText = "";
function loadListOfUrls(data) {
    for (var i = 0; i < data.length; i++) {
        urlsText += "<div class='row'>";
        urlsText += "<div class='col-lg-2 col-md-2 col-sm-12 col-xs-12'>";
        urlsText += "<p>" + data[i].ShortUrl + "</p></div>";
        urlsText += "<div class='col-lg-8 col-md-8 col-sm-12 col-xs-12'>";
        urlsText += "<p>" + data[i].LongUrl + "</p></div>";
        urlsText += "<div class='col-lg-2 col-md-2 col-sm-12 col-xs-12'>";
        urlsText += "<p><button  onclick=\"deleteRecord('" + data[i].ID + "');\" class='btn btn-danger' ><i class='icon icon-trash'></i></button></p></div>";
        urlsText += "</div><hr/>";
    }
    document.getElementById('urlContainer').innerHTML = urlsText;
}
function deleteRecord(id) {
    swal({
        title: "Are you sure?",
        text: "You are about to delete a URL mapping permanently",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D9534F",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false
    },
    function () {
        if (deleteUrlMappingRecord(id)) {
            swal({
                title: "Great, we did it!",
                text: "Your selected url has been deleted.",
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#389E28",
                confirmButtonText: "Sweet",
                closeOnConfirm: true
            },
            function(){
                setTimeout("location.href = '/Dashboard/urls';", 1000);
            });          
        }
        else {
            swal("Urgh", "We couldn't perform a simple delete. Our bad.", "error");
        }
     });
}

/* **********************************************************Create**************************************************** */
var UrlMappingData;
function storeUrlMappingData(UMD){
    UrlMappingData=UMD;
}

function whileTyping() {
    if (document.getElementById("inputShortUrl").value.toLowerCase().match("^[a-zA-Z0-9]*$"))
        checkShortUrlValidity(document.getElementById("inputShortUrl").value.toLowerCase());
}

function checkShortUrlValidity(input) {
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
        document.getElementById("inputShortUrl").readOnly = false;
        $(button).addClass("btn-primary");
    }
    else {
        button.value = "OFF";
        document.getElementById("inputShortUrl").value = generateShortUrl();
        document.getElementById("inputShortUrl").readOnly = true;
        $(button).removeClass("btn-primary");
    }
}

// docs
// generates a random 6 character short url
// it also validates and returns only if its unique
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


/* ************************************************************Profile********************************************** */
var profileText="";
function displayProfileInformation(profileData) {
    for (var i = 0; i < profileData.length; i++) {
        document.getElementById("inputEmail").value = ""+profileData[i].Email;
    }
}

// ////////////////////////////////////////////////////////////validation code\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/* *************************************************************Create********************************************** */
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
    if (checkShortUrl() == true) {
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
    document.getElementById("formError").innerHTML = "<p class='alert alert-danger login-form-error'>There were errors while posting this new url.</p>";
}


// ////////////////////////////////////////////////////////////////modules to call api\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
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

var Users = (function () {
    return {
        getUsersData: function (callback) {
            $.ajax({
                type: "GET",
                dataType: "json",
                url: "https://clydeapi.azurewebsites.net/api/Users",
                success: function (data) {
                    callback(data);
                }
            });
        }
    }
}());

var short; var long;
function createNewUrlMapping(short, long) {    
    var dataG = {
        ID:0,
        ShortUrl: short,
        LongUrl: long
    };
    $.ajax({
        type: "POST",
        url: "http://clydeapi.azurewebsites.net/api/UrlMappings",
        dataType: "json",
        data: dataG,
    }).done(function (data, textStatus, jqXHR) {
        success();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("f" + jqXHR + ":" + textStatus + "et" + errorThrown);
        failure();
    });
}

function deleteUrlMappingRecord(urlID) {
    $.ajax({
        type: "DELETE",
        url: "http://clydeapi.azurewebsites.net/api/UrlMappings/"+urlID
    }).done(function (data, textStatus, jqXHR) {
        return true;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        return false;
    });
}