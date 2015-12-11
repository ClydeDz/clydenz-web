var headerText="<div class='container-fluid header-banner'>";
headerText+="<div class='container text-center content-container'>";
headerText+="<div>";
headerText+="<img src='images/clydedsouza.jpg' class='img-circle img-responsive' height='120' width='120' />";
headerText+="</div>";
headerText+="<div>";
headerText+="<h1 class='header-text'>Clyde D'Souza</h1>";
headerText+="</div>";
headerText+="</div>";
headerText+="</div>";

headerText+="<nav class='navbar navbar-default'>";
headerText+="<div class='container-fluid'>";
headerText+="<div class='navbar-header'>";
headerText += "<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>";
headerText+="<span class='sr-only'>Toggle navigation</span>";
headerText+="<i class='icon icon-th-large'></i>";
headerText+="</button>";
headerText+="</div>";
headerText+="<div id='navbar' class='navbar-collapse collapse'>";
headerText+="<ul class='nav navbar-nav'>";
headerText+="<li class='active'><a href='/'>About me</a></li>";
headerText+="<li><a href='/projects'>Projects</a></li>";/*URL rewrite*/
headerText+="</ul>";
headerText+="</div><!--/.nav-collapse -->";
headerText+="</div><!--/.container-fluid -->";
headerText += "</nav>";

function loadWebsiteHeader(pageId) {
    if (pageId == "index") {
        headerText=headerText.replace("<li><a href='/'>About me</a></li>", "<li class='active'><a href='/'>About me</a></li>");
        headerText=headerText.replace("<li class='active'><a href='/projects'>Projects</a></li>", "<li><a href='/projects'>Projects</a></li>");/*URL rewrite*/
    }
    else if (pageId == "projects") {
        headerText=headerText.replace("<li class='active'><a href='/'>About me</a></li>", "<li><a href='/'>About me</a></li>");
        headerText=headerText.replace("<li><a href='/projects'>Projects</a></li>", "<li class='active'><a href='/projects'>Projects</a></li>");/*URL rewrite*/
    }
    document.getElementById("websiteHeader").innerHTML = headerText;
}
var footerText="<div class='container'><div class='row'>";
footerText += "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
footerText+="<h2 class='sub-header contact'>Contact</h2>";
footerText+="</div>";
footerText+="</div>";
footerText+="<div class='row'>";
footerText+="<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
footerText+="<p>Feel free to get in touch with me for a project, a query or just a chat over coffee.</p>";
footerText+="<h3>clydedsouza@outlook.com</h3>";
footerText+="<p>";
footerText+="<a href='https://nz.linkedin.com/in/clydedz' class='social-icons'><i class='icon icon-linkedin-sign'></i></a>";
footerText+="<a href='https://twitter.com/ClydeDz' class='social-icons'><i class='icon icon-twitter-sign'></i></a>";
footerText+="<a href='https://github.com/ClydeDz' class='social-icons'><i class='icon icon-github-sign'></i></a>";
footerText+="</p>";
footerText+="<br /><p>Website crafted by Clyde D'Souza</p>";
footerText+="</div>";
footerText+="</div></div>";
footerText+="<div class='footer-block-container'>";
footerText+="<div class='footer-block red'></div><div class='footer-block yellow'></div><div class='footer-block green'></div><div class='footer-block blue'></div>";
footerText+= "</div>";

function loadWebsiteFooter() {
    document.getElementById("websiteFooter").innerHTML = footerText;
}