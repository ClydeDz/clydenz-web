var dashboardHeaderText="<div class='jumbotron'>";
dashboardHeaderText+="<h1>Dashboard</h1>";
dashboardHeaderText+="<p>Welcome Clyde, how are you doing?</p>";
dashboardHeaderText+="</div>";

function loadDashboardHeader(){
    document.getElementById("dashboardHeader").innerHTML=dashboardHeaderText;
}

var dashboardSidebarText="<div class='col-xs-6 col-sm-3 sidebar-offcanvas' id='sidebar'>";
dashboardSidebarText+="<div class='list-group'>";
dashboardSidebarText+="<a href='/Dashboard/index' class='list-group-item active'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>";
dashboardSidebarText += "<a href='/Dashboard/urls' class='list-group-item'><i class='icon icon-list menu-icons'></i>Url Listing</a>";
dashboardSidebarText += "<a href='/Dashboard/create' class='list-group-item'><i class='icon icon-plus-sign-alt menu-icons'></i>Create Short Url</a>";
dashboardSidebarText += "<a href='/Dashboard/statistics' class='list-group-item'><i class='icon icon-bar-chart menu-icons'></i>Statistics</a>";
dashboardSidebarText += "<a href='/Dashboard/profile' class='list-group-item'><i class='icon icon-user menu-icons'></i>Profile</a>";
dashboardSidebarText += "<a href='/Dashboard/logout' class='list-group-item'><i class='icon icon-signout menu-icons'></i>Logout</a>";
dashboardSidebarText+="</div>";
dashboardSidebarText+="</div><!--/.sidebar-offcanvas-->";

var pageId;
function loadDashboardSidebar(pageId) {
    if (pageId == "urls") {
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/index' class='list-group-item active'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>", "<a href='/Dashboard/index' class='list-group-item'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>");
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/urls' class='list-group-item'><i class='icon icon-list menu-icons'></i>Url Listing</a>", "<a href='/Dashboard/urls' class='list-group-item active'><i class='icon icon-list menu-icons'></i>Url Listing</a>");
    }
    else if (pageId == "profile") {
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/index' class='list-group-item active'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>", "<a href='/Dashboard/index' class='list-group-item'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>");
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/profile' class='list-group-item'><i class='icon icon-user menu-icons'></i>Profile</a>", "<a href='/Dashboard/profile' class='list-group-item active'><i class='icon icon-user menu-icons'></i>Profile</a>");
    }
    else if (pageId == "create") {
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/index' class='list-group-item active'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>", "<a href='/Dashboard/index' class='list-group-item'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>");
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/create' class='list-group-item'><i class='icon icon-plus-sign-alt menu-icons'></i>Create Short Url</a>", "<a href='/Dashboard/create' class='list-group-item active'><i class='icon icon-plus-sign-alt menu-icons'></i>Create Short Url</a>");
    }
    else if (pageId == "update") {
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/index' class='list-group-item active'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>", "<a href='/Dashboard/index' class='list-group-item'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>");
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/update' class='list-group-item'><i class='icon icon-edit menu-icons'></i>Update Url</a>", "<a href='/Dashboard/update' class='list-group-item active'><i class='icon icon-edit menu-icons'></i>Update Url</a>");
    }
    else if (pageId == "statistics") {
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/index' class='list-group-item active'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>", "<a href='/Dashboard/index' class='list-group-item'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>");
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/statistics' class='list-group-item'><i class='icon icon-bar-chart menu-icons'></i>Statistics</a>", "<a href='/Dashboard/statistics' class='list-group-item active'><i class='icon icon-bar-chart menu-icons'></i>Statistics</a>");
    }
    else if (pageId == "logout") {
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/index' class='list-group-item active'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>", "<a href='/Dashboard/index' class='list-group-item'><i class='icon icon-dashboard menu-icons'></i>Dashboard</a>");
        dashboardSidebarText = dashboardSidebarText.replace("<a href='/Dashboard/logout' class='list-group-item'><i class='icon icon-signout menu-icons'></i>Logout</a>", "<a href='/Dashboard/logout' class='list-group-item active'><i class='icon icon-signout menu-icons'></i>Logout</a>");
    }
    else {
        dashboardSidebarText = dashboardSidebarText;
    }
    document.getElementById("dashboardSidebar").innerHTML=dashboardSidebarText;
}