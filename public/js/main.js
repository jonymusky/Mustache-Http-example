var samePage = false;
$(function() {
  ManejadorDeArticulos.load();
  
  //Me fijo en que pagina estoy
  var page = window.location.pathname;
  page = page.split('/');
  if(page[page.length-1] == ''){
    ManejadorDeArticulos.render('articulos');  
  }else if(page[page.length-1] == 'noticia'){
    ManejadorDeArticulos.render('articulo', getParameterByName('id'));
  }
});


/*Helpers*/
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}