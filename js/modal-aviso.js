const modalAvisoRedirigirEl = document.getElementById('modal-aviso-redirigir');
const modalAvisoRedirigir = new bootstrap.Modal('#modal-aviso-redirigir', {
    keyboard: false
});

modalAvisoRedirigirEl.addEventListener('show.bs.modal', event => {
    let url = event.relatedTarget.getAttribute("data-href");
    $("#modal-aviso-redirigir span.url").html(url);
    $("#modal-aviso-redirigir .cta").attr("href", url);
});

modalAvisoRedirigirEl.addEventListener('hidden.bs.modal', event => {
    $("#modal-aviso-redirigir span.url").html("");
    $("#modal-aviso-redirigir .cta").removeAttr("href");
});

$("body").on("click", ".btn-modal-aviso-redirigir", function(){
    sidebarMenu.hide();
    modalAvisoRedirigir.show(this);
    $('.modal-backdrop').appendTo('header');
});