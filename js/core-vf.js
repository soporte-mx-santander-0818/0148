$(function(){
    initComponents();
    getPageView();
});

const initComponents = function(){
    $("header").load("/components/navbar/navbar.html", function(){
        if($(".navbar-submenu-alt").length > 0) {
            $(".navbar-submenu-alt").appendTo("header");
        }
    });

    $("footer").load("/components/footer/footer_.html");
}

$(window).scroll(function(){
    let top = $(this).scrollTop();

    if(top >= 64) {
        $(".navbar-menu .navbar-dropdown .btn-hazte-cliente").addClass("active");
    }
    else {
        $(".navbar-menu .navbar-dropdown .btn-hazte-cliente").removeClass("active");
    }
});

const getPageView = function() {
    let url = window.location.pathname;
    let search = window.location.search;
    var urlArray = url.slice(1).split('/');
    let pageName = '|';
    let data = {
        'tipoSitio': 'Publico',
        'idiomaPagina': 'Espanol',
        'canalBanco': 'home',
        'versionApp': '1.0.0',
        'visualization': 'desktop',
        'event':'PageView',
        'section': 'index'
    }
    
    urlArray.forEach(function(value, index){
        value = capitalizeText(value);
        if(index == 0) {
            if(value != "") {
                data["section"] = value.replace(".html", "");
                pageName += data["section"] + '|';
            } 
        }
        else {
            if(value === "") {
                
            }
            else if(value === 'Index.html' || value === 'Index-redesign.html' ) {
                data["subsection" + index] = 'Index';
                pageName += 'Index|';
            }
            else if(value.lastIndexOf(".html") != 0) {
                let page = value.replace(".html", "");

                data["subsection" + index] = page;
                pageName += page + '|';
            }
            else {
                data["subsection" + index] = value;
                pageName += value + '|';
            }
        }
    });
    
    data["page_name"] = pageName;
    data["titulo"] = pageName;
    
    if(url.lastIndexOf(".html") != -1) {
        data["url"] = url.slice(0,url.length-5);
    } else {
        data["url"] = url;
    }

    if(search != null && search != ""){
        data["url"] += search;
    }
    
    dataLayer.push(data);
}

const eventTagManager = function(category, action, label, event = "home") {
    dataLayer.push({
        event: event,
        category: category,
        action: action,
        label: label
    });
}

const eventTagManagerWithSubsection = function(category, action, label, subsection, event = "home") {
    dataLayer.push({
        event: event,
        category: category,
        action: action,
        label: label,
        subsection1: subsection
    });
}

const gaEventTagManager = function(category, action, label, event = "home") {
    dataLayer.push({
        event: event,
        gaEventCategory: category,
        gaEventAction: action,
        gaEventLabel: label
    });
}

const normalizeQuestion = function(str) {
    str = str.replace("/", '');
    str = str.replace(/\s+/g, '_');
    str = str.toLowerCase();
    str = str.replace(/[Â¿?/(),.:Â¡!]/g,"")
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const capitalizeText = function(word) {
    if(word === "") {
        return "";
    }

    return word[0].toUpperCase() + word.slice(1);
}

$("body").on("click", "header .navbar-submenu-alt button, header .navbar-submenu-alt a", function(){
    let section = $(this).attr("data-section");

    if(section != null && section != ""){
        let top = $("." + section).offset().top;
        let header = $("header").height();
        $("html").scrollTop(top - header - 60);
    }

    $("header .navbar-submenu-alt button").removeClass("active");
    $("header .navbar-submenu-alt a").removeClass("active");
    $(this).addClass("active");
});