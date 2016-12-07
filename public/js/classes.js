/* Articulo Class */
var Articulo = function(titulo, contenido, id){
  this.titulo = titulo;
  this.contenido = contenido;
  this.id = id;
};
Articulo.prototype.render = function() {
  return '<article><div><h1><a data-id-noticia="'+this.id+'" href="noticia?id='+this.id+'">'+this.titulo+'<a/></h1><div><div><p>' + this.contenido + '</p></div></article>';
};

/* ManejadorDeArticulos Class */
var ManejadorDeArticulos = {};
ManejadorDeArticulos.load = function(){
  this.articulos = [];
  
  var articulo1 = new Articulo('Titulo 1', 'Contenido', 'noticia1');
  this.articulos.push(articulo1);
  this.articulos.push(new Articulo('Titulo 2', 'Contenido 2', 'noticia2'));
  this.articulos.push(new Articulo('Titulo 3', 'Contenido 3', 'noticia3'));
  
  $('#volver').click(function(e){
    e.preventDefault();
    ManejadorDeArticulos.render('articulos');
  });  
};

ManejadorDeArticulos.render = function(objectId, specificArticle){
  
  var result = "";
  for(var i = 0; i<this.articulos.length; i++){
    if(!specificArticle || specificArticle == this.articulos[i].id){
      result += this.articulos[i].render();
    }
  }
  $('#volver').hide();

  $('#'+objectId).html(result);
  
  $('article a').click(function(e) {
    if(samePage){
      e.preventDefault();
      ManejadorDeArticulos.render('articulos', $(this).data('id-noticia'));
      $('#volver').show();
    }
  });
};

