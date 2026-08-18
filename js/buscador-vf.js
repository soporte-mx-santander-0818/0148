let word = "";
const sidebarMenu = new bootstrap.Offcanvas('#sidebarMenu');
const modalBusqueda = new bootstrap.Modal('#modalResultadoBusqueda', {
  keyboard: false
});


$("body").on("click", "header .navbar-menu .navbar-dropdown .btn-dropdown-buscar, header .backdrop-buscador", function(){
    var element = document.getElementsByClassName("container-buscador")[0];

    element.classList.toggle("open");
    element.classList.add("load");

    if(element.classList.contains("open")) {
        $("<div class='backdrop-buscador'></div>").appendTo("header");

        if(dataLayer != null) {
            eventTagManager("buscador", "seccion_navbar", "buscar");
        }
    }
    else {
        $("header .backdrop-buscador").remove();
    }
});


$("header .container-buscador .form-buscador, " +
  "header .sidebar-menu .offcanvas-body .offcanvas-item .form-buscador").submit(function(e){
    var value = $(this).find("input[name='search']").val();
    
    if(value == null || value == "") {
        e.preventDefault();
    }
    else {
        e.preventDefault();
        word = normalizeTag(value);
        getBusqueda(value, $(this).find("input[name='search']"));
        
        if(dataLayer != null) {
            eventTagManager("buscador", word, "buscar");
        }
    }
});

$("header .container-buscador .form-buscador .form-control, " +
  "header .sidebar-menu .offcanvas-body .offcanvas-item .form-buscador .form-control").bind('input', function() {
    var c = this.selectionStart,
        r = /[^a-z0-9 ]/gi,
        v = $(this).val();
    if(r.test(v)) {
      $(this).val(v.replace(r, ''));
      c--;
    }
    this.setSelectionRange(c, c);
});

function getBusqueda(search, input){
    const palabras = [];
    palabras.push(search);
    palabras.push(search.replace(/ /gi, ""));
    palabras.push(search.replace(/ /gi, "-"));

    fetch('/components/buscador/assets/json/data.json')
    .then(response => response.json())
    .then(data => {
        let html = '';
        let cards = [];
        let cardsCarousel = null;;

        palabras.forEach(function(search){
            cards.push.apply(cards, data.filter(o => {
                return Object.keys(o).some(k => normalizeString(o.url).includes(search))
            }));
            
            cards.push.apply(cards, data.filter(o => {
                return Object.keys(o).some(k => normalizeString(o.title).includes(search))
            }));
    
            cards.push.apply(cards, data.filter(o => {
                return Object.keys(o).some(k => multiSearchOr(normalizeString(o[k]), search.split(' ')))
            }));
        });

        cardsCarousel = cards.filter(
            (obj, index) => cards.findIndex((item) => item.url === obj.url) === index
        );


        if(cardsCarousel != null && cardsCarousel.length > 0) {
            cardsCarousel.forEach(function(card){
                html += `
                    <div class="item">
                        <a href="${ card.url }" target="_blank" onclick="setDataLayerTag('${ word }', '${ normalizeURLTag(card.url) }')">
                            <p class="url">${ card.url }</p>
                            <p class="title">${ card.title }</p>
                        </a>
                        <p class="desc">${ card.description != null && card.description != "" ? card.description : "" }</p>
                    </div>`;
            });
        }
        else {
            html += `
                <div class="item-sin-resultados">
                    <div class="text-center"><img src="/educacion-financiera/assets/img/lupa-busqueda.png"></div>
                    <p>No hay resultados que coincidan con tu bÃºsqueda</p>
                    <ul>
                        <li>Revisa la ortografÃ­a de la palabra.</li>
                        <li>Utiliza palabras mÃ¡s genÃ©ricas.</li>
                    </ul>
                </div>
            `;
        }

        $(".section-busqueda form .container-resultados-encontrados .txtResultadosRelacionados span").html("'" + palabras[0] + "'");
        $(".section-busqueda form .container-resultados-encontrados .txtTotalRegistros").html(cardsCarousel.length + " registros");
        $('.section-busqueda .resultado').html(html);
        $(".container-buscador").removeClass("open");
        $("header .backdrop-buscador").remove();
        sidebarMenu.hide();
        modalBusqueda.show();
        $('.modal-backdrop').appendTo('header');
        $(input).val("");
    });
}

function multiSearchOr(text, searchWords){
    var regex = searchWords
        .map(word => "(?=.*\\b" + word + "\\b)")
        .join('');
    var searchExp = new RegExp(regex, "gi");
    return (searchExp.test(text)) ? searchExp.test(text) : "";
}

function normalizeString(query){
    try {
        return query.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    } catch(e){
        return "";
    }
}

const normalizeTag = (str) => {
    str = str.replace("/", "");
    str = str.replace(/\s+/g, "_");
    str = str.toLowerCase();
    str = str.replace(/[Ã‚Â¿?/(),.]/g, "");
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const normalizeURLTag = (str) => {
    str = str.replace("https://www.santander.com.mx/", "");
    str = str.replace(/[/]/g, "_");
    str = str.replace(/\s+/g, "_");
    str = str.toLowerCase();
    str = str.replace(/[Ã‚Â¿?/(),.]/g, "");
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const setDataLayerTag = function(action, label) {
    dataLayer.push({
        event: "home",
        category: "buscador",
        action: action,
        label: label
    });
}