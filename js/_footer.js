const collapseAcercaDelBanco = document.getElementById('collapseAcercaDelBanco');
const collapseRegulacion = document.getElementById('collapseRegulacion');
const collapseAyuda = document.getElementById('collapseAyuda');
const collapseSiguenos = document.getElementById('collapseSiguenos');

collapseAcercaDelBanco.addEventListener('show.bs.collapse', event => {
    if($(window).width() >= 992) {
        event.preventDefault();
    }
});

collapseRegulacion.addEventListener('show.bs.collapse', event => {
    if($(window).width() >= 992) {
        event.preventDefault();
    }
});

collapseAyuda.addEventListener('show.bs.collapse', event => {
    if($(window).width() >= 992) {
        event.preventDefault();
    }
});

collapseSiguenos.addEventListener('show.bs.collapse', event => {
    if($(window).width() >= 992) {
        event.preventDefault();
    }
});